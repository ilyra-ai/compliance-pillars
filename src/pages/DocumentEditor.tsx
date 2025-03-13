
import React, { useState } from 'react';
import WYSIWYGEditor from '@/components/editor/WYSIWYGEditor';
import AIDocumentAssistant from '@/components/chatbot/AIDocumentAssistant';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Save, 
  FileDown, 
  Share2, 
  MoreVertical, 
  FileText, 
  Bot, 
  Cloud, 
  ArrowRight, 
  Download,
  LayoutGrid,
  PanelLeft,
  PanelRight,
  Maximize,
  FileSpreadsheet,
  Presentation,
  Cloud as CloudIcon,
  History
} from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import DocumentVersioning from '@/components/documents/DocumentVersioning';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';
import { useIsMobile } from '@/hooks/use-mobile';

const DocumentEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [documentType, setDocumentType] = useState<'word' | 'excel' | 'powerpoint' | 'gdocs' | 'gsheets' | 'gslides'>('word');
  const [layoutMode, setLayoutMode] = useState<'split' | 'editor' | 'assistant' | 'full'>('split');
  const [documentContent, setDocumentContent] = useState('Conteúdo inicial do documento. Este é um exemplo para demonstrar a integração com o assistente de IA.');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { handleOpenUITheme } = useThemeDialog();
  const isMobile = useIsMobile();
  
  const handleSaveDocument = () => {
    toast.success('Documento salvo com sucesso!');
  };
  
  const handleExportDocument = () => {
    toast.success('Documento exportado com sucesso!');
  };
  
  const handleShareDocument = () => {
    toast.success('Link para compartilhamento copiado para a área de transferência!');
  };
  
  const handleContentChange = (content: string) => {
    setDocumentContent(content);
  };
  
  const getDocumentTypeIcon = () => {
    switch (documentType) {
      case 'word':
        return <FileText className="h-5 w-5" />;
      case 'excel':
        return <FileSpreadsheet className="h-5 w-5" />;
      case 'powerpoint':
        return <Presentation className="h-5 w-5" />;
      case 'gdocs':
        return <FileText className="h-5 w-5" />;
      case 'gsheets':
        return <FileSpreadsheet className="h-5 w-5" />;
      case 'gslides':
        return <Presentation className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
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
    return types[documentType];
  };
  
  const handleRestoreVersion = (versionId: string) => {
    toast.success(`Versão ${versionId} restaurada com sucesso!`);
  };
  
  const handleViewVersion = (versionId: string) => {
    toast.info(`Visualizando a versão ${versionId}`);
  };
  
  const handleDownloadVersion = (versionId: string) => {
    toast.success(`Versão ${versionId} baixada com sucesso!`);
  };
  
  const toggleVersionHistory = () => {
    setShowVersionHistory(!showVersionHistory);
  };

  return (
    <PageLayout hideFloatingThemeButton>
      <div className="flex flex-col h-[calc(100vh-12rem)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-4">Editor de Documentos</h1>
            <Select value={documentType} onValueChange={(value) => setDocumentType(value as any)}>
              <SelectTrigger className="w-[200px]">
                <div className="flex items-center">
                  {getDocumentTypeIcon()}
                  <span className="ml-2">{getDocumentTypeName()}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="word">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Microsoft Word</span>
                  </div>
                </SelectItem>
                <SelectItem value="excel">
                  <div className="flex items-center">
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    <span>Microsoft Excel</span>
                  </div>
                </SelectItem>
                <SelectItem value="powerpoint">
                  <div className="flex items-center">
                    <Presentation className="mr-2 h-4 w-4" />
                    <span>Microsoft PowerPoint</span>
                  </div>
                </SelectItem>
                <SelectItem value="gdocs">
                  <div className="flex items-center">
                    <CloudIcon className="mr-2 h-4 w-4" />
                    <span>Google Docs</span>
                  </div>
                </SelectItem>
                <SelectItem value="gsheets">
                  <div className="flex items-center">
                    <CloudIcon className="mr-2 h-4 w-4" />
                    <span>Google Sheets</span>
                  </div>
                </SelectItem>
                <SelectItem value="gslides">
                  <div className="flex items-center">
                    <CloudIcon className="mr-2 h-4 w-4" />
                    <span>Google Slides</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex space-x-1 border rounded-md p-1 mr-2">
              <Button 
                variant={layoutMode === 'editor' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setLayoutMode('editor')}
                className="h-8 w-8"
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant={layoutMode === 'split' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setLayoutMode('split')}
                className="h-8 w-8"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={layoutMode === 'assistant' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setLayoutMode('assistant')}
                className="h-8 w-8"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
              <Button 
                variant={layoutMode === 'full' ? 'default' : 'ghost'} 
                size="icon" 
                onClick={() => setLayoutMode('full')}
                className="h-8 w-8"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              variant={showVersionHistory ? 'default' : 'outline'} 
              onClick={toggleVersionHistory}
            >
              <History className="mr-2 h-4 w-4" />
              {isMobile ? '' : 'Histórico de Versões'}
            </Button>
            
            <ThemeButton onClick={handleOpenUITheme} />
            
            {!isMobile && (
              <>
                <Button variant="outline" onClick={handleShareDocument}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
                <Button variant="outline" onClick={handleExportDocument}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </>
            )}
            <Button onClick={handleSaveDocument}>
              <Save className="mr-2 h-4 w-4" />
              {isMobile ? '' : 'Salvar'}
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showVersionHistory ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Histórico de Versões</CardTitle>
                <Button variant="ghost" size="sm" onClick={toggleVersionHistory}>
                  Fechar
                </Button>
              </div>
              <CardDescription>
                Gerencie e compare diferentes versões deste documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentVersioning 
                documentId="doc123"
                currentVersion={2.0}
                onRestoreVersion={handleRestoreVersion}
                onViewVersion={handleViewVersion}
                onDownloadVersion={handleDownloadVersion}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="flex-grow bg-background border rounded-md overflow-hidden">
            {layoutMode === 'split' && (
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="border-r">
                  <WYSIWYGEditor 
                    initialContent={documentContent} 
                    onChange={handleContentChange} 
                  />
                </div>
                <div>
                  <AIDocumentAssistant 
                    documentContent={documentContent} 
                    documentType={documentType} 
                    onApplyChanges={handleContentChange}
                  />
                </div>
              </div>
            )}
            
            {layoutMode === 'editor' && (
              <WYSIWYGEditor 
                initialContent={documentContent} 
                onChange={handleContentChange} 
              />
            )}
            
            {layoutMode === 'assistant' && (
              <AIDocumentAssistant 
                documentContent={documentContent} 
                documentType={documentType} 
                onApplyChanges={handleContentChange}
              />
            )}
            
            {layoutMode === 'full' && (
              <Tabs defaultValue="editor" className="h-full">
                <div className="border-b px-4">
                  <TabsList className="bg-transparent">
                    <TabsTrigger value="editor" className="data-[state=active]:bg-muted">Editor</TabsTrigger>
                    <TabsTrigger value="assistant" className="data-[state=active]:bg-muted">Assistente AI</TabsTrigger>
                    <TabsTrigger value="drive" className="data-[state=active]:bg-muted">Integrações</TabsTrigger>
                    <TabsTrigger value="versions" className="data-[state=active]:bg-muted">Versões</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="editor" className="h-[calc(100%-41px)] mt-0">
                  <WYSIWYGEditor 
                    initialContent={documentContent} 
                    onChange={handleContentChange} 
                  />
                </TabsContent>
                
                <TabsContent value="assistant" className="h-[calc(100%-41px)] mt-0 p-4">
                  <AIDocumentAssistant 
                    documentContent={documentContent} 
                    documentType={documentType} 
                    onApplyChanges={handleContentChange}
                  />
                </TabsContent>
                
                <TabsContent value="versions" className="h-[calc(100%-41px)] mt-0 p-4 overflow-y-auto">
                  <DocumentVersioning 
                    documentId="doc123"
                    currentVersion={2.0}
                    onRestoreVersion={handleRestoreVersion}
                    onViewVersion={handleViewVersion}
                    onDownloadVersion={handleDownloadVersion}
                  />
                </TabsContent>
                
                <TabsContent value="drive" className="h-[calc(100%-41px)] mt-0 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center">
                          <CloudIcon className="mr-2 h-5 w-5" />
                          Microsoft OneDrive
                        </CardTitle>
                        <CardDescription>
                          Integração com Microsoft Office
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" className="justify-start">
                              <Download className="mr-2 h-4 w-4" />
                              Importar do OneDrive
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Exportar para OneDrive
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <Cloud className="mr-2 h-4 w-4" />
                              Sincronizar com OneDrive
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl flex items-center">
                          <CloudIcon className="mr-2 h-5 w-5" />
                          Google Drive
                        </CardTitle>
                        <CardDescription>
                          Integração com Google Workspace
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" className="justify-start">
                              <Download className="mr-2 h-4 w-4" />
                              Importar do Google Drive
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Exportar para Google Drive
                            </Button>
                            <Button variant="outline" className="justify-start">
                              <Cloud className="mr-2 h-4 w-4" />
                              Sincronizar com Google Drive
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default DocumentEditor;
