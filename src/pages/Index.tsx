
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/ui/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import ReportBuilder from '@/components/reports/ReportBuilder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Construtor de Relatórios</CardTitle>
                <CardDescription>Crie e personalize relatórios para seu programa de compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportBuilder />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="charts">
            <ChartConfigurator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
