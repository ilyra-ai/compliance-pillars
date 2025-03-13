
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ThemeFonts {
  family: string;
}

interface ThemeAssets {
  logo: string;
}

export interface ThemeConfig {
  colors: ThemeColors;
  fonts: ThemeFonts;
  assets: ThemeAssets;
}

class ThemeService {
  private static instance: ThemeService;
  private themeConfig: ThemeConfig;
  private readonly STORAGE_KEY = 'themeConfig';

  private constructor() {
    // Tente carregar a configuração salva ou use os valores padrão
    const savedConfig = localStorage.getItem(this.STORAGE_KEY);
    if (savedConfig) {
      try {
        this.themeConfig = JSON.parse(savedConfig);
        console.log('Theme loaded from localStorage:', this.themeConfig);
      } catch (e) {
        console.error('Error parsing saved theme:', e);
        this.themeConfig = this.getDefaultTheme();
      }
    } else {
      this.themeConfig = this.getDefaultTheme();
    }

    // Aplica o tema ao carregar
    this.applyTheme(this.themeConfig);
  }

  public static getInstance(): ThemeService {
    if (!ThemeService.instance) {
      ThemeService.instance = new ThemeService();
    }
    return ThemeService.instance;
  }

  private getDefaultTheme(): ThemeConfig {
    return {
      colors: {
        primary: '#6366f1',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        family: 'Inter'
      },
      assets: {
        logo: '/placeholder.svg'
      }
    };
  }

  public getTheme(): ThemeConfig {
    return {...this.themeConfig};
  }

  public saveTheme(config: ThemeConfig): void {
    console.log('Saving theme:', config);
    this.themeConfig = config;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
    this.applyTheme(config);
  }

  public resetTheme(): void {
    const defaultTheme = this.getDefaultTheme();
    this.saveTheme(defaultTheme);
  }

  private applyTheme(config: ThemeConfig): void {
    // Aplicar cores
    document.documentElement.style.setProperty('--color-primary', config.colors.primary);
    document.documentElement.style.setProperty('--color-secondary', config.colors.secondary);
    document.documentElement.style.setProperty('--color-accent', config.colors.accent);
    document.documentElement.style.setProperty('--color-background', config.colors.background);
    document.documentElement.style.setProperty('--color-text', config.colors.text);
    
    // Atualiza as variáveis CSS do Tailwind
    const hslPrimary = this.hexToHSL(config.colors.primary);
    const hslSecondary = this.hexToHSL(config.colors.secondary);
    const hslAccent = this.hexToHSL(config.colors.accent);
    
    document.documentElement.style.setProperty('--primary', hslPrimary);
    document.documentElement.style.setProperty('--secondary', hslSecondary);
    document.documentElement.style.setProperty('--accent', hslAccent);
    
    // Atualiza a fonte
    if (config.fonts.family) {
      document.documentElement.style.setProperty('--font-family', `'${config.fonts.family}', sans-serif`);
      document.body.style.fontFamily = `'${config.fonts.family}', sans-serif`;
    }

    // Para debug
    console.log('Theme applied:', {
      primary: hslPrimary,
      secondary: hslSecondary,
      accent: hslAccent,
      font: config.fonts.family
    });

    // Dispara um evento customizado para que outros componentes possam reagir à mudança de tema
    window.dispatchEvent(new CustomEvent('themechange', { detail: config }));
  }

  private hexToHSL(hex: string): string {
    // Remove o # se existir
    hex = hex.replace(/^#/, '');
    
    // Converte hex para rgb
    let r = parseInt(hex.slice(0, 2), 16) / 255;
    let g = parseInt(hex.slice(2, 4), 16) / 255;
    let b = parseInt(hex.slice(4, 6), 16) / 255;
    
    // Encontra os valores máximo e mínimo para calcular a luminância
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
      
      h = Math.round(h * 60);
    }
    
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return `${h} ${s}% ${l}%`;
  }

  // Adicione um método para obter uma URL de preview com o tema atual
  public getPreviewUrl(): string {
    const baseUrl = window.location.origin;
    const themeParam = encodeURIComponent(JSON.stringify(this.themeConfig));
    return `${baseUrl}?preview=${themeParam}`;
  }

  // Adicione um método para copiar o código CSS do tema atual
  public getThemeCSS(): string {
    const { colors, fonts } = this.themeConfig;
    return `
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-text: ${colors.text};
  --font-family: '${fonts.family}', sans-serif;
  
  /* Tailwind HSL variants */
  --primary: ${this.hexToHSL(colors.primary)};
  --secondary: ${this.hexToHSL(colors.secondary)};
  --accent: ${this.hexToHSL(colors.accent)};
}
    `;
  }
}

export const themeService = ThemeService.getInstance();
