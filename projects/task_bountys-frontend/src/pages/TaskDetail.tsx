import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import Toast from '../components/UI/Toast';
import { Calendar, Clock, Coins, Tag, User, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react';
import { getTaskById } from '../data/mockData';
import { format } from 'date-fns';
import { useWallet } from '../context/WalletContext';
import { useTask } from '../context/TaskContext';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state: walletState } = useWallet();
  const { state: taskState, claimTask } = useTask();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const task = getTaskById(id || '');
  
  if (!task) {
    return (
      <Layout>
        <div className="card text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Task Not Found</h2>
          <p className="text-slate-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/tasks')}>
            Browse Tasks
          </Button>
        </div>
      </Layout>
    );
  }
  
  const isCreator = task.creator === walletState.account?.address;
  const isClaimer = taskState.claimedTasks.some(t => t.id === task.id);
  const canClaim = task.status === 'open' && !isCreator && !isClaimer;
  
  const handleClaimTask = async () => {
    setIsSubmitting(true);
    
    try {
      claimTask(task); // Claim the task
      setShowToast(true);
      setTimeout(() => {
        navigate('/my-tasks'); // Redirect to "My Tasks"
      }, 2000);
    } catch (error) {
      console.error('Error claiming task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
        >
          ← Back to tasks
        </button>
      </div>
      
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
            task.status === 'open' ? 'bg-green-100 text-green-800' :
            task.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
            task.status === 'completed' ? 'bg-purple-100 text-purple-800' :
            task.status === 'disputed' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {task.status}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center">
            <Coins size={18} className="text-primary-500 mr-2" />
            <span className="text-slate-700">
              <span className="font-medium">{task.reward.amount} {task.reward.asset}</span> Reward
            </span>
          </div>
          <div className="flex items-center">
            <Calendar size={18} className="text-slate-500 mr-2" />
            <span className="text-slate-700">Due {format(new Date(task.deadline), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <Tag size={18} className="text-secondary-500 mr-2" />
            <span className="text-slate-700">{task.category}</span>
          </div>
          <div className="flex items-center">
            <Clock size={18} className="text-slate-500 mr-2" />
            <span className="text-slate-700">
              {Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} days left
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-slate-900 mb-2">Description</h2>
          <p className="text-slate-700 whitespace-pre-line">{task.description}</p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium text-slate-900 mb-2">Created By</h2>
          <div className="flex items-center">
            <User size={18} className="text-slate-500 mr-2" />
            <span className="text-slate-700 font-mono">{task.creator.substring(0, 10)}...{task.creator.substring(task.creator.length - 4)}</span>
            {isCreator && <span className="ml-2 badge-primary">You</span>}
          </div>
        </div>
        
        {task.ipfsLink && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-slate-900 mb-2">Additional Resources</h2>
            <div className="flex items-center">
              <ExternalLink size={18} className="text-slate-500 mr-2" />
              <a 
                href={task.ipfsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 underline"
              >
                {task.ipfsLink}
              </a>
            </div>
          </div>
        )}
        
        {task.status === 'claimed' && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-slate-900 mb-2">Claimed By</h2>
            <div className="flex items-center">
              <User size={18} className="text-slate-500 mr-2" />
              <span className="text-slate-700 font-mono">{task.claimedBy?.substring(0, 10)}...{task.claimedBy?.substring(task.claimedBy.length - 4)}</span>
              {isClaimer && <span className="ml-2 badge-primary">You</span>}
            </div>
          </div>
        )}
        
        {task.status === 'completed' && task.submissionLink && (
          <div className="mb-6">
            <h2 className="text-lg font-medium text-slate-900 mb-2">Submission</h2>
            <div className="flex items-center">
              <CheckCircle size={18} className="text-success-500 mr-2" />
              <span className="text-slate-700">Completed on {format(new Date(task.submissionDate!), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center mt-2">
              <ExternalLink size={18} className="text-slate-500 mr-2" />
              <a 
                href={task.submissionLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-800 underline"
              >
                View Submission
              </a>
            </div>
          </div>
        )}
        
        {task.status === 'disputed' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle size={20} className="text-orange-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-orange-800">This task is in dispute</h3>
                <p className="text-orange-700 text-sm">
                  The submitted work is being reviewed by the DAO. Visit the DAO Voting page to participate in the resolution.
                </p>
                <div className="mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/voting')}
                  >
                    Go to DAO Voting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {canClaim && (
          <div className="flex justify-end">
            <Button 
              variant="primary" 
              onClick={handleClaimTask}
              isLoading={isSubmitting}
            >
              Claim This Task
            </Button>
          </div>
        )}
      </div>

      {showToast && (
        <Toast
          message="Task claimed successfully! Redirecting to My Tasks..."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </Layout>
  );
};

export default TaskDetail;
