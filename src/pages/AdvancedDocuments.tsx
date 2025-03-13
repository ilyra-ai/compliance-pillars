
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Save, FileUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdvancedDocumentEditor from '@/components/documents/AdvancedDocumentEditor';

const AdvancedDocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  
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
        <FileUp className="mr-2 h-4 w-4" />
        Importar Documento
      </Button>
      <Button size="sm">
        <Save className="mr-2 h-4 w-4" />
        Salvar
      </Button>
    </>
  );
  
  return (
    <PageLayout
      title="Editor de Documentos Avançado"
      description="Edite documentos do Word, Excel, PowerPoint e Google Docs"
      actions={actions}
    >
      <div className="space-y-6">
        <AdvancedDocumentEditor pillarId="advanced" />
      </div>
    </PageLayout>
  );
};

export default AdvancedDocumentsPage;
