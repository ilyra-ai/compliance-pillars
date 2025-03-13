import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  File, 
  FileText, 
  Image, 
  Upload, 
  Download, 
  Trash2, 
  FolderPlus, 
  Search, 
  PlusSquare, 
  Table,
  FileImage,
  Files,
  FileCog
} from 'lucide-react';
import { toast } from 'sonner';

interface FileItemProps {
  name: string;
  type: 'file' | 'image' | 'text' | 'table' | 'folder' | 'cog';
  size?: string;
  date?: string;
}

const FileItem: React.FC<FileItemProps> = ({ name, type, size, date }) => {
  let icon;
  switch (type) {
    case 'image':
      icon = <FileImage className="mr-2 h-4 w-4" />;
      break;
    case 'text':
      icon = <FileText className="mr-2 h-4 w-4" />;
      break;
    case 'table':
      icon = <Table className="mr-2 h-4 w-4" />;
      break;
    case 'folder':
      icon = <Files className="mr-2 h-4 w-4" />;
      break;
    case 'cog':
      icon = <FileCog className="mr-2 h-4 w-4" />;
      break;
    default:
      icon = <File className="mr-2 h-4 w-4" />;
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
      <div className="flex items-center">
        {icon}
        <span>{name}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        {size && <span>{size} | </span>}
        {date && <span>{date}</span>}
      </div>
    </div>
  );
};

const FileManager: React.FC = () => {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState<FileItemProps[]>([
    { name: 'Documento.txt', type: 'text', size: '12KB', date: '2024-01-20' },
    { name: 'Imagem.jpg', type: 'image', size: '256KB', date: '2024-01-15' },
    { name: 'Planilha.xlsx', type: 'table', size: '64KB', date: '2024-01-10' },
    { name: 'Pasta de Projetos', type: 'folder', date: '2024-01-05' },
    { name: 'Configurações.ini', type: 'cog', size: '8KB', date: '2023-12-28' },
  ]);

  const handleUpload = () => {
    toast.success('Arquivo enviado com sucesso!');
  };

  const handleDownload = () => {
    toast.success('Arquivo baixado com sucesso!');
  };

  const handleDelete = () => {
    toast.success('Arquivo excluído com sucesso!');
  };

  const handleCreateFolder = () => {
    toast.success('Pasta criada com sucesso!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciador de Arquivos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Buscar arquivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="h-4 w-4 text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Enviar
            </Button>
            <Button variant="outline" size="sm" onClick={handleCreateFolder}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Criar Pasta
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[300px] w-full rounded-md border">
          <div className="p-2">
            {files.map((file, index) => (
              <FileItem key={index} {...file} />
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Baixar
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileManager;
