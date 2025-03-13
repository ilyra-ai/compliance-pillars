
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Save, Download, FileUp, BarChart, PieChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';

const data = [
  { name: 'Jan', compliance: 80, riscos: 20, auditoria: 40 },
  { name: 'Fev', compliance: 85, riscos: 25, auditoria: 45 },
  { name: 'Mar', compliance: 90, riscos: 15, auditoria: 50 },
  { name: 'Abr', compliance: 95, riscos: 10, auditoria: 55 },
  { name: 'Mai', compliance: 93, riscos: 12, auditoria: 60 },
  { name: 'Jun', compliance: 97, riscos: 8, auditoria: 65 },
];

const pieData = [
  { name: 'Compliance', value: 40 },
  { name: 'Gestão de Riscos', value: 30 },
  { name: 'Auditoria', value: 20 },
  { name: 'Governança', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const actions = (
    <>
      <Button onClick={handleBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button variant="outline" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Exportar Relatório
      </Button>
      <Button size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar Análise
      </Button>
    </>
  );
  
  return (
    <PageLayout
      title="Analytics"
      description="Análise de dados e métricas do sistema"
      actions={actions}
    >
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">
              <BarChart className="mr-2 h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <PieChart className="mr-2 h-4 w-4" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="trends">
              <LineChart className="mr-2 h-4 w-4" />
              Tendências
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Nível de Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">91%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Riscos Identificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    -3 em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Auditorias Realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    +2 em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral Mensal</CardTitle>
                <CardDescription>Métricas consolidadas dos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsBarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="compliance" fill="#0088FE" name="Nível de Compliance (%)" />
                    <Bar dataKey="riscos" fill="#FF8042" name="Riscos Identificados" />
                    <Bar dataKey="auditoria" fill="#00C49F" name="Auditorias Realizadas" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Compliance por Pilar</CardTitle>
                <CardDescription>Visão proporcional de cada pilar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <ResponsiveContainer width="100%" height={400}>
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-4">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.value}% do total</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <FileUp className="mr-2 h-4 w-4" />
                        Exportar Dados
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tendências ao Longo do Tempo</CardTitle>
                <CardDescription>Evolução das métricas nos últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsLineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="compliance" 
                      stroke="#0088FE" 
                      strokeWidth={2} 
                      name="Nível de Compliance (%)"
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="riscos" 
                      stroke="#FF8042" 
                      strokeWidth={2} 
                      name="Riscos Identificados" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="auditoria" 
                      stroke="#00C49F" 
                      strokeWidth={2} 
                      name="Auditorias Realizadas" 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default AnalyticsPage;
