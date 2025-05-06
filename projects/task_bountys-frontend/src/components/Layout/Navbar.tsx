import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, Menu, X } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

const Navbar: React.FC = () => {
  const { state, disconnectWallet } = useWallet();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Post Task', path: '/post' },
    { name: 'Browse Tasks', path: '/tasks' },
    { name: 'My Tasks', path: '/my-tasks' },
    { name: 'DAO Voting', path: '/voting' },
    { name: 'DeFi', path: '/defi' },
    // Adding the "View Posted Tasks" link conditionally
    { name: 'View Posted Tasks', path: '/ViewPostTasks' }, // Add this line for viewing posted tasks
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                <Wallet size={20} />
              </div>
              <span className="ml-2 text-xl font-bold text-secondary-800">AlgoBounty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {state.isConnected && (
              <>
                <div className="hidden md:flex space-x-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        location.pathname === link.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-slate-600 hover:text-primary-500 hover:bg-primary-50'
                      } transition-colors duration-200`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="border-l border-slate-200 h-6 mx-2"></div>
                <div className="flex items-center">
                  <span className="text-sm text-slate-600 mr-2">
                    {formatAddress(state.account?.address || '')}
                  </span>
                  <button
                    onClick={disconnectWallet}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            {state.isConnected && (
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-slate-600 hover:text-primary-500 hover:bg-primary-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-slate-200">
              <div className="flex items-center px-5">
                <div className="text-sm font-medium text-slate-600">
                  {formatAddress(state.account?.address || '')}
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={handleDisconnect}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
