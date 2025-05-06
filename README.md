# 🚀 AlgoBounty — Decentralized Task Bounty Board on Algorand

AlgoBounty is a decentralized task marketplace built on the Algorand blockchain, enabling users to post bounties, claim tasks, submit proof of work, and receive rewards in a transparent, trustless, and automated manner. The platform eliminates intermediaries and introduces DAO-based dispute resolution, ensuring fair outcomes for all participants.

## 🧠 Problem Statement

Traditional freelancing or microtask platforms often:
- Charge high intermediary fees.
- Lack transparency in reward distribution.
- Have weak or biased dispute resolution systems.

**AlgoBounty** solves these by using blockchain technology to create a **transparent**, **fee-efficient**, and **community-governed** alternative.

---

## 🎯 Objectives

- ✅ Allow users to **post** tasks with reward amounts in ALGO or ASA tokens.
- ✅ Enable workers to **claim** tasks and **submit** proof of work via IPFS.
- ✅ **Automate** reward distribution using smart contract-based escrow.
- ✅ Offer DAO-based **dispute resolution** through on-chain voting.
- ✅ Integrate with DeFi protocols for optional yield farming & staking rewards (optional module).

---

## 🌟 Key Features

### 🔐 Wallet Integration
- Secure login with [Pera Wallet](https://perawallet.app/).
- Users can post, claim, and vote using their Algorand wallet.

### 📝 Task Creation & Posting
- Users enter: Task Title, Description, Deadline, Reward (ALGO or ASA).
- Tasks are stored immutably on the blockchain.

### 🤝 Task Claiming & Proof Submission
- Workers claim tasks using smart contracts.
- Submit work as IPFS links or uploads for validator/admin review.

### 🔒 Smart Contract Escrow
- Reward funds are locked in escrow when a task is posted.
- Funds are automatically released upon task approval or DAO consensus.

### 🧬 DAO Voting for Dispute Resolution
- In case of task submission disputes, token holders vote to decide the outcome.
- Voting power may depend on staked native governance tokens (optional).

### 💸 Optional: DeFi Integration
- Rewards sourced from liquidity pools.
- Workers earn additional APY on locked rewards (future module).
- Staking module to allow governance rights and benefits.

---

## ⚙️ Tech Stack

### 🌐 Frontend
- **React JS** for dynamic UI
- **Tailwind CSS** for responsive design
- **Pera Wallet SDK** for wallet integration
- **IPFS** for decentralized file storage

### 🧠 Smart Contracts
- **Algorand Smart Contracts (ASC1) in PyTeal**
- **AlgoKit** for project scaffolding, building, and deploying
- **Algorand SDK** to interact with the blockchain

### 🧪 Testing & Development Tools
- Jest for testing
- Algokit sandbox for local blockchain interaction
- ESLint & Prettier for code quality

---

## 📸 Screenshots

Here’s a preview of the **AlgoBounty Dashboard** in action:

<p align="center">
  <img src="./projects/task_bountys-frontend/public/Task Bounty Dashboard.png" alt="AlgoBounty Dashboard Screenshot" width="80%">
</p>

This dashboard provides users with a summary of their bounty activity on the Algorand blockchain, including:
- Wallet info and total rewards earned.
- Number of completed tasks and active claims.
- Available bounties with details like payout, category, and deadline.
- Section for active tasks and DeFi earning opportunities.

Users can easily browse and post tasks, view posted and claimed bounties, and manage their activity all in one place.

---


## 🧪 Functional Modules

| **Module**   | **Functionality**                               |
| ------------ | ----------------------------------------------- |
| Login        | Connect with Pera Wallet                        |
| Post Task    | Add new task with reward and deadline           |
| Claim Task   | Select and lock tasks through smart contract    |
| Submit Proof | Upload work via IPFS or links                   |
| Escrow       | Lock and release rewards via ASC1 contracts     |
| DAO Voting   | Token-holders vote on disputes                  |
| Dashboard    | View task statuses (Posted, Claimed, Completed) |

---

## 🧾 Prerequisites

Before running the project locally, ensure you have:

- [Node.js](https://nodejs.org/) ≥ v16
- [AlgoKit](https://github.com/algorandfoundation/algokit-cli) installed
- [Pera Wallet](https://perawallet.app/) mobile or extension
- Git installed

---

***Installation Steps***

**Clone the repository:**

git clone https://github.com/your-username/AlgoBounty.git
cd AlgoBounty

**Install frontend dependencies:**

`npm install`

**Build and deploy smart contracts using AlgoKit:**

`algokit project run build`

**Start the development server:**

`npm run dev`

Visit http://localhost:3000 to view the running dApp.

***License***

This project is licensed under the MIT License.

