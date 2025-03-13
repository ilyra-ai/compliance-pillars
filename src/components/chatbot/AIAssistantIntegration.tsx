
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  MessageSquare,
  Check,
  ExternalLink,
  Globe,
  Server,
  Bot,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface ChatbotOption {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

const AIAssistantIntegration: React.FC = () => {
  const [embedUrl, setEmbedUrl] = useState('');
  const [selectedChatbot, setSelectedChatbot] = useState('');
  const [customName, setCustomName] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [savedChatbots, setSavedChatbots] = useState<ChatbotOption[]>([]);
  const [activeTab, setActiveTab] = useState('embed');
  
  const chatbotOptions: ChatbotOption[] = [
    { 
      id: 'chatgpt', 
      name: 'ChatGPT', 
      url: 'https://chat.openai.com/share/', 
      icon: <MessageSquare className="h-4 w-4 text-green-500" /> 
    },
    { 
      id: 'deepseek', 
      name: 'DeepSeek', 
      url: 'https://chat.deepseek.com/', 
      icon: <MessageSquare className="h-4 w-4 text-blue-500" /> 
    },
    { 
      id: 'huggingface', 
      name: 'Hugging Face', 
      url: 'https://huggingface.co/chat/', 
      icon: <MessageSquare className="h-4 w-4 text-yellow-500" /> 
    },
    { 
      id: 'localai', 
      name: 'AI Local', 
      url: 'https://localhost:3000/', 
      icon: <Server className="h-4 w-4 text-purple-500" /> 
    }
  ];

  const handleEmbedUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmbedUrl(e.target.value);
  };

  const handleAddEmbedUrl = () => {
    if (!embedUrl) {
      toast.error('Por favor, insira uma URL válida.');
      return;
    }
    
    // Add chatbot embed code logic here
    toast.success('Chatbot incorporado com sucesso!');
  };

  const handleSaveChatbot = () => {
    if (!customName || !customUrl) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    const newChatbot: ChatbotOption = {
      id: Date.now().toString(),
      name: customName,
      url: customUrl,
      icon: <Globe className="h-4 w-4 text-gray-500" />
    };

    setSavedChatbots([...savedChatbots, newChatbot]);
    setCustomName('');
    setCustomUrl('');
    toast.success(`Chatbot ${customName} adicionado com sucesso!`);
  };

  const handleSelectChatbot = (id: string) => {
    setSelectedChatbot(id);
    const selected = [...chatbotOptions, ...savedChatbots].find(bot => bot.id === id);
    if (selected) {
      toast.success(`${selected.name} selecionado. Clique em "Incorporar" para adicionar ao documento.`);
    }
  };

  const handleIncorporateChatbot = () => {
    if (!selectedChatbot) {
      toast.error('Por favor, selecione um chatbot primeiro.');
      return;
    }

    const selected = [...chatbotOptions, ...savedChatbots].find(bot => bot.id === selectedChatbot);
    if (selected) {
      toast.success(`${selected.name} incorporado ao documento com sucesso!`);
    }
  };

  const handleDeleteChatbot = (id: string) => {
    setSavedChatbots(savedChatbots.filter(bot => bot.id !== id));
    if (selectedChatbot === id) {
      setSelectedChatbot('');
    }
    toast.success('Chatbot removido com sucesso!');
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="embed">
            <ExternalLink className="mr-2 h-4 w-4" />
            Incorporar URL
          </TabsTrigger>
          <TabsTrigger value="select">
            <Bot className="mr-2 h-4 w-4" />
            Selecionar Chatbot
          </TabsTrigger>
          <TabsTrigger value="custom">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Personalizado
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="embed" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="embed-url">URL ou Código de Incorporação</Label>
            <div className="flex space-x-2">
              <Input 
                id="embed-url" 
                value={embedUrl} 
                onChange={handleEmbedUrlChange} 
                placeholder="<iframe src='https://chat.openai.com/share/...'></iframe> ou URL direta" 
              />
              <Button onClick={handleAddEmbedUrl}>
                <Check className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Cole uma URL ou código iframe de ChatGPT, DeepSeek, Hugging Face ou qualquer outro chatbot
            </p>
          </div>
          
          <div className="mt-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm">Visualização do Chatbot</CardTitle>
              </CardHeader>
              <CardContent className="h-96 bg-gray-50 rounded flex items-center justify-center">
                {embedUrl ? (
                  <div className="text-center bg-white p-4 rounded shadow-sm border">
                    <Bot className="h-10 w-10 mx-auto text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">Prévia do chatbot disponível ao salvar</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Adicione uma URL ou código para visualizar o chatbot</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="select" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chatbotOptions.map(bot => (
              <Card 
                key={bot.id}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedChatbot === bot.id ? 'border-primary' : ''
                }`}
                onClick={() => handleSelectChatbot(bot.id)}
              >
                <div className="flex items-center space-x-2">
                  {bot.icon}
                  <span>{bot.name}</span>
                  {selectedChatbot === bot.id && (
                    <Check className="h-4 w-4 text-green-500 ml-auto" />
                  )}
                </div>
              </Card>
            ))}
            
            {savedChatbots.map(bot => (
              <Card 
                key={bot.id}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${
                  selectedChatbot === bot.id ? 'border-primary' : ''
                }`}
              >
                <div className="flex items-center space-x-2">
                  {bot.icon}
                  <span>{bot.name}</span>
                  <div className="ml-auto flex space-x-1">
                    {selectedChatbot === bot.id && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChatbot(bot.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {(chatbotOptions.length > 0 || savedChatbots.length > 0) && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleIncorporateChatbot} disabled={!selectedChatbot}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Incorporar Selecionado
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chatbot-name">Nome do Chatbot</Label>
              <Input 
                id="chatbot-name" 
                value={customName} 
                onChange={(e) => setCustomName(e.target.value)} 
                placeholder="Meu Chatbot Personalizado" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chatbot-url">URL do Chatbot</Label>
              <Input 
                id="chatbot-url" 
                value={customUrl} 
                onChange={(e) => setCustomUrl(e.target.value)} 
                placeholder="https://meu-servidor-ai.com/" 
              />
              <p className="text-sm text-muted-foreground">
                URL para o chatbot hospedado em seu próprio servidor ou em um serviço externo
              </p>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button onClick={handleSaveChatbot} disabled={!customName || !customUrl}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Chatbot
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAssistantIntegration;
