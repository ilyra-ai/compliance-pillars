
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  RotateCcw, 
  Download, 
  Clock, 
  Check, 
  AlignJustify,
  FileText,
  User
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface DocumentVersion {
  id: string;
  versionNumber: number;
  createdAt: Date;
  createdBy: string;
  createdByAvatar?: string;
  status: 'draft' | 'published' | 'archived';
  comment: string;
  changes?: string[];
}

interface DocumentVersioningProps {
  documentId: string;
  currentVersion: number;
  onRestoreVersion: (versionId: string) => void;
  onViewVersion: (versionId: string) => void;
  onDownloadVersion: (versionId: string) => void;
}

const DocumentVersioning: React.FC<DocumentVersioningProps> = ({
  documentId,
  currentVersion,
  onRestoreVersion,
  onViewVersion,
  onDownloadVersion
}) => {
  // Simulated data - in a real app, this would come from an API
  const [versions, setVersions] = useState<DocumentVersion[]>([
    {
      id: '1',
      versionNumber: 1.0,
      createdAt: new Date(2023, 5, 15, 10, 30),
      createdBy: 'João Silva',
      createdByAvatar: 'https://i.pravatar.cc/150?u=joao',
      status: 'published',
      comment: 'Versão inicial do documento',
      changes: ['Criação do documento', 'Adição de seções introdutórias']
    },
    {
      id: '2',
      versionNumber: 1.1,
      createdAt: new Date(2023, 5, 17, 14, 45),
      createdBy: 'Maria Oliveira',
      createdByAvatar: 'https://i.pravatar.cc/150?u=maria',
      status: 'published',
      comment: 'Correções gramaticais',
      changes: ['Correção de erros ortográficos', 'Ajustes de formatação']
    },
    {
      id: '3',
      versionNumber: 1.2,
      createdAt: new Date(2023, 6, 2, 9, 15),
      createdBy: 'Carlos Mendes',
      createdByAvatar: 'https://i.pravatar.cc/150?u=carlos',
      status: 'draft',
      comment: 'Atualização de conteúdo',
      changes: ['Adição de nova seção sobre compliance', 'Atualização de referências']
    },
    {
      id: '4',
      versionNumber: 2.0,
      createdAt: new Date(2023, 6, 10, 16, 20),
      createdBy: 'Ana Souza',
      createdByAvatar: 'https://i.pravatar.cc/150?u=ana',
      status: 'published',
      comment: 'Versão oficial aprovada',
      changes: ['Revisão completa', 'Aprovado pelo departamento jurídico']
    }
  ]);
  
  const [compareDialogOpen, setCompareDialogOpen] = useState<boolean>(false);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [commentDialogOpen, setCommentDialogOpen] = useState<boolean>(false);
  const [newVersionComment, setNewVersionComment] = useState<string>('');
  
  const handleCompareVersions = () => {
    if (selectedVersions.length !== 2) {
      toast.error('Selecione exatamente duas versões para comparar');
      return;
    }
    setCompareDialogOpen(true);
  };
  
  const handleCreateNewVersion = () => {
    setCommentDialogOpen(true);
  };
  
  const handleSaveNewVersion = () => {
    // Simulate saving a new version
    const newVersion: DocumentVersion = {
      id: String(versions.length + 1),
      versionNumber: versions[0].versionNumber + 0.1,
      createdAt: new Date(),
      createdBy: 'Usuário Atual',
      status: 'draft',
      comment: newVersionComment,
      changes: ['Novas alterações']
    };
    
    setVersions([newVersion, ...versions]);
    setCommentDialogOpen(false);
    setNewVersionComment('');
    toast.success('Nova versão do documento criada com sucesso!');
  };

  const getStatusBadge = (status: 'draft' | 'published' | 'archived') => {
    const statusConfig = {
      draft: { label: 'Rascunho', className: 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300' },
      published: { label: 'Publicado', className: 'bg-green-200 text-green-800 hover:bg-green-300' },
      archived: { label: 'Arquivado', className: 'bg-gray-200 text-gray-800 hover:bg-gray-300' }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Histórico de Versões</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCompareVersions}
            disabled={selectedVersions.length !== 2}
          >
            <AlignJustify className="mr-2 h-4 w-4" />
            Comparar Versões
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleCreateNewVersion}
          >
            <FileText className="mr-2 h-4 w-4" />
            Criar Nova Versão
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Comp.</TableHead>
              <TableHead>Versão</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Autor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comentário</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version) => (
              <TableRow key={version.id}>
                <TableCell className="text-center">
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (selectedVersions.length < 2) {
                          setSelectedVersions([...selectedVersions, version.id]);
                        } else {
                          setSelectedVersions([selectedVersions[1], version.id]);
                        }
                      } else {
                        setSelectedVersions(selectedVersions.filter(id => id !== version.id));
                      }
                    }}
                    checked={selectedVersions.includes(version.id)}
                    className="h-4 w-4"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {version.versionNumber.toFixed(1)}
                  {parseFloat(currentVersion.toString()) === version.versionNumber && (
                    <Badge variant="outline" className="ml-2">
                      <Check className="h-3 w-3 mr-1" />
                      Atual
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="flex items-center text-sm hover:underline">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(version.createdAt, 'dd/MM/yyyy')}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit p-2">
                      <p className="text-xs">
                        {format(version.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={version.createdByAvatar} />
                      <AvatarFallback>{version.createdBy.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{version.createdBy}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(version.status)}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-sm truncate max-w-[150px] hover:underline">
                        {version.comment.length > 20 
                          ? `${version.comment.substring(0, 20)}...` 
                          : version.comment}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-4">
                      <h4 className="font-medium mb-2">Comentário da versão {version.versionNumber.toFixed(1)}</h4>
                      <p className="text-sm mb-2">{version.comment}</p>
                      {version.changes && version.changes.length > 0 && (
                        <>
                          <h5 className="text-sm font-medium mt-2">Alterações:</h5>
                          <ul className="list-disc text-xs ml-4 mt-1">
                            {version.changes.map((change, index) => (
                              <li key={index}>{change}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </PopoverContent>
                  </Popover>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onViewVersion(version.id)}
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDownloadVersion(version.id)}
                      title="Baixar"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {version.versionNumber !== parseFloat(currentVersion.toString()) && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onRestoreVersion(version.id)}
                        title="Restaurar esta versão"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Compare Versions Dialog */}
      <Dialog open={compareDialogOpen} onOpenChange={setCompareDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comparação de Versões</DialogTitle>
            <DialogDescription>
              Comparando as diferenças entre duas versões do documento
            </DialogDescription>
          </DialogHeader>
          
          {selectedVersions.length === 2 && (
            <div className="grid grid-cols-2 gap-4">
              {selectedVersions.map((versionId) => {
                const version = versions.find(v => v.id === versionId);
                if (!version) return null;
                
                return (
                  <Card key={versionId}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>Versão {version.versionNumber.toFixed(1)}</CardTitle>
                        {getStatusBadge(version.status)}
                      </div>
                      <CardDescription>
                        {format(version.createdAt, "dd/MM/yyyy 'às' HH:mm")} por {version.createdBy}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Comentário:</h4>
                          <p className="text-sm">{version.comment}</p>
                        </div>
                        
                        {version.changes && version.changes.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium">Alterações:</h4>
                            <ul className="list-disc text-sm ml-4">
                              {version.changes.map((change, index) => (
                                <li key={index}>{change}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="pt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => onViewVersion(version.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Diferenças</h3>
            <div className="border rounded-md p-4 bg-muted/50 h-64 overflow-y-auto">
              <p className="text-sm text-muted-foreground text-center italic">
                As diferenças entre as versões seriam mostradas aqui, com marcações para adições, remoções e modificações.
              </p>
              {/* Em uma implementação real, aqui seria renderizado o diff entre as versões */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* New Version Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Nova Versão</DialogTitle>
            <DialogDescription>
              Adicione um comentário para descrever as alterações feitas nesta versão
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="versionComment">Comentário</Label>
              <Input 
                id="versionComment"
                placeholder="Descreva as alterações feitas nesta versão"
                value={newVersionComment}
                onChange={(e) => setNewVersionComment(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveNewVersion} disabled={!newVersionComment.trim()}>
                Salvar Nova Versão
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentVersioning;
