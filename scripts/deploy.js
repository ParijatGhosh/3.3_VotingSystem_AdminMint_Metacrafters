// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
//   const votingSystem = await VotingSystem.deploy();
//   await votingSystem.deployed();

//   console.log(`VotingSystem contract deployed to ${votingSystem.address}`);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
// const hre = require("hardhat");

// async function main() {
//   const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
//   console.log("Deploying VotingSystem...");
//   const votingSystem = await VotingSystem.deploy();
  
//   // Wait for the contract to be mined
//   await votingSystem.waitForDeployment();

//   console.log(`VotingSystem contract deployed to ${await votingSystem.getAddress()}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
// const hre = require("hardhat");

// async function main() {
//   const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
//   console.log("Deploying VotingSystem...");
//   const votingSystem = await VotingSystem.deploy();
  
  
//   // Wait for the contract to be mined
//   if (votingSystem.waitForDeployment) {
//     await votingSystem.waitForDeployment();
//   } else {
//     await votingSystem.deployed();
//   }

//   // Get the contract address
//   const address = votingSystem.address || await votingSystem.getAddress();

//   console.log(`VotingSystem contract deployed to ${address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

const hre = require("hardhat");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  console.log("Deploying VotingSystem...");
  
  // Deploy with constructor arguments for ERC20 token name and symbol
  const votingSystem = await VotingSystem.deploy("Voting Token", "VOTE");
  
  // Wait for the contract to be mined
  if (votingSystem.waitForDeployment) {
    await votingSystem.waitForDeployment();
  } else {
    await votingSystem.deployed();
  }

  // Get the contract address
  const address = votingSystem.address || await votingSystem.getAddress();

  console.log(`VotingSystem contract deployed to ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
