import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useTask } from '../context/TaskContext';
import Button from '../components/UI/Button';
import { Task } from '../types';
import { motion } from 'framer-motion';
import { Search, Tag } from 'lucide-react';

const ViewPostTasks: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useTask();
  const { postedTasks } = state;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(postedTasks.map(task => task.category)))];

  const filteredTasks = postedTasks.filter(task => {
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClaimTask = (task: Task) => {
    console.log('Task claimed:', task);
    navigate(`/claim-task/${task.id}`);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Posted Tasks</h1>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No tasks match your search/filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-xl transition-shadow p-6 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-2">{task.title}</h2>
                  <p className="text-sm text-slate-700 mb-3 line-clamp-3">{task.description}</p>

                  <div className="text-sm space-y-1 text-slate-600">
                    <p className="flex items-center gap-1">
                      <Tag size={14} className="text-blue-500" /> <strong>Category:</strong> {task.category}
                    </p>
                    <p>
                      <strong>Reward:</strong> {task.reward} {task.rewardAsset}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {task.deadline}
                    </p>
                    {task.ipfsLink && (
                      <p>
                        <a
                          href={task.ipfsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          View IPFS Details
                        </a>
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="primary" onClick={() => handleClaimTask(task)}>
                    Claim Task
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ViewPostTasks;
