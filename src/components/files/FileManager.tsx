
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  FolderOpen,
  File,
  Upload,
  Download,
  Trash2,
  MoreVertical,
  Plus,
  Search,
  FileText,
  Image,
  FileSpreadsheet,
  FilePdf,
  FileArchive,
  RefreshCw,
  FolderPlus,
  Copy,
  Edit,
  Eye,
  Share2,
  LibrarySquare
} from 'lucide-react';

// Estilos para tipos de arquivos
const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FilePdf className="h-8 w-8 text-red-500" />,
  doc: <FileText className="h-8 w-8 text-blue-500" />,
  docx: <FileText className="h-8 w-8 text-blue-500" />,
  xls: <FileSpreadsheet className="h-8 w-8 text-green-500" />,
  xlsx: <FileSpreadsheet className="h-8 w-8 text-green-500" />,
  png: <Image className="h-8 w-8 text-purple-500" />,
  jpg: <Image className="h-8 w-8 text-purple-500" />,
  jpeg: <Image className="h-8 w-8 text-purple-500" />,
  zip: <FileArchive className="h-8 w-8 text-amber-500" />,
  rar: <FileArchive className="h-8 w-8 text-amber-500" />,
  default: <File className="h-8 w-8 text-gray-500" />
};

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  modified: string;
  path: string;
}

interface FolderItem {
  id: string;
  name: string;
  path: string;
}

export interface FileManagerProps {
  containerType?: 'pillar' | 'task' | 'project';
  containerId?: string;
}

// Dados de exemplo
const sampleFolders: FolderItem[] = [
  { id: '1', name: 'Documentos', path: '/documentos' },
  { id: '2', name: 'Imagens', path: '/imagens' },
  { id: '3', name: 'Planilhas', path: '/planilhas' },
  { id: '4', name: 'Relatórios', path: '/relatorios' },
  { id: '5', name: 'Arquivos de Backup', path: '/backup' },
];

const sampleFiles: FileItem[] = [
  { id: '1', name: 'Relatório Anual.pdf', type: 'pdf', size: '2.4 MB', modified: '12/05/2023', path: '/documentos' },
  { id: '2', name: 'Planilha de Riscos.xlsx', type: 'xlsx', size: '1.8 MB', modified: '10/05/2023', path: '/planilhas' },
  { id: '3', name: 'Política de Compliance.docx', type: 'docx', size: '950 KB', modified: '05/05/2023', path: '/documentos' },
  { id: '4', name: 'Organograma.png', type: 'png', size: '350 KB', modified: '01/05/2023', path: '/imagens' },
  { id: '5', name: 'Código de Conduta.pdf', type: 'pdf', size: '1.2 MB', modified: '28/04/2023', path: '/documentos' },
  { id: '6', name: 'Matriz de Riscos.xlsx', type: 'xlsx', size: '2.1 MB', modified: '25/04/2023', path: '/planilhas' },
  { id: '7', name: 'Backup Trimestral.zip', type: 'zip', size: '45 MB', modified: '20/04/2023', path: '/backup' },
  { id: '8', name: 'Relatório de Auditoria.pdf', type: 'pdf', size: '3.2 MB', modified: '15/04/2023', path: '/relatorios' },
];

const FileManager: React.FC<FileManagerProps> = ({ 
  containerType = 'pillar', 
  containerId = '1' 
}) => {
  const [files, setFiles] = useState<FileItem[]>(sampleFiles);
  const [folders, setFolders] = useState<FolderItem[]>(sampleFolders);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);
  
  // Efeito para simular o carregamento de arquivos
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentPath, containerType, containerId]);
  
  // Filtrar arquivos por pasta atual e termo de pesquisa
  const filteredFiles = files.filter(file => 
    (file.path === currentPath || currentPath === '/') && 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filtrar pastas por pasta atual
  const filteredFolders = folders.filter(folder => 
    folder.path.startsWith(currentPath) && folder.path !== currentPath
  );
  
  const getFileIcon = (fileType: string) => {
    return fileTypeIcons[fileType] || fileTypeIcons.default;
  };
  
  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      } else {
        return [...prev, fileId];
      }
    });
  };
  
  const handleSelectAllFiles = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };
  
  const handleDeleteSelected = () => {
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    toast.success(`${selectedFiles.length} arquivo(s) excluído(s)`);
    setSelectedFiles([]);
  };
  
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('Nome da pasta não pode estar vazio');
      return;
    }
    
    const newFolder: FolderItem = {
      id: Date.now().toString(),
      name: newFolderName,
      path: `${currentPath === '/' ? '' : currentPath}/${newFolderName}`,
    };
    
    setFolders(prev => [...prev, newFolder]);
    setNewFolderName('');
    setNewFolderDialogOpen(false);
    toast.success(`Pasta "${newFolderName}" criada com sucesso`);
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      const newFiles: FileItem[] = Array.from(fileList).map(file => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: `${(file.size / 1024).toFixed(2)} KB`,
        modified: new Date().toLocaleDateString(),
        path: currentPath,
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      setUploadDialogOpen(false);
      toast.success(`${newFiles.length} arquivo(s) enviado(s) com sucesso`);
    }
  };
  
  const navigateToFolder = (path: string) => {
    setCurrentPath(path);
    setSelectedFiles([]);
  };
  
  const navigateUp = () => {
    if (currentPath === '/') return;
    
    const pathParts = currentPath.split('/').filter(Boolean);
    pathParts.pop();
    const newPath = pathParts.length === 0 ? '/' : `/${pathParts.join('/')}`;
    navigateToFolder(newPath);
  };
  
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Arquivos atualizados');
    }, 800);
  };
  
  // Renderiza a trilha de navegação
  const renderBreadcrumbs = () => {
    if (currentPath === '/') {
      return (
        <Button variant="ghost" size="sm" className="font-bold">
          <LibrarySquare className="mr-2 h-4 w-4" />
          Raiz
        </Button>
      );
    }
    
    const pathParts = currentPath.split('/').filter(Boolean);
    return (
      <div className="flex items-center overflow-x-auto">
        <Button variant="ghost" size="sm" onClick={() => navigateToFolder('/')}>
          <LibrarySquare className="mr-1 h-4 w-4" />
          Raiz
        </Button>
        
        {pathParts.map((part, index) => {
          const path = `/${pathParts.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={path}>
              <span className="mx-1 text-muted-foreground">/</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateToFolder(path)}
                className={index === pathParts.length - 1 ? 'font-bold' : ''}
              >
                {part}
              </Button>
            </React.Fragment>
          );
        })}
      </div>
    );
  };
  
  return (
    <Card className="file-manager">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Gerenciador de Arquivos</CardTitle>
            <CardDescription>
              Gerencie documentos e arquivos relacionados ao {containerType} #{containerId}
            </CardDescription>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setNewFolderDialogOpen(true)}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Nova Pasta
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => setUploadDialogOpen(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Enviar Arquivo
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <div className="flex items-center overflow-x-auto w-full sm:w-auto">
            {renderBreadcrumbs()}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar arquivos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos os Arquivos</TabsTrigger>
            <TabsTrigger value="documents">Documentos</TabsTrigger>
            <TabsTrigger value="images">Imagens</TabsTrigger>
            <TabsTrigger value="spreadsheets">Planilhas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {loading ? (
              <div className="py-8 flex justify-center">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {selectedFiles.length > 0 && (
                  <div className="bg-secondary/50 p-2 rounded mb-4 flex justify-between items-center">
                    <span>{selectedFiles.length} arquivo(s) selecionado(s)</span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedFiles([])}>
                        Cancelar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Folders */}
                {filteredFolders.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2 text-sm text-muted-foreground">Pastas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredFolders.map(folder => (
                        <Card 
                          key={folder.id} 
                          className="hover:bg-secondary/50 cursor-pointer transition-colors"
                          onClick={() => navigateToFolder(folder.path)}
                        >
                          <CardContent className="p-4 flex items-center">
                            <FolderOpen className="h-10 w-10 text-amber-500 mr-3" />
                            <div className="flex-1 overflow-hidden">
                              <p className="font-medium truncate">{folder.name}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Files */}
                {filteredFiles.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-sm text-muted-foreground">Arquivos</h3>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleSelectAllFiles}
                          className="text-xs"
                        >
                          {selectedFiles.length === filteredFiles.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
                        </Button>
                      </div>
                    </div>
                    
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFiles.map(file => (
                          <Card 
                            key={file.id} 
                            className={`hover:bg-secondary/50 transition-colors cursor-pointer border ${
                              selectedFiles.includes(file.id) ? 'border-primary ring-1 ring-primary' : ''
                            }`}
                            onClick={() => handleSelectFile(file.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex flex-col items-center text-center">
                                {getFileIcon(file.type)}
                                <p className="font-medium mt-2 truncate w-full">{file.name}</p>
                                <p className="text-xs text-muted-foreground mt-1">{file.size}</p>
                              </div>
                              
                              <div className="flex justify-center mt-3 space-x-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Download className="h-4 w-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Renomear</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Share2 className="mr-2 h-4 w-4" />
                                      <span>Compartilhar</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="mr-2 h-4 w-4" />
                                      <span>Duplicar</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Excluir</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="border rounded-md overflow-hidden">
                        {filteredFiles.map(file => (
                          <div 
                            key={file.id} 
                            className={`flex items-center p-3 hover:bg-secondary/50 border-b last:border-b-0 ${
                              selectedFiles.includes(file.id) ? 'bg-primary/10' : ''
                            }`}
                            onClick={() => handleSelectFile(file.id)}
                          >
                            <div className="mr-4">
                              {getFileIcon(file.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{file.name}</p>
                              <div className="flex text-xs text-muted-foreground">
                                <span>{file.size}</span>
                                <span className="mx-2">•</span>
                                <span>Modificado em {file.modified}</span>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Renomear</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Share2 className="mr-2 h-4 w-4" />
                                    <span>Compartilhar</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" />
                                    <span>Duplicar</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Excluir</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 border rounded-md">
                    <File className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-lg">Nenhum arquivo encontrado</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      {searchTerm ? 'Sua pesquisa não retornou resultados' : 'Este diretório está vazio'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setUploadDialogOpen(true)}>
                        <Upload className="mr-2 h-4 w-4" />
                        Enviar Arquivo
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}
          </TabsContent>
          
          <TabsContent value="documents">
            {/* Conteúdo filtrado por tipo de documento */}
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-medium text-lg">Documentos</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Documentos PDF, Word e outros tipos de texto
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="images">
            {/* Conteúdo de imagens */}
            <div className="text-center py-12">
              <Image className="h-12 w-12 text-purple-500 mx-auto mb-3" />
              <h3 className="font-medium text-lg">Imagens</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Imagens JPG, PNG e outros formatos
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="spreadsheets">
            {/* Conteúdo de planilhas */}
            <div className="text-center py-12">
              <FileSpreadsheet className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-medium text-lg">Planilhas</h3>
              <p className="text-muted-foreground mt-1 mb-4">
                Planilhas Excel e outros formatos
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Dialog de Upload */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Arquivos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed rounded-md p-8 text-center">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium">Arraste e solte arquivos aqui</h3>
              <p className="text-sm text-muted-foreground mb-4">ou</p>
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md">
                  Selecionar Arquivos
                </span>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de Nova Pasta */}
      <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Pasta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Nome da pasta"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewFolderDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateFolder}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Criar Pasta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FileManager;
