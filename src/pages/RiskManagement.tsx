
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import RiskDashboard from '@/components/ui/RiskDashboard';

const RiskManagement: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="pb-16 pt-24 md:ml-64">
        <RiskDashboard />
      </main>
    </div>
  );
};

export default RiskManagement;
