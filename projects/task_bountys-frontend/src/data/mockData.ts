import { Task, UserStats } from '../types';
import { addDays } from 'date-fns';

// Mock user stats
export const mockUserStats: UserStats = {
  totalRewardsEarned: 2450,
  tasksCompleted: 8,
  activeClaims: 2,
};

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Develop Smart Contract for NFT Marketplace',
    description: 'Create a smart contract for an NFT marketplace on Algorand with listing, buying, and selling functionality.',
    creator: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    reward: {
      amount: 500,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 14),
    status: 'open',
    category: 'Development',
    ipfsLink: 'ipfs://Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu',
  },
  {
    id: '2',
    title: 'Design UI/UX for AlgoBounty Mobile App',
    description: 'Create comprehensive UI/UX designs for an AlgoBounty mobile application with a focus on modern, clean interface.',
    creator: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    reward: {
      amount: 350,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 7),
    status: 'open',
    category: 'Design',
  },
  {
    id: '3',
    title: 'Create Educational Content About Algorand',
    description: 'Develop a series of educational articles and videos explaining Algorand technology for beginners.',
    creator: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    reward: {
      amount: 200,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 10),
    status: 'claimed',
    claimedBy: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    category: 'Content',
  },
  {
    id: '4',
    title: 'Audit Smart Contract for Security Vulnerabilities',
    description: 'Perform a comprehensive security audit of a DeFi smart contract to identify potential vulnerabilities.',
    creator: 'EXJHI3HK5YJZYKJKPGPQOKY7ILCURZUUWEGS3GASZG3RUZUATNXSARUQBQ',
    reward: {
      amount: 800,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 5),
    status: 'open',
    category: 'Security',
    ipfsLink: 'ipfs://QmTkzDwWqPbnAh5YiV5VwcTLnGdwSNsNTn2aDxdXBFca7D',
  },
  {
    id: '5',
    title: 'Create Marketing Campaign for Algorand NFT Project',
    description: 'Develop and execute a comprehensive marketing campaign for an upcoming Algorand NFT collection.',
    creator: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    reward: {
      amount: 450,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 21),
    status: 'open',
    category: 'Marketing',
  },
  {
    id: '6',
    title: 'Build Community Analytics Dashboard',
    description: 'Create a dashboard to track and visualize community growth metrics for an Algorand project.',
    creator: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    reward: {
      amount: 600,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 30),
    status: 'open',
    category: 'Development',
  },
  {
    id: '7',
    title: 'Develop Cross-Chain Bridge Between Algorand and Ethereum',
    description: 'Create a bridge solution to transfer assets between Algorand and Ethereum blockchains securely.',
    creator: 'EXJHI3HK5YJZYKJKPGPQOKY7ILCURZUUWEGS3GASZG3RUZUATNXSARUQBQ',
    reward: {
      amount: 1200,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 45),
    status: 'claimed',
    claimedBy: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    category: 'Development',
  },
  {
    id: '8',
    title: 'Create Technical Documentation for AlgoDAO',
    description: 'Develop comprehensive technical documentation for AlgoDAO protocol including architecture and API references.',
    creator: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    reward: {
      amount: 300,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 15),
    status: 'completed',
    claimedBy: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    submissionLink: 'ipfs://QmWcxSh6Z1BrwUYv2VfbSFfuBXGJyqSPqazZ4si1H9vXQP',
    submissionDate: addDays(new Date(), -5),
    category: 'Documentation',
  },
  {
    id: '9',
    title: 'Create Trading Bot for Algorand DEX',
    description: 'Develop an automated trading bot for Algorand DEX with customizable strategies and risk management.',
    creator: 'EXJHI3HK5YJZYKJKPGPQOKY7ILCURZUUWEGS3GASZG3RUZUATNXSARUQBQ',
    reward: {
      amount: 750,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 20),
    status: 'disputed',
    claimedBy: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    submissionLink: 'ipfs://QmVLqaRRkwLrKXtPe2XS59K5XxBKySzCwjN5PENrTqN4KF',
    submissionDate: addDays(new Date(), -2),
    votes: {
      approve: 12,
      reject: 8,
    },
    category: 'Development',
  },
  {
    id: '10',
    title: 'Develop Staking Contract for ASA Tokens',
    description: 'Create a staking smart contract that allows users to stake ASA tokens and earn rewards.',
    creator: 'ZW3ISEHZUHPO7OZGMKLKIIMKVICOUDRCERI454I3DB2BH52HGLSO67W754',
    reward: {
      amount: 550,
      asset: 'ALGO',
    },
    deadline: addDays(new Date(), 25),
    status: 'disputed',
    claimedBy: 'HNXSJAQ5NLXTD6NCGASBZ4PRIWBZLLJKWZ5I6KLNREWZIZ5HTJLRIVX7SY',
    submissionLink: 'ipfs://QmejNJVZBFsYorXXLVrSAzHpgHxqzXWAcLQjSecPLRdZvx',
    submissionDate: addDays(new Date(), -3),
    votes: {
      approve: 5,
      reject: 7,
    },
    category: 'DeFi',
  },
];

// Filter tasks by status
export const getTasksByStatus = (status: Task['status']) => {
  return mockTasks.filter(task => task.status === status);
};

// Filter tasks by category
export const getTasksByCategory = (category: string) => {
  return mockTasks.filter(task => task.category === category);
};

// Filter tasks by creator address
export const getTasksByCreator = (address: string) => {
  return mockTasks.filter(task => task.creator === address);
};

// Filter tasks by claimed address
export const getTasksByClaimer = (address: string) => {
  return mockTasks.filter(task => task.claimedBy === address);
};

// Get task by id
export const getTaskById = (id: string) => {
  return mockTasks.find(task => task.id === id);
};

// Get all categories
export const getAllCategories = (): string[] => {
  const categories = new Set(mockTasks.map(task => task.category));
  return Array.from(categories);
};

// Mock staking data
export interface StakingPool {
  id: string;
  name: string;
  asset: string;
  totalStaked: number;
  apy: number;
  lockPeriod: number; // in days
  minStake: number;
}

export const mockStakingPools: StakingPool[] = [
  {
    id: '1',
    name: 'AlgoBounty Staking Pool',
    asset: 'ALGO',
    totalStaked: 125000,
    apy: 7.5,
    lockPeriod: 30,
    minStake: 100,
  },
  {
    id: '2',
    name: 'AlgoBounty Governance',
    asset: 'ALGO',
    totalStaked: 450000,
    apy: 9.2,
    lockPeriod: 90,
    minStake: 500,
  },
  {
    id: '3',
    name: 'ASA Rewards Pool',
    asset: 'BOUNTY-ASA',
    totalStaked: 275000,
    apy: 12.8,
    lockPeriod: 60,
    minStake: 1000,
  },
];