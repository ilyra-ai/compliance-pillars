
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Palette, Settings, PlusCircle, BarChart, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RiskDashboard from '@/components/ui/RiskDashboard';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

const RiskManagement: React.FC = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        setActiveTab('editor');
        return;
      }
    }
  };

  return (
    <PageLayout
      title="Gestão de Riscos"
      description="Identificação, avaliação e mitigação de riscos do programa de compliance"
      actions={
        <div className="flex gap-2">
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
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Risco
          </Button>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            Análise de Riscos
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Relatórios
          </Button>
        </div>
      }
      customizable={editMode}
    >
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
            <TabsTrigger value="matrix">Matriz de Riscos</TabsTrigger>
            <TabsTrigger value="controls">Controles</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <PageCustomizer
              pagePath={location.pathname}
              editMode={false}
              onEditModeChange={setEditMode}
            >
              <RiskDashboard />
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
          
          <TabsContent value="matrix">
            <Card>
              <CardHeader>
                <CardTitle>Matriz de Riscos</CardTitle>
                <CardDescription>Visualize e gerencie a matriz de riscos da organização</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md p-4">
                  <p className="text-muted-foreground">Matriz de riscos será exibida aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="controls">
            <Card>
              <CardHeader>
                <CardTitle>Controles de Mitigação</CardTitle>
                <CardDescription>Gerencie os controles implementados para mitigar riscos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md p-4">
                  <p className="text-muted-foreground">Lista de controles será exibida aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios de Riscos</CardTitle>
                <CardDescription>Acesse e gere relatórios relacionados à gestão de riscos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center border border-dashed rounded-md p-4">
                  <p className="text-muted-foreground">Relatórios de riscos serão exibidos aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DndProvider>
    </PageLayout>
  );
};

export default RiskManagement;
