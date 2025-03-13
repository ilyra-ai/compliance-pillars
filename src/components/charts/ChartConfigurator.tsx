
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Save, 
  AreaChart, 
  Table,
  Check,
  Settings,
  Copy,
  ArrowRight,
  FileDown
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Dados de exemplo
const sampleData = [
  { name: 'Jan', valor: 12, quantidade: 24 },
  { name: 'Fev', valor: 19, quantidade: 22 },
  { name: 'Mar', valor: 9, quantidade: 18 },
  { name: 'Abr', valor: 15, quantidade: 30 },
  { name: 'Mai', valor: 10, quantidade: 28 },
  { name: 'Jun', valor: 5, quantidade: 32 },
];

const pieData = [
  { name: 'Compliant', value: 75, color: '#10b981' },
  { name: 'Não Compliant', value: 25, color: '#ef4444' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface ChartConfiguratorProps {
  pillarId?: string;
  onSave?: (config: any) => void;
}

const ChartConfigurator: React.FC<ChartConfiguratorProps> = ({ pillarId, onSave }) => {
  const [activeTab, setActiveTab] = useState('config');
  const [chartType, setChartType] = useState('bar');
  const [chartTitle, setChartTitle] = useState('Título do Gráfico');
  const [chartDescription, setChartDescription] = useState('Descrição do gráfico');
  const [dataSource, setDataSource] = useState('static');
  const [showTable, setShowTable] = useState(false);
  
  const handleSaveChart = () => {
    const chartConfig = {
      type: chartType,
      title: chartTitle,
      description: chartDescription,
      dataSource,
      pillarId
    };
    
    if (onSave) {
      onSave(chartConfig);
    }
    
    toast.success('Configuração do gráfico salva com sucesso!');
  };

  const handleChartClick = () => {
    setShowTable(!showTable);
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="config" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="config">Configuração</TabsTrigger>
          <TabsTrigger value="preview">Visualização</TabsTrigger>
          <TabsTrigger value="data">Dados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Configuração do Gráfico</CardTitle>
              <CardDescription>Defina o tipo e as propriedades do gráfico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="chart-title">Título do Gráfico</Label>
                <Input 
                  id="chart-title" 
                  value={chartTitle} 
                  onChange={(e) => setChartTitle(e.target.value)} 
                  placeholder="Digite o título do gráfico"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chart-description">Descrição</Label>
                <Textarea 
                  id="chart-description" 
                  value={chartDescription} 
                  onChange={(e) => setChartDescription(e.target.value)} 
                  placeholder="Digite uma descrição para o gráfico"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chart-type">Tipo de Gráfico</Label>
                <Select defaultValue={chartType} onValueChange={setChartType}>
                  <SelectTrigger id="chart-type">
                    <SelectValue placeholder="Selecione o tipo de gráfico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">
                      <div className="flex items-center">
                        <BarChart className="mr-2 h-4 w-4" />
                        <span>Gráfico de Barras</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="line">
                      <div className="flex items-center">
                        <LineChartIcon className="mr-2 h-4 w-4" />
                        <span>Gráfico de Linhas</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pie">
                      <div className="flex items-center">
                        <PieChartIcon className="mr-2 h-4 w-4" />
                        <span>Gráfico de Pizza</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="area">
                      <div className="flex items-center">
                        <AreaChart className="mr-2 h-4 w-4" />
                        <span>Gráfico de Área</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-source">Fonte de Dados</Label>
                <Select defaultValue={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger id="data-source">
                    <SelectValue placeholder="Selecione a fonte de dados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="static">Dados Estáticos (Exemplo)</SelectItem>
                    <SelectItem value="riscos">Riscos</SelectItem>
                    <SelectItem value="politicas">Políticas</SelectItem>
                    <SelectItem value="denuncias">Denúncias</SelectItem>
                    <SelectItem value="treinamentos">Treinamentos</SelectItem>
                    <SelectItem value="auditorias">Auditorias</SelectItem>
                    <SelectItem value="api">API Externa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {dataSource === 'api' && (
                <div className="space-y-2">
                  <Label htmlFor="api-endpoint">Endpoint da API</Label>
                  <Input 
                    id="api-endpoint" 
                    placeholder="https://api.exemplo.com/dados" 
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Opções de Exibição</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="show-legend" className="h-4 w-4" checked />
                    <Label htmlFor="show-legend">Mostrar Legenda</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="show-grid" className="h-4 w-4" checked />
                    <Label htmlFor="show-grid">Mostrar Grade</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="show-tooltip" className="h-4 w-4" checked />
                    <Label htmlFor="show-tooltip">Mostrar Tooltip</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="interactive" className="h-4 w-4" checked />
                    <Label htmlFor="interactive">Interativo</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Duplicar
              </Button>
              <Button onClick={handleSaveChart}>
                <Save className="mr-2 h-4 w-4" />
                Salvar Configuração
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{chartTitle}</CardTitle>
              <CardDescription>{chartDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 w-full cursor-pointer" onClick={handleChartClick}>
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' && (
                    <RechartsBarChart
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="valor" fill="#8884d8" name="Valor" />
                      <Bar dataKey="quantidade" fill="#82ca9d" name="Quantidade" />
                    </RechartsBarChart>
                  )}
                  
                  {chartType === 'line' && (
                    <LineChart
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="valor" stroke="#8884d8" name="Valor" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="quantidade" stroke="#82ca9d" name="Quantidade" />
                    </LineChart>
                  )}
                  
                  {chartType === 'pie' && (
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                  
                  {chartType === 'area' && (
                    <RechartsAreaChart
                      data={sampleData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <defs>
                        <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorQtd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="valor" stroke="#8884d8" fillOpacity={1} fill="url(#colorValor)" name="Valor" />
                      <Area type="monotone" dataKey="quantidade" stroke="#82ca9d" fillOpacity={1} fill="url(#colorQtd)" name="Quantidade" />
                    </RechartsAreaChart>
                  )}
                </ResponsiveContainer>
              </div>
              
              {showTable && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Dados do Gráfico</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border px-4 py-2 text-left">Período</th>
                          <th className="border px-4 py-2 text-left">Valor</th>
                          <th className="border px-4 py-2 text-left">Quantidade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sampleData.map((item, index) => (
                          <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.valor}</td>
                            <td className="border px-4 py-2">{item.quantidade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowTable(!showTable)}>
                <Table className="mr-2 h-4 w-4" />
                {showTable ? 'Ocultar Tabela' : 'Mostrar Tabela'}
              </Button>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Exportar Imagem
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Dados do Gráfico</CardTitle>
              <CardDescription>Configure a fonte de dados ou insira manualmente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-input">Dados (formato JSON)</Label>
                <Textarea 
                  id="data-input" 
                  className="font-mono text-sm h-60"
                  defaultValue={JSON.stringify(sampleData, null, 2)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="x-axis">Eixo X (campo)</Label>
                <Select defaultValue="name">
                  <SelectTrigger id="x-axis">
                    <SelectValue placeholder="Selecione o campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">name</SelectItem>
                    <SelectItem value="periodo">periodo</SelectItem>
                    <SelectItem value="data">data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Séries de Dados (Eixo Y)</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="serie-valor" className="h-4 w-4" checked />
                    <Label htmlFor="serie-valor">Valor</Label>
                    <Input className="w-20 ml-auto" type="color" defaultValue="#8884d8" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="serie-quantidade" className="h-4 w-4" checked />
                    <Label htmlFor="serie-quantidade">Quantidade</Label>
                    <Input className="w-20 ml-auto" type="color" defaultValue="#82ca9d" />
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    + Adicionar Série
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" />
                Testar Dados
              </Button>
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Aplicar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChartConfigurator;
