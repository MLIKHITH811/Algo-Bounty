import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import Button from '../components/UI/Button';
import { WalletCards, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const Login: React.FC = () => {
  const { state, connectWallet } = useWallet();
  const navigate = useNavigate();

  // Redirect to dashboard if already connected
  useEffect(() => {
    if (state.isConnected) {
      navigate('/dashboard');
    }
  }, [state.isConnected, navigate]);

  const handleConnect = async () => {
    await connectWallet();
  };

  return (
    <Layout requireAuth={false}>
      <div className="min-h-[calc(100vh-64px-64px)] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 opacity-20 bg-graph-pattern"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-400 bg-opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-400 bg-opacity-10 rounded-full blur-3xl"></div>
        
        <div className="z-10 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-primary-500 text-white mb-6 shadow-lg shadow-primary-200">
              <WalletCards size={40} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-600">
                AlgoBounty
              </span>
            </h1>
            <h2 className="text-xl text-slate-700 mb-4">Earn ALGO for Completing Tasks</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              Connect your Pera Wallet to access the decentralized bounty platform for Algorand developers and creators.
            </p>
          </div>

          <div className="glassmorphism p-8 max-w-md w-full mx-auto rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Login to AlgoBounty</h3>
            <p className="text-slate-600 mb-6">
              The platform requires a connection to your Algorand wallet to use the services. Your wallet will serve as your identity on the platform.
            </p>
            
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              onClick={handleConnect}
              isLoading={state.isConnecting}
              icon={<ArrowRight size={20} />}
              className="mb-4"
            >
              Connect Pera Wallet
            </Button>
            
            {state.error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mt-4">
                {state.error}
              </div>
            )}
            
            <p className="text-xs text-slate-500 mt-4 text-center">
              By connecting, you agree to the terms of service and privacy policy.
            </p>
          </div>
          
          <div className="mt-12 text-center text-sm text-slate-500">
            <p>Need help? Contact support@algobounty.io</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;