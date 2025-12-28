// constants/colors.ts
export const Colors = {
  // Colores principales (azules)
  primary: '#023e8a',
  secondary: '#2584b7',
  accent: '#002a52',

  light_primary: '#e4f5fb',
  light_secondary: '#90e0ef',

  // Background
  bg_light: '#90e0ef',
  bg_light_secondary: '#e9f1fb',
  bg_light_accent: '#d8ecf4',

  bg_dark: '#002a52',
  bg_dark_secondary: '#006283',

  // Text
  text_primary: "#002a52",
  text_seconday: "#006283",

  error: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  info: '#48cae4', // Usa tu accent color

  // Otros
  disabled: '#90e0ef',
  overlay: 'rgba(3, 4, 94, 0.5)', // Dark overlay con tu color base

  modules: {
    dashboard: {
      accent: '#2584b7',         // Azul medio
      gradient: ['#002a52', '#023e8a'],
    },
    chat: {
      accent: '#8B5CF6',         // Morado (IA)
      gradient: ['#002a52', '#4c1d95'],
    },
    pos: {
      accent: '#34C759',         // Verde (ventas)
      gradient: ['#002a52', '#065f46'],
    },
    products: {
      accent: '#F59E0B',         // Naranja (inventario)
      gradient: ['#002a52', '#92400e'],
    },
    finance: {
      accent: '#10B981',         // Verde esmeralda (dinero)
      gradient: ['#002a52', '#047857'],
    },
    profile: {
      accent: '#3B82F6',         // Azul claro
      gradient: ['#002a52', '#1e40af'],
    },
  },
};

// En tu Colors.ts, añade:
export const TabBarColors = {
  background: 'rgba(255, 255, 255, 0.85)',
  activeGradient: ['#023e8a', '#48cae4'],
  inactiveIcon: '#90e0ef',
  activeIcon: '#ffffff',
  border: 'rgba(255, 255, 255, 0.5)',
};
// Tema oscuro (por defecto)
export const DarkTheme = {
  ...Colors,
  background: '#03045e',
  text: '#c8f0f7',
  textSecondary: '#90e0ef',
};

// Tema claro (alternativa)
export const LightTheme = {
  primary: '#023e8a',
  secondary: '#2584b7',
  accent: '#48cae4',
  
  background: '#c8f0f7',
  backgroundLight: '#ffffff',
  backgroundMuted: '#90e0ef',
  
  text: '#03045e',
  textSecondary: '#2584b7',
  textMuted: '#90e0ef',
  textDark: '#03045e',
  
  error: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  info: '#48cae4',
  
  border: '#2584b7',
  borderLight: '#48cae4',
  borderMuted: '#90e0ef',
  
  disabled: '#90e0ef',
  overlay: 'rgba(200, 240, 247, 0.5)',
  
  gradient: {
    from: '#c8f0f7',
    to: '#90e0ef',
    accent: '#023e8a',
  },
};

// Paleta extendida para componentes específicos
export const ComponentColors = {
  // Botones
  button: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    disabled: Colors.disabled,
  },
  
  // Cards
  card: {
    background: "#f2fafd",
    shadow: 'rgba(2, 62, 138, 0.1)',
  },
  
  // Inputs
  input: {
    background: "#ffffff",
    border: Colors.light_secondary,
    borderFocus: Colors.accent,
    text: "#03045e",
    placeholder: Colors.overlay,
  },
};