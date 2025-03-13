
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorSwatchProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ 
  color, 
  onChange, 
  label 
}) => {
  const handleColorChange = (value: string) => {
    try {
      // Validate hex color
      if (value.match(/^#([0-9A-F]{3}){1,2}$/i)) {
        onChange(value);
      } else if (value.match(/^([0-9A-F]{3}){1,2}$/i)) {
        // Add # if missing
        onChange(`#${value}`);
      } else if (value.startsWith('#') && value.length <= 7) {
        // Allow partial input while typing
        onChange(value);
      }
    } catch (error) {
      console.error('Error changing color:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      {label && <Label className="text-xs">{label}</Label>}
      <div className="flex items-center gap-2">
        <div 
          className="h-8 w-8 rounded-md border shadow-sm" 
          style={{ backgroundColor: color }}
        />
        <Input 
          type="color" 
          value={color} 
          onChange={(e) => onChange(e.target.value)} 
          className="w-16 h-8 p-0" 
        />
        <Input 
          type="text" 
          value={color} 
          onChange={(e) => handleColorChange(e.target.value)} 
          className="w-full" 
        />
      </div>
    </div>
  );
};
