import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/UI/StatCard';
import TaskCard from '../components/UI/TaskCard';
import Button from '../components/UI/Button';
import { Coins, CheckCircle, TimerReset, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import { mockUserStats, mockTasks, getTasksByClaimer } from '../data/mockData';
import { useWallet } from '../context/WalletContext';

const Dashboard: React.FC = () => {
  const { state } = useWallet();
  const navigate = useNavigate();

  // Get last 3 open tasks
  const openTasks = mockTasks.filter(task => task.status === 'open').slice(0, 3);
  
  // Get user's claimed tasks
  const claimedTasks = state.account 
    ? getTasksByClaimer(state.account.address).slice(0, 2)
    : [];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back!</h1>
        <p className="text-slate-600">
          Your wallet: <span className="font-medium">{state.account?.address.substring(0, 6)}...{state.account?.address.substring(state.account?.address.length - 4)}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Rewards Earned"
          value={`${mockUserStats.totalRewardsEarned} ALGO`}
          icon={Coins}
          color="bg-primary-500"
          change={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Tasks Completed"
          value={mockUserStats.tasksCompleted}
          icon={CheckCircle}
          color="bg-secondary-600"
        />
        <StatCard
          title="Active Claims"
          value={mockUserStats.activeClaims}
          icon={TimerReset}
          color="bg-accent-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Latest Bounties</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/tasks')}
              icon={<ArrowRight size={16} />}
            >
              Browse All
            </Button>
          </div>
          
          <div className="space-y-4">
            {openTasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onClick={() => navigate(`/tasks/${task.id}`)}
              />
            ))}
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                onClick={() => navigate('/post')}
                icon={<Plus size={18} />}
              >
                Post a New Task
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900">Your Active Tasks</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/my-tasks')}
              icon={<ArrowRight size={16} />}
            >
              View All
            </Button>
          </div>
          
          {claimedTasks.length > 0 ? (
            <div className="space-y-4">
              {claimedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onClick={() => navigate(`/my-tasks/${task.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center p-8">
              <div className="inline-block p-3 bg-secondary-50 rounded-full mb-4">
                <TimerReset size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No Active Tasks</h3>
              <p className="text-slate-600 mb-6">You haven't claimed any tasks yet. Browse available bounties to get started.</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/tasks')}
              >
                Find Tasks
              </Button>
            </div>
          )}
          
          <div className="card mt-8">
            <div className="flex items-start">
              <div className="p-3 bg-accent-50 rounded-full mr-4">
                <TrendingUp size={24} className="text-accent-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-slate-900 mb-1">DeFi Opportunities</h3>
                <p className="text-slate-600 mb-4">Stake your earned ALGO tokens to receive passive income.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/defi')}
                >
                  Explore Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;