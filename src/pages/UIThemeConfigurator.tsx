
import React from 'react';
import ThemeConfigurator from '@/components/settings/ThemeConfigurator';
import PageLayout from '@/components/layout/PageLayout';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { ThemeConfiguratorDialog } from '@/components/settings/ThemeConfiguratorDialog';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft,
  Palette,
  Save,
  Undo,
  Copy,
  Eye,
  Settings,
  // Removendo o ícone Template que não existe no lucide-react
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { themeService } from '@/services/theme-service';

export function UIThemeConfigurator() {
  const navigate = useNavigate();
  const { 
    themeDialogOpen,
    setThemeDialogOpen,
    handleSaveTheme
  } = useThemeDialog();
  
  const goBack = () => {
    navigate('/settings');
  };
  
  const handleSaveChanges = (config: any) => {
    try {
      themeService.saveTheme(config);
      toast.success('Tema personalizado salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar o tema: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };
  
  return (
    <PageLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-2" onClick={goBack}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Personalizador de UI</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button variant="default" size="sm">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
        
        <ThemeConfigurator onSave={handleSaveChanges} />
        
        <ThemeConfiguratorDialog
          open={themeDialogOpen}
          onOpenChange={setThemeDialogOpen}
          onSave={handleSaveTheme}
        />
      </div>
    </PageLayout>
  );
}
