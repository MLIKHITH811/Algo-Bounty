import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import FormInput from '../components/UI/FormInput';
import FormTextarea from '../components/UI/FormTextarea';
import { ArrowLeft, Upload, Clock } from 'lucide-react';
import { getTaskById } from '../data/mockData';
import { format } from 'date-fns';
import { useWallet } from '../context/WalletContext';

interface SubmissionForm {
  submissionLink: string;
  comments: string;
}

const TaskSubmission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const task = getTaskById(id || '');
  
  const { register, handleSubmit, formState: { errors } } = useForm<SubmissionForm>({
    defaultValues: {
      submissionLink: '',
      comments: '',
    },
  });
  
  if (!task) {
    return (
      <Layout>
        <div className="card text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Task Not Found</h2>
          <p className="text-slate-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate('/my-tasks')}>
            Back to My Tasks
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Verify the user is the claimer
  if (task.claimedBy !== state.account?.address) {
    return (
      <Layout>
        <div className="card text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Not Authorized</h2>
          <p className="text-slate-600 mb-6">You are not authorized to submit work for this task.</p>
          <Button variant="primary" onClick={() => navigate('/my-tasks')}>
            Back to My Tasks
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Verify task is in claimed status
  if (task.status !== 'claimed') {
    return (
      <Layout>
        <div className="card text-center p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Cannot Submit Work</h2>
          <p className="text-slate-600 mb-6">
            This task is in {task.status} status and cannot accept submissions.
          </p>
          <Button variant="primary" onClick={() => navigate('/my-tasks')}>
            Back to My Tasks
          </Button>
        </div>
      </Layout>
    );
  }
  
  const onSubmit = async (data: SubmissionForm) => {
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Task submitted:', { taskId: task.id, ...data });
    setIsSubmitting(false);
    navigate('/my-tasks');
  };

  return (
    <Layout>
      <div className="mb-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to task
        </button>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="card mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Submit Work for Task</h1>
          <p className="text-slate-600 mb-4">#{task.id}: {task.title}</p>
          
          <div className="flex items-center text-sm text-slate-500 mb-6">
            <Clock size={16} className="mr-1" />
            <span>Due {format(new Date(task.deadline), 'MMM d, yyyy')} ({Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} days left)</span>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Submission Link"
              name="submissionLink"
              register={register}
              error={errors.submissionLink}
              helperText="Provide an IPFS link, GitHub repository, or other URL where your work can be reviewed"
              placeholder="ipfs://... or https://..."
              rules={{ 
                required: 'Submission link is required',
                pattern: {
                  value: /^(ipfs:\/\/|https?:\/\/).+/,
                  message: 'Please enter a valid URL or IPFS link'
                }
              }}
            />
            
            <FormTextarea
              label="Additional Comments"
              name="comments"
              register={register}
              error={errors.comments}
              helperText="Provide any additional information that will help with reviewing your submission"
              placeholder="Explain what you did, any challenges you faced, or specific details reviewers should pay attention to..."
            />
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Your submission will be reviewed by the task creator. If approved, you will receive the {task.reward.amount} {task.reward.asset} reward. If disputed, the community DAO will vote on the outcome.
              </p>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate(`/my-tasks/${task.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                icon={<Upload size={18} />}
              >
                Submit Work
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TaskSubmission;