
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Dashboard from '@/components/ui/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import ReportBuilder from '@/components/reports/ReportBuilder';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, FileText, Plus, Palette, Eye, EyeOff } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Index: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleOpenUITheme } = useThemeDialog();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOpenSettings = () => {
    navigate('/settings');
  };

  const handleOpenDocumentEditor = () => {
    navigate('/documents/editor');
  };

  const handleAddPillar = () => {
    navigate('/pillars/new');
  };

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
      <Button 
        onClick={() => {
          setEditMode(!editMode);
          setActiveTab(editMode ? 'dashboard' : 'editor');
        }}
        variant={editMode ? "default" : "outline"}
        className="relative overflow-hidden group"
        size="sm"
      >
        {editMode ? (
          <>
            <Settings className="mr-2 h-4 w-4" />
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
      <Button onClick={handleOpenDocumentEditor} variant="outline" size="sm">
        <FileText className="mr-2 h-4 w-4" />
        Editor de Documentos
      </Button>
      <ThemeButton onClick={handleOpenUITheme} />
      <Button onClick={handleOpenSettings} variant="outline" size="sm">
        <Settings className="mr-2 h-4 w-4" />
        Configurações
      </Button>
    </>
  );

  return (
    <PageLayout title="Gestão de Compliance" actions={actions} customizable={editMode}>
      <DndProvider backend={HTML5Backend}>
        <Tabs 
          value={editMode ? "editor" : activeTab} 
          onValueChange={handleTabChange}
        >
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="editor" className="relative">
              Editor de Layout
              {!editMode && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
            <TabsTrigger value="charts">Gráficos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <PageCustomizer
              pagePath={location.pathname}
              editMode={false}
              onEditModeChange={setEditMode}
            >
              <Dashboard />
            </PageCustomizer>
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
      </DndProvider>
    </PageLayout>
  );
};

export default Index;
