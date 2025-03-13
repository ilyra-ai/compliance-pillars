
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Edit, Plus, Settings, Trash, X } from 'lucide-react';

export interface Column {
  id: string;
  header: string;
  accessorKey: string;
  visible: boolean;
}

export interface TableData {
  id: string;
  [key: string]: any;
}

interface EditableTableProps {
  title: string;
  initialColumns: Column[];
  initialData: TableData[];
  onColumnsChange?: (columns: Column[]) => void;
  onDataChange?: (data: TableData[]) => void;
  maxRows?: number;
}

export const EditableTable: React.FC<EditableTableProps> = ({
  title,
  initialColumns,
  initialData,
  onColumnsChange,
  onDataChange,
  maxRows = 5,
}) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [data, setData] = useState<TableData[]>(initialData.slice(0, maxRows));
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
  const [isRowDialogOpen, setIsRowDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [editingRow, setEditingRow] = useState<TableData | null>(null);
  const [newRowData, setNewRowData] = useState<Record<string, any>>({});
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);

  // Update parent component when columns change
  useEffect(() => {
    if (onColumnsChange) {
      onColumnsChange(columns);
    }
  }, [columns, onColumnsChange]);

  // Update parent component when data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(data);
    }
  }, [data, onDataChange]);

  // Add new column
  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;
    
    const newColumnId = `column-${Date.now()}`;
    const newColumn: Column = {
      id: newColumnId,
      header: newColumnName,
      accessorKey: newColumnId,
      visible: true,
    };
    
    setColumns([...columns, newColumn]);
    setNewColumnName('');
    setIsAddingColumn(false);
  };

  // Update column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Rename column
  const renameColumn = (columnId: string, newName: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, header: newName } : col
      )
    );
    setEditingColumnId(null);
  };

  // Delete column
  const deleteColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  // Add new row
  const addNewRow = () => {
    if (data.length >= maxRows) {
      alert(`Maximum of ${maxRows} rows allowed.`);
      return;
    }
    
    const newRow: TableData = {
      id: `row-${Date.now()}`,
      ...newRowData,
    };
    
    setData([...data, newRow]);
    setNewRowData({});
    setIsRowDialogOpen(false);
  };

  // Update existing row
  const updateRow = () => {
    if (!editingRow) return;
    
    setData(
      data.map((row) => (row.id === editingRow.id ? { ...row, ...newRowData } : row))
    );
    
    setEditingRow(null);
    setNewRowData({});
    setIsRowDialogOpen(false);
  };

  // Delete row
  const deleteRow = (rowId: string) => {
    setData(data.filter((row) => row.id !== rowId));
  };

  // Start editing a row
  const startEditingRow = (row: TableData) => {
    setEditingRow(row);
    setNewRowData({ ...row });
    setIsRowDialogOpen(true);
  };

  // Prepare for adding a new row
  const prepareNewRow = () => {
    setEditingRow(null);
    setNewRowData({});
    setIsRowDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsColumnDialogOpen(true)}
          >
            <Settings className="h-4 w-4 mr-1" />
            Columns
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={prepareNewRow}
            disabled={data.length >= maxRows}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Row
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns
                .filter((col) => col.visible)
                .map((column) => (
                  <TableHead key={column.id}>{column.header}</TableHead>
                ))}
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.filter((col) => col.visible).length + 1}
                  className="h-24 text-center"
                >
                  No data available. Click "Add Row" to create a new entry.
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  {columns
                    .filter((col) => col.visible)
                    .map((column) => (
                      <TableCell key={`${row.id}-${column.id}`}>
                        {row[column.accessorKey] || '—'}
                      </TableCell>
                    ))}
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditingRow(row)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRow(row.id)}
                        className="text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Column Management Dialog */}
      <Dialog open={isColumnDialogOpen} onOpenChange={setIsColumnDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Columns</DialogTitle>
            <DialogDescription>
              Add, remove, or reorder columns in your table.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Column list */}
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className="flex items-center justify-between p-2 border rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={column.visible}
                      onCheckedChange={() => toggleColumnVisibility(column.id)}
                    />
                    {editingColumnId === column.id ? (
                      <Input
                        value={column.header}
                        onChange={(e) => 
                          setColumns(
                            columns.map((col) =>
                              col.id === column.id
                                ? { ...col, header: e.target.value }
                                : col
                            )
                          )
                        }
                        onBlur={() => setEditingColumnId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            renameColumn(column.id, column.header);
                          }
                        }}
                        autoFocus
                        className="h-8 w-[150px]"
                      />
                    ) : (
                      <span 
                        className="select-none"
                        onClick={() => setEditingColumnId(column.id)}
                      >
                        {column.header}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteColumn(column.id)}
                    className="text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            {/* Add new column form */}
            {isAddingColumn ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Column name"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddColumn();
                    }
                  }}
                  autoFocus
                />
                <Button variant="default" onClick={handleAddColumn}>
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsAddingColumn(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsAddingColumn(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsColumnDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Row Edit/Add Dialog */}
      <Dialog open={isRowDialogOpen} onOpenChange={setIsRowDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingRow ? 'Edit Row' : 'Add New Row'}
            </DialogTitle>
            <DialogDescription>
              {editingRow
                ? 'Update the values for this row.'
                : 'Fill in the values for the new row.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {columns.map((column) => (
              <div key={column.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={column.id} className="text-right">
                  {column.header}
                </Label>
                <Input
                  id={column.id}
                  value={newRowData[column.accessorKey] || ''}
                  onChange={(e) =>
                    setNewRowData({
                      ...newRowData,
                      [column.accessorKey]: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRowDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={editingRow ? updateRow : addNewRow}>
              {editingRow ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
