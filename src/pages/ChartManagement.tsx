
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import { Button } from '@/components/ui/button';
import { BarChart3, Palette, Eye } from 'lucide-react';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

const ChartManagement: React.FC = () => {
  const { handleOpenUITheme } = useThemeDialog();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('charts');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to editor tab, enable edit mode
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      // If leaving editor tab and edit mode is on, ask for confirmation
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        // If user cancels, stay on editor tab
        setActiveTab('editor');
        return;
      }
    }
  };

  const actions = (
    <>
      <ThemeButton onClick={handleOpenUITheme} />
      <Button 
        onClick={() => {
          setEditMode(!editMode);
          setActiveTab(editMode ? 'charts' : 'editor');
        }}
        variant={editMode ? "default" : "outline"}
        className="relative overflow-hidden group"
        size="sm"
      >
        {editMode ? (
          <>
            <Eye className="mr-2 h-4 w-4" />
            Modo Visualização
          </>
        ) : (
          <>
            <Palette className="mr-2 h-4 w-4" />
            <span>Personalizar UI</span>
            <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
          </>
        )}
      </Button>
      <Button size="sm">
        <BarChart3 className="mr-2 h-4 w-4" />
        Adicionar Gráfico
      </Button>
    </>
  );

  return (
    <PageLayout 
      title="Gestão de Gráficos" 
      actions={actions}
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="charts">Configuração de Gráficos</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts">
          <ChartConfigurator />
        </TabsContent>
        
        <TabsContent value="editor">
          <PageCustomizer
            pagePath={location.pathname}
            editMode={true}
            onEditModeChange={setEditMode}
          >
            <CustomizableLayout />
          </PageCustomizer>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ChartManagement;
