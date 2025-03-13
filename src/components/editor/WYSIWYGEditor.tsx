
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, Save } from 'lucide-react';

const WYSIWYGEditor: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Editor de Documentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2 border-b pb-2">
            <Button variant="outline" size="sm">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="min-h-[200px] rounded-md border p-4">
            Digite seu conteúdo aqui...
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WYSIWYGEditor;
