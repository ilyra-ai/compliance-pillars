
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  File,
  FilePlus,
  FolderPlus,
  Upload,
  Download,
  Trash2,
  Search,
  Filter,
  FolderOpen,
  FileText,
  FileImage,
  FilePdf,
  FileCode,
  Folder,
  ChevronRight,
  MoreVertical,
  Edit,
  Copy,
  ExternalLink,
  Star,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

// Tipos
interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'pdf' | 'document' | 'spreadsheet';
  size?: number;
  path: string[];
  createdAt: string;
  updatedAt: string;
  starred?: boolean;
  parentId?: string;
}

// Serviço de gerenciamento de arquivos simulado
const useFileService = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  
  useEffect(() => {
    // Carregar arquivos do localStorage
    const savedFiles = localStorage.getItem('fileManager');
    if (savedFiles) {
      try {
        setFiles(JSON.parse(savedFiles));
      } catch (e) {
        // Se falhar, carrega exemplos
        setFiles(getSampleFiles());
        localStorage.setItem('fileManager', JSON.stringify(getSampleFiles()));
      }
    } else {
      // Se não existir, carrega exemplos
      setFiles(getSampleFiles());
      localStorage.setItem('fileManager', JSON.stringify(getSampleFiles()));
    }
  }, []);
  
  const getSampleFiles = (): FileItem[] => [
    {
      id: '1',
      name: 'Documentos',
      type: 'folder',
      path: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      starred: true
    },
    {
      id: '2',
      name: 'Imagens',
      type: 'folder',
      path: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Relatórios',
      type: 'folder',
      path: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Política de Compliance.pdf',
      type: 'pdf',
      size: 1024 * 1024 * 2.5, // 2.5 MB
      path: ['1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: '1'
    },
    {
      id: '5',
      name: 'Apresentação.pdf',
      type: 'pdf',
      size: 1024 * 1024 * 3.7, // 3.7 MB
      path: ['1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: '1'
    },
    {
      id: '6',
      name: 'Logo.png',
      type: 'image',
      size: 1024 * 512, // 512 KB
      path: ['2'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: '2',
      starred: true
    },
    {
      id: '7',
      name: 'Relatório Trimestral.xlsx',
      type: 'spreadsheet',
      size: 1024 * 1024 * 1.2, // 1.2 MB
      path: ['3'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: '3'
    }
  ];

  const saveFiles = (updatedFiles: FileItem[]) => {
    setFiles(updatedFiles);
    localStorage.setItem('fileManager', JSON.stringify(updatedFiles));
  };
  
  const addFile = (file: Omit<FileItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newFile: FileItem = {
      ...file,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: now,
      updatedAt: now
    };
    
    const updatedFiles = [...files, newFile];
    saveFiles(updatedFiles);
  };
  
  const deleteFile = (id: string) => {
    // Exclui o arquivo e todos os arquivos filhos (se for pasta)
    const isFolder = files.find(f => f.id === id)?.type === 'folder';
    
    let updatedFiles = [...files];
    if (isFolder) {
      // Exclui a pasta e todos os arquivos dentro dela
      updatedFiles = updatedFiles.filter(f => f.id !== id && !f.path.includes(id));
    } else {
      // Exclui apenas o arquivo
      updatedFiles = updatedFiles.filter(f => f.id !== id);
    }
    
    saveFiles(updatedFiles);
  };
  
  const updateFile = (id: string, updates: Partial<Omit<FileItem, 'id' | 'createdAt'>>) => {
    const now = new Date().toISOString();
    const updatedFiles = files.map(file => 
      file.id === id ? { ...file, ...updates, updatedAt: now } : file
    );
    
    saveFiles(updatedFiles);
  };
  
  const getFilesByParent = (parentId?: string) => {
    if (!parentId) {
      // Retorna arquivos/pastas da raiz
      return files.filter(f => !f.parentId);
    }
    
    // Retorna arquivos/pastas dentro de uma pasta específica
    return files.filter(f => f.parentId === parentId);
  };
  
  const getFile = (id: string) => {
    return files.find(f => f.id === id);
  };
  
  const searchFiles = (query: string) => {
    if (!query.trim()) return [];
    
    const lowerQuery = query.toLowerCase();
    return files.filter(f => 
      f.name.toLowerCase().includes(lowerQuery)
    );
  };
  
  const toggleStar = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file) {
      updateFile(id, { starred: !file.starred });
    }
  };
  
  const getStarredFiles = () => {
    return files.filter(f => f.starred);
  };
  
  const getRecentFiles = () => {
    // Retorna os 10 arquivos mais recentes (excluindo pastas)
    return [...files]
      .filter(f => f.type !== 'folder')
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 10);
  };
  
  return {
    files,
    addFile,
    deleteFile,
    updateFile,
    getFilesByParent,
    getFile,
    searchFiles,
    toggleStar,
    getStarredFiles,
    getRecentFiles
  };
};

// Componente para ícone do arquivo baseado no tipo
const FileIcon: React.FC<{ type: FileItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'folder':
      return <Folder className="h-5 w-5 text-blue-500" />;
    case 'image':
      return <FileImage className="h-5 w-5 text-purple-500" />;
    case 'pdf':
      return <FilePdf className="h-5 w-5 text-red-500" />;
    case 'document':
      return <FileText className="h-5 w-5 text-blue-500" />;
    case 'spreadsheet':
      return <FileText className="h-5 w-5 text-green-500" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

// Componente para formatar o tamanho do arquivo
const FileSize: React.FC<{ size?: number }> = ({ size }) => {
  if (!size) return <span>-</span>;
  
  if (size < 1024) {
    return <span>{size} B</span>;
  } else if (size < 1024 * 1024) {
    return <span>{(size / 1024).toFixed(1)} KB</span>;
  } else if (size < 1024 * 1024 * 1024) {
    return <span>{(size / (1024 * 1024)).toFixed(1)} MB</span>;
  } else {
    return <span>{(size / (1024 * 1024 * 1024)).toFixed(1)} GB</span>;
  }
};

// Componente principal do gerenciador de arquivos
const FileManager: React.FC = () => {
  const {
    files,
    addFile,
    deleteFile,
    updateFile,
    getFilesByParent,
    getFile,
    searchFiles,
    toggleStar,
    getStarredFiles,
    getRecentFiles
  } = useFileService();
  
  const [activeTab, setActiveTab] = useState('files');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FileItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  
  // Manipuladores de eventos
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchFiles(searchQuery);
      setSearchResults(results);
      setActiveTab('search');
    }
  };
  
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('O nome da pasta não pode estar vazio');
      return;
    }
    
    // Verifica se já existe uma pasta com o mesmo nome
    const parentId = currentPath.length > 0 ? currentPath[currentPath.length - 1] : undefined;
    const existingFiles = getFilesByParent(parentId);
    const folderExists = existingFiles.some(f => 
      f.type === 'folder' && f.name.toLowerCase() === newFolderName.trim().toLowerCase()
    );
    
    if (folderExists) {
      toast.error('Já existe uma pasta com este nome');
      return;
    }
    
    addFile({
      name: newFolderName.trim(),
      type: 'folder',
      path: [...currentPath],
      parentId
    });
    
    setNewFolderName('');
    setShowNewFolderDialog(false);
    toast.success('Pasta criada com sucesso!');
  };
  
  const handleRenameFile = () => {
    if (!selectedFile) return;
    
    if (!newFileName.trim()) {
      toast.error('O nome não pode estar vazio');
      return;
    }
    
    updateFile(selectedFile.id, { name: newFileName.trim() });
    setShowRenameDialog(false);
    setSelectedFile(null);
    toast.success('Arquivo renomeado com sucesso!');
  };
  
  const handleDeleteFile = (file: FileItem) => {
    if (confirm(`Tem certeza que deseja excluir "${file.name}"?`)) {
      deleteFile(file.id);
      if (selectedFile?.id === file.id) {
        setSelectedFile(null);
      }
      toast.success(`"${file.name}" excluído com sucesso!`);
    }
  };
  
  const handleOpenFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
  };
  
  const handleNavigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, currentPath.length - 1));
    }
  };
  
  const handleSelectFile = (file: FileItem) => {
    setSelectedFile(selectedFile?.id === file.id ? null : file);
  };
  
  const handleStartRename = (file: FileItem) => {
    setSelectedFile(file);
    setNewFileName(file.name);
    setShowRenameDialog(true);
  };
  
  const handleToggleStar = (fileId: string) => {
    toggleStar(fileId);
  };
  
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
    } catch (e) {
      return dateStr;
    }
  };
  
  // Renderização
  const renderFileList = (files: FileItem[]) => {
    return (
      <div className="file-manager">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left px-4 py-2">Nome</th>
              <th className="text-left px-4 py-2 hidden md:table-cell">Tamanho</th>
              <th className="text-left px-4 py-2 hidden md:table-cell">Modificado</th>
              <th className="text-right px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'files' && currentPath.length > 0 && (
              <tr className="hover:bg-secondary/50 cursor-pointer" onClick={handleNavigateUp}>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <FolderOpen className="h-5 w-5 text-blue-500 mr-2" />
                    <span>...</span>
                  </div>
                </td>
                <td className="px-4 py-2 hidden md:table-cell">-</td>
                <td className="px-4 py-2 hidden md:table-cell">-</td>
                <td className="px-4 py-2 text-right">-</td>
              </tr>
            )}
            
            {files.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-muted-foreground">
                  Nenhum arquivo encontrado
                </td>
              </tr>
            ) : (
              files.map(file => (
                <tr 
                  key={file.id} 
                  className={`hover:bg-secondary/50 ${selectedFile?.id === file.id ? 'bg-secondary/80' : ''}`}
                  onClick={() => handleSelectFile(file)}
                >
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <FileIcon type={file.type} />
                      <span 
                        className="ml-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (file.type === 'folder') {
                            handleOpenFolder(file.id);
                          }
                        }}
                      >
                        {file.name}
                      </span>
                      {file.starred && (
                        <Star className="h-3.5 w-3.5 text-yellow-500 ml-2 fill-current" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {file.type === 'folder' ? '-' : <FileSize size={file.size} />}
                  </td>
                  <td className="px-4 py-2 hidden md:table-cell">
                    {formatDate(file.updatedAt)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex justify-end items-center space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(file.id);
                        }}
                      >
                        <Star className={`h-4 w-4 ${file.starred ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartRename(file);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  const getCurrentFiles = () => {
    if (activeTab === 'search') {
      return searchResults;
    } else if (activeTab === 'starred') {
      return getStarredFiles();
    } else if (activeTab === 'recent') {
      return getRecentFiles();
    } else {
      // Tab 'files'
      const parentId = currentPath.length > 0 ? currentPath[currentPath.length - 1] : undefined;
      return getFilesByParent(parentId);
    }
  };
  
  // Componente principal
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
          <h2 className="text-xl font-bold">Gerenciador de Arquivos</h2>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Input
                placeholder="Buscar arquivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-60"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" onClick={() => setShowNewFolderDialog(true)}>
              <FolderPlus className="h-4 w-4 mr-2" />
              Nova Pasta
            </Button>
            
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-col md:flex-row gap-4 flex-1">
        <div className="w-full md:w-48 lg:w-64 shrink-0">
          <div className="space-y-1">
            <Button
              variant={activeTab === 'files' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('files');
                setCurrentPath([]);
              }}
            >
              <Folder className="h-4 w-4 mr-2" />
              Meus Arquivos
            </Button>
            
            <Button
              variant={activeTab === 'starred' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('starred')}
            >
              <Star className="h-4 w-4 mr-2" />
              Favoritos
            </Button>
            
            <Button
              variant={activeTab === 'recent' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('recent')}
            >
              <Clock className="h-4 w-4 mr-2" />
              Recentes
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="mb-2">
            {activeTab === 'files' && (
              <div className="text-sm flex items-center text-muted-foreground">
                <Button
                  variant="ghost"
                  className="h-6 p-1"
                  disabled={currentPath.length === 0}
                  onClick={handleNavigateUp}
                >
                  <Folder className="h-4 w-4" />
                </Button>
                <span className="mx-1">/</span>
                {currentPath.map((pathId, index) => {
                  const folder = getFile(pathId);
                  return (
                    <React.Fragment key={pathId}>
                      <Button
                        variant="ghost"
                        className="h-6 px-1 py-0"
                        onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                      >
                        {folder?.name || pathId}
                      </Button>
                      {index < currentPath.length - 1 && (
                        <>
                          <ChevronRight className="h-4 w-4 mx-1" />
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
            
            {activeTab === 'search' && (
              <div className="text-sm">
                Resultados da busca: <span className="font-medium">{searchQuery}</span>
                {searchResults.length > 0 && (
                  <span className="text-muted-foreground ml-2">
                    ({searchResults.length} {searchResults.length === 1 ? 'item' : 'itens'})
                  </span>
                )}
              </div>
            )}
          </div>
          
          {renderFileList(getCurrentFiles())}
        </div>
      </div>
      
      {/* Diálogo para criar nova pasta */}
      <Dialog open={showNewFolderDialog} onOpenChange={setShowNewFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Pasta</DialogTitle>
            <DialogDescription>
              Crie uma nova pasta no local atual
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="folder-name">Nome da pasta</Label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Minha Pasta"
                autoFocus
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewFolderDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateFolder}>
              Criar Pasta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para renomear arquivo */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renomear</DialogTitle>
            <DialogDescription>
              Altere o nome do arquivo ou pasta
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="file-name">Novo nome</Label>
              <Input
                id="file-name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRenameDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRenameFile}>
              Renomear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManager;
