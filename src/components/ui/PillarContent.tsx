
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Calendar, CheckSquare, ChevronRight, Copy, Download, Eye, FileText, HelpCircle, MoreHorizontal, Pen, Plus, Share2, Trash2, Upload, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import WYSIWYGEditor from '@/components/editor/WYSIWYGEditor';
import DocumentVersionControl from '@/components/documents/DocumentVersionControl';
import FileManager from '@/components/files/FileManager';
import CustomChartBuilder from '@/components/charts/CustomChartBuilder';

interface PillarContentProps {
  pillarId: string;
  title?: string;
  description?: string;
}

const PillarContent: React.FC<PillarContentProps> = ({ 
  pillarId, 
  title = "Detalhes do Pilar", 
  description = "Visualize todas as informações relacionadas ao pilar selecionado"
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const handleSaveEditor = (content: string) => {
    console.log('Conteúdo salvo:', content);
    setIsEditorOpen(false);
    // Implementar a lógica de salvamento real
  };
  
  const handleSaveChart = (config: any) => {
    console.log('Chart config saved:', config);
    // Implementar a lógica de salvamento real
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button size="sm" onClick={() => setIsEditorOpen(true)}>
            <Pen className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="tasks">Tarefas</TabsTrigger>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pilar</CardTitle>
                <CardDescription>Status e informações gerais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">Ativo</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Documentos</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tarefas</span>
                  <span className="font-medium">8/15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Responsável</span>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">João Silva</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progresso</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tarefas Recentes</CardTitle>
                <CardDescription>Últimas tarefas associadas</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[240px]">
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start p-4 hover:bg-muted/50">
                        <div className="mr-2 mt-0.5">
                          <CheckSquare className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Atualizar procedimento operacional</div>
                          <div className="text-sm text-muted-foreground">Vencimento: 15/06/2023</div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Últimas Atividades</CardTitle>
                <CardDescription>Histórico recente de atividades</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[240px]">
                  <div className="divide-y">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start p-4 hover:bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>MS</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">Maria Santos</span>
                          </div>
                          <div className="ml-8 text-sm text-muted-foreground">
                            Atualizou o documento "Política de Treinamento"
                          </div>
                          <div className="ml-8 text-xs text-muted-foreground mt-1">
                            Há 2 horas atrás
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Documentos do Pilar</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Importar
                </Button>
                <Button size="sm" onClick={() => setIsEditorOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Documento
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">Política de Compliance</CardTitle>
                      <Badge>V2.3</Badge>
                    </div>
                    <CardDescription>Atualizado em 12/05/2023</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Esta política estabelece as diretrizes e princípios que devem orientar a 
                      conduta de todos os colaboradores...
                    </p>
                  </CardContent>
                  <CardContent className="pt-0 flex justify-between items-center">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>15 páginas</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <DocumentVersionControl documentId={`${pillarId}-doc1`} />
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Tarefas do Pilar</h3>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nova Tarefa
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center p-4 hover:bg-muted/50">
                      <div className="mr-4">
                        <CheckSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Revisar política de treinamento</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">Prioritário</Badge>
                          <span className="text-sm text-muted-foreground">Vence em 7 dias</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="files">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Arquivos do Pilar</h3>
              <Button size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Enviar Arquivo
              </Button>
            </div>
            
            <FileManager containerType="pillar" containerId={pillarId} />
          </div>
        </TabsContent>
        
        <TabsContent value="charts">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Gráficos do Pilar</h3>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Gráfico
              </Button>
            </div>
            
            <CustomChartBuilder onSave={handleSaveChart} pillarId={pillarId} />
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Histórico de Alterações</h3>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Filtrar por Data
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-start p-4 hover:bg-muted/50">
                      <div className="mr-4 mt-0.5">
                        {item % 2 === 0 ? (
                          <FileText className="h-5 w-5 text-blue-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">
                          {item % 2 === 0 ? "Documento atualizado" : "Tarefa concluída"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item % 2 === 0 
                            ? "Política de Treinamento foi atualizada para versão 2.1" 
                            : "Revisão do procedimento operacional concluída"}
                        </div>
                        <div className="flex items-center mt-1">
                          <Avatar className="h-5 w-5 mr-1">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>JS</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            João Silva, 15/05/2023 às 14:30
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Editor de Documentos</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <WYSIWYGEditor onSave={handleSaveEditor} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PillarContent;
