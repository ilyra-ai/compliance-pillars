
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Palette } from 'lucide-react';

export const CustomizableLayout: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Layout Personalizado</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Palette className="h-4 w-4 mr-2" />
            <AlertTitle>Área de Layout Personalizado</AlertTitle>
            <AlertDescription>
              Este é o layout padrão que será substituído pelos componentes personalizados.
              Use a funcionalidade de arrastar e soltar para adicionar componentes desta área.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Informações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Você está visualizando o conteúdo padrão que será 
              substituído pelos componentes personalizados.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Instruções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Arraste componentes do painel lateral para criar um layout personalizado.
              Você pode reorganizar os componentes arrastando-os pela área de layout.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
