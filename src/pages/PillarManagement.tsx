
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Palette, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

// Importing the component PillarContent
import PillarContent from '@/components/ui/PillarContent';

const PillarManagement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Extract the pillar name from the URL
  const pillarSlug = location.pathname.split('/').pop() || '';
  const pillarName = getPillarNameFromSlug(pillarSlug);

  function getPillarNameFromSlug(slug: string): string {
    const pillarNames: Record<string, string> = {
      'templates': 'Templates',
      'leadership': 'Comprometimento da Alta Administração',
      'risk': 'Gestão de Riscos',
      'policies': 'Políticas, Procedimentos e Manuais',
      'controls': 'Controles Internos',
      'training': 'Treinamento e Comunicações',
      'complaints': 'Canal de Denúncias',
      'investigations': 'Investigações Internas',
      'due-diligence': 'Due Diligence',
      'audits': 'Gestão das Auditorias Adquirentes',
      'monitoring': 'Monitoramento dos Riscos de Compliance',
      'lgpd': 'LGPD',
      'improvements': 'Melhorias Contínuas'
    };
    
    return pillarNames[slug] || 'Pilar de Compliance';
  }

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
      title={pillarName} 
      description="Gerencie este pilar do seu programa de compliance"
      actions={
        <Button 
          onClick={() => {
            setEditMode(!editMode);
            setActiveTab(editMode ? 'overview' : 'editor');
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
      }
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Pass the pillarId prop to PillarContent */}
          <PillarContent pillarId={pillarSlug} />
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
        
        <TabsContent value="details">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Detalhes do Pilar</h3>
            <p className="text-muted-foreground">
              Informações detalhadas sobre este pilar de compliance.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Documentos Relacionados</h3>
            <p className="text-muted-foreground">
              Documentos, políticas e procedimentos relacionados a este pilar.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Análises e Métricas</h3>
            <p className="text-muted-foreground">
              Dados analíticos e métricas de desempenho deste pilar.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default PillarManagement;
