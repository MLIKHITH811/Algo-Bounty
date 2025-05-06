// Wallet types
export interface WalletAccount {
  address: string;
  name?: string;
}

export interface WalletState {
  isConnected: boolean;
  account: WalletAccount | null;
  isConnecting: boolean;
  error: string | null;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string;
  creator: string;
  reward: {
    amount: number;
    asset: 'ALGO' | string;
  };
  deadline: Date;
  status: 'open' | 'claimed' | 'completed' | 'disputed' | 'closed';
  category: string;
  ipfsLink?: string;
  claimedBy?: string;
  submissionLink?: string;
  submissionDate?: Date;
  votes?: {
    approve: number;
    reject: number;
  };
}

// User stats
export interface UserStats {
  totalRewardsEarned: number;
  tasksCompleted: number;
  activeClaims: number;
}