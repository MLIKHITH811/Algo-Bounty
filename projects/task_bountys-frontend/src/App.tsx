import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { TaskProvider } from './context/TaskContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostTask from './pages/PostTask';
import BrowseTasks from './pages/BrowseTasks';
import TaskDetail from './pages/TaskDetail';
import MyTasks from './pages/MyTasks';
import TaskSubmission from './pages/TaskSubmission';
import DAOVoting from './pages/DAOVoting';
import DeFi from './pages/DeFi';
import ViewPostTasks from './pages/ViewPostTasks'; // Added ViewPostTasks page

function App() {
  return (
    <WalletProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post" element={<PostTask />} />
            <Route path="/tasks" element={<BrowseTasks />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/my-tasks/:id" element={<TaskSubmission />} />
            <Route path="/ViewPostTasks" element={<ViewPostTasks />} /> {/* Added route for ViewPostTasks */}
            <Route path="/voting" element={<DAOVoting />} />
            <Route path="/defi" element={<DeFi />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </TaskProvider>
    </WalletProvider>
  );
}

export default App;
