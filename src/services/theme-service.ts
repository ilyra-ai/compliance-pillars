
import { toast } from 'sonner';

// Define theme configuration interface
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    font?: string;
  };
  fonts: {
    family: string;
  };
  assets: {
    logo: string;
  };
}

// Default theme configuration
const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#637fe2',
    secondary: '#10b981',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937',
  },
  fonts: {
    family: 'Imprima',
  },
  assets: {
    logo: '/logo.svg',
  },
};

class ThemeService {
  private static instance: ThemeService;
  private currentTheme: ThemeConfig;
  private tempTheme: ThemeConfig | null = null;

  private constructor() {
    this.currentTheme = this.loadTheme();
    this.applyTheme(this.currentTheme);
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  private loadTheme(): ThemeConfig {
    try {
      const savedTheme = localStorage.getItem('app-theme');
      if (savedTheme) {
        return { ...defaultTheme, ...JSON.parse(savedTheme) };
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
    return { ...defaultTheme };
  }

  public getTheme(): ThemeConfig {
    return this.tempTheme || this.currentTheme;
  }

  public saveTheme(config: ThemeConfig): void {
    try {
      this.currentTheme = { ...this.currentTheme, ...config };
      localStorage.setItem('app-theme', JSON.stringify(this.currentTheme));
      this.applyTheme(this.currentTheme);
      this.tempTheme = null;
    } catch (error) {
      console.error('Error saving theme:', error);
      throw new Error('Failed to save theme configuration.');
    }
  }

  public resetTheme(): void {
    try {
      localStorage.removeItem('app-theme');
      this.currentTheme = { ...defaultTheme };
      this.applyTheme(this.currentTheme);
      this.tempTheme = null;
    } catch (error) {
      console.error('Error resetting theme:', error);
      throw new Error('Failed to reset theme configuration.');
    }
  }

  public applyThemeTemporarily(config: ThemeConfig): void {
    this.tempTheme = config;
    this.applyTheme(config);
  }

  public getThemeCSS(): string {
    const theme = this.getTheme();
    return `
:root {
  --primary: ${this.hexToHSL(theme.colors.primary)};
  --primary-foreground: 0 0% 98%;
  
  --secondary: ${this.hexToHSL(theme.colors.secondary)};
  --secondary-foreground: 0 0% 98%;
  
  --accent: ${this.hexToHSL(theme.colors.accent)};
  --accent-foreground: 0 0% 98%;
  
  --background: ${this.hexToHSL(theme.colors.background)};
  --foreground: ${this.hexToHSL(theme.colors.text)};
  
  --card: ${this.hexToHSL(theme.colors.background)};
  --card-foreground: ${this.hexToHSL(theme.colors.text)};
  
  --popover: ${this.hexToHSL(theme.colors.background)};
  --popover-foreground: ${this.hexToHSL(theme.colors.text)};
  
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: ${this.hexToHSL(theme.colors.primary)};
  
  --radius: 0.5rem;
  
  --font-family: ${theme.fonts.family || 'Imprima'}, sans-serif;
}

body {
  font-family: var(--font-family);
}
`.trim();
  }

  private applyTheme(config: ThemeConfig): void {
    try {
      const root = document.documentElement;
      
      // Convert HEX colors to HSL
      const primaryHSL = this.hexToHSL(config.colors.primary);
      const secondaryHSL = this.hexToHSL(config.colors.secondary);
      const accentHSL = this.hexToHSL(config.colors.accent);
      const backgroundHSL = this.hexToHSL(config.colors.background);
      const textHSL = this.hexToHSL(config.colors.text);
      
      // Set CSS variables
      root.style.setProperty('--primary', primaryHSL);
      root.style.setProperty('--secondary', secondaryHSL);
      root.style.setProperty('--accent', accentHSL);
      root.style.setProperty('--background', backgroundHSL);
      root.style.setProperty('--foreground', textHSL);
      root.style.setProperty('--card', backgroundHSL);
      root.style.setProperty('--card-foreground', textHSL);
      root.style.setProperty('--popover', backgroundHSL);
      root.style.setProperty('--popover-foreground', textHSL);
      root.style.setProperty('--ring', primaryHSL);
      
      // Update font family if provided
      if (config.fonts && config.fonts.family) {
        root.style.setProperty('--font-family', `${config.fonts.family}, sans-serif`);
      }
      
      // Detect if we need to use dark mode
      const isDarkBackground = this.isColorDark(config.colors.background);
      root.classList.toggle('dark-theme', isDarkBackground);
      
      // Handle other aspects like logo
      if (config.assets && config.assets.logo) {
        // Set logo - implementation depends on your app structure
        document.querySelectorAll('.app-logo').forEach((logo: Element) => {
          if (logo instanceof HTMLImageElement) {
            logo.src = config.assets.logo;
          }
        });
      }
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }

  private hexToHSL(hex: string): string {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h /= 6;
    }
    
    // Convert to degrees, percentage, percentage
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  }
  
  private isColorDark(hex: string): boolean {
    // Remove the # if present
    hex = hex.replace('#', '');
    
    // Parse the RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate perceived brightness (using the formula to determine relative luminance)
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    
    // Return true if the color is dark (brightness < 0.5)
    return brightness < 0.5;
  }
}

// Export singleton instance
export const themeService = ThemeService.getInstance();
