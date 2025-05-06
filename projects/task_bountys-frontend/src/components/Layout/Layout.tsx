import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useWallet } from '../../context/WalletContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, requireAuth = true }) => {
  const { state } = useWallet();

  // If authentication is required and user is not connected, redirect to login
  if (requireAuth && !state.isConnected) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {state.isConnected && <Navbar />}
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white border-t border-slate-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-600">
            &copy; {new Date().getFullYear()} AlgoBounty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;