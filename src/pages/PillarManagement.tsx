import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import PillarContent from '@/components/ui/PillarContent';

interface Pilar {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  status: string;
  conteudo: string;
}

const PillarManagement: React.FC = () => {
  const { pillarId } = useParams<{ pillarId: string }>();
  const navigate = useNavigate();
  
  const [pilar, setPilar] = useState<Pilar>({
    id: pillarId || 'new',
    nome: '',
    descricao: '',
    categoria: 'Compliance',
    status: 'Ativo',
    conteudo: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isNewPilar, setIsNewPilar] = useState(true);
  
  useEffect(() => {
    if (pillarId && pillarId !== 'new') {
      setIsNewPilar(false);
      // Fetch pillar data from API or use mock data
      // Mock data for demo
      setPilar({
        id: pillarId,
        nome: `Pilar ${pillarId}`,
        descricao: 'Descrição do pilar de exemplo',
        categoria: 'Compliance',
        status: 'Ativo',
        conteudo: '<p>Conteúdo do pilar</p>'
      });
    } else {
      setIsNewPilar(true);
    }
  }, [pillarId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPilar(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to save pilar
    setTimeout(() => {
      setIsLoading(false);
      toast.success(`Pilar ${isNewPilar ? 'criado' : 'atualizado'} com sucesso!`);
      if (isNewPilar) {
        navigate(`/pillars/${Date.now()}`); // Generate a fake ID
      }
    }, 1000);
  };
  
  const handleGoBack = () => {
    navigate('/pillars');
  };
  
  const handleContentSave = (newContent: string) => {
    setPilar(prev => ({ ...prev, conteudo: newContent }));
    toast.success('Conteúdo atualizado com sucesso!');
  };
  
  const actions = (
    <>
      <Button onClick={handleGoBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      <Button onClick={handleSubmit} disabled={isLoading} size="sm">
        <Save className="mr-2 h-4 w-4" />
        {isLoading ? 'Salvando...' : 'Salvar Pilar'}
      </Button>
    </>
  );
  
  // Ensure pillarId is properly set for passing to the PillarContent component
  const contentPillarId = pillarId || 'new';
  
  return (
    <PageLayout
      title={isNewPilar ? 'Novo Pilar' : `Editando: ${pilar.nome}`}
      actions={actions}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{isNewPilar ? 'Informações do Novo Pilar' : 'Informações do Pilar'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Pilar</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={pilar.nome}
                  onChange={handleInputChange}
                  placeholder="Digite o nome do pilar"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  name="descricao"
                  value={pilar.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva o propósito deste pilar"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={pilar.categoria}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="Compliance">Compliance</option>
                    <option value="Governança">Governança</option>
                    <option value="Auditoria">Auditoria</option>
                    <option value="Regulatório">Regulatório</option>
                    <option value="Ética">Ética</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={pilar.status}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Em Revisão">Em Revisão</option>
                    <option value="Rascunho">Rascunho</option>
                  </select>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {!isNewPilar && (
          <PillarContent 
            pillarId={contentPillarId}
            initialContent={pilar.conteudo}
            onSave={handleContentSave}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default PillarManagement;
