
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ChartConfigurator from '@/components/charts/ChartConfigurator';
import { Button } from '@/components/ui/button';
import { BarChart3 } from 'lucide-react';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

const ChartManagement: React.FC = () => {
  const { handleOpenUITheme } = useThemeDialog();

  const actions = (
    <>
      <ThemeButton onClick={handleOpenUITheme} />
      <Button size="sm">
        <BarChart3 className="mr-2 h-4 w-4" />
        Adicionar Gráfico
      </Button>
    </>
  );

  return (
    <PageLayout title="Gestão de Gráficos" actions={actions}>
      <ChartConfigurator />
    </PageLayout>
  );
};

export default ChartManagement;
