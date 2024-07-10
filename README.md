# Voting System DApp

This project is a decentralized voting system built on Ethereum using Solidity for the smart contracts and React for the front-end interface. The voting system allows users to vote for candidates and manage their tokens. 

## Features

- **Voting**: Users can vote for their preferred candidates.
- **Token Management**: 
  - Only the Admin can mint tokens.
  - Any user can burn or transfer tokens but cannot mint them.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/)
- [Hardhat](https://hardhat.org/)

## Getting Started

### Step 1: Install Dependencies

In the project root directory, run:

```bash
npm install
Step 2: Start Local Blockchain
Open the first terminal and start the local Ethereum blockchain using Hardhat:
npx hardhat node

Step 3: Deploy Smart Contract
In the second terminal, deploy the smart contract to the local network:

npx hardhat run --network localhost scripts/deploy.js

Project Structure
contracts/: Contains the Solidity smart contract for the voting system.
scripts/: Contains the deployment script.
src/: Contains the React front-end code.

Usage
Connect MetaMask: Ensure you have MetaMask installed and connected to the local blockchain network.
Admin Account: Use the admin account to add candidates and mint tokens.
Voting: Any user can vote for candidates.
Token Management:
Minting can only be done by the admin account.
Any user can burn or transfer tokens.

Notes
The admin account is the account that deploys the contract. It has special privileges such as adding candidates and minting tokens.
Ensure you switch MetaMask to the local blockchain network to interact with the deployed contract.

Commands Summary
Install dependencies: npm install
Start local blockchain: npx hardhat node
Deploy contract: npx hardhat run --network localhost scripts/deploy.js

Important
Only the admin account can mint tokens.
Any user can burn or transfer tokens but cannot mint them.

Author:
@ParijatGhosh