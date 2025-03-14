
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface SavedLayout {
  id: string;
  name: string;
  components: any[];
  pagePath: string;
}

interface LoadLayoutDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  savedLayouts: SavedLayout[];
  onLoadLayout: (layoutId: string) => void;
  onDeleteLayout: (layoutId: string) => void;
}

export const LoadLayoutDialog: React.FC<LoadLayoutDialogProps> = ({
  showDialog,
  setShowDialog,
  savedLayouts,
  onLoadLayout,
  onDeleteLayout
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Carregar Layout</DialogTitle>
          <DialogDescription>
            Selecione um layout salvo para carregar nesta página.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto py-4">
          {savedLayouts.length > 0 ? (
            <div className="space-y-2">
              {savedLayouts.map((layout) => (
                <div
                  key={layout.id}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10"
                >
                  <div>
                    <div className="font-medium">{layout.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {layout.components.length} componentes
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={() => onLoadLayout(layout.id)}>
                      Carregar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onDeleteLayout(layout.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4 text-muted-foreground">
              Nenhum layout salvo encontrado.
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
