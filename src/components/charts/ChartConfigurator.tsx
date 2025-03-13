
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { BarChart3, PieChart, LineChart, AreaChart, Settings, Plus, Database, ArrowRight, Download, Upload, ExternalLink } from 'lucide-react';
import { BarChart, LineChart as ReLineChart, PieChart as RePieChart, AreaChart as ReAreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, Pie, Area } from 'recharts';
import { toast } from 'sonner';

// Dados de exemplo para os gráficos
const sampleData = [
  { name: 'Jan', value: 400, value2: 240 },
  { name: 'Fev', value: 300, value2: 139 },
  { name: 'Mar', value: 200, value2: 980 },
  { name: 'Abr', value: 278, value2: 390 },
  { name: 'Mai', value: 189, value2: 480 },
  { name: 'Jun', value: 239, value2: 380 },
  { name: 'Jul', value: 349, value2: 430 },
];

const pieData = [
  { name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 300 },
  { name: 'Grupo D', value: 200 },
];

interface ChartConfiguratorProps {
  onSave?: (config: any) => void;
  initialConfig?: any;
  standalone?: boolean;
}

const ChartConfigurator: React.FC<ChartConfiguratorProps> = ({ 
  onSave, 
  initialConfig = {}, 
  standalone = true 
}) => {
  const [chartType, setChartType] = useState<string>(initialConfig.chartType || 'bar');
  const [chartTitle, setChartTitle] = useState<string>(initialConfig.title || 'Novo Gráfico');
  const [showLegend, setShowLegend] = useState<boolean>(initialConfig.showLegend ?? true);
  const [isStacked, setIsStacked] = useState<boolean>(initialConfig.isStacked ?? false);
  const [isStatistical, setIsStatistical] = useState<boolean>(initialConfig.isStatistical ?? false);
  const [dataSource, setDataSource] = useState<string>(initialConfig.dataSource || 'sample');
  const [activeTab, setActiveTab] = useState<string>('visual');
  const [colors, setColors] = useState<string[]>(initialConfig.colors || ['#3b82f6', '#ef4444', '#10b981', '#f59e0b']);
  const [animationDuration, setAnimationDuration] = useState<number>(initialConfig.animationDuration || 500);
  
  const handleSave = () => {
    const config = {
      chartType,
      title: chartTitle,
      showLegend,
      isStacked,
      isStatistical,
      dataSource,
      colors,
      animationDuration
    };
    
    if (onSave) {
      onSave(config);
    }
    
    toast.success('Configurações do gráfico salvas com sucesso!');
  };
  
  const handleExport = () => {
    const configToExport = {
      chartType,
      title: chartTitle,
      showLegend,
      isStacked,
      isStatistical,
      dataSource,
      colors,
      animationDuration
    };
    
    const blob = new Blob([JSON.stringify(configToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chart-config-${chartTitle.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Configuração do gráfico exportada com sucesso!');
  };
  
  const renderChartPreview = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Bar dataKey="value" fill={colors[0]} name="Série 1" />
              {isStacked && <Bar dataKey="value2" fill={colors[1]} name="Série 2" />}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Line type="monotone" dataKey="value" stroke={colors[0]} name="Série 1" activeDot={{ r: 8 }} />
              {isStacked && <Line type="monotone" dataKey="value2" stroke={colors[1]} name="Série 2" />}
            </ReLineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill={colors[0]}
                dataKey="value"
                label
              />
              {showLegend && <Legend />}
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ReAreaChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {showLegend && <Legend />}
              <Area type="monotone" dataKey="value" stroke={colors[0]} fill={colors[0]} name="Série 1" />
              {isStacked && <Area type="monotone" dataKey="value2" stroke={colors[1]} fill={colors[1]} name="Série 2" />}
            </ReAreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={standalone ? "w-full" : ""}>
      <CardHeader>
        <CardTitle>{standalone ? 'Configurador de Gráficos' : chartTitle}</CardTitle>
        <CardDescription>Configure e personalize seus gráficos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="data">Dados</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chartTitle">Título do Gráfico</Label>
                  <Input 
                    id="chartTitle" 
                    value={chartTitle} 
                    onChange={(e) => setChartTitle(e.target.value)} 
                    placeholder="Digite o título do gráfico"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Tipo de Gráfico</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button 
                      variant={chartType === 'bar' ? 'default' : 'outline'} 
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setChartType('bar')}
                    >
                      <BarChart3 className="h-6 w-6 mb-1" />
                      <span className="text-xs">Barras</span>
                    </Button>
                    <Button 
                      variant={chartType === 'line' ? 'default' : 'outline'} 
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setChartType('line')}
                    >
                      <LineChart className="h-6 w-6 mb-1" />
                      <span className="text-xs">Linha</span>
                    </Button>
                    <Button 
                      variant={chartType === 'pie' ? 'default' : 'outline'} 
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setChartType('pie')}
                    >
                      <PieChart className="h-6 w-6 mb-1" />
                      <span className="text-xs">Pizza</span>
                    </Button>
                    <Button 
                      variant={chartType === 'area' ? 'default' : 'outline'} 
                      className="flex flex-col items-center justify-center h-20 p-2"
                      onClick={() => setChartType('area')}
                    >
                      <AreaChart className="h-6 w-6 mb-1" />
                      <span className="text-xs">Área</span>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="showLegend" 
                    checked={showLegend} 
                    onCheckedChange={(checked) => setShowLegend(checked as boolean)}
                  />
                  <Label htmlFor="showLegend">Mostrar Legenda</Label>
                </div>
                
                {chartType !== 'pie' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="isStacked" 
                      checked={isStacked} 
                      onCheckedChange={(checked) => setIsStacked(checked as boolean)}
                    />
                    <Label htmlFor="isStacked">Múltiplas Séries</Label>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isStatistical" 
                    checked={isStatistical} 
                    onCheckedChange={(checked) => setIsStatistical(checked as boolean)}
                  />
                  <Label htmlFor="isStatistical">Dados Estatísticos</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="h-[300px] border rounded-md overflow-hidden">
                  {renderChartPreview()}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExport} className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                  <Button onClick={handleSave} className="flex items-center ml-auto">
                    <Settings className="mr-2 h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Fonte de Dados</Label>
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a fonte de dados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sample">Dados de Exemplo</SelectItem>
                    <SelectItem value="csv">Importar CSV</SelectItem>
                    <SelectItem value="api">API Externa</SelectItem>
                    <SelectItem value="database">Banco de Dados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {dataSource === 'database' && (
                <div className="space-y-2">
                  <Label>Tabela do Banco de Dados</Label>
                  <Select defaultValue="users">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a tabela" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="users">Usuários</SelectItem>
                      <SelectItem value="activities">Atividades</SelectItem>
                      <SelectItem value="risks">Riscos</SelectItem>
                      <SelectItem value="controls">Controles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {dataSource === 'api' && (
                <div className="space-y-2">
                  <Label htmlFor="apiEndpoint">URL da API</Label>
                  <Input 
                    id="apiEndpoint" 
                    placeholder="https://api.exemplo.com/dados"
                  />
                  <Button variant="outline" className="mt-2 flex items-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Testar Conexão
                  </Button>
                </div>
              )}
              
              {dataSource === 'csv' && (
                <div className="space-y-2">
                  <Label>Importar Arquivo CSV</Label>
                  <div className="flex items-center gap-2">
                    <Input type="file" accept=".csv" />
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Importar
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <Label>Mapeamento de Dados</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="xAxis">Eixo X</Label>
                    <Select defaultValue="name">
                      <SelectTrigger id="xAxis">
                        <SelectValue placeholder="Selecione o campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Nome</SelectItem>
                        <SelectItem value="date">Data</SelectItem>
                        <SelectItem value="category">Categoria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="yAxis">Eixo Y</Label>
                    <Select defaultValue="value">
                      <SelectTrigger id="yAxis">
                        <SelectValue placeholder="Selecione o campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="value">Valor</SelectItem>
                        <SelectItem value="count">Contagem</SelectItem>
                        <SelectItem value="percentage">Porcentagem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Esquema de Cores</Label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color, index) => (
                    <div key={index} className="space-y-1">
                      <Label htmlFor={`color-${index}`} className="text-xs">Série {index + 1}</Label>
                      <Input 
                        id={`color-${index}`}
                        type="color" 
                        value={color} 
                        onChange={(e) => {
                          const newColors = [...colors];
                          newColors[index] = e.target.value;
                          setColors(newColors);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animationDuration">Duração da Animação: {animationDuration}ms</Label>
                </div>
                <Slider 
                  id="animationDuration"
                  min={0} 
                  max={2000} 
                  step={100} 
                  value={[animationDuration]} 
                  onValueChange={(value) => setAnimationDuration(value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="enableInteraction" />
                  <Label htmlFor="enableInteraction">Habilitar Interatividade</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Permite que os usuários interajam com o gráfico clicando nas séries para visualizar mais detalhes.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="enableExport" />
                  <Label htmlFor="enableExport">Permitir Exportação</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Adiciona opções para os usuários exportarem o gráfico como imagem ou dados CSV.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integration">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Integração com Relatórios</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="addToReports" />
                  <Label htmlFor="addToReports">Adicionar a Relatórios</Label>
                </div>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o relatório" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione...</SelectItem>
                    <SelectItem value="compliance">Relatório de Compliance</SelectItem>
                    <SelectItem value="risks">Relatório de Riscos</SelectItem>
                    <SelectItem value="quarterly">Relatório Trimestral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Integração com Documentos</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="addToDocuments" />
                  <Label htmlFor="addToDocuments">Adicionar a Documentos</Label>
                </div>
                <Select defaultValue="none">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o documento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Selecione...</SelectItem>
                    <SelectItem value="policy">Política de Compliance</SelectItem>
                    <SelectItem value="manual">Manual de Procedimentos</SelectItem>
                    <SelectItem value="presentation">Apresentação Executiva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Atualização de Dados</Label>
                <Select defaultValue="manual">
                  <SelectTrigger>
                    <SelectValue placeholder="Frequência de atualização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="daily">Diária</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Compartilhamento</Label>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox id="enableSharing" />
                  <Label htmlFor="enableSharing">Habilitar Compartilhamento</Label>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    Google Drive
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    OneDrive
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartConfigurator;
