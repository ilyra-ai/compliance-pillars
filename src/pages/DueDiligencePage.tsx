
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { 
  FileCheck, 
  PlusCircle, 
  BarChart4 as BarChart, 
  Settings,
  Palette
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DueDiligencePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to editor tab, enable edit mode
    if (value === 'editor') {
      setEditMode(true);
    } else if (editMode && value !== 'editor') {
      // If leaving editor tab and edit mode is on, ask for confirmation
      const confirmed = window.confirm("Sair do modo de edição? Alterações não salvas serão perdidas.");
      if (confirmed) {
        setEditMode(false);
      } else {
        // If user cancels, stay on editor tab
        setActiveTab('editor');
        return;
      }
    }
  };
  
  return (
    <PageLayout
      title="Due Diligence"
      description="Gerenciamento de processos de due diligence e avaliação de parceiros"
      actions={
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setEditMode(!editMode);
              setActiveTab(editMode ? 'dashboard' : 'editor');
            }}
            variant={editMode ? "default" : "outline"}
            className="relative overflow-hidden group"
            size="lg"
          >
            {editMode ? (
              <>
                <Settings className="mr-2 h-5 w-5" />
                Modo Visualização
              </>
            ) : (
              <>
                <Palette className="mr-2 h-5 w-5" />
                <span>Personalizar UI</span>
                <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
              </>
            )}
          </Button>
          <Button size="lg">
            <PlusCircle className="mr-2 h-5 w-5" />
            Novo Processo
          </Button>
        </div>
      }
      customizable={editMode}
    >
      <Tabs 
        value={editMode ? "editor" : activeTab} 
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="processes">Processos</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Processos de Due Diligence Recentes</h3>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs bg-muted/50">
                      <tr>
                        <th className="px-4 py-3">Empresa</th>
                        <th className="px-4 py-3">Tipo</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Data de Início</th>
                        <th className="px-4 py-3">Responsável</th>
                        <th className="px-4 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="px-4 py-3">Empresa ABC Ltda</td>
                        <td className="px-4 py-3">Completa</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Em andamento
                          </span>
                        </td>
                        <td className="px-4 py-3">15/05/2023</td>
                        <td className="px-4 py-3">João Silva</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">XYZ Serviços S.A.</td>
                        <td className="px-4 py-3">Simplificada</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Concluída
                          </span>
                        </td>
                        <td className="px-4 py-3">20/04/2023</td>
                        <td className="px-4 py-3">Maria Santos</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Tech Solutions Inc.</td>
                        <td className="px-4 py-3">Completa</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Pendente de aprovação
                          </span>
                        </td>
                        <td className="px-4 py-3">01/06/2023</td>
                        <td className="px-4 py-3">Pedro Costa</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-3">Global Imports Ltda</td>
                        <td className="px-4 py-3">Simplificada</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Em andamento
                          </span>
                        </td>
                        <td className="px-4 py-3">28/05/2023</td>
                        <td className="px-4 py-3">Ana Oliveira</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Construções Rápidas S.A.</td>
                        <td className="px-4 py-3">Simplificada</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            Em análise
                          </span>
                        </td>
                        <td className="px-4 py-3">10/06/2023</td>
                        <td className="px-4 py-3">Carlos Pereira</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="icon">
                            <FileCheck className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm h-full">
                <h3 className="text-lg font-semibold mb-4">Status dos Processos de Due Diligence</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Gráfico de status dos processos de Due Diligence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm h-full">
                <h3 className="text-lg font-semibold mb-4">Distribuição por Tipo</h3>
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">
                      Gráfico de distribuição por tipo de processo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="editor">
          <CustomizableLayout />
        </TabsContent>
        
        <TabsContent value="processes">
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Processos de Due Diligence</h3>
              <p className="text-muted-foreground mb-6">
                Lista de todos os processos de due diligence
              </p>
              <div className="text-center p-12 border border-dashed rounded-md">
                <p className="text-muted-foreground">Conteúdo dos processos será exibido aqui</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="policies">
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Políticas e Procedimentos</h3>
              <p className="text-muted-foreground mb-6">
                Políticas e procedimentos relacionados à due diligence
              </p>
              <div className="text-center p-12 border border-dashed rounded-md">
                <p className="text-muted-foreground">Conteúdo das políticas será exibido aqui</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Relatórios</h3>
              <p className="text-muted-foreground mb-6">
                Relatórios e análises de due diligence
              </p>
              <div className="text-center p-12 border border-dashed rounded-md">
                <p className="text-muted-foreground">Relatórios serão exibidos aqui</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default DueDiligencePage;
