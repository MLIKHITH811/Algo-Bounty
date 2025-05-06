import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import EmptyState from '../components/UI/EmptyState';
import { ThumbsUp, ThumbsDown, ExternalLink, User, AlertTriangle, Vote } from 'lucide-react';
import { mockTasks } from '../data/mockData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const DAOVoting: React.FC = () => {
  const navigate = useNavigate();
  const [votingTasks, setVotingTasks] = useState(
    mockTasks.filter(task => task.status === 'disputed')
  );
  
  const handleVote = async (taskId: string, vote: 'approve' | 'reject') => {
    // Simulate voting
    setVotingTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            votes: {
              approve: vote === 'approve' ? (task.votes?.approve || 0) + 1 : (task.votes?.approve || 0),
              reject: vote === 'reject' ? (task.votes?.reject || 0) + 1 : (task.votes?.reject || 0),
            }
          };
        }
        return task;
      })
    );
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">DAO Voting</h1>
        <p className="text-slate-600">Help resolve disputes between task creators and submitters</p>
      </div>

      <div className="card mb-6 bg-secondary-50 border border-secondary-100">
        <div className="flex items-start">
          <div className="p-3 rounded-full bg-secondary-100 mr-4">
            <Vote size={24} className="text-secondary-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-secondary-900 mb-2">How Voting Works</h2>
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 mb-4">
              <li>Tasks in dispute require community votes to determine if the work meets requirements</li>
              <li>Each wallet address gets one vote per disputed task</li>
              <li>Voting period lasts for 3 days after a dispute is initiated</li>
              <li>Tasks require a majority vote (over 50%) to be approved or rejected</li>
              <li>If approved, the submitter receives the bounty. If rejected, funds return to the creator</li>
            </ul>
            <p className="text-xs text-slate-500">
              Your voting power is based on your participation in the AlgoBounty ecosystem.
            </p>
          </div>
        </div>
      </div>

      {votingTasks.length > 0 ? (
        <div className="space-y-6">
          {votingTasks.map((task) => (
            <div key={task.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                  <p className="text-sm text-slate-600">Task ID: #{task.id}</p>
                </div>
                <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                  Disputed
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Reward</h3>
                  <p className="text-lg font-medium text-slate-900">{task.reward.amount} {task.reward.asset}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Deadline</h3>
                  <p className="text-slate-900">{format(new Date(task.deadline), 'MMM d, yyyy')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Submission Date</h3>
                  <p className="text-slate-900">{format(new Date(task.submissionDate!), 'MMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="border-t border-b border-slate-200 py-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Creator</h3>
                    <div className="flex items-center">
                      <User size={16} className="text-slate-500 mr-2" />
                      <span className="text-slate-900 font-mono text-sm">
                        {task.creator.substring(0, 10)}...{task.creator.substring(task.creator.length - 4)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 mb-2">Submitter</h3>
                    <div className="flex items-center">
                      <User size={16} className="text-slate-500 mr-2" />
                      <span className="text-slate-900 font-mono text-sm">
                        {task.claimedBy?.substring(0, 10)}...{task.claimedBy?.substring(task.claimedBy!.length - 4)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-2">Submission</h3>
                <div className="flex items-center mb-4">
                  <ExternalLink size={16} className="text-primary-500 mr-2" />
                  <a 
                    href={task.submissionLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800 underline"
                  >
                    View Submission
                  </a>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertTriangle size={18} className="text-orange-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800 mb-1">Dispute Reason</h4>
                      <p className="text-orange-700 text-sm">
                        The submitted work does not meet the requirements specified in the task description. 
                        Missing functionality for cross-chain integration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-slate-700 mb-2">Current Votes</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsUp size={18} className="text-green-500 mr-2" />
                        <span className="text-green-800 font-medium">Approve</span>
                      </div>
                      <span className="text-lg font-bold text-green-800">{task.votes?.approve || 0}</span>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ThumbsDown size={18} className="text-red-500 mr-2" />
                        <span className="text-red-800 font-medium">Reject</span>
                      </div>
                      <span className="text-lg font-bold text-red-800">{task.votes?.reject || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => handleVote(task.id, 'reject')}
                  icon={<ThumbsDown size={18} />}
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-red-500"
                >
                  Reject
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleVote(task.id, 'approve')}
                  icon={<ThumbsUp size={18} />}
                  className="bg-green-500 hover:bg-green-600 focus:ring-green-500"
                >
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No disputed tasks"
          description="There are currently no tasks that require voting. Check back later."
          icon={Vote}
          actionLabel="Browse Tasks"
          onAction={() => navigate('/tasks')}
        />
      )}
    </Layout>
  );
};

export default DAOVoting;