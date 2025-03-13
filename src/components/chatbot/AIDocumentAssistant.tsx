import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot, SendHorizontal, Paperclip, Smile, Download, Copy, Save, Edit, Play, Sparkles, FileText, FileSpreadsheet, Presentation } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIDocumentAssistantProps {
  documentContent?: string;
  documentType?: 'word' | 'excel' | 'powerpoint' | 'gdocs' | 'gsheets' | 'gslides';
  onApplyChanges?: (content: string) => void;
}

const AIDocumentAssistant: React.FC<AIDocumentAssistantProps> = ({ 
  documentContent = '',
  documentType = 'word',
  onApplyChanges
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente de documentos. Como posso ajudar você hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [enhancedContent, setEnhancedContent] = useState(documentContent);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      const responseMessages = [
        "Entendi! Posso ajudar você a melhorar esse texto.",
        "Analisei seu documento e tenho algumas sugestões para melhorar a clareza e o impacto.",
        "Aqui estão algumas ideias para melhorar a estrutura do seu documento.",
        "Identifiquei alguns pontos que podem ser fortalecidos. Vou listar as sugestões.",
        "Posso ajudar a tornar esse conteúdo mais impactante. Aqui vão algumas ideias."
      ];

      const randomResponse = responseMessages[Math.floor(Math.random() * responseMessages.length)];

      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newAssistantMessage]);
      setIsProcessing(false);

      if (documentContent) {
        const improvedContent = documentContent + "\n\n[Conteúdo aprimorado pelo assistente AI - Esta seria uma versão real melhorada do seu texto em um ambiente de produção]";
        setEnhancedContent(improvedContent);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getDocumentIcon = () => {
    switch (documentType) {
      case 'word':
      case 'gdocs':
        return <FileText className="h-5 w-5" />;
      case 'excel':
      case 'gsheets':
        return <FileSpreadsheet className="h-5 w-5" />;
      case 'powerpoint':
      case 'gslides':
        return <Presentation className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const handleApplyChanges = () => {
    if (onApplyChanges) {
      onApplyChanges(enhancedContent);
    }
    toast.success('Alterações aplicadas com sucesso!');
  };

  const getDocumentTypeName = () => {
    const types = {
      word: 'Microsoft Word',
      excel: 'Microsoft Excel',
      powerpoint: 'Microsoft PowerPoint',
      gdocs: 'Google Docs',
      gsheets: 'Google Sheets',
      gslides: 'Google Slides'
    };
    return types[documentType as keyof typeof types];
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="chat">Chat</TabsTrigger>
        <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
      </TabsList>
      
      <TabsContent value="chat" className="space-y-4 mt-4">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Assistente de Documentos AI
            </CardTitle>
            <CardDescription>
              Peça ajuda para melhorar seu documento {getDocumentTypeName()}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto pb-0">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="pt-4">
            <div className="flex w-full space-x-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                className="flex-1 min-h-10 max-h-40"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={isProcessing || !inputMessage.trim()}>
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="suggestions" className="space-y-4 mt-4">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Sugestões de Melhorias
            </CardTitle>
            <CardDescription>
              Versão aprimorada do seu documento
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto pb-2">
            <div className="flex items-center mb-4">
              {getDocumentIcon()}
              <span className="ml-2 font-medium">Documento atual</span>
            </div>
            <div className="space-y-4">
              <div className="border rounded-md p-4 bg-muted/30">
                <Textarea
                  value={enhancedContent}
                  onChange={(e) => setEnhancedContent(e.target.value)}
                  className="min-h-[300px] bg-transparent border-none focus-visible:ring-0 resize-none p-0"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Resumo das melhorias:</h3>
                <ul className="space-y-1 text-sm list-disc pl-5">
                  <li>Melhorou a clareza e coesão do texto</li>
                  <li>Corrigiu erros gramaticais e de pontuação</li>
                  <li>Otimizou a estrutura para maior impacto</li>
                  <li>Adicionou elementos contextuais relevantes</li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Baixar
              </Button>
            </div>
            <Button size="sm" onClick={handleApplyChanges}>
              <Save className="mr-2 h-4 w-4" />
              Aplicar Alterações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="settings" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Configurações do Assistente</CardTitle>
            <CardDescription>
              Personalize o comportamento do assistente AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-model">Modelo de AI</Label>
              <Select defaultValue={aiModel} onValueChange={setAiModel}>
                <SelectTrigger id="ai-model">
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="llama-3">Llama 3</SelectItem>
                  <SelectItem value="local">Modelo Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-style">Estilo de Escrita</Label>
              <Select defaultValue="balanced">
                <SelectTrigger id="ai-style">
                  <SelectValue placeholder="Selecione o estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="technical">Técnico</SelectItem>
                  <SelectItem value="balanced">Equilibrado</SelectItem>
                  <SelectItem value="creative">Criativo</SelectItem>
                  <SelectItem value="simple">Simples e Direto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ai-language">Idioma Principal</Label>
              <Select defaultValue="pt-BR">
                <SelectTrigger id="ai-language">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                  <SelectItem value="es-ES">Espanhol</SelectItem>
                  <SelectItem value="fr-FR">Francês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Integrações de Documentos</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="integration-msoffice" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="integration-msoffice">Microsoft Office</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="integration-google" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="integration-google">Google Workspace</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="integration-onedrive" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="integration-onedrive">OneDrive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="integration-gdrive" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="integration-gdrive">Google Drive</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="permission-edit" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="permission-edit">Permitir edição direta de documentos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="permission-suggest" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="permission-suggest">Mostrar sugestões de melhorias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="permission-format" className="h-4 w-4" defaultChecked />
                  <Label htmlFor="permission-format">Permitir formatação de documentos</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...props }) => {
  return (
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" {...props}>
      {children}
    </label>
  );
};

export default AIDocumentAssistant;
