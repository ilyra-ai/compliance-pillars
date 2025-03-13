
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  BarChart3,
  PieChart,
  LineChart,
  BarChart,
  Table,
  RefreshCw,
  FileUp,
  Download,
  Plus,
  Trash,
  Share,
  Pencil
} from 'lucide-react';

interface PowerBIDashboardProps {
  onSave?: (dashboard: any) => void;
}

const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('charts');
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard Principal');
  const [charts, setCharts] = useState<{ id: string; type: string; title: string; data: any }[]>([
    { id: '1', type: 'bar', title: 'Vendas por Região', data: { labels: ['Norte', 'Sul', 'Leste', 'Oeste'], values: [25, 40, 30, 50] } },
    { id: '2', type: 'pie', title: 'Distribuição de Clientes', data: { labels: ['Novos', 'Recorrentes', 'Inativos'], values: [30, 45, 25] } },
    { id: '3', type: 'line', title: 'Tendência de Vendas', data: { labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'], values: [10, 15, 13, 22, 30, 45] } }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample data sources
  const dataSources = [
    { id: 'ds1', name: 'Vendas Mensais', type: 'csv' },
    { id: 'ds2', name: 'CRM Clientes', type: 'database' },
    { id: 'ds3', name: 'Contratos', type: 'api' }
  ];
  
  const handleAddChart = () => {
    const newChart = {
      id: Date.now().toString(),
      type: 'bar',
      title: 'Novo Gráfico',
      data: { labels: ['A', 'B', 'C', 'D'], values: [10, 20, 30, 40] }
    };
    
    setCharts([...charts, newChart]);
    toast.success('Novo gráfico adicionado');
  };
  
  const handleDeleteChart = (id: string) => {
    setCharts(charts.filter(chart => chart.id !== id));
    toast.info('Gráfico removido');
  };
  
  const handleSaveDashboard = () => {
    const dashboard = {
      title: dashboardTitle,
      charts: charts
    };
    
    if (onSave) {
      onSave(dashboard);
    }
    
    toast.success('Dashboard salvo com sucesso!');
  };
  
  // Function to render a chart based on its type
  const renderChart = (chart: { id: string; type: string; title: string; data: any }) => {
    return (
      <Card key={chart.id} className="mb-4">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-lg">{chart.title}</CardTitle>
          {isEditing && (
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" onClick={() => handleDeleteChart(chart.id)}>
                <Trash className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          {chart.type === 'bar' && (
            <div className="flex flex-col items-center">
              <BarChart3 className="h-32 w-32 text-primary" />
              <p className="text-center mt-2">Gráfico de barras (visualização simulada)</p>
            </div>
          )}
          {chart.type === 'pie' && (
            <div className="flex flex-col items-center">
              <PieChart className="h-32 w-32 text-primary" />
              <p className="text-center mt-2">Gráfico de pizza (visualização simulada)</p>
            </div>
          )}
          {chart.type === 'line' && (
            <div className="flex flex-col items-center">
              <LineChart className="h-32 w-32 text-primary" />
              <p className="text-center mt-2">Gráfico de linha (visualização simulada)</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          <Input 
            value={dashboardTitle}
            onChange={(e) => setDashboardTitle(e.target.value)}
            className="text-xl font-bold"
            placeholder="Título do Dashboard"
          />
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Concluir Edição' : 'Editar Dashboard'}
          </Button>
          <Button onClick={handleSaveDashboard}>
            Salvar Dashboard
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="charts">
            <BarChart className="h-4 w-4 mr-2" />
            Gráficos
          </TabsTrigger>
          <TabsTrigger value="tables">
            <Table className="h-4 w-4 mr-2" />
            Tabelas
          </TabsTrigger>
          <TabsTrigger value="data">
            <FileUp className="h-4 w-4 mr-2" />
            Fontes de Dados
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          {isEditing && (
            <div className="flex justify-end mb-4">
              <Button onClick={handleAddChart}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Gráfico
              </Button>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {charts.map(renderChart)}
          </div>
        </TabsContent>
        
        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle>Tabelas de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <Table className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Visualizações em Tabela</h3>
                <p className="text-muted-foreground mb-4">Crie e gerencie visualizações em formato de tabela para seus dados.</p>
                {isEditing && (
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Tabela
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Dados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <div className="flex-1">
                  <Label htmlFor="data-source">Fonte de Dados</Label>
                  <Select defaultValue="csv">
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Selecione uma origem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">Arquivo CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="database">Banco de Dados</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <FileUp className="h-4 w-4 mr-2" />
                  Importar Dados
                </Button>
              </div>
              
              <div className="border rounded-md">
                <h3 className="text-sm font-medium border-b p-2">Fontes Conectadas</h3>
                <div className="divide-y">
                  {dataSources.map(source => (
                    <div key={source.id} className="flex justify-between items-center p-3">
                      <div>
                        <h4 className="font-medium">{source.name}</h4>
                        <p className="text-sm text-muted-foreground">Tipo: {source.type}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PowerBIDashboard;
