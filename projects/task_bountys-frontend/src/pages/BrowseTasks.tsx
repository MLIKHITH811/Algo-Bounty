import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import TaskCard from '../components/UI/TaskCard';
import EmptyState from '../components/UI/EmptyState';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';
import { Search, Filter, List, Grid3X3, PackagePlus } from 'lucide-react';
import { mockTasks, getAllCategories } from '../data/mockData';
import { Task } from '../types';
import { useNavigate } from 'react-router-dom';

const BrowseTasks: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('open');
  const [minReward, setMinReward] = useState('');
  const [maxReward, setMaxReward] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = getAllCategories();
  
  // Filter tasks based on criteria
  const filteredTasks = mockTasks.filter((task) => {
    // Filter by search term
    const matchesSearch = searchTerm 
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    // Filter by category
    const matchesCategory = selectedCategory 
      ? task.category === selectedCategory 
      : true;
    
    // Filter by status
    const matchesStatus = selectedStatus
      ? task.status === selectedStatus
      : true;
    
    // Filter by min reward
    const matchesMinReward = minReward
      ? task.reward.amount >= Number(minReward)
      : true;
    
    // Filter by max reward
    const matchesMaxReward = maxReward
      ? task.reward.amount <= Number(maxReward)
      : true;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesMinReward && matchesMaxReward;
  });

  const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'claimed', label: 'Claimed' },
    { value: 'completed', label: 'Completed' },
    { value: 'disputed', label: 'Disputed' },
  ];
  
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map(category => ({ value: category, label: category })),
  ];

  const handleViewTask = (task: Task) => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Browse Tasks</h1>
            <p className="text-slate-600">Find and claim bounties that match your skills</p>
          </div>
          <Button 
            variant="primary" 
            onClick={() => navigate('/post')}
            icon={<PackagePlus size={18} />}
          >
            Post a Task
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<Filter size={18} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            <div className="flex border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setView('grid')}
                className={`p-2 ${view === 'grid' ? 'bg-primary-50 text-primary-600' : 'bg-white text-slate-500'}`}
              >
                <Grid3X3 size={20} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 ${view === 'list' ? 'bg-primary-50 text-primary-600' : 'bg-white text-slate-500'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="card mb-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Filter Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Category"
              name="category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              register={() => ({})}
            />
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              register={() => ({})}
            />
            <div>
              <label className="label">Min Reward</label>
              <input
                type="number"
                min="0"
                className="input"
                value={minReward}
                onChange={(e) => setMinReward(e.target.value)}
                placeholder="Min ALGO"
              />
            </div>
            <div>
              <label className="label">Max Reward</label>
              <input
                type="number"
                min="0"
                className="input"
                value={maxReward}
                onChange={(e) => setMaxReward(e.target.value)}
                placeholder="Max ALGO"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedCategory('');
                setSelectedStatus('open');
                setMinReward('');
                setMaxReward('');
                setSearchTerm('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {filteredTasks.length > 0 ? (
        <div className={`${view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => handleViewTask(task)} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tasks found"
          description="Try adjusting your filters or search terms to find more tasks."
          icon={Search}
          actionLabel="Post a New Task"
          onAction={() => navigate('/post')}
        />
      )}
    </Layout>
  );
};

export default BrowseTasks;