
import { createContext, useContext, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (colors: Partial<ThemeColors>) => void;
  resetColors: () => void;
  applyTheme: (themeName: string) => void;
}

const defaultColors: ThemeColors = {
  primary: "221.2 83.2% 53.3%",
  secondary: "215 27.9% 16.9%",
  accent: "210 40% 96.1%",
  font: "Inter"
};

export const predefinedThemes = {
  default: {
    primary: "221.2 83.2% 53.3%",
    secondary: "215 27.9% 16.9%",
    accent: "210 40% 96.1%",
    font: "Inter"
  },
  forest: {
    primary: "142 76% 36%",
    secondary: "180 60% 25%",
    accent: "120 40% 94%",
    font: "Poppins"
  },
  sunset: {
    primary: "25 95% 53%",
    secondary: "4 90% 28%",
    accent: "50 30% 96%",
    font: "Lato"
  },
  ocean: {
    primary: "198 93% 60%",
    secondary: "200 98% 24%",
    accent: "190 40% 96%",
    font: "Montserrat"
  },
  lavender: {
    primary: "239 84% 67%",
    secondary: "160 84% 39%",
    accent: "38 92% 50%",
    font: "Imprima"
  },
  midnight: {
    primary: "245 58% 51%",
    secondary: "230 22% 20%",
    accent: "230 20% 96%",
    font: "Nunito"
  },
  corporate: {
    primary: "215 100% 38%",
    secondary: "215 28% 17%",
    accent: "10 100% 80%",
    font: "Lato"
  },
  modern: {
    primary: "262 83% 58%",
    secondary: "250 24% 20%",
    accent: "270 20% 96%",
    font: "Montserrat"
  }
};

export const availableFonts = [
  "Inter",
  "Roboto",
  "Lato",
  "Poppins",
  "Montserrat",
  "Nunito",
  "Raleway",
  "Open Sans",
  "Playfair Display",
  "Imprima"
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const { theme } = useTheme();

  const updateColors = (newColors: Partial<ThemeColors>) => {
    try {
      setColors((prev) => {
        const updated = { ...prev, ...newColors };
        
        // Apply colors to CSS variables
        document.documentElement.style.setProperty("--primary", updated.primary);
        document.documentElement.style.setProperty("--secondary", updated.secondary);
        document.documentElement.style.setProperty("--accent", updated.accent);
        
        // Save to localStorage
        localStorage.setItem("theme-colors", JSON.stringify(updated));
        
        console.info("Theme applied with colors:", updated);
        return updated;
      });
      
      // Show success toast notification
      toast.success("Tema atualizado com sucesso");
    } catch (error) {
      console.error("Error updating theme:", error);
      toast.error("Erro ao atualizar o tema");
    }
  };

  const resetColors = () => {
    updateColors(defaultColors);
  };

  const applyTheme = (themeName: keyof typeof predefinedThemes) => {
    if (predefinedThemes[themeName]) {
      updateColors(predefinedThemes[themeName]);
    }
  };

  return (
    <ThemeContext.Provider value={{ colors, updateColors, resetColors, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeService = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeService must be used within a ThemeProvider");
  }
  return context;
};
