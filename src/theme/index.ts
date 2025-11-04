// Theme tokens and design system

export const theme = {
  colors: {
    primary: '#028AFB',
    primaryDark: '#0266C1',
    primaryLight: '#33A3FC',
    secondary: '#0D74C9',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceLight: '#334155',
    text: '#e2e8f0',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    border: '#475569',
    elevator: {
      idle: '#64748b',
      moving: '#3b82f6',
      stopped: '#10b981',
      doorOpen: '#f59e0b',
    },
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96],
  fonts: {
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", "Courier New", monospace',
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 40, 48],
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  breakpoints: ['480px', '768px', '1024px', '1280px'],
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  // Elevator-specific config
  elevator: {
    speedMsPerFloor: 500,
    doorOpenMs: 800,
    shaftWidth: 80,
    floorHeight: 100,
  },
};

export type Theme = typeof theme;

// Styled-components type extension
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

