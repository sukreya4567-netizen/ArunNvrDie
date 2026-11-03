export interface OptimizationModule {
  id: string;
  number: number;
  title: string;
  category: 'kernel' | 'hardware' | 'network' | 'input' | 'system' | 'maintenance';
  badge: string;
  summary: string;
  technicalDetails: string[];
  impactMetric: string;
  registryKeys?: {
    path: string;
    key: string;
    value: string | number;
    description: string;
  }[];
  batchCommands?: string[];
  powerShellCommands?: string[];
  isVerifiedZeroPlacebo: boolean;
}

export interface CreatorProfile {
  id: string;
  name: string;
  tagline: string;
  youtubeChannel: string;
  videoHighlights: {
    title: string;
    keyTakeaway: string;
    viewsCount?: string;
  }[];
  mouseConfig: {
    dpi: number;
    pollingRateHz: number;
    windowsPointerSpeed: string;
    enhancePointerPrecision: boolean;
  };
  inGameSens: {
    general: number;
    redDot: number;
    scope2x: number;
    scope4x: number;
    sniper: number;
    freeLook: number;
  };
  emulatorSettings: {
    emulatorName: string;
    version: string;
    tweak: string;
    xSens: number;
    ySens: number;
    resolution: string;
    aspectRatio: string;
    dpi: number;
    graphicsRenderer: string;
    interfaceRenderer: string;
    astc: string;
    cpuCores: number;
    ramMB: number;
    fpsTarget: number;
    deviceModel: string;
    fireButtonSizePercent: number;
    fireButtonPosition: string;
  };
  secretTuningNote: string;
  badgeColor: string;
}

export type CurrencyCode = 'USD' | 'INR' | 'PKR' | 'BDT' | 'GBP' | 'SAR';

export interface CurrencyInfo {
  symbol: string;
  rate: number;
  flag: string;
  label: string;
}

export interface CartItem {
  id: string;
  title: string;
  priceUSD: number;
  category: string;
  badge?: string;
  quantity: number;
  image?: string;
}
