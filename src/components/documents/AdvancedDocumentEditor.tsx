
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Upload,
  Download,
  Save,
  Edit,
  CloudIcon,
  FileEdit,
  ExternalLink,
} from 'lucide-react';

interface AdvancedDocumentEditorProps {
  pillarId: string;
}

const AdvancedDocumentEditor: React.FC<AdvancedDocumentEditorProps> = ({ pillarId }) => {
  const [activeTab, setActiveTab] = useState('local');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [driveUrl, setDriveUrl] = useState('');
  const [oneDriveUrl, setOneDriveUrl] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success(`Arquivo ${e.target.files[0].name} selecionado`);
    }
  };
  
  const handleUpload = () => {
    if (selectedFile) {
      toast.success(`Iniciando edição de ${selectedFile.name}`);
      // Integration logic would go here
    } else {
      toast.error('Por favor, selecione um arquivo primeiro.');
    }
  };

  const handleGoogleDriveEdit = () => {
    if (driveUrl) {
      toast.success('Conectando ao documento do Google Drive...');
      // Google Drive integration logic would go here
    } else {
      toast.error('Por favor, insira um URL do Google Drive.');
    }
  };

  const handleOneDriveEdit = () => {
    if (oneDriveUrl) {
      toast.success('Conectando ao documento do OneDrive...');
      // OneDrive integration logic would go here
    } else {
      toast.error('Por favor, insira um URL do OneDrive.');
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="local">
            <FileEdit className="mr-2 h-4 w-4" />
            Arquivos Locais
          </TabsTrigger>
          <TabsTrigger value="googledrive">
            <CloudIcon className="mr-2 h-4 w-4" />
            Google Drive
          </TabsTrigger>
          <TabsTrigger value="onedrive">
            <CloudIcon className="mr-2 h-4 w-4" />
            OneDrive
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="local" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editar Documentos Locais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Selecione um Arquivo</Label>
                <Input id="file-upload" type="file" onChange={handleFileChange} />
                <p className="text-sm text-muted-foreground">
                  Suporta Word (.docx), Excel (.xlsx), PowerPoint (.pptx) e mais
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileText className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm font-medium">Word</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-2" />
                  <p className="text-sm font-medium">Excel</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileImage className="h-12 w-12 mx-auto text-red-600 mb-2" />
                  <p className="text-sm font-medium">PowerPoint</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileText className="h-12 w-12 mx-auto text-gray-600 mb-2" />
                  <p className="text-sm font-medium">PDF</p>
                </Card>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Button onClick={handleUpload} disabled={!selectedFile}>
                  <Edit className="mr-2 h-4 w-4" />
                  Iniciar Edição
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="googledrive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editar Documentos do Google</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gdrive-url">URL do Documento Google</Label>
                <Input 
                  id="gdrive-url" 
                  value={driveUrl} 
                  onChange={(e) => setDriveUrl(e.target.value)} 
                  placeholder="https://docs.google.com/document/d/..." 
                />
                <p className="text-sm text-muted-foreground">
                  Adicione uma URL do Google Docs, Sheets ou Slides
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileText className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                  <p className="text-sm font-medium">Google Docs</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileSpreadsheet className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  <p className="text-sm font-medium">Google Sheets</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileImage className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                  <p className="text-sm font-medium">Google Slides</p>
                </Card>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={handleGoogleDriveEdit} disabled={!driveUrl}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Editar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onedrive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Editar Documentos do OneDrive</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="onedrive-url">URL do Documento OneDrive</Label>
                <Input 
                  id="onedrive-url" 
                  value={oneDriveUrl} 
                  onChange={(e) => setOneDriveUrl(e.target.value)} 
                  placeholder="https://onedrive.live.com/edit.aspx?..." 
                />
                <p className="text-sm text-muted-foreground">
                  Adicione uma URL do Word, Excel ou PowerPoint Online
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileText className="h-12 w-12 mx-auto text-blue-600 mb-2" />
                  <p className="text-sm font-medium">Word Online</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <FileSpreadsheet className="h-12 w-12 mx-auto text-green-600 mb-2" />
                  <p className="text-sm font-medium">Excel Online</p>
                </Card>
                <Card className="p-4 text-center hover:border-primary cursor-pointer transition-all">
                  <File className="h-12 w-12 mx-auto text-red-600 mb-2" />
                  <p className="text-sm font-medium">PowerPoint Online</p>
                </Card>
              </div>

              <div className="flex justify-end mt-4">
                <Button onClick={handleOneDriveEdit} disabled={!oneDriveUrl}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Editar Documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedDocumentEditor;
