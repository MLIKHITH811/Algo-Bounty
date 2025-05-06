import React from 'react';
import { Calendar, ArrowRight, Coins, Clock, Tag } from 'lucide-react';
import { Task } from '../../types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const statusColors = {
  open: 'bg-green-100 text-green-800',
  claimed: 'bg-blue-100 text-blue-800',
  completed: 'bg-purple-100 text-purple-800',
  disputed: 'bg-orange-100 text-orange-800',
  closed: 'bg-gray-100 text-gray-800',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const isDeadlineSoon = 
    task.status === 'open' && 
    new Date(task.deadline).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000; // 3 days

  return (
    <div 
      className="card hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-secondary-800 mb-2">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{task.description}</p>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center text-slate-700">
          <Coins size={16} className="text-primary-500 mr-2" />
          <span className="text-sm font-medium">{task.reward.amount} {task.reward.asset}</span>
        </div>
        <div className="flex items-center text-slate-700">
          <Tag size={16} className="text-secondary-500 mr-2" />
          <span className="text-sm">{task.category}</span>
        </div>
        <div className="flex items-center text-slate-700">
          <Calendar size={16} className={`mr-2 ${isDeadlineSoon ? 'text-red-500' : 'text-slate-500'}`} />
          <span className={`text-sm ${isDeadlineSoon ? 'text-red-500 font-medium' : ''}`}>
            {format(new Date(task.deadline), 'MMM d, yyyy')}
          </span>
        </div>
        <div className="flex items-center text-slate-700">
          <Clock size={16} className="text-slate-500 mr-2" />
          <span className="text-sm">
            {isDeadlineSoon 
              ? 'Ending soon!' 
              : `${Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} days left`}
          </span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Link 
          to={`/tasks/${task.id}`} 
          className="text-sm text-primary-600 font-medium flex items-center hover:text-primary-800 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          View Details <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;