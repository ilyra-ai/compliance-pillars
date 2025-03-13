
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, 
  Italic, 
  List, 
  Save, 
  FileText, 
  Upload, 
  Download, 
  Image, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Underline, 
  Type, 
  Table,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  RotateCcw,
  RotateCw,
  FileCheck,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface WYSIWYGEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({ 
  initialContent = '', 
  onChange = () => {} 
}) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [documentTitle, setDocumentTitle] = useState('Documento sem título');
  const [isLoading, setIsLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange(newContent);
  };

  const handleSaveDocument = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Documento salvo com sucesso!');
    }, 1000);
  };

  const handleExportDocument = (format: string) => {
    toast.success(`Documento exportado como ${format.toUpperCase()} com sucesso!`);
  };

  const handleAiAssist = () => {
    if (!aiPrompt.trim()) {
      toast.error('Por favor, digite um comando para a IA.');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const enhancedContent = content + "\n\n[Conteúdo aprimorado pela IA: " + aiPrompt + "]";
      setContent(enhancedContent);
      onChange(enhancedContent);
      toast.success('Conteúdo gerado pela IA aplicado ao documento!');
      setAiPrompt('');
    }, 1500);
  };

  return (
    <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6 grid w-full grid-cols-3">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="ai">Assistente IA</TabsTrigger>
        <TabsTrigger value="versions">Versões</TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="space-y-1">
                <Input 
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="text-lg font-medium h-auto px-1 py-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full sm:w-auto"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => handleExportDocument('pdf')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleExportDocument('word')}>
                  <FileText className="mr-2 h-4 w-4 text-blue-500" />
                  Word
                </Button>
                <Button size="sm" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Importar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="rounded-md border">
              <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-1">
                <Select defaultValue="paragraph">
                  <SelectTrigger className="h-8 w-auto gap-1 border-0 bg-transparent px-2 hover:bg-muted focus:ring-0">
                    <Heading1 className="h-4 w-4" />
                    <SelectValue placeholder="Estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraph">Parágrafo</SelectItem>
                    <SelectItem value="heading1">Título 1</SelectItem>
                    <SelectItem value="heading2">Título 2</SelectItem>
                    <SelectItem value="heading3">Título 3</SelectItem>
                    <SelectItem value="blockquote">Citação</SelectItem>
                    <SelectItem value="code">Código</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="sans">
                  <SelectTrigger className="h-8 w-auto gap-1 border-0 bg-transparent px-2 hover:bg-muted focus:ring-0">
                    <Type className="h-4 w-4" />
                    <SelectValue placeholder="Fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans Serif</SelectItem>
                    <SelectItem value="serif">Serif</SelectItem>
                    <SelectItem value="mono">Monospace</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <Table className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-1 hover:bg-muted">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="min-h-[500px] rounded-b-md p-4">
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  className="w-full h-full min-h-[480px] bg-transparent border-none focus:outline-none resize-none"
                  placeholder="Digite aqui seu conteúdo ou utilize o assistente de IA para criar um documento..."
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between px-0">
            <div className="text-xs text-muted-foreground">
              Última modificação: hoje às 15:30
            </div>
            <Button onClick={handleSaveDocument} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="ai">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Assistente de IA para Documentos</CardTitle>
            <CardDescription>Utilize inteligência artificial para melhorar seu documento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ai-task">O que você gostaria que a IA fizesse?</Label>
                <Select defaultValue="write">
                  <SelectTrigger id="ai-task">
                    <SelectValue placeholder="Selecione uma tarefa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="write">Escrever conteúdo</SelectItem>
                    <SelectItem value="improve">Melhorar texto existente</SelectItem>
                    <SelectItem value="summarize">Resumir documento</SelectItem>
                    <SelectItem value="expand">Expandir tópicos</SelectItem>
                    <SelectItem value="format">Formatar documento</SelectItem>
                    <SelectItem value="translate">Traduzir conteúdo</SelectItem>
                    <SelectItem value="check">Revisar gramática e ortografia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Descreva o que você precisa</Label>
                <div className="relative">
                  <Textarea 
                    id="ai-prompt"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Ex: Escreva uma política de proteção de dados para minha empresa de acordo com a LGPD..."
                    className="min-h-32 resize-none pr-12"
                  />
                  <Button 
                    size="icon"
                    className="absolute bottom-2 right-2"
                    onClick={() => setAiPrompt('')}
                    variant="ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-style">Estilo de escrita</Label>
                <Select defaultValue="professional">
                  <SelectTrigger id="ai-style">
                    <SelectValue placeholder="Selecione um estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Profissional</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="technical">Técnico</SelectItem>
                    <SelectItem value="simple">Simplificado</SelectItem>
                    <SelectItem value="persuasive">Persuasivo</SelectItem>
                    <SelectItem value="instructional">Instrucional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-template">Modelo base (opcional)</Label>
                <Select defaultValue="">
                  <SelectTrigger id="ai-template">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Nenhum</SelectItem>
                    <SelectItem value="policy">Política de Compliance</SelectItem>
                    <SelectItem value="procedure">Procedimento Operacional</SelectItem>
                    <SelectItem value="report">Relatório de Auditoria</SelectItem>
                    <SelectItem value="training">Material de Treinamento</SelectItem>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="memo">Memorando Interno</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Opções de IA</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ai-references" className="h-4 w-4" />
                    <Label htmlFor="ai-references">Incluir referências</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ai-citations" className="h-4 w-4" />
                    <Label htmlFor="ai-citations">Adicionar citações</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ai-legal" className="h-4 w-4" checked />
                    <Label htmlFor="ai-legal">Verificar conformidade legal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="ai-toc" className="h-4 w-4" />
                    <Label htmlFor="ai-toc">Gerar índice</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <FileCheck className="mr-2 h-4 w-4" />
              Aplicar a seleção
            </Button>
            <Button onClick={handleAiAssist} disabled={isLoading} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {isLoading ? 'Gerando...' : 'Gerar com IA'}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="versions">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Histórico de Versões</CardTitle>
            <CardDescription>Revise e recupere versões anteriores deste documento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Versão atual (v1.3)</h3>
                    <p className="text-sm text-muted-foreground">Hoje às 15:30 - Carlos Silva</p>
                  </div>
                  <Button size="sm" variant="outline" disabled>
                    Atual
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Versão 1.2</h3>
                    <p className="text-sm text-muted-foreground">Ontem às 10:15 - Maria Oliveira</p>
                    <p className="mt-1 text-sm">Adicionadas seções sobre controles internos</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Restaurar
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Versão 1.1</h3>
                    <p className="text-sm text-muted-foreground">01/06/2023 às 14:22 - Pedro Santos</p>
                    <p className="mt-1 text-sm">Revisão de texto e formatação</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Restaurar
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">Versão 1.0</h3>
                    <p className="text-sm text-muted-foreground">28/05/2023 às 09:45 - João Pereira</p>
                    <p className="mt-1 text-sm">Versão inicial do documento</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Restaurar
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Exportar histórico de versões
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default WYSIWYGEditor;

function Textarea({ id, value, onChange, placeholder, className }: { id: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder: string, className: string }) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  );
}
