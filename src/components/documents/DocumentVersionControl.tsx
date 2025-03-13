
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { documentVersionService, Document, DocumentVersion } from '@/services/document-version-service';
import { Clock, Save, RotateCcw, Copy, File, ArrowLeft, Check, Trash, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface DocumentVersionControlProps {
  documentId?: string;
  pillarId?: string;
  onVersionChange?: (version: DocumentVersion) => void;
  onDocumentSaved?: (document: Document) => void;
}

const DocumentVersionControl: React.FC<DocumentVersionControlProps> = ({ 
  documentId, 
  pillarId,
  onVersionChange,
  onDocumentSaved
}) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string>('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comment, setComment] = useState('');
  const [isNewDocument, setIsNewDocument] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('editor');

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    } else {
      setIsNewDocument(true);
      setDocument(null);
      setVersions([]);
      setTitle('');
      setContent('');
      setComment('');
    }
  }, [documentId]);

  const loadDocument = (id: string) => {
    const doc = documentVersionService.getDocument(id);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
      setTags(doc.tags || []);
      
      const vers = documentVersionService.getVersions(id);
      setVersions(vers);
      
      if (doc.currentVersionId) {
        setCurrentVersionId(doc.currentVersionId);
        const currentVersion = vers.find(v => v.id === doc.currentVersionId);
        if (currentVersion) {
          setContent(currentVersion.content);
        }
      }
      
      setIsNewDocument(false);
    }
  };

  const handleSaveDocument = () => {
    if (!title.trim()) {
      toast.error('O título do documento é obrigatório');
      return;
    }

    try {
      let savedDoc: Document | null = null;
      
      if (isNewDocument) {
        savedDoc = documentVersionService.createDocument(title, content, pillarId, tags);
        setDocument(savedDoc);
        setIsNewDocument(false);
        setCurrentVersionId(savedDoc.currentVersionId);
        toast.success('Documento criado com sucesso!');
      } else if (document) {
        // Atualiza os metadados
        documentVersionService.updateDocument(document.id, { title, tags });
        
        // Cria nova versão somente se o conteúdo mudou
        const currentVersion = versions.find(v => v.id === currentVersionId);
        if (currentVersion && currentVersion.content !== content) {
          const newVersion = documentVersionService.createVersion(document.id, content, comment);
          if (newVersion) {
            setVersions([newVersion, ...versions]);
            setCurrentVersionId(newVersion.id);
            toast.success('Nova versão criada com sucesso!');
          }
        } else {
          toast.info('Documento atualizado sem criar nova versão');
        }
        
        // Recarrega o documento para obter dados atualizados
        savedDoc = documentVersionService.getDocument(document.id);
        if (savedDoc) {
          setDocument(savedDoc);
        }
      }
      
      if (savedDoc && onDocumentSaved) {
        onDocumentSaved(savedDoc);
      }
      
      setComment('');
    } catch (error) {
      toast.error('Erro ao salvar o documento: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };

  const handleRestoreVersion = (versionId: string) => {
    if (!document) return;
    
    const versionToRestore = versions.find(v => v.id === versionId);
    if (!versionToRestore) return;
    
    setContent(versionToRestore.content);
    setCurrentVersionId(versionId);
    
    if (documentVersionService.restoreVersion(document.id, versionId)) {
      toast.success(`Versão ${versionToRestore.version} restaurada com sucesso!`);
      
      if (onVersionChange) {
        onVersionChange(versionToRestore);
      }
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy HH:mm');
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="versions">Versões</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
          </TabsList>
          
          <div className="flex space-x-2">
            <Button onClick={handleSaveDocument} size="sm">
              <Save className="h-4 w-4 mr-2" />
              {isNewDocument ? 'Criar Documento' : 'Salvar Versão'}
            </Button>
          </div>
        </div>
        
        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <File className="h-5 w-5 text-primary" />
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título do documento"
                  className="text-lg font-semibold"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <div key={tag} className="bg-secondary px-2 py-1 rounded-full text-xs flex items-center">
                    <span>{tag}</span>
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div className="flex items-center">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Adicionar tag"
                    className="h-7 text-xs"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 px-2" 
                    onClick={handleAddTag}
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Conteúdo do documento..."
                className="w-full min-h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              
              {!isNewDocument && (
                <div className="mt-4">
                  <Label htmlFor="version-comment">Comentário da versão</Label>
                  <Input
                    id="version-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Descreva as alterações desta versão"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="versions">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Versões</CardTitle>
              <CardDescription>
                Visualize e restaure versões anteriores do documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {versions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {isNewDocument 
                    ? "Salve o documento para criar a primeira versão" 
                    : "Nenhuma versão encontrada para este documento"}
                </div>
              ) : (
                <div className="space-y-2">
                  {versions.map((version) => (
                    <div 
                      key={version.id}
                      className={`version-history-item ${version.id === currentVersionId ? 'current' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium">Versão {version.version}</span>
                            {version.id === currentVersionId && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                                Atual
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(version.createdAt)} por {version.createdBy}
                          </div>
                          {version.comment && (
                            <div className="mt-1 text-sm">{version.comment}</div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {version.id !== currentVersionId && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRestoreVersion(version.id)}
                            >
                              <RotateCcw className="h-3 w-3 mr-1" />
                              Restaurar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Documento</CardTitle>
              <CardDescription>
                Detalhes e metadados do documento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {document ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">ID do Documento</Label>
                    <div className="text-sm font-mono bg-secondary/50 p-2 rounded">
                      {document.id}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Criado em</Label>
                      <div>{formatDate(document.createdAt)}</div>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Última modificação</Label>
                      <div>{formatDate(document.updatedAt)}</div>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Número de versões</Label>
                      <div>{versions.length}</div>
                    </div>
                    
                    <div>
                      <Label className="text-muted-foreground">Pilar</Label>
                      <div>{document.pillarId || "Não associado"}</div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-muted-foreground">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {document.tags && document.tags.length > 0 ? (
                        document.tags.map(tag => (
                          <div key={tag} className="bg-secondary px-2 py-1 rounded-full text-xs">
                            {tag}
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground">Nenhuma tag definida</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {isNewDocument 
                    ? "Salve o documento para ver informações detalhadas" 
                    : "Nenhuma informação disponível para este documento"}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentVersionControl;
