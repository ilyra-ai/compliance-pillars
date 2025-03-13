
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import {
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Plus,
  Trash2,
  Save,
  FileUp,
  LayoutDashboard,
  Database,
  Settings,
  RefreshCw,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

interface PowerBIDashboardProps {
  onSave?: (dashboard: any) => void;
}

// Sample data for charts
const sampleData = [
  { name: 'Jan', value: 400, value2: 240, value3: 180 },
  { name: 'Fev', value: 300, value2: 139, value3: 220 },
  { name: 'Mar', value: 200, value2: 980, value3: 150 },
  { name: 'Abr', value: 278, value2: 390, value3: 310 },
  { name: 'Mai', value: 189, value2: 480, value3: 180 },
  { name: 'Jun', value: 239, value2: 380, value3: 250 },
  { name: 'Jul', value: 349, value2: 430, value3: 210 },
];

const pieData = [
  { name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 300 },
  { name: 'Grupo D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({ onSave }) => {
  const [activeTab, setActiveTab] = useState('builder');
  const [dashboardTitle, setDashboardTitle] = useState('Meu Dashboard Personalizado');
  const [chartType, setChartType] = useState('bar');
  const [dataSource, setDataSource] = useState('sample');
  const [powerBIUrl, setPowerBIUrl] = useState('');
  const [widgets, setWidgets] = useState([
    { id: '1', type: 'bar', title: 'Métricas Mensais', data: sampleData },
    { id: '2', type: 'line', title: 'Tendências', data: sampleData },
    { id: '3', type: 'pie', title: 'Distribuição', data: pieData }
  ]);

  const handleAddWidget = () => {
    const newWidget = {
      id: Date.now().toString(),
      type: chartType,
      title: `Novo Gráfico ${widgets.length + 1}`,
      data: chartType === 'pie' ? pieData : sampleData
    };
    setWidgets([...widgets, newWidget]);
    toast.success('Novo widget adicionado ao dashboard');
  };

  const handleRemoveWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
    toast.success('Widget removido do dashboard');
  };

  const handleSaveDashboard = () => {
    if (onSave) {
      onSave({
        title: dashboardTitle,
        widgets: widgets
      });
    }
    toast.success('Dashboard salvo com sucesso!');
  };

  const handleConnectPowerBI = () => {
    if (powerBIUrl) {
      toast.success('Conectado ao relatório Power BI!');
    } else {
      toast.error('Por favor, insira uma URL do Power BI');
    }
  };

  const handleImportCSV = () => {
    // This would open a file dialog in a real implementation
    toast.success('Funcionalidade de importação de CSV iniciada');
  };

  const renderChart = (widget: any) => {
    switch (widget.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
              <Bar dataKey="value2" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={widget.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {widget.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Builder</CardTitle>
          <CardDescription>
            Crie dashboards personalizados ou integre com o Power BI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="builder">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard Builder
              </TabsTrigger>
              <TabsTrigger value="powerbi">
                <ExternalLink className="mr-2 h-4 w-4" />
                Power BI Embeddings
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="builder" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="dashboard-title">Título do Dashboard</Label>
                  <Input 
                    id="dashboard-title" 
                    value={dashboardTitle} 
                    onChange={(e) => setDashboardTitle(e.target.value)} 
                  />
                </div>
                
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="chart-type">Tipo de Gráfico</Label>
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger id="chart-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Gráfico de Barras</SelectItem>
                      <SelectItem value="line">Gráfico de Linha</SelectItem>
                      <SelectItem value="pie">Gráfico de Pizza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-1/3 space-y-2">
                  <Label htmlFor="data-source">Fonte de Dados</Label>
                  <Select value={dataSource} onValueChange={setDataSource}>
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Selecione a fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sample">Dados de Exemplo</SelectItem>
                      <SelectItem value="csv">Importar CSV</SelectItem>
                      <SelectItem value="database">Conectar Banco de Dados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleImportCSV}>
                  <FileUp className="mr-2 h-4 w-4" />
                  Importar Dados
                </Button>
                <Button onClick={handleAddWidget}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Widget
                </Button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {widgets.map(widget => (
                  <Card key={widget.id} className="overflow-hidden">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between space-y-0">
                      <CardTitle className="text-base font-medium">{widget.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleRemoveWidget(widget.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {renderChart(widget)}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="powerbi" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Incorporar Power BI Externo</CardTitle>
                  <CardDescription>
                    Conecte-se com painéis Power BI existentes da Microsoft
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="powerbi-url">URL do Relatório Power BI</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="powerbi-url" 
                        value={powerBIUrl} 
                        onChange={(e) => setPowerBIUrl(e.target.value)} 
                        placeholder="https://app.powerbi.com/..." 
                      />
                      <Button onClick={handleConnectPowerBI}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Conectar
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Cole uma URL de incorporação do Power BI da Microsoft
                    </p>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <BarChart3 className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Relatório de Vendas</h3>
                          <p className="text-sm text-muted-foreground">Dashboard Power BI corporativo</p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <PieChartIcon className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Análise de Clientes</h3>
                          <p className="text-sm text-muted-foreground">Segmentação e comportamento</p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 hover:border-primary cursor-pointer transition-all">
                        <div className="flex flex-col items-center text-center">
                          <LineChartIcon className="h-20 w-20 text-primary mb-2" />
                          <h3 className="text-lg font-medium">Métricas Financeiras</h3>
                          <p className="text-sm text-muted-foreground">Indicadores e tendências</p>
                        </div>
                      </Card>
                    </div>
                    
                    {powerBIUrl && (
                      <div className="mt-4 border rounded-md bg-gray-50 p-4 h-[400px] flex items-center justify-center">
                        <div className="text-center">
                          <LayoutDashboard className="h-12 w-12 text-primary mx-auto mb-2" />
                          <p className="text-muted-foreground">
                            Prévia do relatório Power BI será carregada aqui
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Dashboard</CardTitle>
                  <CardDescription>
                    Personalize as configurações e opções de exibição
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="refresh-interval">Intervalo de Atualização</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="refresh-interval">
                          <SelectValue placeholder="Selecione o intervalo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Manual</SelectItem>
                          <SelectItem value="15">15 segundos</SelectItem>
                          <SelectItem value="30">30 segundos</SelectItem>
                          <SelectItem value="60">1 minuto</SelectItem>
                          <SelectItem value="300">5 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme-select">Tema do Dashboard</Label>
                      <Select defaultValue="light">
                        <SelectTrigger id="theme-select">
                          <SelectValue placeholder="Selecione o tema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Claro</SelectItem>
                          <SelectItem value="dark">Escuro</SelectItem>
                          <SelectItem value="system">Sistema</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="data-connection">Conexão de Dados</Label>
                      <Select defaultValue="local">
                        <SelectTrigger id="data-connection">
                          <SelectValue placeholder="Selecione a conexão" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Dados Locais</SelectItem>
                          <SelectItem value="mysql">MySQL</SelectItem>
                          <SelectItem value="postgres">PostgreSQL</SelectItem>
                          <SelectItem value="sqlserver">SQL Server</SelectItem>
                          <SelectItem value="api">API REST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="export-format">Formato de Exportação</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger id="export-format">
                          <SelectValue placeholder="Selecione o formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="image">Imagem (PNG)</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Restaurar Padrões
                    </Button>
                    <Button onClick={() => toast.success('Configurações salvas!')}>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Compartilhar
            </Button>
          </div>
          <Button onClick={handleSaveDashboard}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PowerBIDashboard;
