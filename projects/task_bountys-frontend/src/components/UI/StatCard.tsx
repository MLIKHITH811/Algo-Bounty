import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, change }) => {
  return (
    <div className="card hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <div className="flex items-center">
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
            {change && (
              <div className={`ml-2 flex items-center text-sm ${change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <span>{change.isPositive ? '+' : ''}{change.value}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;