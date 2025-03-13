
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Save, Plus, BarChart3, FileText, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import PillarContent from '@/components/ui/PillarContent';
import PillarChartWidget from '@/components/pillar/PillarChartWidget';

interface Pilar {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  status: string;
  conteudo: string;
}

// Interface for the layout sections
interface LayoutSection {
  id: string;
  type: 'content' | 'chart' | 'document' | 'chatbot';
  title: string;
  content?: string;
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
  const [layoutSections, setLayoutSections] = useState<LayoutSection[]>([]);
  const [isEditingLayout, setIsEditingLayout] = useState(false);

  // Get pillar name based on ID
  const getPillarName = (id: string) => {
    switch(id) {
      case 'leadership': return '1. Comprometimento da Alta Administração';
      case 'risk': return '2. Gestão de Riscos Corporativo';
      case 'policies': return '3. Políticas e Procedimentos';
      case 'controls': return '4. Controles Internos';
      case 'training': return '5. Treinamento e Comunicação';
      case 'complaints': return '6. Canal de Denúncias';
      case 'investigations': return '7. Investigações Internas';
      case 'due-diligence': return '8. Due Diligence';
      case 'audits': return '9. Gestão das Auditorias';
      case 'monitoring': return '10. Monitoramento dos Riscos';
      case 'lgpd': return '11. LGPD';
      default: return `Pilar ${id}`;
    }
  };
  
  useEffect(() => {
    if (pillarId && pillarId !== 'new') {
      setIsNewPilar(false);
      const pillarName = getPillarName(pillarId);
      
      // Fetch pillar data from API or use mock data
      // Mock data for demo
      setPilar({
        id: pillarId,
        nome: pillarName,
        descricao: 'Descrição do pilar de exemplo',
        categoria: 'Compliance',
        status: 'Ativo',
        conteudo: '<p>Conteúdo do pilar</p>'
      });
      
      // Initialize layout sections for existing pillars
      setLayoutSections([
        {
          id: 'content-main',
          type: 'content',
          title: 'Conteúdo Principal',
          content: '<p>Conteúdo do pilar</p>'
        },
        {
          id: 'chart-kpi',
          type: 'chart',
          title: 'Indicadores de Performance'
        }
      ]);
    } else {
      setIsNewPilar(true);
      setLayoutSections([]);
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
    
    // Also update the content in layout sections
    setLayoutSections(prev => 
      prev.map(section => 
        section.type === 'content' ? { ...section, content: newContent } : section
      )
    );
    
    toast.success('Conteúdo atualizado com sucesso!');
  };
  
  const handleAddSection = (type: LayoutSection['type']) => {
    const newSection: LayoutSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: type === 'content' ? 'Novo Conteúdo' : 
             type === 'chart' ? 'Novo Gráfico' : 
             type === 'document' ? 'Novo Documento' : 'Novo Chatbot'
    };
    
    setLayoutSections(prev => [...prev, newSection]);
    toast.success(`Seção de ${newSection.title} adicionada!`);
  };
  
  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === layoutSections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...layoutSections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setLayoutSections(newSections);
  };
  
  const renderSection = (section: LayoutSection, index: number) => {
    switch (section.type) {
      case 'content':
        return (
          <PillarContent 
            pillarId={contentPillarId}
            initialContent={section.content || pilar.conteudo}
            onSave={handleContentSave}
          />
        );
      case 'chart':
        return (
          <PillarChartWidget 
            pillarId={contentPillarId} 
            draggable={isEditingLayout}
          />
        );
      case 'document':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos do Pilar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Gerenciador de Documentos</h3>
                <p className="text-muted-foreground mb-4">Carregue, edite e gerencie documentos relacionados a este pilar.</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'chatbot':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assistente IA do Pilar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">Chatbot Assistente</h3>
                <p className="text-muted-foreground mb-4">Configure um assistente IA especializado para este pilar.</p>
                <div className="space-y-3">
                  <Input placeholder="URL do chatbot (ex: https://chatgpt.com/embed/...)" />
                  <Button className="w-full">
                    Conectar Chatbot
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };
  
  const actions = (
    <>
      <Button onClick={handleGoBack} variant="outline" size="sm">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      {!isNewPilar && (
        <Button 
          onClick={() => setIsEditingLayout(!isEditingLayout)} 
          variant="outline" 
          size="sm"
          className="mr-2"
        >
          {isEditingLayout ? 'Salvar Layout' : 'Editar Layout'}
        </Button>
      )}
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
          <>
            {isEditingLayout && (
              <Card className="p-4 bg-muted/30">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Editar Layout da Página</h2>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleAddSection('content')}>
                      <Plus className="mr-2 h-4 w-4" />
                      Conteúdo
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddSection('chart')}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Gráfico
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddSection('document')}>
                      <FileText className="mr-2 h-4 w-4" />
                      Documento
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleAddSection('chatbot')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Chatbot
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Adicione, remova ou reorganize elementos nesta página. Arraste os elementos para reordenar.
                </p>
              </Card>
            )}
            
            <div className="space-y-6">
              {layoutSections.map((section, index) => (
                <div key={section.id} className="relative">
                  {isEditingLayout && (
                    <div className="absolute -top-3 -right-3 z-10 flex space-x-1">
                      <Button size="icon" variant="outline" className="h-6 w-6 bg-card" 
                        onClick={() => handleMoveSection(index, 'up')}
                        disabled={index === 0}>
                        ↑
                      </Button>
                      <Button size="icon" variant="outline" className="h-6 w-6 bg-card"
                        onClick={() => handleMoveSection(index, 'down')}
                        disabled={index === layoutSections.length - 1}>
                        ↓
                      </Button>
                      <Button size="icon" variant="destructive" className="h-6 w-6 bg-card"
                        onClick={() => setLayoutSections(prev => prev.filter((_, i) => i !== index))}>
                        ×
                      </Button>
                    </div>
                  )}
                  {renderSection(section, index)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default PillarManagement;
