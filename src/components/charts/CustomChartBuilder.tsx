
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Plus, Trash2, Settings, Save } from 'lucide-react';
import { toast } from 'sonner';

// Dados de exemplo
const sampleData = [
  { name: 'Jan', valor: 400, quantidade: 240 },
  { name: 'Fev', valor: 300, quantidade: 139 },
  { name: 'Mar', valor: 200, quantidade: 980 },
  { name: 'Abr', valor: 278, quantidade: 390 },
  { name: 'Mai', valor: 189, quantidade: 480 },
  { name: 'Jun', valor: 239, quantidade: 380 },
  { name: 'Jul', valor: 349, quantidade: 430 },
];

const chartColors = [
  '#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#14B8A6', '#F97316', '#3B82F6'
];

interface ChartSeries {
  id: string;
  dataKey: string;
  color: string;
  type: 'line' | 'bar' | 'area' | 'pie';
}

interface ChartConfigState {
  title: string;
  type: 'line' | 'bar' | 'area' | 'pie';
  data: any[];
  series: ChartSeries[];
  showGrid: boolean;
  showLegend: boolean;
  stacked: boolean;
  xAxisKey: string;
  height: number;
}

export interface CustomChartBuilderProps {
  initialData?: any[];
  onSave?: (config: ChartConfigState) => void;
  pillarId?: string;
}

const CustomChartBuilder: React.FC<CustomChartBuilderProps> = ({ 
  initialData = sampleData,
  onSave,
  pillarId 
}) => {
  const [chartConfig, setChartConfig] = useState<ChartConfigState>({
    title: 'Meu Gráfico Personalizado',
    type: 'bar',
    data: initialData,
    series: [
      { 
        id: '1', 
        dataKey: 'valor', 
        color: chartColors[0],
        type: 'bar' 
      },
    ],
    showGrid: true,
    showLegend: true,
    stacked: false,
    xAxisKey: 'name',
    height: 400
  });
  
  const [expanded, setExpanded] = useState(true);
  const [dataKeysOptions, setDataKeysOptions] = useState<string[]>(() => {
    // Extrair todas as chaves possíveis dos dados, exceto o eixo X
    if (initialData && initialData.length > 0) {
      return Object.keys(initialData[0]).filter(key => key !== chartConfig.xAxisKey);
    }
    return ['valor', 'quantidade'];
  });

  const toggleExpanded = () => setExpanded(!expanded);

  const handleTypeChange = (type: 'line' | 'bar' | 'area' | 'pie') => {
    setChartConfig(prev => ({
      ...prev,
      type,
      series: prev.series.map(s => ({ ...s, type }))
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartConfig(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleAddSeries = () => {
    const newSeries = {
      id: Date.now().toString(),
      dataKey: dataKeysOptions[0] || 'valor',
      color: chartColors[chartConfig.series.length % chartColors.length],
      type: chartConfig.type
    };
    
    setChartConfig(prev => ({
      ...prev,
      series: [...prev.series, newSeries]
    }));
  };

  const handleRemoveSeries = (id: string) => {
    setChartConfig(prev => ({
      ...prev,
      series: prev.series.filter(s => s.id !== id)
    }));
  };

  const handleSeriesChange = (id: string, field: keyof ChartSeries, value: any) => {
    setChartConfig(prev => ({
      ...prev,
      series: prev.series.map(s => 
        s.id === id ? { ...s, [field]: value } : s
      )
    }));
  };

  const handleSaveChart = () => {
    if (onSave) {
      onSave(chartConfig);
      toast.success('Gráfico salvo com sucesso!');
    } else {
      console.log('Chart config saved:', chartConfig);
      toast.success('Gráfico configurado! (modo demonstração)');
    }
  };

  const renderChart = () => {
    switch (chartConfig.type) {
      case 'line':
        return (
          <LineChart 
            data={chartConfig.data}
            stackId={chartConfig.stacked ? 'a' : undefined}
          >
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={chartConfig.xAxisKey} />
            <YAxis />
            <Tooltip />
            {chartConfig.showLegend && <Legend />}
            {chartConfig.series.map(series => (
              <Line 
                key={series.id}
                type="monotone"
                dataKey={series.dataKey}
                stroke={series.color}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart 
            data={chartConfig.data}
          >
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={chartConfig.xAxisKey} />
            <YAxis />
            <Tooltip />
            {chartConfig.showLegend && <Legend />}
            {chartConfig.series.map(series => (
              <Bar 
                key={series.id}
                dataKey={series.dataKey}
                fill={series.color}
                stackId={chartConfig.stacked ? 'a' : undefined}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart 
            data={chartConfig.data}
          >
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={chartConfig.xAxisKey} />
            <YAxis />
            <Tooltip />
            {chartConfig.showLegend && <Legend />}
            {chartConfig.series.map(series => (
              <Area 
                key={series.id}
                type="monotone"
                dataKey={series.dataKey}
                fill={series.color}
                stroke={series.color}
                stackId={chartConfig.stacked ? 'a' : undefined}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        return (
          <PieChart>
            {chartConfig.series.map((series, index) => (
              <Pie 
                key={series.id}
                data={chartConfig.data} 
                dataKey={series.dataKey}
                nameKey={chartConfig.xAxisKey}
                cx="50%" 
                cy="50%" 
                outerRadius={80 + (index * 10)} 
                fill={series.color}
                label
              />
            ))}
            <Tooltip />
            {chartConfig.showLegend && <Legend />}
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle>{chartConfig.title || 'Gráfico Sem Título'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={toggleExpanded}>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
          
          {expanded && (
            <div className="mt-6 space-y-6 border-t pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações Básicas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chart-title">Título do Gráfico</Label>
                    <Input 
                      id="chart-title"
                      value={chartConfig.title} 
                      onChange={handleTitleChange} 
                      placeholder="Título do Gráfico"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="chart-type">Tipo de Gráfico</Label>
                    <Select 
                      value={chartConfig.type}
                      onValueChange={(value) => handleTypeChange(value as any)}
                    >
                      <SelectTrigger id="chart-type">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Barras</SelectItem>
                        <SelectItem value="line">Linha</SelectItem>
                        <SelectItem value="area">Área</SelectItem>
                        <SelectItem value="pie">Pizza</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="show-grid"
                      checked={chartConfig.showGrid}
                      onCheckedChange={(checked) => setChartConfig(prev => ({...prev, showGrid: checked}))}
                    />
                    <Label htmlFor="show-grid">Mostrar Grade</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="show-legend"
                      checked={chartConfig.showLegend}
                      onCheckedChange={(checked) => setChartConfig(prev => ({...prev, showLegend: checked}))}
                    />
                    <Label htmlFor="show-legend">Mostrar Legenda</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="stacked"
                      checked={chartConfig.stacked}
                      onCheckedChange={(checked) => setChartConfig(prev => ({...prev, stacked: checked}))}
                    />
                    <Label htmlFor="stacked">Empilhado</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chart-height">Altura do Gráfico: {chartConfig.height}px</Label>
                  <Slider
                    id="chart-height"
                    min={200}
                    max={600}
                    step={10}
                    value={[chartConfig.height]}
                    onValueChange={(values) => setChartConfig(prev => ({...prev, height: values[0]}))}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Séries de Dados</h3>
                  <Button variant="outline" size="sm" onClick={handleAddSeries}>
                    <Plus size={16} className="mr-1" /> Adicionar Série
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {chartConfig.series.map((series, index) => (
                    <div key={series.id} className="flex items-center gap-2 border p-3 rounded-md">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: series.color }} />
                      
                      <Select
                        value={series.dataKey}
                        onValueChange={(value) => handleSeriesChange(series.id, 'dataKey', value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Selecione o campo" />
                        </SelectTrigger>
                        <SelectContent>
                          {dataKeysOptions.map(key => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Input
                        type="color"
                        value={series.color}
                        onChange={(e) => handleSeriesChange(series.id, 'color', e.target.value)}
                        className="w-16 p-1 h-9"
                      />
                      
                      {chartConfig.series.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleRemoveSeries(series.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button onClick={handleSaveChart}>
                  <Save size={16} className="mr-2" /> Salvar Gráfico
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomChartBuilder;
