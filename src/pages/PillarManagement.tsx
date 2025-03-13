
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import PillarContent from '@/components/ui/PillarContent';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Plus, FileText, BarChart3, Palette } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';

const PillarManagement: React.FC = () => {
  const navigate = useNavigate();
  const { pillarId } = useParams();
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  const handleAddItem = () => {
    toast.success(`Adicionando novo item ao pilar ${pillarId}`);
  };
  
  const handleAddChart = () => {
    navigate('/charts');
  };
  
  const handleAddDocument = () => {
    navigate('/documents/editor');
  };
  
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
            <h1 className="text-2xl font-bold">Gestão do Pilar: {pillarId}</h1>
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleAddItem} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Item
              </Button>
              <Button onClick={handleAddDocument} variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Adicionar Documento
              </Button>
              <Button onClick={handleAddChart} variant="outline" size="sm">
                <BarChart3 className="mr-2 h-4 w-4" />
                Adicionar Gráfico
              </Button>
              <Button onClick={handleOpenUITheme} variant="outline" size="sm">
                <Palette className="mr-2 h-4 w-4" />
                Personalizar UI
              </Button>
            </div>
          </div>
          
          <PillarContent />
        </main>
        
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
      </div>
    </SidebarProvider>
  );
};

export default PillarManagement;
