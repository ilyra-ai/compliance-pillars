
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import RiskDashboard from '@/components/ui/RiskDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { Palette, Eye, Plus } from 'lucide-react';

const RiskManagement = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
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

  return (
    <PageLayout 
      title="Gestão de Riscos" 
      description="Identifique, avalie e mitigue riscos de compliance"
      actions={
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
            <Plus className="mr-2 h-4 w-4" />
            Novo Risco
          </Button>
        </>
      }
      customizable={editMode}
    >
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
          <TabsTrigger value="matriz">Matriz de Riscos</TabsTrigger>
          <TabsTrigger value="controles">Controles</TabsTrigger>
          <TabsTrigger value="acoes">Planos de Ação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <RiskDashboard />
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
        
        <TabsContent value="matriz">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Matriz de Riscos</h3>
            <p className="text-muted-foreground">
              Visualize e gerencie a matriz de riscos do seu programa de compliance.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="controles">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Controles</h3>
            <p className="text-muted-foreground">
              Gerencie os controles associados aos riscos identificados.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="acoes">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Planos de Ação</h3>
            <p className="text-muted-foreground">
              Acompanhe os planos de ação para mitigação de riscos.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default RiskManagement;
