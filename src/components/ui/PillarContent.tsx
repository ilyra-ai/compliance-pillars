
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FileManager from '@/components/files/FileManager';
import WYSIWYGEditor from '@/components/editor/WYSIWYGEditor';
import CustomChartBuilder from '@/components/charts/CustomChartBuilder';
import { toast } from 'sonner';
import { 
  Save, 
  Clock, 
  FileText, 
  MessageSquare, 
  Image, 
  BarChart, 
  Files, 
  Trash2, 
  Copy, 
  Share2, 
  Calendar as CalendarIcon,
  RotateCcw,
  RotateCw,
  File,
  FileSpreadsheet,
  FileType,
  ExternalLink
} from 'lucide-react';
import AdvancedDocumentEditor from '@/components/documents/AdvancedDocumentEditor';
import AIAssistantIntegration from '@/components/chatbot/AIAssistantIntegration';

// Define interfaces for component props
interface DocumentVersioningProps {
  documentId: string;
  currentVersion: string;
  onRestoreVersion: (version: string) => void;
  onViewVersion: (version: string) => void;
  onDownloadVersion: (version: string) => void;
}

const DocumentVersioning: React.FC<DocumentVersioningProps> = ({
  documentId,
  currentVersion,
  onRestoreVersion,
  onViewVersion,
  onDownloadVersion
}) => {
  const [versions] = useState([
    { id: '1.0', date: '2023-12-10', author: 'João Silva' },
    { id: '0.9', date: '2023-12-05', author: 'Maria Souza' },
    { id: '0.8', date: '2023-11-28', author: 'Carlos Oliveira' }
  ]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Histórico de Versões</h3>
      <div className="border rounded-md">
        <div className="grid grid-cols-4 font-medium p-2 border-b bg-muted/50">
          <div>Versão</div>
          <div>Data</div>
          <div>Autor</div>
          <div>Ações</div>
        </div>
        {versions.map(version => (
          <div key={version.id} className="grid grid-cols-4 p-2 border-b last:border-0">
            <div>{version.id}</div>
            <div>{version.date}</div>
            <div>{version.author}</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onViewVersion(version.id)}>Ver</Button>
              <Button variant="outline" size="sm" onClick={() => onDownloadVersion(version.id)}>Baixar</Button>
              {version.id !== currentVersion && (
                <Button variant="outline" size="sm" onClick={() => onRestoreVersion(version.id)}>Restaurar</Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define the interface for the component props
export interface PillarContentProps {
  pillarId: string;
  initialContent?: string;
  onSave?: (content: string) => void;
}

const PillarContent: React.FC<PillarContentProps> = ({ pillarId, initialContent, onSave }) => {
  const [activeTab, setActiveTab] = useState('conteudo');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [chatbotUrl, setChatbotUrl] = useState('');
  
  useEffect(() => {
    // Load initial content if provided
    if (initialContent) {
      // You might want to sanitize or process the initial content here
    }
  }, [initialContent]);
  
  const handleFileSelect = (files: string[]) => {
    setSelectedFiles(files);
  };
  
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };
  
  const handleShare = () => {
    toast.success('Pilar compartilhado com sucesso!');
  };
  
  const handleDuplicate = () => {
    toast.info('Pilar duplicado com sucesso!');
  };
  
  const handleDelete = () => {
    toast.error('Pilar excluído!');
  };
  
  const handleChatbotUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatbotUrl(e.target.value);
  };

  const handleAddChatbotUrl = () => {
    if (chatbotUrl) {
      toast.success('URL do chatbot adicionada com sucesso!');
    } else {
      toast.error('Por favor, insira uma URL válida.');
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciar Conteúdo do Pilar</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conteudo" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="conteudo">
              <FileText className="mr-2 h-4 w-4" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="documentos-avancados">
              <File className="mr-2 h-4 w-4" />
              Documentos Avançados
            </TabsTrigger>
            <TabsTrigger value="midia">
              <Image className="mr-2 h-4 w-4" />
              Mídia
            </TabsTrigger>
            <TabsTrigger value="agendamento">
              <Clock className="mr-2 h-4 w-4" />
              Agendamento
            </TabsTrigger>
            <TabsTrigger value="documentos">
              <Files className="mr-2 h-4 w-4" />
              Versões
            </TabsTrigger>
            <TabsTrigger value="chatbot">
              <MessageSquare className="mr-2 h-4 w-4" />
              Assistente IA
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conteudo" className="space-y-4">
            <Conteudo onSave={onSave} />
          </TabsContent>
          
          <TabsContent value="documentos-avancados" className="space-y-4">
            <AdvancedDocumentEditor pillarId={pillarId} />
          </TabsContent>
          
          <TabsContent value="midia">
            <FileManager />
          </TabsContent>
          
          <TabsContent value="agendamento">
            <div className="space-y-2">
              <Label>Data de Vencimento</Label>
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                className="rounded-md border"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="documentos">
            <DocumentVersioning 
              documentId={pillarId}
              currentVersion="1.0"
              onRestoreVersion={(version) => console.log(`Restore version ${version}`)}
              onViewVersion={(version) => console.log(`View version ${version}`)}
              onDownloadVersion={(version) => console.log(`Download version ${version}`)}
            />
          </TabsContent>
          
          <TabsContent value="chatbot">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chatbot-url">URL do Chatbot para Incorporação</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="chatbot-url" 
                    value={chatbotUrl} 
                    onChange={handleChatbotUrlChange} 
                    placeholder="https://chat.openai.com/share/..." 
                  />
                  <Button onClick={handleAddChatbotUrl}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Adicionar
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adicione URLs de ChatGPT, DeepSeek, Hugging Face ou outros chatbots
                </p>
              </div>
              
              <AIAssistantIntegration />
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <CustomChartBuilder />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" onClick={handleDuplicate}>
              <Copy className="mr-2 h-4 w-4" />
              Duplicar
            </Button>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Fix the WYSIWYGEditor integration
const Conteudo: React.FC<{ onSave?: (content: string) => void }> = ({ onSave }) => {
  const [content, setContent] = useState("<p>Conteúdo inicial do pilar...</p>");
  
  const handleSaveContent = () => {
    if (onSave) {
      onSave(content);
    }
    toast.success('Conteúdo salvo com sucesso!');
  };
  
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm">
          <RotateCcw className="mr-1 h-4 w-4" />
          Desfazer
        </Button>
        <Button variant="outline" size="sm">
          <RotateCw className="mr-1 h-4 w-4" />
          Refazer
        </Button>
        <Button onClick={handleSaveContent} size="sm">
          <Save className="mr-1 h-4 w-4" />
          Salvar
        </Button>
      </div>
      
      <WYSIWYGEditor 
        initialContent={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default PillarContent;
