
import { createContext, useContext, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  font: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
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

// Separate the React component from the service
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

  // Create the context provider without JSX
  return React.createElement(
    ThemeContext.Provider,
    { value: { colors, updateColors, resetColors, applyTheme } },
    children
  );
};

export const useThemeService = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeService must be used within a ThemeProvider");
  }
  return context;
};

// Create a utility for theme service
export const themeService = {
  getTheme(): ThemeConfig {
    try {
      const savedTheme = localStorage.getItem("theme-colors");
      if (savedTheme) {
        return { colors: JSON.parse(savedTheme) };
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
    return { colors: defaultColors };
  },

  saveTheme(config: ThemeConfig): void {
    try {
      const { colors } = config;
      
      // Apply colors to CSS variables
      document.documentElement.style.setProperty("--primary", colors.primary);
      document.documentElement.style.setProperty("--secondary", colors.secondary);
      document.documentElement.style.setProperty("--accent", colors.accent);
      
      // Save to localStorage
      localStorage.setItem("theme-colors", JSON.stringify(colors));
      
      console.info("Theme saved with colors:", colors);
    } catch (error) {
      console.error("Error saving theme:", error);
      throw new Error("Failed to save theme");
    }
  },

  resetTheme(): void {
    this.saveTheme({ colors: defaultColors });
  },
  
  applyThemeTemporarily(config: ThemeConfig): void {
    try {
      const { colors } = config;
      
      // Apply colors to CSS variables without saving to localStorage
      document.documentElement.style.setProperty("--primary", colors.primary);
      document.documentElement.style.setProperty("--secondary", colors.secondary);
      document.documentElement.style.setProperty("--accent", colors.accent);
      
      console.info("Theme applied temporarily with colors:", colors);
    } catch (error) {
      console.error("Error applying temporary theme:", error);
    }
  },
  
  getThemeCSS(): string {
    const colors = this.getTheme().colors;
    
    return `
:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --font: ${colors.font || "Inter"};
}

/* Primary color variants */
.bg-primary { background-color: hsl(var(--primary)); }
.text-primary { color: hsl(var(--primary)); }
.border-primary { border-color: hsl(var(--primary)); }

/* Secondary color variants */
.bg-secondary { background-color: hsl(var(--secondary)); }
.text-secondary { color: hsl(var(--secondary)); }
.border-secondary { border-color: hsl(var(--secondary)); }

/* Accent color variants */
.bg-accent { background-color: hsl(var(--accent)); }
.text-accent { color: hsl(var(--accent)); }
.border-accent { border-color: hsl(var(--accent)); }

/* Font family */
body {
  font-family: var(--font), system-ui, sans-serif;
}
`.trim();
  }
};
