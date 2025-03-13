
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, FileUp, Palette, Eye } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdvancedDocumentEditor from '@/components/documents/AdvancedDocumentEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

const AdvancedDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('editor');
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to ui-editor tab, enable edit mode
    if (value === 'ui-editor') {
      setEditMode(true);
    } else if (editMode && value !== 'ui-editor') {
      // If leaving ui-editor tab and edit mode is on, ask for confirmation
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        // If user cancels, stay on ui-editor tab
        setActiveTab('ui-editor');
        return;
      }
    }
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button 
        onClick={() => {
          setEditMode(!editMode);
          setActiveTab(editMode ? 'editor' : 'ui-editor');
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
      <Button variant="outline" size="sm">
        <FileUp className="mr-2 h-4 w-4" />
        Importar Documento
      </Button>
      <Button size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar
      </Button>
    </>
  );
  
  return (
    <PageLayout
      title="Editor de Documentos Avançado"
      description="Edite documentos do Word, Excel, PowerPoint e Google Docs"
      actions={actions}
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "ui-editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Editor de Documentos</TabsTrigger>
          <TabsTrigger value="ui-editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div className="space-y-6">
            <AdvancedDocumentEditor pillarId="advanced" />
          </div>
        </TabsContent>
        
        <TabsContent value="ui-editor">
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

export default AdvancedDocumentsPage;
