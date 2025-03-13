
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Filter, 
  Settings, 
  Download, 
  Copy, 
  Trash2, 
  Edit2, 
  Plus,
  Move
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CustomChartBuilder from '@/components/charts/CustomChartBuilder';

interface PillarChartWidgetProps {
  pillarId: string;
  draggable?: boolean;
  onSave?: (chartData: any) => void;
}

const PillarChartWidget: React.FC<PillarChartWidgetProps> = ({ 
  pillarId, 
  draggable = true,
  onSave 
}) => {
  const [chartType, setChartType] = useState<string>('bar');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const handleChartSave = (data: any) => {
    toast.success('Gráfico salvo com sucesso!');
    if (onSave) onSave(data);
  };
  
  const handleAddNewChart = () => {
    setEditMode(true);
    toast.success('Novo gráfico em criação...');
  };
  
  const handleExportChart = () => {
    toast.success('Gráfico exportado!');
  };
  
  return (
    <Card className={`w-full ${draggable ? 'cursor-move' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">
          Gráficos e Indicadores
        </CardTitle>
        <div className="flex space-x-1">
          {draggable && (
            <Button variant="ghost" size="icon">
              <Move className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setEditMode(!editMode)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showFilters && (
          <div className="bg-muted/30 p-3 rounded-md mb-4 space-y-3">
            <h3 className="text-sm font-medium">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="filter-date">Período</Label>
                <Select defaultValue="month">
                  <SelectTrigger id="filter-date">
                    <SelectValue placeholder="Período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Última Semana</SelectItem>
                    <SelectItem value="month">Último Mês</SelectItem>
                    <SelectItem value="quarter">Último Trimestre</SelectItem>
                    <SelectItem value="year">Último Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="filter-category">Categoria</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="filter-category">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="risk">Riscos</SelectItem>
                    <SelectItem value="audit">Auditoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end space-x-2">
                <Button variant="outline" size="sm" className="mt-auto" onClick={() => setShowFilters(false)}>
                  Cancelar
                </Button>
                <Button size="sm" className="mt-auto" onClick={() => {
                  toast.success('Filtros aplicados!');
                  setShowFilters(false);
                }}>
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {editMode ? (
          <div className="space-y-4">
            <Tabs defaultValue="type">
              <TabsList className="mb-4">
                <TabsTrigger value="type">Tipo de Gráfico</TabsTrigger>
                <TabsTrigger value="data">Dados</TabsTrigger>
                <TabsTrigger value="style">Estilo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card className={`p-3 cursor-pointer hover:border-primary ${chartType === 'bar' ? 'border-primary' : ''}`}
                    onClick={() => setChartType('bar')}>
                    <div className="flex flex-col items-center text-center">
                      <BarChart3 className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Barras</span>
                    </div>
                  </Card>
                  
                  <Card className={`p-3 cursor-pointer hover:border-primary ${chartType === 'line' ? 'border-primary' : ''}`}
                    onClick={() => setChartType('line')}>
                    <div className="flex flex-col items-center text-center">
                      <LineChart className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Linhas</span>
                    </div>
                  </Card>
                  
                  <Card className={`p-3 cursor-pointer hover:border-primary ${chartType === 'pie' ? 'border-primary' : ''}`}
                    onClick={() => setChartType('pie')}>
                    <div className="flex flex-col items-center text-center">
                      <PieChart className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Pizza</span>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="chart-title">Título do Gráfico</Label>
                    <Input id="chart-title" placeholder="Digite o título do gráfico" />
                  </div>
                  
                  <div>
                    <Label htmlFor="data-source">Fonte de Dados</Label>
                    <Select defaultValue="manual">
                      <SelectTrigger id="data-source">
                        <SelectValue placeholder="Selecione a fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Inserir Manualmente</SelectItem>
                        <SelectItem value="csv">Importar CSV</SelectItem>
                        <SelectItem value="database">Banco de Dados</SelectItem>
                        <SelectItem value="api">API Externa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="style" className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="show-legend" defaultChecked />
                    <Label htmlFor="show-legend">Mostrar Legenda</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="show-axis" defaultChecked />
                    <Label htmlFor="show-axis">Mostrar Eixos</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="show-grid" defaultChecked />
                    <Label htmlFor="show-grid">Mostrar Grade</Label>
                  </div>
                  
                  <div>
                    <Label htmlFor="chart-colors">Paleta de Cores</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="chart-colors">
                        <SelectValue placeholder="Selecione a paleta" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Padrão</SelectItem>
                        <SelectItem value="monochrome">Monocromático</SelectItem>
                        <SelectItem value="colorful">Colorido</SelectItem>
                        <SelectItem value="pastel">Pastel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                handleChartSave({ type: chartType });
                setEditMode(false);
              }}>
                Salvar Gráfico
              </Button>
            </div>
          </div>
        ) : (
          <>
            <CustomChartBuilder initialType={chartType as any} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <Button variant="outline" onClick={handleExportChart} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button onClick={handleAddNewChart} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Novo Gráfico
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PillarChartWidget;
