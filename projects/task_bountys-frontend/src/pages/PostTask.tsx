import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import Button from '../components/UI/Button';
import FormInput from '../components/UI/FormInput';
import FormTextarea from '../components/UI/FormTextarea';
import FormDatePicker from '../components/UI/FormDatePicker';
import Select from '../components/UI/Select';
import { getAllCategories } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext'; // Import the context to access postTask
import ViewPostTasks from './ViewPostTasks';

interface PostTaskForm {
  title: string;
  description: string;
  category: string;
  reward: number;
  rewardAsset: string;
  deadline: string;
  ipfsLink?: string;
}

const PostTask: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const { postTask } = useTask(); // Get the postTask function from context

  const { register, handleSubmit, formState: { errors } } = useForm<PostTaskForm>({
    defaultValues: {
      title: '',
      description: '',
      category: 'Development',
      reward: 100,
      rewardAsset: 'ALGO',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      ipfsLink: '',
    },
  });

  const categories = getAllCategories().map(category => ({
    value: category,
    label: category,
  }));

  const assetOptions = [
    { value: 'ALGO', label: 'ALGO' },
    { value: 'USDC', label: 'USDC' },
    { value: 'BOUNTY-ASA', label: 'BOUNTY-ASA' },
  ];

  const onSubmit = async (data: PostTaskForm) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newTask = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        category: data.category,
        reward: data.reward,
        rewardAsset: data.rewardAsset,
        deadline: data.deadline,
        ipfsLink: data.ipfsLink || '',
        status: 'posted',
      };

      postTask(newTask);

      // 🔁 Navigate to View Posted Tasks after successful post
      navigate('/ViewPostTasks');
    } catch (error) {
      console.error('Error posting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Post a New Task</h1>

        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Task Title"
              name="title"
              register={register}
              error={errors.title}
              rules={{ required: 'Title is required' }}
              placeholder="E.g., Develop Smart Contract for NFT Marketplace"
            />

            <FormTextarea
              label="Description"
              name="description"
              register={register}
              error={errors.description}
              rules={{
                required: 'Description is required',
                minLength: { value: 20, message: 'Description should be at least 20 characters' }
              }}
              placeholder="Provide a clear and detailed description of the task requirements..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                name="category"
                options={categories}
                register={register}
                error={errors.category}
              />

              <FormDatePicker
                label="Deadline"
                name="deadline"
                register={register}
                error={errors.deadline}
                helperText="When should this task be completed by?"
                minDate={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Reward Amount"
                name="reward"
                type="number"
                register={register}
                error={errors.reward}
                rules={{
                  required: 'Reward is required',
                  min: { value: 1, message: 'Reward must be at least 1' }
                }}
                min={1}
                step={0.1}
              />

              <Select
                label="Asset Type"
                name="rewardAsset"
                options={assetOptions}
                register={register}
                error={errors.rewardAsset}
              />
            </div>

            <FormInput
              label="IPFS Link (Optional)"
              name="ipfsLink"
              register={register}
              error={errors.ipfsLink}
              helperText="Link to additional information or files related to the task"
              placeholder="ipfs://..."
            />

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/ViewPostTasks')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                Post Task
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-8 card bg-secondary-50 border border-secondary-100">
          <h3 className="text-lg font-medium text-secondary-900 mb-2">How Task Posting Works</h3>
          <ul className="list-disc list-inside text-sm text-slate-700 space-y-2">
            <li>Your task will be stored on the Algorand blockchain for transparency and immutability.</li>
            <li>The task reward will be escrowed until the task is completed and approved.</li>
            <li>You can cancel the task before someone claims it without any penalty.</li>
            <li>After a task is claimed, funds are locked until completion or dispute resolution.</li>
            <li>The DAO community will vote on any disputes that arise during task completion.</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default PostTask;
