import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { LineChart, BarChart, PieChart, AreaChart, ComposedChart, Line, Bar, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { ChevronDown, ChevronUp, Save, Download, Upload, Plus, Trash2, Settings, Palette, RefreshCcw, Eye, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

// Sample data for the charts
const data = [
  { name: 'Jan', value1: 400, value2: 240, value3: 200 },
  { name: 'Feb', value1: 300, value2: 139, value3: 300 },
  { name: 'Mar', value1: 200, value2: 980, value3: 400 },
  { name: 'Apr', value1: 278, value2: 390, value3: 200 },
  { name: 'May', value1: 189, value2: 480, value3: 300 },
  { name: 'Jun', value1: 239, value2: 380, value3: 250 },
  { name: 'Jul', value1: 349, value2: 430, value3: 350 },
];

interface CustomChartBuilderProps {
  initialType?: 'line' | 'bar' | 'pie' | 'area' | 'composed';
  initialData?: any[];
}

const CustomChartBuilder: React.FC<CustomChartBuilderProps> = ({ initialType = 'line', initialData = data }) => {
  const [chartType, setChartType] = useState<string>(initialType);
  const [chartData, setChartData] = useState<any[]>(initialData);
  const [xAxisKey, setXAxisKey] = useState<string>('name');
  const [yAxisKeys, setYAxisKeys] = useState<string[]>(['value1']);
  const [colorPalette, setColorPalette] = useState<string[]>([
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#a4de6c',
    '#d0ed57',
  ]);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [isStacked, setIsStacked] = useState<boolean>(false);
  const [opacity, setOpacity] = useState<number>(0.7);

  const handleAddYAxisKey = () => {
    setYAxisKeys([...yAxisKeys, `value${yAxisKeys.length + 1}`]);
  };

  const handleRemoveYAxisKey = (index: number) => {
    const newYAxisKeys = [...yAxisKeys];
    newYAxisKeys.splice(index, 1);
    setYAxisKeys(newYAxisKeys);
  };

  const handleColorChange = (index: number, color: string) => {
    const newColorPalette = [...colorPalette];
    newColorPalette[index] = color;
    setColorPalette(newColorPalette);
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return <LineChartComponent data={chartData} xAxisKey={xAxisKey} yAxisKeys={yAxisKeys} colorPalette={colorPalette} showGrid={showGrid} showLegend={showLegend} />;
      case 'bar':
        return <BarChartComponent data={chartData} xAxisKey={xAxisKey} yAxisKeys={yAxisKeys} colorPalette={colorPalette} showGrid={showGrid} showLegend={showLegend} />;
      case 'pie':
        return <PieChartComponent data={chartData} yAxisKeys={yAxisKeys} colorPalette={colorPalette} showLegend={showLegend} />;
      case 'area':
        return <AreaChartComponent data={chartData} xAxisKey={xAxisKey} yAxisKeys={yAxisKeys} colorPalette={colorPalette} showGrid={showGrid} showLegend={showLegend} opacity={opacity} />;
      case 'composed':
        return <ComposedChartComponent data={chartData} xAxisKey={xAxisKey} yAxisKeys={yAxisKeys} colorPalette={colorPalette} showGrid={showGrid} showLegend={showLegend} />;
      case 'stacked':
        return <StackedBarChartComponent data={chartData} />;
      default:
        return <div>Selecione um tipo de gráfico</div>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Construtor de Gráfico Personalizado</CardTitle>
        <CardDescription>Crie e personalize gráficos interativos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="chart-type">Tipo de Gráfico</Label>
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger id="chart-type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="line">Linha</SelectItem>
                <SelectItem value="bar">Barra</SelectItem>
                <SelectItem value="pie">Pizza</SelectItem>
                <SelectItem value="area">Área</SelectItem>
                <SelectItem value="composed">Composto</SelectItem>
                <SelectItem value="stacked">Barras Empilhadas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="x-axis-key">Chave do Eixo X</Label>
            <Input id="x-axis-key" value={xAxisKey} onChange={(e) => setXAxisKey(e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Chaves do Eixo Y</Label>
          {yAxisKeys.map((key, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input value={key} onChange={(e) => {
                const newYAxisKeys = [...yAxisKeys];
                newYAxisKeys[index] = e.target.value;
                setYAxisKeys(newYAxisKeys);
              }} />
              <Input
                type="color"
                value={colorPalette[index] || '#8884d8'}
                onChange={(e) => handleColorChange(index, e.target.value)}
              />
              {yAxisKeys.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => handleRemoveYAxisKey(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddYAxisKey}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Chave
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="show-grid" checked={showGrid} onCheckedChange={setShowGrid} />
            <Label htmlFor="show-grid">Mostrar Grid</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="show-legend" checked={showLegend} onCheckedChange={setShowLegend} />
            <Label htmlFor="show-legend">Mostrar Legenda</Label>
          </div>
          {chartType === 'area' && (
            <>
              <Label>Opacidade</Label>
              <Slider
                defaultValue={[opacity * 100]}
                max={100}
                step={1}
                onValueChange={(value) => setOpacity(value[0] / 100)}
              />
            </>
          )}
        </div>

        <div className="border rounded-md p-4">
          {renderChart()}
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Salvar Gráfico
        </Button>
      </CardFooter>
    </Card>
  );
};

const LineChartComponent = ({ data, xAxisKey, yAxisKeys, colorPalette, showGrid, showLegend }: { data: any[], xAxisKey: string, yAxisKeys: string[], colorPalette: string[], showGrid: boolean, showLegend: boolean }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {showGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        {yAxisKeys.map((key, index) => (
          <Line key={key} type="monotone" dataKey={key} stroke={colorPalette[index] || '#8884d8'} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

const BarChartComponent = ({ data, xAxisKey, yAxisKeys, colorPalette, showGrid, showLegend }: { data: any[], xAxisKey: string, yAxisKeys: string[], colorPalette: string[], showGrid: boolean, showLegend: boolean }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {showGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        {yAxisKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={colorPalette[index] || '#8884d8'} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieChartComponent = ({ data, yAxisKeys, colorPalette, showLegend }: { data: any[], yAxisKeys: string[], colorPalette: string[], showLegend: boolean }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Tooltip />
        {showLegend && <Legend />}
        {yAxisKeys.map((key, index) => (
          <Pie
            key={key}
            data={data}
            dataKey={key}
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={colorPalette[index] || '#8884d8'}
            label
          >
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={colorPalette[i % colorPalette.length] || '#8884d8'} />
            ))}
          </Pie>
        ))}
      </PieChart>
    </ResponsiveContainer>
  );
};

const AreaChartComponent = ({ data, xAxisKey, yAxisKeys, colorPalette, showGrid, showLegend, opacity }: { data: any[], xAxisKey: string, yAxisKeys: string[], colorPalette: string[], showGrid: boolean, showLegend: boolean, opacity: number }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {showGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        {yAxisKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colorPalette[index] || '#8884d8'}
            fillOpacity={opacity}
            fill={colorPalette[index] || '#8884d8'}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

const ComposedChartComponent = ({ data, xAxisKey, yAxisKeys, colorPalette, showGrid, showLegend }: { data: any[], xAxisKey: string, yAxisKeys: string[], colorPalette: string[], showGrid: boolean, showLegend: boolean }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        {showLegend && <Legend />}
        {showGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        {yAxisKeys.map((key, index) => (
          <Bar key={`bar-${key}`} dataKey={key} barSize={20} fill={colorPalette[index] || '#413ea0'} />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const StackedBarChartComponent = ({ data }: { data: any[] }) => {
  // Fix the stackId prop
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value1" fill="#8884d8" stackId="a" />
        <Bar dataKey="value2" fill="#82ca9d" stackId="a" />
        <Bar dataKey="value3" fill="#ffc658" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomChartBuilder;
