import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, File, Palette, Eye } from 'lucide-react';
import AdvancedDocumentEditor from '@/components/documents/AdvancedDocumentEditor';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { useLocation } from 'react-router-dom';

const TemplatesPage: React.FC = () => {
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('lista');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      const confirmed = window.confirm('Sair do modo de edição? Alterações não salvas serão perdidas.');
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
      title="Templates"
      description="Gerencie modelos de documentos e políticas"
      actions={
        <Button
          onClick={() => {
            setEditMode(!editMode);
            setActiveTab(editMode ? 'lista' : 'editor');
          }}
          variant={editMode ? 'default' : 'outline'}
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
      <Tabs value={editMode ? 'editor' : activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="lista">Lista de Templates</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lista">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates Cadastrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12 border border-dashed rounded-md">
                  <p className="text-muted-foreground">Nenhum template cadastrado ainda</p>
                  <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Novo Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="editor">
          <PageCustomizer pagePath={location.pathname} editMode={true} onEditModeChange={setEditMode}>
            <CustomizableLayout />
          </PageCustomizer>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default TemplatesPage;
