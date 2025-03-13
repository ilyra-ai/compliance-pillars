
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ReportBuilderComponent from '@/components/reports/ReportBuilder';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import ThemeButton from '@/components/ui/ThemeButton';
import { useThemeDialog } from '@/hooks/use-theme-dialog';

const ReportBuilder: React.FC = () => {
  const { handleOpenUITheme } = useThemeDialog();

  const actions = (
    <>
      <ThemeButton onClick={handleOpenUITheme} />
      <Button size="sm">
        <FileText className="mr-2 h-4 w-4" />
        Novo Relatório
      </Button>
    </>
  );

  return (
    <PageLayout title="Construtor de Relatórios" actions={actions}>
      <ReportBuilderComponent />
    </PageLayout>
  );
};

export default ReportBuilder;
