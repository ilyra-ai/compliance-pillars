
import React, { useState } from 'react';
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import { Plus, BarChart, PieChart, LineChart, AreaChart, ScreenShare, Edit, Trash, Copy } from 'lucide-react';
import { toast } from 'sonner';

// Dados de exemplo para os charts já existentes
const sampleCharts = [
  { id: '1', title: 'Análise de Riscos', type: 'bar', description: 'Distribuição de riscos por categoria', pillar: 'risk' },
  { id: '2', title: 'Compliance por Área', type: 'pie', description: 'Nível de compliance por departamento', pillar: 'policies' },
  { id: '3', title: 'Progresso de Treinamentos', type: 'line', description: 'Acompanhamento mensal de treinamentos concluídos', pillar: 'training' },
  { id: '4', title: 'Tendências de Denúncias', type: 'area', description: 'Evolução das denúncias ao longo do tempo', pillar: 'complaints' },
];

const ChartManagement: React.FC = () => {
  const [charts, setCharts] = useState(sampleCharts);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedChart, setSelectedChart] = useState<any>(null);
  const [newChartName, setNewChartName] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('');

  const handleCreateChart = () => {
    if (!newChartName || !selectedPillar) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    
    const newChart = {
      id: Date.now().toString(),
      title: newChartName,
      type: 'bar',
      description: 'Nova descrição',
      pillar: selectedPillar
    };
    
    setCharts([...charts, newChart]);
    setOpenCreateDialog(false);
    setNewChartName('');
    setSelectedPillar('');
    toast.success('Gráfico criado com sucesso');
  };

  const handleEditChart = (chart: any) => {
    setSelectedChart(chart);
    setOpenEditDialog(true);
  };

  const handleDeleteChart = (id: string) => {
    setCharts(charts.filter(chart => chart.id !== id));
    toast.success('Gráfico excluído com sucesso');
  };

  const handleDuplicateChart = (chart: any) => {
    const newChart = {
      ...chart,
      id: Date.now().toString(),
      title: `${chart.title} (Cópia)`
    };
    setCharts([...charts, newChart]);
    toast.success('Gráfico duplicado com sucesso');
  };

  const handleSaveChart = (chartConfig: any) => {
    if (selectedChart) {
      setCharts(charts.map(chart => 
        chart.id === selectedChart.id 
          ? { ...chart, ...chartConfig, type: chartConfig.type }
          : chart
      ));
      setOpenEditDialog(false);
      setSelectedChart(null);
      toast.success('Gráfico atualizado com sucesso');
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarChart className="h-5 w-5" />;
      case 'pie':
        return <PieChart className="h-5 w-5" />;
      case 'line':
        return <LineChart className="h-5 w-5" />;
      case 'area':
        return <AreaChart className="h-5 w-5" />;
      default:
        return <BarChart className="h-5 w-5" />;
    }
  };

  const getPillarName = (pillarId: string) => {
    const pillars: {[key: string]: string} = {
      risk: 'Gestão de Riscos',
      policies: 'Políticas',
      training: 'Treinamentos',
      complaints: 'Denúncias',
      audits: 'Auditorias'
    };
    return pillars[pillarId] || pillarId;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Gráficos</h1>
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Gráfico
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Gráfico</DialogTitle>
                <DialogDescription>
                  Preencha as informações básicas para criar um novo gráfico.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="chart-name">Nome do Gráfico</Label>
                  <Input 
                    id="chart-name" 
                    value={newChartName}
                    onChange={(e) => setNewChartName(e.target.value)}
                    placeholder="Digite o nome do gráfico"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chart-pillar">Pilar</Label>
                  <select 
                    id="chart-pillar"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedPillar}
                    onChange={(e) => setSelectedPillar(e.target.value)}
                  >
                    <option value="">Selecione um pilar</option>
                    <option value="risk">Gestão de Riscos</option>
                    <option value="policies">Políticas</option>
                    <option value="training">Treinamentos</option>
                    <option value="complaints">Denúncias</option>
                    <option value="audits">Auditorias</option>
                    <option value="dashboard">Dashboard Principal</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                <Button onClick={handleCreateChart}>Criar e Configurar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {charts.map((chart) => (
            <Card key={chart.id} className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getChartIcon(chart.type)}
                    <span className="ml-2">{chart.title}</span>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditChart(chart)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDuplicateChart(chart)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteChart(chart.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">{chart.description}</p>
                <div className="mt-2 text-xs inline-flex items-center bg-primary/10 text-primary rounded-full px-2 py-1">
                  {getPillarName(chart.pillar)}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-0">
                <Button variant="outline" size="sm" onClick={() => handleEditChart(chart)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <ScreenShare className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog para edição de gráfico */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Gráfico: {selectedChart?.title}</DialogTitle>
            <DialogDescription>
              Configure todos os aspectos do gráfico
            </DialogDescription>
          </DialogHeader>
          {selectedChart && (
            <ChartConfigurator 
              pillarId={selectedChart.pillar}
              onSave={handleSaveChart}
            />
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
            <Button onClick={() => setOpenEditDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChartManagement;
