
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  AreaChart, 
  ComposedChart, 
  Line, 
  Bar, 
  Pie, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  Grid, 
  Table, 
  Rows, 
  Columns, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  FileText, 
  Upload, 
  AlertTriangle, 
  Plus, 
  Move, 
  Trash2, 
  Settings, 
  Save, 
  Download, 
  FileUp, 
  Copy,
  Clipboard,
  LayoutGrid
} from 'lucide-react';

// Mock data for initial dashboard
const sampleData = [
  { mes: 'Jan', vendas: 4000, custos: 2400, lucro: 1600 },
  { mes: 'Fev', vendas: 3000, custos: 1398, lucro: 1602 },
  { mes: 'Mar', vendas: 2000, custos: 9800, lucro: -7800 },
  { mes: 'Abr', vendas: 2780, custos: 3908, lucro: -1128 },
  { mes: 'Mai', vendas: 1890, custos: 4800, lucro: -2910 },
  { mes: 'Jun', vendas: 2390, custos: 3800, lucro: -1410 },
  { mes: 'Jul', vendas: 3490, custos: 4300, lucro: -810 },
];

// Define available chart types
const chartTypes = [
  { id: 'bar', name: 'Gráfico de Barras', icon: <BarChartIcon size={16} /> },
  { id: 'line', name: 'Gráfico de Linha', icon: <LineChartIcon size={16} /> },
  { id: 'area', name: 'Gráfico de Área', icon: <LineChartIcon size={16} /> },
  { id: 'pie', name: 'Gráfico de Pizza', icon: <PieChartIcon size={16} /> },
  { id: 'table', name: 'Tabela', icon: <Table size={16} /> },
];

// Color presets
const colorPresets = [
  { id: 'blue', colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] },
  { id: 'green', colors: ['#16a34a', '#22c55e', '#4ade80', '#86efac'] },
  { id: 'red', colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5'] },
  { id: 'purple', colors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'] },
  { id: 'orange', colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74'] },
  { id: 'mixed', colors: ['#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c'] },
];

// Layout templates
const layoutTemplates = [
  { id: '1x1', name: '1 Visualização', cols: 1, rows: 1 },
  { id: '2x1', name: '2 Visualizações (Lado a Lado)', cols: 2, rows: 1 },
  { id: '1x2', name: '2 Visualizações (Empilhadas)', cols: 1, rows: 2 },
  { id: '2x2', name: '4 Visualizações (Grade)', cols: 2, rows: 2 },
];

// Widget interface
interface DashboardWidget {
  id: string;
  title: string;
  type: string;
  dataKeys: string[];
  dataSource: any[];
  colorScheme: string[];
  position: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface Dashboard {
  id: string;
  title: string;
  description: string;
  widgets: DashboardWidget[];
  layout: {
    cols: number;
    rows: number;
  };
}

const initialDashboard: Dashboard = {
  id: uuidv4(),
  title: 'Dashboard de Demonstração',
  description: 'Dashboard interativo similar ao Power BI',
  widgets: [
    {
      id: uuidv4(),
      title: 'Vendas por Mês',
      type: 'bar',
      dataKeys: ['vendas'],
      dataSource: sampleData,
      colorScheme: colorPresets[0].colors,
      position: { x: 0, y: 0, w: 6, h: 2 }
    },
    {
      id: uuidv4(),
      title: 'Custos vs Lucro',
      type: 'line',
      dataKeys: ['custos', 'lucro'],
      dataSource: sampleData,
      colorScheme: colorPresets[1].colors,
      position: { x: 6, y: 0, w: 6, h: 2 }
    },
    {
      id: uuidv4(),
      title: 'Distribuição de Vendas',
      type: 'pie',
      dataKeys: ['vendas'],
      dataSource: sampleData,
      colorScheme: colorPresets[3].colors,
      position: { x: 0, y: 2, w: 4, h: 3 }
    },
    {
      id: uuidv4(),
      title: 'Dados Tabulares',
      type: 'table',
      dataKeys: ['mes', 'vendas', 'custos', 'lucro'],
      dataSource: sampleData,
      colorScheme: [],
      position: { x: 4, y: 2, w: 8, h: 3 }
    }
  ],
  layout: {
    cols: 12,
    rows: 5
  }
};

interface PowerBIDashboardProps {
  onSave?: (dashboard: Dashboard) => void;
  initialData?: Dashboard;
}

const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({ 
  onSave,
  initialData 
}) => {
  const [dashboard, setDashboard] = useState<Dashboard>(initialData || initialDashboard);
  const [activeTab, setActiveTab] = useState('view');
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null);
  const [isWidgetDialogOpen, setIsWidgetDialogOpen] = useState(false);
  const [newWidgetData, setNewWidgetData] = useState<Partial<DashboardWidget>>({
    id: uuidv4(),
    title: 'Novo Widget',
    type: 'bar',
    dataKeys: ['vendas'],
    dataSource: sampleData,
    colorScheme: colorPresets[0].colors,
    position: { x: 0, y: 0, w: 6, h: 2 }
  });
  const [currentDataSource, setCurrentDataSource] = useState(JSON.stringify(sampleData, null, 2));
  const [isDataSourceDialogOpen, setIsDataSourceDialogOpen] = useState(false);
  const [isEditingWidget, setIsEditingWidget] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleAddWidget = () => {
    setNewWidgetData({
      id: uuidv4(),
      title: 'Novo Widget',
      type: 'bar',
      dataKeys: ['vendas'],
      dataSource: sampleData,
      colorScheme: colorPresets[0].colors,
      position: { x: 0, y: dashboard.widgets.length, w: 6, h: 2 }
    });
    setIsEditingWidget(false);
    setIsWidgetDialogOpen(true);
  };
  
  const handleEditWidget = (widgetId: string) => {
    const widget = dashboard.widgets.find(w => w.id === widgetId);
    if (widget) {
      setNewWidgetData({...widget});
      setCurrentDataSource(JSON.stringify(widget.dataSource, null, 2));
      setIsEditingWidget(true);
      setIsWidgetDialogOpen(true);
    }
  };
  
  const handleSaveWidget = () => {
    if (!newWidgetData.id) return;
    
    try {
      const completeWidget = newWidgetData as DashboardWidget;
      
      if (isEditingWidget) {
        // Update existing widget
        setDashboard({
          ...dashboard,
          widgets: dashboard.widgets.map(w => 
            w.id === completeWidget.id ? completeWidget : w
          )
        });
        toast.success('Widget atualizado com sucesso!');
      } else {
        // Add new widget
        setDashboard({
          ...dashboard,
          widgets: [...dashboard.widgets, completeWidget]
        });
        toast.success('Widget adicionado com sucesso!');
      }
      
      setIsWidgetDialogOpen(false);
    } catch (error) {
      toast.error('Erro ao salvar widget: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };
  
  const handleRemoveWidget = (widgetId: string) => {
    setDashboard({
      ...dashboard,
      widgets: dashboard.widgets.filter(w => w.id !== widgetId)
    });
    toast.success('Widget removido com sucesso!');
  };
  
  const handleUpdateDataSource = () => {
    try {
      const parsedData = JSON.parse(currentDataSource);
      if (Array.isArray(parsedData)) {
        setNewWidgetData({
          ...newWidgetData,
          dataSource: parsedData
        });
        
        // Auto-detect available keys from the first item
        if (parsedData.length > 0) {
          const availableKeys = Object.keys(parsedData[0]);
          // If current dataKeys aren't in the new data, reset them
          const validKeys = newWidgetData.dataKeys?.filter(k => availableKeys.includes(k)) || [];
          if (validKeys.length === 0 && availableKeys.length > 0) {
            setNewWidgetData({
              ...newWidgetData,
              dataKeys: [availableKeys[0]],
              dataSource: parsedData
            });
          } else {
            setNewWidgetData({
              ...newWidgetData,
              dataKeys: validKeys,
              dataSource: parsedData
            });
          }
        }
        
        setIsDataSourceDialogOpen(false);
        toast.success('Fonte de dados atualizada com sucesso!');
      } else {
        toast.error('Os dados devem estar em formato de array');
      }
    } catch (error) {
      toast.error('Erro ao processar JSON: formato inválido');
    }
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        // Check if it's CSV
        if (file.name.endsWith('.csv')) {
          // Simple CSV parser
          const lines = result.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          const data = lines.slice(1).filter(line => line.trim() !== '').map(line => {
            const values = line.split(',').map(v => v.trim());
            const entry: Record<string, string | number> = {};
            headers.forEach((header, index) => {
              // Try to convert to number if possible
              const value = values[index];
              entry[header] = isNaN(Number(value)) ? value : Number(value);
            });
            return entry;
          });
          setCurrentDataSource(JSON.stringify(data, null, 2));
        } else if (file.name.endsWith('.json')) {
          // Assume it's a valid JSON file
          const parsedData = JSON.parse(result);
          setCurrentDataSource(JSON.stringify(parsedData, null, 2));
        } else {
          toast.error('Formato de arquivo não suportado. Use CSV ou JSON.');
          return;
        }
        setIsDataSourceDialogOpen(true);
      } catch (error) {
        toast.error('Erro ao processar o arquivo: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
      }
    };
    
    if (file.name.endsWith('.csv') || file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else {
      toast.error('Formato de arquivo não suportado. Use CSV ou JSON.');
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const renderWidgetContent = (widget: DashboardWidget) => {
    switch (widget.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={widget.dataSource}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {widget.dataKeys.map((key, index) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={widget.colorScheme[index % widget.colorScheme.length]} 
                  name={key}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={widget.dataSource}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {widget.dataKeys.map((key, index) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={widget.colorScheme[index % widget.colorScheme.length]} 
                  name={key}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={widget.dataSource}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {widget.dataKeys.map((key, index) => (
                <Area 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  fill={widget.colorScheme[index % widget.colorScheme.length]} 
                  stroke={widget.colorScheme[index % widget.colorScheme.length]} 
                  name={key}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <RechartsTooltip />
              <Legend />
              <Pie 
                data={widget.dataSource} 
                dataKey={widget.dataKeys[0]} 
                nameKey="mes" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label
              >
                {widget.dataSource.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={widget.colorScheme[index % widget.colorScheme.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'table':
        return (
          <div className="w-full h-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {widget.dataKeys.map(key => (
                    <th 
                      key={key}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {widget.dataSource.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {widget.dataKeys.map(key => (
                      <td 
                        key={`${rowIndex}-${key}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                      >
                        {item[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      default:
        return <div className="w-full h-full flex items-center justify-center">Tipo de widget não suportado</div>;
    }
  };
  
  const renderDashboard = () => {
    return (
      <div 
        className="grid gap-4" 
        style={{ 
          gridTemplateColumns: `repeat(${dashboard.layout.cols}, 1fr)`,
          gridTemplateRows: `repeat(${dashboard.layout.rows}, minmax(100px, auto))`,
          minHeight: `${dashboard.layout.rows * 100}px`
        }}
      >
        {dashboard.widgets.map(widget => (
          <div 
            key={widget.id}
            className="bg-card border rounded-lg shadow-sm overflow-hidden"
            style={{ 
              gridColumn: `span ${widget.position.w}`,
              gridRow: `span ${widget.position.h}`,
            }}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium text-sm">{widget.title}</h3>
              {activeTab === 'edit' && (
                <div className="flex space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleEditWidget(widget.id)}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar Widget</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveWidget(widget.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remover Widget</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            <div className="p-1 h-[calc(100%-3rem)]">
              {renderWidgetContent(widget)}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const handleSaveDashboard = () => {
    if (onSave) {
      onSave(dashboard);
    }
    toast.success('Dashboard salvo com sucesso!');
    
    // Switch to view tab
    setActiveTab('view');
  };
  
  const handleExportDashboard = () => {
    try {
      const dashboardData = JSON.stringify(dashboard, null, 2);
      const blob = new Blob([dashboardData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dashboard.title.replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Dashboard exportado com sucesso!');
    } catch (error) {
      toast.error('Erro ao exportar dashboard: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>
                {activeTab === 'edit' ? (
                  <Input 
                    value={dashboard.title} 
                    onChange={(e) => setDashboard({...dashboard, title: e.target.value})}
                    className="text-2xl font-bold h-auto py-1 mb-2"
                  />
                ) : (
                  dashboard.title
                )}
              </CardTitle>
              <CardDescription>
                {activeTab === 'edit' ? (
                  <Input 
                    value={dashboard.description} 
                    onChange={(e) => setDashboard({...dashboard, description: e.target.value})}
                    className="text-sm h-auto py-1"
                  />
                ) : (
                  dashboard.description
                )}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportDashboard}>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              {activeTab === 'edit' && (
                <Button size="sm" onClick={handleSaveDashboard}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Dashboard
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="view">Visualizar</TabsTrigger>
              <TabsTrigger value="edit">Editar</TabsTrigger>
              <TabsTrigger value="data">Dados</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === 'edit' && (
            <div className="mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Layout do Dashboard</h3>
                  <p className="text-sm text-muted-foreground">Configure o layout e adicione widgets</p>
                </div>
                <Button onClick={handleAddWidget}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Widget
                </Button>
              </div>
              
              <div className="flex space-x-4 items-center">
                <div className="space-y-1">
                  <Label htmlFor="layoutTemplate">Template de Layout</Label>
                  <Select 
                    value={`${dashboard.layout.cols}x${dashboard.layout.rows}`}
                    onValueChange={(value) => {
                      const [cols, rows] = value.split('x').map(Number);
                      setDashboard({
                        ...dashboard,
                        layout: { cols, rows }
                      });
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione um template" />
                    </SelectTrigger>
                    <SelectContent>
                      {layoutTemplates.map(template => (
                        <SelectItem key={template.id} value={`${template.cols}x${template.rows}`}>
                          <div className="flex items-center">
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            <span>{template.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="dashboard-cols">Colunas</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="dashboard-cols" 
                      type="number" 
                      min={1} 
                      max={12} 
                      value={dashboard.layout.cols}
                      onChange={(e) => setDashboard({
                        ...dashboard,
                        layout: {
                          ...dashboard.layout,
                          cols: Number(e.target.value)
                        }
                      })}
                      className="w-16"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="dashboard-rows">Linhas</Label>
                  <div className="flex items-center space-x-2">
                    <Input 
                      id="dashboard-rows" 
                      type="number" 
                      min={1} 
                      max={12} 
                      value={dashboard.layout.rows}
                      onChange={(e) => setDashboard({
                        ...dashboard,
                        layout: {
                          ...dashboard.layout,
                          rows: Number(e.target.value)
                        }
                      })}
                      className="w-16"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="mb-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Fontes de Dados</h3>
                  <p className="text-sm text-muted-foreground">
                    Gerencie suas fontes de dados para o dashboard
                  </p>
                </div>
                
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".csv,.json"
                  />
                  <Button onClick={handleUploadClick}>
                    <Upload className="mr-2 h-4 w-4" />
                    Importar Dados
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Fonte de Dados Ativa</CardTitle>
                  <CardDescription>Visualize os dados sendo usados nos widgets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto max-h-[400px]">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          {Object.keys(sampleData[0]).map(key => (
                            <th 
                              key={key}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                            >
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                        {sampleData.map((item, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.entries(item).map(([key, value]) => (
                              <td 
                                key={`${rowIndex}-${key}`}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {renderDashboard()}
        </CardContent>
      </Card>
      
      {/* Widget Configuration Dialog */}
      <Dialog open={isWidgetDialogOpen} onOpenChange={setIsWidgetDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{isEditingWidget ? 'Editar Widget' : 'Adicionar Widget'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="widget-title">Título do Widget</Label>
              <Input 
                id="widget-title" 
                value={newWidgetData.title || ''} 
                onChange={(e) => setNewWidgetData({ ...newWidgetData, title: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tipo de Visualização</Label>
              <div className="grid grid-cols-3 gap-2">
                {chartTypes.map((type) => (
                  <Button
                    key={type.id}
                    variant={newWidgetData.type === type.id ? "default" : "outline"}
                    onClick={() => setNewWidgetData({ ...newWidgetData, type: type.id })}
                    className="flex items-center justify-start"
                  >
                    {type.icon}
                    <span className="ml-2">{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Fonte de Dados</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentDataSource(JSON.stringify(newWidgetData.dataSource || [], null, 2));
                    setIsDataSourceDialogOpen(true);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Editar Dados
                </Button>
              </div>
              <div className="border rounded-md p-2 max-h-32 overflow-y-auto">
                <pre className="text-xs">{JSON.stringify(newWidgetData.dataSource, null, 2)}</pre>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Campos de Dados</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {newWidgetData.dataSource && newWidgetData.dataSource.length > 0 && 
                  Object.keys(newWidgetData.dataSource[0]).map((key) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Switch 
                        checked={(newWidgetData.dataKeys || []).includes(key)} 
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setNewWidgetData({
                              ...newWidgetData,
                              dataKeys: [...(newWidgetData.dataKeys || []), key]
                            });
                          } else {
                            if ((newWidgetData.dataKeys || []).length > 1) {
                              setNewWidgetData({
                                ...newWidgetData,
                                dataKeys: (newWidgetData.dataKeys || []).filter(k => k !== key)
                              });
                            } else {
                              toast.error('Deve haver pelo menos um campo de dados selecionado');
                            }
                          }
                        }}
                        id={`field-${key}`}
                      />
                      <Label htmlFor={`field-${key}`}>{key}</Label>
                    </div>
                  ))
                }
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Esquema de Cores</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant="outline"
                    onClick={() => setNewWidgetData({
                      ...newWidgetData,
                      colorScheme: preset.colors
                    })}
                    className={`h-10 p-1 ${
                      JSON.stringify(newWidgetData.colorScheme) === JSON.stringify(preset.colors) 
                        ? 'ring-2 ring-primary' 
                        : ''
                    }`}
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
            
            <div className="space-y-2">
              <Label>Tamanho e Posição</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="widget-width" className="text-xs">Largura</Label>
                  <Input 
                    id="widget-width" 
                    type="number" 
                    min={1} 
                    max={dashboard.layout.cols} 
                    value={newWidgetData.position?.w || 1}
                    onChange={(e) => setNewWidgetData({
                      ...newWidgetData,
                      position: {
                        ...(newWidgetData.position || { x: 0, y: 0, w: 1, h: 1 }),
                        w: Number(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="widget-height" className="text-xs">Altura</Label>
                  <Input 
                    id="widget-height" 
                    type="number" 
                    min={1} 
                    max={dashboard.layout.rows} 
                    value={newWidgetData.position?.h || 1}
                    onChange={(e) => setNewWidgetData({
                      ...newWidgetData,
                      position: {
                        ...(newWidgetData.position || { x: 0, y: 0, w: 1, h: 1 }),
                        h: Number(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="widget-x" className="text-xs">Posição X</Label>
                  <Input 
                    id="widget-x" 
                    type="number" 
                    min={0} 
                    max={dashboard.layout.cols - (newWidgetData.position?.w || 1)}
                    value={newWidgetData.position?.x || 0}
                    onChange={(e) => setNewWidgetData({
                      ...newWidgetData,
                      position: {
                        ...(newWidgetData.position || { x: 0, y: 0, w: 1, h: 1 }),
                        x: Number(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="widget-y" className="text-xs">Posição Y</Label>
                  <Input 
                    id="widget-y" 
                    type="number" 
                    min={0} 
                    max={dashboard.layout.rows - (newWidgetData.position?.h || 1)}
                    value={newWidgetData.position?.y || 0}
                    onChange={(e) => setNewWidgetData({
                      ...newWidgetData,
                      position: {
                        ...(newWidgetData.position || { x: 0, y: 0, w: 1, h: 1 }),
                        y: Number(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWidgetDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveWidget}>
              {isEditingWidget ? 'Atualizar' : 'Adicionar'} Widget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Data Source Dialog */}
      <Dialog open={isDataSourceDialogOpen} onOpenChange={setIsDataSourceDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Fonte de Dados</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Dados em JSON</Label>
              <textarea 
                value={currentDataSource}
                onChange={(e) => setCurrentDataSource(e.target.value)}
                className="w-full h-64 mt-1 font-mono text-sm p-2 border rounded-md"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDataSourceDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateDataSource}>
              Atualizar Dados
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PowerBIDashboard;
