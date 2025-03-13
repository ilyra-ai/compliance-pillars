
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, Plus, Palette, Eye } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import AIAssistantIntegration from '@/components/chatbot/AIAssistantIntegration';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';

const ChatbotAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('chatbot');
  
  const handleBack = () => {
    navigate(-1);
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
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button 
        onClick={() => {
          setEditMode(!editMode);
          setActiveTab(editMode ? 'chatbot' : 'editor');
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
        <Plus className="mr-2 h-4 w-4" />
        Novo Assistente
      </Button>
      <Button size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar Configurações
      </Button>
    </>
  );
  
  return (
    <PageLayout
      title="Assistente de IA"
      description="Configure e integre chatbots de IA ao seu sistema"
      actions={actions}
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="chatbot">Configuração de Chatbots</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chatbot">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Assistentes de IA</CardTitle>
                <CardDescription>
                  Integre chatbots como ChatGPT, DeepSeek, Hugging Face ou modelos próprios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AIAssistantIntegration />
              </CardContent>
            </Card>
          </div>
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

export default ChatbotAssistantPage;
