import React from 'react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import { TrendingUp, Clock, Info, Coins, Lock, AlertCircle } from 'lucide-react';
import { mockStakingPools } from '../data/mockData';
import { useWallet } from '../context/WalletContext';

const DeFi: React.FC = () => {
  const { state } = useWallet();
  const [selectedPool, setSelectedPool] = React.useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = React.useState<number>(0);
  
  const handleStake = (poolId: string) => {
    console.log(`Staking ${stakeAmount} in pool ${poolId}`);
    // Reset form
    setSelectedPool(null);
    setStakeAmount(0);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">DeFi & Staking</h1>
        <p className="text-slate-600">Earn passive income by staking your ALGO and ASA tokens</p>
      </div>

      <div className="card mb-8 bg-accent-50 border border-accent-100">
        <div className="flex items-start">
          <div className="p-3 rounded-full bg-accent-100 mr-4">
            <Info size={24} className="text-accent-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-accent-900 mb-2">How Staking Works</h2>
            <p className="text-accent-800 mb-4">
              Staking your ALGO or ASA tokens allows you to earn rewards while supporting the AlgoBounty ecosystem. 
              Your staked tokens are locked for a specific period, during which they generate yield.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Lock size={16} className="text-accent-600 mr-2" />
                  <span className="font-medium text-accent-900">Lock Period</span>
                </div>
                <p className="text-accent-800">
                  Tokens are locked for a fixed duration, with higher APY for longer commitments.
                </p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Coins size={16} className="text-accent-600 mr-2" />
                  <span className="font-medium text-accent-900">Rewards</span>
                </div>
                <p className="text-accent-800">
                  Earn rewards in ALGO or ASA tokens based on the pool's APY rate.
                </p>
              </div>
              <div className="bg-white bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <AlertCircle size={16} className="text-accent-600 mr-2" />
                  <span className="font-medium text-accent-900">Early Withdrawal</span>
                </div>
                <p className="text-accent-800">
                  Early withdrawals incur a 10% penalty on earned rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Staking Pools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mockStakingPools.map((pool) => (
          <div 
            key={pool.id} 
            className={`card hover:shadow-md transition-all duration-300 border-2 ${
              selectedPool === pool.id ? 'border-primary-500' : 'border-transparent'
            }`}
            onClick={() => setSelectedPool(pool.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{pool.name}</h3>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {pool.asset}
              </span>
            </div>
            
            <div className="mb-6 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-600">{pool.apy}%</span>
                <p className="text-sm text-slate-600">Annual Yield</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Lock Period</span>
                <span className="text-slate-900 font-medium">{pool.lockPeriod} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Minimum Stake</span>
                <span className="text-slate-900 font-medium">{pool.minStake} {pool.asset}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Staked</span>
                <span className="text-slate-900 font-medium">{pool.totalStaked.toLocaleString()} {pool.asset}</span>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              fullWidth
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPool(pool.id);
                document.getElementById('staking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Stake {pool.asset}
            </Button>
          </div>
        ))}
      </div>

      {selectedPool && (
        <div id="staking-form" className="card max-w-2xl mx-auto mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Stake in {mockStakingPools.find(p => p.id === selectedPool)?.name}
          </h2>
          
          <div className="mb-6">
            <label htmlFor="amount" className="label">
              Staking Amount ({mockStakingPools.find(p => p.id === selectedPool)?.asset})
            </label>
            <input
              id="amount"
              type="number"
              className="input"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(Number(e.target.value))}
              min={mockStakingPools.find(p => p.id === selectedPool)?.minStake || 0}
              step={0.1}
            />
            <p className="mt-1 text-xs text-slate-500">
              Minimum stake: {mockStakingPools.find(p => p.id === selectedPool)?.minStake} {mockStakingPools.find(p => p.id === selectedPool)?.asset}
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Staking Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Amount to Stake</span>
                <span className="text-slate-900 font-medium">
                  {stakeAmount} {mockStakingPools.find(p => p.id === selectedPool)?.asset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Lock Period</span>
                <span className="text-slate-900 font-medium">
                  {mockStakingPools.find(p => p.id === selectedPool)?.lockPeriod} days
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">APY</span>
                <span className="text-primary-600 font-medium">
                  {mockStakingPools.find(p => p.id === selectedPool)?.apy}%
                </span>
              </div>
              <div className="border-t border-blue-200 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-medium">Estimated Rewards</span>
                  <span className="text-green-600 font-bold">
                    {(stakeAmount * (mockStakingPools.find(p => p.id === selectedPool)?.apy || 0) / 100 * (mockStakingPools.find(p => p.id === selectedPool)?.lockPeriod || 0) / 365).toFixed(2)} {mockStakingPools.find(p => p.id === selectedPool)?.asset}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                setSelectedPool(null);
                setStakeAmount(0);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleStake(selectedPool)}
              disabled={stakeAmount < (mockStakingPools.find(p => p.id === selectedPool)?.minStake || 0)}
              icon={<TrendingUp size={18} />}
            >
              Stake Tokens
            </Button>
          </div>
        </div>
      )}

      <div className="card bg-secondary-50 border border-secondary-100">
        <div className="flex items-start">
          <div className="p-3 rounded-full bg-secondary-100 mr-4">
            <Clock size={24} className="text-secondary-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-secondary-900 mb-2">Your Staking History</h2>
            <p className="text-slate-600 mb-4">
              You haven't staked any tokens yet. Start staking to see your history here.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('staking-pools')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Staking Options
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DeFi;