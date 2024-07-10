import { useState, useEffect } from "react";
import { ethers } from "ethers";
import votingSystemABI from "../artifacts/contracts/VotingSystem.sol/VotingSystem.json";

export default function VotingPage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [votingSystem, setVotingSystem] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferTo, setTransferTo] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = votingSystemABI.abi;
  // console.log("Contract Address:", contractAddress);
  // console.log("Contract ABI:", contractABI);



    const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }
    const handleAccount = (account) => {
      if (account) {
        console.log("Account connected: ", account);
        setAccount(account[0]);
      } else {
        console.log("No account found");
      }
    }

    const connectAccount = async () => {
      if (!ethWallet) {
        alert('MetaMask wallet is required to connect');
        return;
      }
    
    
      const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
      handleAccount(accounts);

      getVotingSystemContract();
    };
// ... (keep existing functions like getWallet, handleAccount, connectAccount, etc.)

const getVotingSystemContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      let provider, signer;
      if (ethers.providers && ethers.providers.Web3Provider) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
      }
      const votingSystemContract = new ethers.Contract(contractAddress, contractABI, signer);
      setVotingSystem(votingSystemContract);
    } catch (error) {
      console.error("Error creating contract instance:", error);
    }
  }
}


  const getTokenBalance = async () => {
    if (votingSystem && account) {
      const balance = await votingSystem.balanceOf(account);
      setTokenBalance(ethers.utils.formatEther(balance));
    }
  }

  const mintTokens = async () => {
    if (votingSystem && mintAmount) {
      try {
        const tx = await votingSystem.mint(account, ethers.utils.parseEther(mintAmount));
        await tx.wait();
        getTokenBalance();
        setMintAmount("");
      } catch (error) {
        console.error("Error minting tokens:", error);
      }
    }
  }

  const burnTokens = async () => {
    if (votingSystem && burnAmount) {
      try {
        const tx = await votingSystem.burn(ethers.utils.parseEther(burnAmount));
        await tx.wait();
        getTokenBalance();
        setBurnAmount("");
      } catch (error) {
        console.error("Error burning tokens:", error);
      }
    }
  }

  const transferTokens = async () => {
    if (votingSystem && transferAmount && transferTo) {
      try {
        const tx = await votingSystem.transfer(transferTo, ethers.utils.parseEther(transferAmount));
        await tx.wait();
        getTokenBalance();
        setTransferAmount("");
        setTransferTo("");
      } catch (error) {
        console.error("Error transferring tokens:", error);
      }
    }
  }
  const getCandidates = async () => {
    if (votingSystem) {
      const candidateList = await votingSystem.getCandidates();
      setCandidates(candidateList);
    }
  }

  const addCandidate = async () => {
    if (votingSystem && newCandidate) {
      let tx = await votingSystem.addCandidate(newCandidate);
      await tx.wait();
      getCandidates();
      setNewCandidate("");
    }
  }

  const vote = async () => {
    if (votingSystem && selectedCandidate) {
      let tx = await votingSystem.vote(selectedCandidate);
      await tx.wait();
      alert("Vote cast successfully!");
    }
  }

  const getVoteCount = async (candidate) => {
    if (votingSystem) {
      const count = await votingSystem.getVoteCount(candidate);
      return count.toNumber();
    }
    return 0;
  }
  // ... (keep existing functions like getCandidates, addCandidate, vote, getVoteCount, etc.)

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this voting system.</p>
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect your MetaMask wallet</button>
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Token Balance: {tokenBalance} VOTE</p>

        <h2>Token Management</h2>
        <div>
          <input 
            type="number" 
            value={mintAmount} 
            onChange={(e) => setMintAmount(e.target.value)}
            placeholder="Amount to mint"
          />
          <button onClick={mintTokens}>Mint Tokens</button>
        </div>
        <div>
          <input 
            type="number" 
            value={burnAmount} 
            onChange={(e) => setBurnAmount(e.target.value)}
            placeholder="Amount to burn"
          />
          <button onClick={burnTokens}>Burn Tokens</button>
        </div>
        <div>
          <input 
            type="text" 
            value={transferTo} 
            onChange={(e) => setTransferTo(e.target.value)}
            placeholder="Recipient address"
          />
          <input 
            type="number" 
            value={transferAmount} 
            onChange={(e) => setTransferAmount(e.target.value)}
            placeholder="Amount to transfer"
          />
          <button onClick={transferTokens}>Transfer Tokens</button>
        </div>

        <h2>Add Candidate</h2>
        <input 
          type="text" 
          value={newCandidate} 
          onChange={(e) => setNewCandidate(e.target.value)}
          placeholder="Enter candidate name"
        />
        <button onClick={addCandidate}>Add Candidate</button>

        <h2>Vote</h2>
        <select 
          value={selectedCandidate} 
          onChange={(e) => setSelectedCandidate(e.target.value)}
        >
          <option value="">Select a candidate</option>
          {candidates.map((candidate, index) => (
            <option key={index} value={candidate}>{candidate}</option>
          ))}
        </select>
        <button onClick={vote}>Vote</button>

        <h2>Candidates and Votes</h2>
        <ul>
          {candidates.map((candidate, index) => (
            <li key={index}>
              {candidate}: <VoteCount candidate={candidate} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  
  const VoteCount = ({ candidate }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      const fetchCount = async () => {
        const voteCount = await getVoteCount(candidate);
        setCount(voteCount);
      };
      fetchCount();
    }, [candidate]);

    return <span>{count} votes</span>;
  }
  // ... (keep VoteCount component)

  useEffect(() => {
    getWallet();
  }, []);

  useEffect(() => {
    if (votingSystem && account) {
      getCandidates();
      getTokenBalance();
    }
  }, [votingSystem, account]);

  return (
    <main className="container">
      <header><h1>Welcome to the Voting System!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}


