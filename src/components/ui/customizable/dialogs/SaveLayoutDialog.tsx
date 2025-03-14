
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface SaveLayoutDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  layoutName: string;
  setLayoutName: (name: string) => void;
  onSaveLayout: () => void;
}

export const SaveLayoutDialog: React.FC<SaveLayoutDialogProps> = ({
  showDialog,
  setShowDialog,
  layoutName,
  setLayoutName,
  onSaveLayout
}) => {
  const handleSave = () => {
    if (!layoutName.trim()) {
      toast.error("Por favor, insira um nome para o layout");
      return;
    }
    
    onSaveLayout();
  };
  
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Salvar Layout</DialogTitle>
          <DialogDescription>
            Dê um nome para este layout para poder carregá-lo posteriormente.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="layout-name" className="text-right">
              Nome
            </Label>
            <Input
              id="layout-name"
              className="col-span-3"
              value={layoutName}
              onChange={(e) => setLayoutName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
