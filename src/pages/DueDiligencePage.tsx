
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  FileSearch, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Shield, 
  Briefcase, 
  Building, 
  UserCheck, 
  FileCheck,
  Plus,
  Download,
  Upload,
  Search,
  ListChecks
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Componente para a política de Due Diligence
const DueDiligencePolicy = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Política de Due Diligence
        </CardTitle>
        <CardDescription>
          Documento que descreve quando, por que e como a Due Diligence será conduzida
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="policy-version">Versão</Label>
            <Input id="policy-version" defaultValue="1.0" />
          </div>
          <div>
            <Label htmlFor="policy-date">Data de Atualização</Label>
            <Input id="policy-date" defaultValue="15/06/2023" type="date" />
          </div>
        </div>
        <div>
          <Label htmlFor="policy-overview">Visão Geral</Label>
          <Textarea 
            id="policy-overview" 
            className="min-h-[100px]"
            defaultValue="Esta política estabelece diretrizes para a condução de processos de Due Diligence em parceiros, fornecedores e clientes, com o objetivo de mitigar riscos de associação com entidades que possam comprometer a integridade da organização."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="policy-criteria">Critérios de Aplicação</Label>
            <Textarea 
              id="policy-criteria" 
              className="min-h-[100px]"
              defaultValue="- Contratos acima de R$ 100.000,00\n- Fornecedores de setores de alto risco\n- Parcerias estratégicas\n- Operações em jurisdições sensíveis"
            />
          </div>
          <div>
            <Label htmlFor="policy-roles">Papéis e Responsabilidades</Label>
            <Textarea 
              id="policy-roles" 
              className="min-h-[100px]"
              defaultValue="- Compliance: coordenação geral\n- Solicitantes: início do processo\n- Equipe de pesquisa: coleta de dados\n- Alta administração: decisão final em casos críticos"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="policy-sanctions">Sanções e Medidas</Label>
          <Textarea 
            id="policy-sanctions" 
            className="min-h-[100px]"
            defaultValue="Em caso de não conformidade identificada, as seguintes medidas podem ser aplicadas:\n- Rescisão contratual\n- Exigência de garantias adicionais\n- Aumento na frequência de monitoramento\n- Impossibilidade de novos contratos"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para procedimentos operacionais
const OperationalProcedures = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" />
          Procedimento Operacional
        </CardTitle>
        <CardDescription>
          Passo a passo detalhado do processo de Due Diligence
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Níveis de Due Diligence</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4 border-green-200 bg-green-50 dark:bg-green-950/20">
                <h4 className="font-medium text-green-700 dark:text-green-400">Básico</h4>
                <p className="text-sm text-muted-foreground">Para contratos de valores menores ou baixo risco setorial</p>
              </Card>
              <Card className="p-4 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
                <h4 className="font-medium text-blue-700 dark:text-blue-400">Intermediário</h4>
                <p className="text-sm text-muted-foreground">Consultas a bases de dados públicas e registros de crédito</p>
              </Card>
              <Card className="p-4 border-purple-200 bg-purple-50 dark:bg-purple-950/20">
                <h4 className="font-medium text-purple-700 dark:text-purple-400">Aprofundado</h4>
                <p className="text-sm text-muted-foreground">Investigação minuciosa, visitas in loco, análise societária detalhada</p>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Fases do Processo</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/20 rounded-full h-6 w-6 flex items-center justify-center text-primary">1</span>
                  Definição e Planejamento
                </h4>
                <ul className="ml-8 list-disc text-sm text-muted-foreground mt-2">
                  <li>Recebimento da solicitação</li>
                  <li>Verificação de enquadramento nos critérios</li>
                  <li>Abertura do protocolo inicial</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/20 rounded-full h-6 w-6 flex items-center justify-center text-primary">2</span>
                  Coleta de Informações
                </h4>
                <ul className="ml-8 list-disc text-sm text-muted-foreground mt-2">
                  <li>Dados de identificação</li>
                  <li>Pesquisa em bancos de dados oficiais</li>
                  <li>Verificação de solidez financeira</li>
                  <li>Checagem de imagem e reputação</li>
                  <li>Solicitação de autodeclarações</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/20 rounded-full h-6 w-6 flex items-center justify-center text-primary">3</span>
                  Análise e Classificação
                </h4>
                <ul className="ml-8 list-disc text-sm text-muted-foreground mt-2">
                  <li>Compilação de dados</li>
                  <li>Aplicação de checklists</li>
                  <li>Avaliação de risco</li>
                  <li>Documentação de conclusões</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/20 rounded-full h-6 w-6 flex items-center justify-center text-primary">4</span>
                  Decisão e Aprovação
                </h4>
                <ul className="ml-8 list-disc text-sm text-muted-foreground mt-2">
                  <li>Emissão do relatório final</li>
                  <li>Encaminhamento à autoridade competente</li>
                  <li>Registro e arquivamento</li>
                </ul>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium flex items-center gap-2">
                  <span className="bg-primary/20 rounded-full h-6 w-6 flex items-center justify-center text-primary">5</span>
                  Acompanhamento (Opcional)
                </h4>
                <ul className="ml-8 list-disc text-sm text-muted-foreground mt-2">
                  <li>Monitoramento pós-contrato</li>
                  <li>Integração com outras áreas</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Proteção de Dados</h3>
            <div className="p-4 bg-muted/30 rounded-md">
              <p className="text-sm">Todas as informações coletadas durante o processo de Due Diligence devem ser tratadas conforme a LGPD, com base legal adequada e acesso limitado a pessoas autorizadas.</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button>
            <CheckCircle className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para gerenciar checklists
const StandardizedChecklists = () => {
  const [activeChecklist, setActiveChecklist] = useState("identification");
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-primary" />
          Checklists Padronizados
        </CardTitle>
        <CardDescription>
          Verificação estruturada dos pontos críticos do processo de Due Diligence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="identification" value={activeChecklist} onValueChange={setActiveChecklist}>
          <TabsList className="mb-4 w-full flex-wrap">
            <TabsTrigger value="identification">Identificação</TabsTrigger>
            <TabsTrigger value="legal">Situação Legal</TabsTrigger>
            <TabsTrigger value="financial">Solidez Financeira</TabsTrigger>
            <TabsTrigger value="reputation">Reputação</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="identification" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-legal-name" className="mr-3" />
                <Label htmlFor="check-legal-name" className="flex-1 cursor-pointer">Razão social completa verificada</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-cnpj" className="mr-3" />
                <Label htmlFor="check-cnpj" className="flex-1 cursor-pointer">CNPJ/CPF validado e regular</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-address" className="mr-3" />
                <Label htmlFor="check-address" className="flex-1 cursor-pointer">Endereço físico confirmado</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-partners" className="mr-3" />
                <Label htmlFor="check-partners" className="flex-1 cursor-pointer">Lista de sócios ou diretores verificada</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-docs" className="mr-3" />
                <Label htmlFor="check-docs" className="flex-1 cursor-pointer">Documentos constitutivos analisados</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="identification-notes">Observações adicionais</Label>
                <Textarea id="identification-notes" className="mt-2" placeholder="Adicione notas ou esclarecimentos relevantes..." />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="legal" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-sanctions" className="mr-3" />
                <Label htmlFor="check-sanctions" className="flex-1 cursor-pointer">Não consta em listas de sanções nacionais (CEIS)</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-international" className="mr-3" />
                <Label htmlFor="check-international" className="flex-1 cursor-pointer">Não consta em listas internacionais (OFAC, ONU)</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-lawsuits" className="mr-3" />
                <Label htmlFor="check-lawsuits" className="flex-1 cursor-pointer">Processos judiciais e administrativos verificados</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="legal-notes">Observações adicionais</Label>
                <Textarea id="legal-notes" className="mt-2" placeholder="Adicione notas ou esclarecimentos relevantes..." />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="financial" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-financial-statements" className="mr-3" />
                <Label htmlFor="check-financial-statements" className="flex-1 cursor-pointer">Demonstrações financeiras analisadas</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-credit" className="mr-3" />
                <Label htmlFor="check-credit" className="flex-1 cursor-pointer">Consulta a bureaus de crédito (Serasa, Boa Vista)</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-revenue" className="mr-3" />
                <Label htmlFor="check-revenue" className="flex-1 cursor-pointer">Capacidade financeira adequada ao contrato</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="financial-notes">Observações adicionais</Label>
                <Textarea id="financial-notes" className="mt-2" placeholder="Adicione notas ou esclarecimentos relevantes..." />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reputation" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-media" className="mr-3" />
                <Label htmlFor="check-media" className="flex-1 cursor-pointer">Menções em mídias verificadas</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-corruption" className="mr-3" />
                <Label htmlFor="check-corruption" className="flex-1 cursor-pointer">Sem vínculos com corrupção ou fraudes</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-esg" className="mr-3" />
                <Label htmlFor="check-esg" className="flex-1 cursor-pointer">Práticas ESG verificadas</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="reputation-notes">Observações adicionais</Label>
                <Textarea id="reputation-notes" className="mt-2" placeholder="Adicione notas ou esclarecimentos relevantes..." />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-program" className="mr-3" />
                <Label htmlFor="check-program" className="flex-1 cursor-pointer">Programa de Compliance existente</Label>
                <Select defaultValue="checked">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-code" className="mr-3" />
                <Label htmlFor="check-code" className="flex-1 cursor-pointer">Código de ética ou conduta</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-3 border rounded-md">
                <input type="checkbox" id="check-channel" className="mr-3" />
                <Label htmlFor="check-channel" className="flex-1 cursor-pointer">Canal de denúncias implementado</Label>
                <Select defaultValue="pending">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checked">Verificado</SelectItem>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="na">Não aplicável</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="compliance-notes">Observações adicionais</Label>
                <Textarea id="compliance-notes" className="mt-2" placeholder="Adicione notas ou esclarecimentos relevantes..." />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => {
            const prev: Record<string, string> = {
              "identification": "compliance",
              "legal": "identification",
              "financial": "legal",
              "reputation": "financial",
              "compliance": "reputation"
            };
            setActiveChecklist(prev[activeChecklist]);
          }}>
            Anterior
          </Button>
          <div>
            <Button variant="outline" className="mr-2">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>Salvar</Button>
          </div>
          <Button onClick={() => {
            const next: Record<string, string> = {
              "identification": "legal",
              "legal": "financial",
              "financial": "reputation",
              "reputation": "compliance",
              "compliance": "identification"
            };
            setActiveChecklist(next[activeChecklist]);
          }}>
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para gerenciar autodeclarações
const SelfDeclarationForms = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          Formulários de Autodeclaração
        </CardTitle>
        <CardDescription>
          Documentos onde a contraparte registra informações relevantes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Autodeclaração Societária</h3>
              <p className="text-sm text-muted-foreground mb-4">Informações sobre estrutura societária e beneficiários finais</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Básico - PJ (DOCX)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Avançado - PJ (DOCX)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Básico - PF (DOCX)
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Declaração Conexões Políticas</h3>
              <p className="text-sm text-muted-foreground mb-4">Informações sobre relações com agentes públicos e PEPs</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo PEP - Português (DOCX)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo PEP - Inglês (DOCX)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo PEP - Espanhol (DOCX)
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Histórico de Penalidades</h3>
              <p className="text-sm text-muted-foreground mb-4">Declaração sobre sanções e penalidades anteriores</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Histórico (DOCX)
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2">Declaração Anticorrupção</h3>
              <p className="text-sm text-muted-foreground mb-4">Compromisso com práticas anticorrupção</p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo Lei 12.846 (DOCX)
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Modelo FCPA (DOCX)
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="mt-4 p-4 border rounded-md bg-muted/20">
            <h3 className="text-lg font-medium mb-2">Upload de Autodeclarações Preenchidas</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="partner-name">Nome do Parceiro</Label>
                <Input id="partner-name" placeholder="Razão social ou nome completo" />
              </div>
              <div>
                <Label htmlFor="form-type">Tipo de Formulário</Label>
                <Select>
                  <SelectTrigger id="form-type">
                    <SelectValue placeholder="Selecione o tipo..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Autodeclaração Societária</SelectItem>
                    <SelectItem value="political">Conexões Políticas</SelectItem>
                    <SelectItem value="penalties">Histórico de Penalidades</SelectItem>
                    <SelectItem value="anticorruption">Declaração Anticorrupção</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4">
              <Label>Upload de Documento</Label>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Arraste e solte ou clique para fazer upload
                </p>
                <Input type="file" className="hidden" />
                <Button variant="outline" size="sm" className="mt-4">
                  Selecionar Arquivo
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Carregar Documento
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para relatório final
const FinalReport = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Relatório Final de Due Diligence
        </CardTitle>
        <CardDescription>
          Consolidação e apresentação dos resultados e classificação de risco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="report-id">ID do Relatório</Label>
              <Input id="report-id" defaultValue="DD-2023-0042" />
            </div>
            <div>
              <Label htmlFor="report-date">Data</Label>
              <Input id="report-date" type="date" defaultValue="2023-06-28" />
            </div>
            <div>
              <Label htmlFor="risk-level">Nível de Risco</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="risk-level">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixo</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="high">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="partner-name">Nome da Contraparte</Label>
              <Input id="partner-name" defaultValue="Exemplo Comércio e Serviços Ltda." />
            </div>
            <div>
              <Label htmlFor="contract-value">Valor do Contrato (R$)</Label>
              <Input id="contract-value" defaultValue="250.000,00" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="summary">Resumo da Situação</Label>
            <Textarea 
              id="summary" 
              className="mt-2 min-h-[100px]" 
              defaultValue="A empresa Exemplo Comércio e Serviços Ltda. apresenta situação financeira estável e não possui menções negativas relevantes. Foram identificados alguns processos trabalhistas de baixo impacto e um sócio minoritário com conexão política (vereador em município de pequeno porte)." 
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="strengths">Pontos Fortes</Label>
              <Textarea 
                id="strengths" 
                className="mt-2 min-h-[100px]" 
                defaultValue="- Boa saúde financeira\n- Ausência de processos por corrupção\n- Presença no mercado há mais de 15 anos\n- Certificações de qualidade" 
              />
            </div>
            <div>
              <Label htmlFor="weaknesses">Pontos de Atenção</Label>
              <Textarea 
                id="weaknesses" 
                className="mt-2 min-h-[100px]" 
                defaultValue="- Processos trabalhistas recentes\n- Conexão política de sócio minoritário\n- Ausência de programa de compliance estruturado" 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="recommendations">Recomendações</Label>
            <Textarea 
              id="recommendations" 
              className="mt-2 min-h-[100px]" 
              defaultValue="Recomenda-se a aprovação da contratação com as seguintes condições:\n\n1. Inclusão de cláusulas anticorrupção reforçadas no contrato\n2. Monitoramento semestral da situação processual\n3. Exigência de declaração de conflito de interesses do sócio com conexão política" 
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="analyst">Analista Responsável</Label>
              <Input id="analyst" defaultValue="Maria Silva" />
            </div>
            <div>
              <Label htmlFor="reviewer">Revisor</Label>
              <Input id="reviewer" defaultValue="João Pereira" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="decision">Decisão Final</Label>
              <Select defaultValue="approved_conditions">
                <SelectTrigger id="decision">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approved">Aprovado</SelectItem>
                  <SelectItem value="approved_conditions">Aprovado com Condições</SelectItem>
                  <SelectItem value="rejected">Reprovado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="approved-by">Aprovado por</Label>
              <Input id="approved-by" defaultValue="Carlos Mendes" />
            </div>
            <div>
              <Label htmlFor="approval-date">Data de Aprovação</Label>
              <Input id="approval-date" type="date" defaultValue="2023-07-02" />
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Relatório
            </Button>
            <div>
              <Button variant="outline" className="mr-2">
                Salvar Rascunho
              </Button>
              <Button>
                Finalizar e Enviar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para consultas externas
const ExternalConsultations = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Consultas a Bases Externas
        </CardTitle>
        <CardDescription>
          Acesso rápido a fontes de consulta para Due Diligence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Bases Nacionais
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.portaltransparencia.gov.br/', '_blank')}>
                  Portal da Transparência
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://portaltransparencia.gov.br/sancoes/ceis', '_blank')}>
                  CEIS
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://certidoes-apf.apps.tcu.gov.br/', '_blank')}>
                  TCU - Certidões
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.cnj.jus.br/improbidade_adm/consultar_requerido.php', '_blank')}>
                  CNJ - Improbidade
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Bases Internacionais
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://sanctionssearch.ofac.treas.gov/', '_blank')}>
                  OFAC Sanctions
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.un.org/securitycouncil/content/un-sc-consolidated-list', '_blank')}>
                  ONU - Lista Consolidada
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://eur-lex.europa.eu/homepage.html', '_blank')}>
                  União Europeia - Sanções
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.gov.uk/government/publications/financial-sanctions-consolidated-list-of-targets', '_blank')}>
                  Reino Unido - Sanções
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Dados Comerciais
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.serasaexperian.com.br/', '_blank')}>
                  Serasa Experian
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.boavistaservicos.com.br/', '_blank')}>
                  Boa Vista SCPC
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.gov.br/empresas-e-negocios/pt-br/redesim', '_blank')}>
                  Redesim
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.jucesponline.sp.gov.br/', '_blank')}>
                  Juntas Comerciais
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Consultas de Pessoas Físicas
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://servicos.dpf.gov.br/antecedentes-criminais/certidao', '_blank')}>
                  Antecedentes Criminais - PF
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.tse.jus.br/servicos-eleitorais/certidoes/certidao-de-quitacao-eleitoral', '_blank')}>
                  Certidão Eleitoral - TSE
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.gov.br/receitafederal/pt-br/servicos/cpf/servicos-do-cpf', '_blank')}>
                  Situação CPF - Receita Federal
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Consultas de Pessoas Jurídicas
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp', '_blank')}>
                  Consulta CNPJ - Receita Federal
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/emissao-de-comprovante-ccmei', '_blank')}>
                  Consulta MEI
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => window.open('https://consultacnpj.ibge.gov.br/consultapj/ConsultaPJ.do', '_blank')}>
                  Classificação CNAE - IBGE
                </Button>
              </div>
            </Card>
          </div>
          
          <div className="p-4 bg-muted/20 rounded-md">
            <h3 className="text-lg font-medium mb-2">Consulta Personalizada</h3>
            <div className="flex gap-2">
              <Input placeholder="Nome, CNPJ ou palavra-chave" className="flex-1" />
              <Button variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Pesquisar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Realize buscas em múltiplas fontes simultaneamente (requer configuração de API)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para o Dashboard
const DashboardStats = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Dashboard de Due Diligence
        </CardTitle>
        <CardDescription>
          Visão geral dos processos e indicadores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Processos Ativos</h3>
            <p className="text-3xl font-bold">42</p>
            <div className="text-xs text-green-600 mt-1">+12% em relação ao mês anterior</div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Processos Concluídos</h3>
            <p className="text-3xl font-bold">187</p>
            <div className="text-xs text-muted-foreground mt-1">No ano corrente</div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Tempo Médio</h3>
            <p className="text-3xl font-bold">6,2</p>
            <div className="text-xs text-muted-foreground mt-1">Dias para conclusão</div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Taxa de Aprovação</h3>
            <p className="text-3xl font-bold">78%</p>
            <div className="text-xs text-muted-foreground mt-1">22% reprovados ou aprovados com condições</div>
          </Card>
        </div>
        
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Distribuição por Nível de Risco</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Baixo</span>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Médio</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Alto</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4">Principais Motivos de Rejeição</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Sanções/listas restritivas</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Envolvimento em corrupção</span>
                  <span className="text-sm font-medium">24%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Problemas financeiros graves</span>
                  <span className="text-sm font-medium">18%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Conflitos de interesse</span>
                  <span className="text-sm font-medium">16%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório Detalhado
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Página principal de Due Diligence
const DueDiligencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleCreateProcess = () => {
    toast.success("Novo processo de Due Diligence iniciado!");
  };
  
  return (
    <PageLayout
      title="8. Due Diligence"
      description="Processo formal e estruturado de verificação prévia para avaliar parceiros, fornecedores e clientes"
      contentClassName="max-w-7xl mx-auto"
      actions={
        <Button onClick={handleCreateProcess}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Processo
        </Button>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 w-full flex-wrap">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="policy">Política</TabsTrigger>
          <TabsTrigger value="procedure">Procedimento</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="forms">Autodeclarações</TabsTrigger>
          <TabsTrigger value="report">Relatório Final</TabsTrigger>
          <TabsTrigger value="databases">Bases de Consulta</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSearch className="h-5 w-5 text-primary" />
                Due Diligence - Visão Geral
              </CardTitle>
              <CardDescription>
                Conjunto de procedimentos para avaliar a integridade, reputação e capacidade de parceiros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Objetivo</h3>
                  <p className="text-muted-foreground">
                    Estabelecer um processo formal e estruturado de verificação prévia para avaliar a integridade, a reputação, a capacidade financeira e a adequação de possíveis parceiros, fornecedores ou clientes, visando reduzir riscos de associação com entidades ou pessoas que possam trazer problemas legais, éticos ou de imagem.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Conceito Geral</h3>
                  <p className="text-muted-foreground">
                    Due Diligence é um conjunto de procedimentos e consultas que a organização realiza antes de formalizar relações contratuais (parcerias, aquisições, fornecimentos, prestação de serviços, grandes contratações) para assegurar que a contraparte não possua histórico ou condições que possam colocar em risco a conformidade, a reputação ou a estabilidade do negócio.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Este processo não se restringe a verificação de dados financeiros, mas abrange aspectos como antecedentes criminais, listas de sanções, histórico de litígios, conformidade regulatória, sustentabilidade, governança e valores éticos.
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="p-4 border-l-4 border-l-primary">
                    <h3 className="font-medium">Etapas Principais</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>1. Definição e Planejamento</li>
                      <li>2. Coleta de Informações</li>
                      <li>3. Análise e Classificação</li>
                      <li>4. Decisão e Aprovação</li>
                      <li>5. Acompanhamento (Opcional)</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-4 border-l-4 border-l-primary">
                    <h3 className="font-medium">Documentos Principais</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Política de Due Diligence</li>
                      <li>• Procedimento Operacional</li>
                      <li>• Checklists Padronizados</li>
                      <li>• Formulários de Autodeclaração</li>
                      <li>• Relatório Final</li>
                    </ul>
                  </Card>
                  
                  <Card className="p-4 border-l-4 border-l-primary">
                    <h3 className="font-medium">Responsáveis</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Área de Compliance ou Riscos</li>
                      <li>• Solicitantes de Contratação</li>
                      <li>• Equipe de Pesquisa</li>
                      <li>• Alta Administração/Comitê</li>
                    </ul>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Processos de Due Diligence Recentes</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Contraparte</th>
                          <th className="px-4 py-2 text-left">Tipo</th>
                          <th className="px-4 py-2 text-left">Nível de Risco</th>
                          <th className="px-4 py-2 text-left">Status</th>
                          <th className="px-4 py-2 text-left">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-2">DD-2023-0042</td>
                          <td className="px-4 py-2">Exemplo Comércio Ltda.</td>
                          <td className="px-4 py-2">Fornecedor</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Médio</span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Aprovado com condições</span>
                          </td>
                          <td className="px-4 py-2">
                            <Button variant="outline" size="sm">Ver</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2">DD-2023-0041</td>
                          <td className="px-4 py-2">Serviços Gerais S.A.</td>
                          <td className="px-4 py-2">Prestador</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Baixo</span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Aprovado</span>
                          </td>
                          <td className="px-4 py-2">
                            <Button variant="outline" size="sm">Ver</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-2">DD-2023-0040</td>
                          <td className="px-4 py-2">Transportes Rápidos Ltda.</td>
                          <td className="px-4 py-2">Fornecedor</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Alto</span>
                          </td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Reprovado</span>
                          </td>
                          <td className="px-4 py-2">
                            <Button variant="outline" size="sm">Ver</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">
                    <Search className="mr-2 h-4 w-4" />
                    Consultar Processos
                  </Button>
                  <Button onClick={() => setActiveTab("policy")}>
                    Gerenciar Due Diligence
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="policy">
          <DueDiligencePolicy />
        </TabsContent>
        
        <TabsContent value="procedure">
          <OperationalProcedures />
        </TabsContent>
        
        <TabsContent value="checklists">
          <StandardizedChecklists />
        </TabsContent>
        
        <TabsContent value="forms">
          <SelfDeclarationForms />
        </TabsContent>
        
        <TabsContent value="report">
          <FinalReport />
        </TabsContent>
        
        <TabsContent value="databases">
          <ExternalConsultations />
        </TabsContent>
        
        <TabsContent value="dashboard">
          <DashboardStats />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default DueDiligencePage;
