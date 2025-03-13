
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileDown, Save, Table } from 'lucide-react';

const ReportBuilder: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Construtor de Relatórios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="report-name">Nome do Relatório</Label>
            <Input id="report-name" placeholder="Ex: Relatório de Riscos Mensais" />
          </div>
          
          <div>
            <Label>Selecione os Campos</Label>
            <div className="mt-2 grid gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="field-risk" className="h-4 w-4" />
                <Label htmlFor="field-risk">Nível de Risco</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="field-status" className="h-4 w-4" />
                <Label htmlFor="field-status">Status</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="field-date" className="h-4 w-4" />
                <Label htmlFor="field-date">Data</Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="w-full">
              <Table className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button variant="outline" className="w-full">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar CSV
            </Button>
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportBuilder;
