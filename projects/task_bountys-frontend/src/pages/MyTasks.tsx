import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TaskCard from '../components/UI/TaskCard';
import EmptyState from '../components/UI/EmptyState';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';
import { Clock, Search, CheckCircle } from 'lucide-react';
import { useTask } from '../context/TaskContext'; // Import useTask hook

const MyTasks: React.FC = () => {
  const { state } = useTask(); // Use task context to get claimed tasks
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Filter tasks based on status
  const filteredTasks = selectedStatus === 'all'
    ? state.claimedTasks
    : state.claimedTasks.filter(task => task.status === selectedStatus);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'claimed', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'disputed', label: 'Disputed' },
  ];

  const statusGroups = {
    claimed: state.claimedTasks.filter(task => task.status === 'claimed'),
    completed: state.claimedTasks.filter(task => task.status === 'completed'),
    disputed: state.claimedTasks.filter(task => task.status === 'disputed'),
  };

  const handleViewTask = (taskId: string) => {
    navigate(`/my-tasks/${taskId}`);
  };

  useEffect(() => {
    // Additional side-effects or data fetching can go here if necessary
  }, [state.claimedTasks]);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">My Tasks</h1>
        <p className="text-slate-600">Manage tasks you have claimed or completed</p>
      </div>

      {state.claimedTasks.length > 0 ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-slate-900">Task Status</h2>
              <div className="w-48">
                <Select
                  label=""
                  name="status"
                  options={statusOptions}
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  register={() => ({})}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card bg-blue-50 border border-blue-100">
                <div className="flex items-center mb-3">
                  <Clock size={18} className="text-blue-500 mr-2" />
                  <h3 className="font-medium text-blue-800">In Progress</h3>
                </div>
                <p className="text-3xl font-bold text-blue-900">{statusGroups.claimed.length}</p>
              </div>
              <div className="card bg-purple-50 border border-purple-100">
                <div className="flex items-center mb-3">
                  <CheckCircle size={18} className="text-purple-500 mr-2" />
                  <h3 className="font-medium text-purple-800">Completed</h3>
                </div>
                <p className="text-3xl font-bold text-purple-900">{statusGroups.completed.length}</p>
              </div>
              <div className="card bg-orange-50 border border-orange-100">
                <div className="flex items-center mb-3">
                  <Search size={18} className="text-orange-500 mr-2" />
                  <h3 className="font-medium text-orange-800">Disputed</h3>
                </div>
                <p className="text-3xl font-bold text-orange-900">{statusGroups.disputed.length}</p>
              </div>
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleViewTask(task.id)}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center p-8">
              <h3 className="text-lg font-medium text-slate-900 mb-2">No tasks with this status</h3>
              <p className="text-slate-600 mb-4">Try selecting a different status filter.</p>
              <Button
                variant="outline"
                onClick={() => setSelectedStatus('all')}
              >
                View All Tasks
              </Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title="You haven't claimed any tasks yet"
          description="Browse available tasks and start earning by completing bounties."
          icon={Search}
          actionLabel="Browse Tasks"
          onAction={() => navigate('/tasks')}
        />
      )}
    </Layout>
  );
};

export default MyTasks;
