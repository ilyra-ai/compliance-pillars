
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronDown, PlusCircle, ArrowUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Risk {
  id: number;
  description: string;
  probability: number;
  impact: number;
  category: string;
  level: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  controls: string[];
}

const RiskDashboard: React.FC = () => {
  const { toast } = useToast();
  const [risks, setRisks] = useState<Risk[]>([
    {
      id: 1,
      description: "Vazamento de dados pessoais",
      probability: 0.3,
      impact: 0.9,
      category: "LGPD",
      level: 'Alto',
      controls: ["Criptografia", "Controle de acesso"]
    },
    {
      id: 2,
      description: "Fraude interna",
      probability: 0.2,
      impact: 0.8,
      category: "Integridade",
      level: 'Médio',
      controls: ["Segregação de funções", "Auditoria"]
    },
    {
      id: 3,
      description: "Não conformidade regulatória",
      probability: 0.4,
      impact: 0.7,
      category: "Regulatório",
      level: 'Alto',
      controls: ["Monitoramento legal", "Treinamento"]
    },
    {
      id: 4,
      description: "Falha em due diligence de terceiros",
      probability: 0.5,
      impact: 0.6,
      category: "Terceiros",
      level: 'Médio',
      controls: ["Processo de avaliação", "Contratos robustos"]
    },
    {
      id: 5,
      description: "Violação de política de compliance",
      probability: 0.2,
      impact: 0.5,
      category: "Políticas",
      level: 'Baixo',
      controls: ["Treinamento", "Comunicação"]
    }
  ]);

  const [sortColumn, setSortColumn] = useState<keyof Risk | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof Risk) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRisks = [...risks].sort((a, b) => {
    if (!sortColumn) return 0;
    
    if (sortDirection === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Baixo': return 'bg-green-100 text-green-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Alto': return 'bg-orange-100 text-orange-800';
      case 'Crítico': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddRisk = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A adição de novos riscos estará disponível em breve.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          Gestão de Riscos
        </h1>
        <p className="text-balance text-xl text-muted-foreground">
          Matriz de riscos corporativos e controles
        </p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-xl font-semibold">Matriz de Riscos</h2>
        </div>
        <Button onClick={handleAddRisk} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Adicionar Risco
        </Button>
      </div>

      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="bg-muted/50 pb-4">
          <CardTitle>Riscos Mapeados</CardTitle>
          <CardDescription>
            Visão geral dos riscos corporativos identificados e seus controles.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead className="w-[300px]">
                  <button 
                    className="flex items-center gap-1 hover:text-compliance-500"
                    onClick={() => handleSort('description')}
                  >
                    Descrição 
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1 hover:text-compliance-500"
                    onClick={() => handleSort('probability')}
                  >
                    Probabilidade 
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1 hover:text-compliance-500"
                    onClick={() => handleSort('impact')}
                  >
                    Impacto 
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1 hover:text-compliance-500"
                    onClick={() => handleSort('category')}
                  >
                    Categoria 
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button 
                    className="flex items-center gap-1 hover:text-compliance-500"
                    onClick={() => handleSort('level')}
                  >
                    Nível 
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>Controles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRisks.map((risk) => (
                <TableRow key={risk.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{risk.id}</TableCell>
                  <TableCell>{risk.description}</TableCell>
                  <TableCell>{(risk.probability * 100).toFixed(0)}%</TableCell>
                  <TableCell>{(risk.impact * 100).toFixed(0)}%</TableCell>
                  <TableCell>{risk.category}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getLevelColor(risk.level)}`}>
                      {risk.level}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      Ver Controles
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDashboard;
