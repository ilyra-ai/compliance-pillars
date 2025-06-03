import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocation } from 'react-router-dom';
import { PageCustomizer } from '@/components/ui/customizable/PageCustomizer';
import { CustomizableLayout } from '@/components/ui/customizable/CustomizableLayout';
import { Palette, Eye, PlusCircle } from 'lucide-react';

interface RolePermission {
  id: string;
  name: string;
  pillars: Record<string, boolean>;
  features: Record<string, boolean>;
}

const initialRoles: RolePermission[] = [
  {
    id: 'admin',
    name: 'Administrador',
    pillars: { all: true },
    features: { all: true }
  },
  {
    id: 'gestor',
    name: 'Gestor',
    pillars: {
      risk: true,
      compliance: true,
      'due-diligence': true
    },
    features: {
      charts: true,
      reports: true,
      documents: true
    }
  }
];

const pillarsList = [
  'templates',
  'leadership',
  'risk',
  'policies',
  'controls',
  'training',
  'complaints',
  'investigations',
  'due-diligence',
  'audits',
  'monitoring',
  'lgpd',
  'improvements'
];

const featuresList = [
  'charts',
  'reports',
  'documents',
  'settings',
  'database',
  'backup',
  'users'
];

const AccessControlPage: React.FC = () => {
  const location = useLocation();
  const [roles, setRoles] = useState<RolePermission[]>(initialRoles);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('roles');

  const handleToggle = (
    roleId: string,
    type: 'pillars' | 'features',
    key: string
  ) => {
    setRoles(prev =>
      prev.map(role =>
        role.id === roleId
          ? {
              ...role,
              [type]: {
                ...role[type],
                [key]: !role[type][key]
              }
            }
          : role
      )
    );
  };

  return (
    <PageLayout
      title="Gestão de Acessos"
      description="Defina permissões de acesso por perfil de usuário"
      actions={
        <Button
          onClick={() => {
            setEditMode(!editMode);
            setActiveTab(editMode ? 'roles' : 'editor');
          }}
          variant={editMode ? 'default' : 'outline'}
          className="relative overflow-hidden group"
          size="sm"
        >
          {editMode ? (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Modo Visualização
            </>
          ) : (
            <>
              <Palette className="mr-2 h-4 w-4" />
              <span>Personalizar UI</span>
              <span className="absolute right-0 top-0 h-full w-2 bg-primary/20 animate-pulse hidden group-hover:block"></span>
            </>
          )}
        </Button>
      }
      customizable={editMode}
    >
      <Tabs value={editMode ? 'editor' : activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="roles">Perfis</TabsTrigger>
          <TabsTrigger value="editor" className="relative">
            Editor de Layout
            {!editMode && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles">
          <div className="grid gap-6">
            {roles.map(role => (
              <Card key={role.id}>
                <CardHeader>
                  <CardTitle>{role.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Pilares</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {pillarsList.map(p => (
                          <div key={p} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${role.id}-pillar-${p}`}
                              checked={!!role.pillars[p]}
                              onCheckedChange={() => handleToggle(role.id, 'pillars', p)}
                            />
                            <label htmlFor={`${role.id}-pillar-${p}`} className="text-sm leading-none">
                              {p}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Funcionalidades</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {featuresList.map(f => (
                          <div key={f} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${role.id}-feature-${f}`}
                              checked={!!role.features[f]}
                              onCheckedChange={() => handleToggle(role.id, 'features', f)}
                            />
                            <label htmlFor={`${role.id}-feature-${f}`} className="text-sm leading-none">
                              {f}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Regra
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor">
          <PageCustomizer pagePath={location.pathname} editMode={true} onEditModeChange={setEditMode}>
            <CustomizableLayout />
          </PageCustomizer>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default AccessControlPage;

