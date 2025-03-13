
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PillarContent from '@/components/ui/PillarContent';

const PillarManagement: React.FC = () => {
  const location = useLocation();
  const { pillarId } = useParams<{ pillarId: string }>();

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="pb-16 pt-24 md:ml-64">
        <PillarContent />
      </main>
    </div>
  );
};

export default PillarManagement;
