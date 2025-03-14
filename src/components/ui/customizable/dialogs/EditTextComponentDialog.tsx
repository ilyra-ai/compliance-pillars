
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface EditTextComponentDialogProps {
  editComponentId: string | null;
  setEditComponentId: (id: string | null) => void;
  customTextContent: string;
  setCustomTextContent: (content: string) => void;
  onSaveTextComponent: () => void;
  componentType?: string;
}

export const EditTextComponentDialog: React.FC<EditTextComponentDialogProps> = ({
  editComponentId,
  setEditComponentId,
  customTextContent,
  setCustomTextContent,
  onSaveTextComponent,
  componentType = 'text'
}) => {
  return (
    <Dialog
      open={editComponentId !== null && componentType === 'text'}
      onOpenChange={(open) => !open && setEditComponentId(null)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Texto</DialogTitle>
          <DialogDescription>
            Edite o conteúdo deste componente de texto.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={customTextContent}
          onChange={(e) => setCustomTextContent(e.target.value)}
          rows={10}
          className="w-full"
          placeholder="Digite seu texto aqui..."
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditComponentId(null)}>
            Cancelar
          </Button>
          <Button onClick={onSaveTextComponent}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
