
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import {
  Folder,
  File,
  Upload,
  Download,
  Trash,
  Plus,
  Search,
  FileText,
  Image,
  FileUp,
  FolderPlus,
} from 'lucide-react';

// Substitui FilePdf por FileText, que é disponível no lucide-react
interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image' | 'document';
  size?: number;
  modified: string;
  path: string;
  parentId: string | null;
}

interface FileManagerProps {
  onSelectFile?: (file: FileItem) => void;
  onCreateFile?: (file: FileItem) => void;
  onDeleteFile?: (fileId: string) => void;
  initialPath?: string;
}

const FileManager: React.FC<FileManagerProps> = ({
  onSelectFile,
  onCreateFile,
  onDeleteFile,
  initialPath = '/'
}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Dados de exemplo
  useEffect(() => {
    // Simula carregamento de arquivos
    const demoFiles: FileItem[] = [
      {
        id: '1',
        name: 'Documentos',
        type: 'folder',
        modified: '2023-05-15',
        path: '/Documentos',
        parentId: null
      },
      {
        id: '2',
        name: 'Imagens',
        type: 'folder',
        modified: '2023-05-10',
        path: '/Imagens',
        parentId: null
      },
      {
        id: '3',
        name: 'Relatório.pdf',
        type: 'file',
        size: 1024 * 1024,
        modified: '2023-05-20',
        path: '/Relatório.pdf',
        parentId: null
      },
      {
        id: '4',
        name: 'Logo.png',
        type: 'image',
        size: 512 * 1024,
        modified: '2023-05-18',
        path: '/Logo.png',
        parentId: null
      },
      {
        id: '5',
        name: 'Contrato.pdf',
        type: 'file',
        size: 3 * 1024 * 1024,
        modified: '2023-05-12',
        path: '/Documentos/Contrato.pdf',
        parentId: '1'
      }
    ];
    
    setFiles(demoFiles);
  }, []);

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentPath(file.path);
    } else {
      setSelectedFile(file);
      if (onSelectFile) {
        onSelectFile(file);
      }
    }
  };

  const handleCreateItem = () => {
    if (!newItemName.trim()) {
      toast.error('Nome do item é obrigatório');
      return;
    }

    const newItem: FileItem = {
      id: Date.now().toString(),
      name: newItemName,
      type: newItemType,
      modified: new Date().toISOString().split('T')[0],
      path: `${currentPath}/${newItemName}${newItemType === 'folder' ? '' : '.txt'}`,
      parentId: null,
      size: newItemType === 'file' ? 0 : undefined
    };

    setFiles([...files, newItem]);
    setNewItemName('');
    setIsCreateDialogOpen(false);
    
    if (onCreateFile) {
      onCreateFile(newItem);
    }
    
    toast.success(`${newItemType === 'folder' ? 'Pasta' : 'Arquivo'} criado com sucesso!`);
  };

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
    
    if (onDeleteFile) {
      onDeleteFile(fileId);
    }
    
    toast.success('Item excluído com sucesso!');
  };

  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simula upload
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success('Arquivo enviado com sucesso!');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getPathBreadcrumbs = () => {
    const paths = currentPath.split('/').filter(Boolean);
    
    return (
      <div className="flex items-center space-x-1 text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPath('/')}
          className="h-6 px-2"
        >
          <Folder className="h-4 w-4 mr-1" />
          Raiz
        </Button>
        
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <span>/</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const newPath = '/' + paths.slice(0, index + 1).join('/');
                setCurrentPath(newPath);
              }}
              className="h-6 px-2"
            >
              {path}
            </Button>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const filteredFiles = files.filter(file => {
    const matchesPath = file.parentId === null && currentPath === '/' || 
                         file.path.startsWith(currentPath) && file.path !== currentPath;
    const matchesSearch = searchQuery === '' || 
                          file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPath && matchesSearch;
  });

  const renderFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'folder':
        return <Folder className="h-5 w-5 text-blue-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (bytes === undefined) return '-';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="file-manager">
      <Card className="border">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Gerenciador de Arquivos</CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Novo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUpload}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </Button>
            </div>
          </div>
          <CardDescription>
            {getPathBreadcrumbs()}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar arquivos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {isUploading && (
            <div className="mb-4 p-3 border rounded-md">
              <div className="flex justify-between mb-1 text-sm">
                <span>Enviando arquivo...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
          
          <div className="border rounded-md">
            <div className="grid grid-cols-12 p-2 bg-muted text-sm font-medium">
              <div className="col-span-6">Nome</div>
              <div className="col-span-2">Tamanho</div>
              <div className="col-span-3">Modificado</div>
              <div className="col-span-1">Ações</div>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {filteredFiles.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Nenhum arquivo encontrado
                </div>
              ) : (
                filteredFiles.map(file => (
                  <div 
                    key={file.id}
                    className="grid grid-cols-12 p-2 border-t hover:bg-muted/50 cursor-pointer"
                    onClick={() => handleFileClick(file)}
                  >
                    <div className="col-span-6 flex items-center">
                      {renderFileIcon(file)}
                      <span className="ml-2">{file.name}</span>
                    </div>
                    <div className="col-span-2">
                      {formatFileSize(file.size)}
                    </div>
                    <div className="col-span-3">
                      {file.modified}
                    </div>
                    <div className="col-span-1 flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.id);
                        }}
                      >
                        <Trash className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={newItemType}
                onValueChange={(value: 'file' | 'folder') => setNewItemType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">Arquivo</SelectItem>
                  <SelectItem value="folder">Pasta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateItem}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileManager;
