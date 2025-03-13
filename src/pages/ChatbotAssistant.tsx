
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIAssistantIntegration from '@/components/chatbot/AIAssistantIntegration';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ChatbotAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
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
    >
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
    </PageLayout>
  );
};

export default ChatbotAssistantPage;
