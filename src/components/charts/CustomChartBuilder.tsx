
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { Save, Plus, Trash2, BarChart as BarChartIcon, PieChart as PieChartIcon, LineChart as LineChartIcon } from 'lucide-react';

// Mock data example
const initialData = [
  { name: 'Jan', valor: 400, taxa: 24 },
  { name: 'Fev', valor: 300, taxa: 13 },
  { name: 'Mar', valor: 200, taxa: 98 },
  { name: 'Abr', valor: 278, taxa: 39 },
  { name: 'Mai', valor: 189, taxa: 48 },
  { name: 'Jun', valor: 239, taxa: 38 },
];

// Chart types
const chartTypes = [
  { id: 'bar', name: 'Gráfico de Barras', icon: <BarChartIcon size={16} /> },
  { id: 'line', name: 'Gráfico de Linha', icon: <LineChartIcon size={16} /> },
  { id: 'pie', name: 'Gráfico de Pizza', icon: <PieChartIcon size={16} /> },
  { id: 'area', name: 'Gráfico de Área', icon: <LineChartIcon size={16} /> },
];

// Color presets
const colorPresets = [
  { id: 'blue', colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] },
  { id: 'green', colors: ['#16a34a', '#22c55e', '#4ade80', '#86efac'] },
  { id: 'red', colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5'] },
  { id: 'purple', colors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'] },
  { id: 'orange', colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74'] },
];

interface ChartConfigItem {
  id: string;
  title: string;
  type: string;
  data: any[];
  dataKeys: string[];
  colors: string[];
}

interface CustomChartBuilderProps {
  onSave?: (chart: ChartConfigItem) => void;
  initialChart?: ChartConfigItem;
  readOnly?: boolean;
}

const CustomChartBuilder: React.FC<CustomChartBuilderProps> = ({ onSave, initialChart, readOnly = false }) => {
  const [chartConfig, setChartConfig] = useState<ChartConfigItem>(
    initialChart || {
      id: uuidv4(),
      title: 'Novo Gráfico',
      type: 'bar',
      data: initialData,
      dataKeys: ['valor'],
      colors: colorPresets[0].colors,
    }
  );
  
  const [activeTab, setActiveTab] = useState('preview');
  const [rawData, setRawData] = useState(JSON.stringify(initialData, null, 2));
  
  const handleDataChange = () => {
    try {
      const parsedData = JSON.parse(rawData);
      if (Array.isArray(parsedData)) {
        setChartConfig({ ...chartConfig, data: parsedData });
        toast.success('Dados atualizados com sucesso!');
      } else {
        toast.error('Os dados devem estar em formato de array');
      }
    } catch (error) {
      toast.error('Erro ao processar dados: Formato JSON inválido');
    }
  };
  
  const handleAddDataKey = () => {
    // Detect available keys from the first data item
    if (chartConfig.data.length > 0) {
      const firstItem = chartConfig.data[0];
      const availableKeys = Object.keys(firstItem);
      
      // Find a key that's not already being used
      const unusedKey = availableKeys.find(key => !chartConfig.dataKeys.includes(key));
      
      if (unusedKey) {
        setChartConfig({
          ...chartConfig,
          dataKeys: [...chartConfig.dataKeys, unusedKey]
        });
      } else {
        toast.error('Todas as chaves disponíveis já estão sendo utilizadas');
      }
    }
  };
  
  const handleRemoveDataKey = (keyToRemove: string) => {
    if (chartConfig.dataKeys.length > 1) {
      setChartConfig({
        ...chartConfig,
        dataKeys: chartConfig.dataKeys.filter(key => key !== keyToRemove)
      });
    } else {
      toast.error('Deve haver pelo menos uma chave de dados');
    }
  };
  
  const handleColorPresetChange = (presetId: string) => {
    const preset = colorPresets.find(p => p.id === presetId);
    if (preset) {
      setChartConfig({
        ...chartConfig,
        colors: preset.colors
      });
    }
  };
  
  const handleSaveChart = () => {
    if (onSave) {
      onSave(chartConfig);
      toast.success('Gráfico salvo com sucesso!');
    }
  };
  
  const renderChart = () => {
    switch (chartConfig.type) {
      case 'bar':
        return (
          <BarChart data={chartConfig.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartConfig.dataKeys.map((key, index) => (
              <Bar 
                key={key} 
                dataKey={key} 
                fill={chartConfig.colors[index % chartConfig.colors.length]} 
                name={key}
              />
            ))}
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart data={chartConfig.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartConfig.dataKeys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke={chartConfig.colors[index % chartConfig.colors.length]} 
                name={key}
              />
            ))}
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart data={chartConfig.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {chartConfig.dataKeys.map((key, index) => (
              <Area 
                key={key} 
                type="monotone" 
                dataKey={key} 
                fill={chartConfig.colors[index % chartConfig.colors.length]} 
                stroke={chartConfig.colors[index % chartConfig.colors.length]} 
                name={key}
              />
            ))}
          </AreaChart>
        );
      
      case 'pie':
        return (
          <PieChart>
            <Tooltip />
            <Legend />
            <Pie 
              data={chartConfig.data} 
              dataKey={chartConfig.dataKeys[0]} 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              outerRadius={80} 
              fill="#8884d8"
              label
            >
              {chartConfig.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartConfig.colors[index % chartConfig.colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      
      default:
        return null;
    }
  };
  
  if (readOnly) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{chartConfig.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Construtor de Gráficos Personalizado</CardTitle>
        <CardDescription>Crie gráficos personalizados para seu relatório</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="preview">Visualização</TabsTrigger>
            <TabsTrigger value="data">Dados</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <Label htmlFor="chart-title">Título do Gráfico</Label>
            <Input 
              id="chart-title" 
              value={chartConfig.title} 
              onChange={(e) => setChartConfig({ ...chartConfig, title: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <TabsContent value="preview">
            <div className="border rounded-md p-4 mb-4">
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveChart}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Gráfico
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="data">
            <div className="space-y-4">
              <div>
                <Label>Dados em JSON</Label>
                <textarea 
                  value={rawData}
                  onChange={(e) => setRawData(e.target.value)}
                  className="w-full h-64 mt-1 font-mono text-sm p-2 border rounded-md"
                />
                <Button onClick={handleDataChange} className="mt-2">
                  Atualizar Dados
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Gráfico</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {chartTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={chartConfig.type === type.id ? "default" : "outline"}
                      onClick={() => setChartConfig({ ...chartConfig, type: type.id })}
                      className="flex items-center justify-center"
                    >
                      {type.icon}
                      <span className="ml-2">{type.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Séries de Dados</Label>
                  <Button size="sm" variant="outline" onClick={handleAddDataKey}>
                    <Plus className="w-4 h-4 mr-1" /> Adicionar
                  </Button>
                </div>
                <div className="space-y-2">
                  {chartConfig.dataKeys.map((key) => (
                    <div key={key} className="flex items-center justify-between p-2 border rounded-md">
                      <span>{key}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleRemoveDataKey(key)}
                        disabled={chartConfig.dataKeys.length <= 1}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Esquema de Cores</Label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.id}
                      variant="outline"
                      onClick={() => handleColorPresetChange(preset.id)}
                      className="h-10 p-1"
                    >
                      <div className="flex-1 flex space-x-1">
                        {preset.colors.map((color) => (
                          <div 
                            key={color} 
                            className="w-full h-full rounded-sm" 
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomChartBuilder;
