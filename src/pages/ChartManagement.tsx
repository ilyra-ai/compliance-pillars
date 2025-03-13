
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { BarChart3, Palette } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import FloatingThemeButton from '@/components/ui/FloatingThemeButton';

const ChartManagement: React.FC = () => {
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  const handleOpenUITheme = () => {
    setThemeDialogOpen(true);
  };
  
  const handleSaveTheme = (config: any) => {
    toast.success('Tema personalizado salvo com sucesso!');
    setThemeDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />
        <main className="pb-16 pt-24 md:ml-64 px-4 md:px-8">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h1 className="text-3xl font-bold">Gestão de Gráficos</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleOpenUITheme}>
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
              <Button size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Adicionar Gráfico
              </Button>
            </div>
          </div>
          
          <ChartConfigurator />
          
          {/* Theme Customization Dialog */}
          <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Personalizar UI</DialogTitle>
                <DialogDescription>
                  Personalize as cores, fontes e elementos da interface
                </DialogDescription>
              </DialogHeader>
              <ThemeConfigurator onSave={handleSaveTheme} />
            </DialogContent>
          </Dialog>
          
          {/* Floating Theme Button */}
          <FloatingThemeButton onClick={handleOpenUITheme} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ChartManagement;
