import { CreatorProfile } from '../types';

export const CREATOR_SENSITIVITIES: CreatorProfile[] = [
  {
    id: 'borak-777',
    name: 'Borak 777',
    tagline: 'The Undisputed King of One-Tap Drag & Red Dot Snapping',
    youtubeChannel: 'Borak 777 Official',
    videoHighlights: [
      {
        title: 'MY REAL ZERO RECOIL & HEADSHOT SETTINGS (BlueStacks 5)',
        keyTakeaway: 'Borak uses 800 DPI with Windows 6/11 pointer speed and a steep 1.45/2.35 X/Y ratio on Tweak 16450 to effortlessly snap upward to the head without overshooting.',
        viewsCount: '1.4M views'
      },
      {
        title: 'SECRET FIRE BUTTON SIZE & POSITION FOR PERFECT DRAG',
        keyTakeaway: 'Fire button set between 12% to 15% placed at the bottom right (48 X, 52 Y) allows a longer vertical swipe distance for M1887 & Desert Eagle one-taps.',
        viewsCount: '890K views'
      },
      {
        title: 'HOW TO FIX CROSSHAIR STICKING TO CHEST',
        keyTakeaway: 'Increase Y-sensitivity by +0.25 and set Emulator DPI to 320 instead of 240. Never use mouse acceleration.',
        viewsCount: '650K views'
      }
    ],
    mouseConfig: {
      dpi: 800,
      pollingRateHz: 1000,
      windowsPointerSpeed: '6/11 (Raw Input)',
      enhancePointerPrecision: false
    },
    inGameSens: {
      general: 98,
      redDot: 92,
      scope2x: 86,
      scope4x: 80,
      sniper: 50,
      freeLook: 65
    },
    emulatorSettings: {
      emulatorName: 'BlueStacks 5 (Pie 64-bit / Android 11)',
      version: 'v5.21.0 or MSI App Player v5.9',
      tweak: '16450',
      xSens: 1.45,
      ySens: 2.35,
      resolution: '1920x1080 (16:9)',
      aspectRatio: '16:9 Landscape',
      dpi: 320,
      graphicsRenderer: 'OpenGL',
      interfaceRenderer: 'Auto',
      astc: 'Hardware Decoding',
      cpuCores: 4,
      ramMB: 4096,
      fpsTarget: 240,
      deviceModel: 'ASUS ROG Phone 5',
      fireButtonSizePercent: 14,
      fireButtonPosition: 'X: 48.5%, Y: 52.0%'
    },
    secretTuningNote: 'Borak 777 emphasizes starting your mouse drag with a slight "J" curve: pull slightly down to disengage chest auto-aim, then flick vertically up to lock into the skull.',
    badgeColor: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10'
  },
  {
    id: 'quantum-xd',
    name: 'Quantum XD',
    tagline: 'Precision Systems Architect & Micro-Drag Master',
    youtubeChannel: 'Quantum XD Gaming & Tweaks',
    videoHighlights: [
      {
        title: 'FULL WINDOWS & EMULATOR LATENCY DESTROYER GUIDE',
        keyTakeaway: 'Eliminating Windows timer jitter (0.500ms) combined with BCDEDIT disabledynamictick makes emulator crosshair movement feel 100% 1:1 with desktop cursor.',
        viewsCount: '820K views'
      },
      {
        title: 'BEST 240 FPS TWEAKS FOR BLUESTACKS 5 - NO LAG',
        keyTakeaway: 'Uses Tweak 16450 with 1000 DPI mouse, X=1.25, Y=2.85 for high-velocity vertical snaps on SMGs (MP40, Thompson).',
        viewsCount: '580K views'
      },
      {
        title: 'HIDDEN REGISTRY SETTINGS FOR LOW INPUT DELAY',
        keyTakeaway: 'Mouclass MouseDataQueueSize = 16 and SystemResponsiveness = 0 completely strips emulator input packet buffering.',
        viewsCount: '490K views'
      }
    ],
    mouseConfig: {
      dpi: 1000,
      pollingRateHz: 1000,
      windowsPointerSpeed: '6/11 (Raw Input)',
      enhancePointerPrecision: false
    },
    inGameSens: {
      general: 100,
      redDot: 100,
      scope2x: 95,
      scope4x: 90,
      sniper: 55,
      freeLook: 70
    },
    emulatorSettings: {
      emulatorName: 'BlueStacks 5.21 / MSI App Player 4.280',
      version: 'Pie 64-bit optimized',
      tweak: '16450',
      xSens: 1.25,
      ySens: 2.85,
      resolution: '1920x1080 or 1440x1080 (Stretched)',
      aspectRatio: '16:9 / 4:3 Stretched',
      dpi: 440,
      graphicsRenderer: 'OpenGL (NVIDIA dedicated)',
      interfaceRenderer: 'Software (stops black overlay flicker)',
      astc: 'Hardware Decoding',
      cpuCores: 4,
      ramMB: 4096,
      fpsTarget: 240,
      deviceModel: 'ASUS ROG Phone 5 / Samsung Galaxy S22 Ultra',
      fireButtonSizePercent: 12,
      fireButtonPosition: 'X: 50.0%, Y: 50.0%'
    },
    secretTuningNote: 'Quantum XD pairs high emulator DPI (440 DPI custom via BSTweaker) with higher mouse DPI (1000) to smooth out pixel skipping when micro-aiming at long distances.',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
  },
  {
    id: 'rehullx999',
    name: 'Rehullx999',
    tagline: 'Zero-Recoil Spray & Laser Accuracy Specialist',
    youtubeChannel: 'Rehull x 999 Official',
    videoHighlights: [
      {
        title: 'MY SECRET TWEAK 21058 SENSITIVITY - 100% HEADSHOT',
        keyTakeaway: 'Tweak 21058 stabilizes the emulator horizontal jitter while allowing maximum vertical glide on long-range sprays.',
        viewsCount: '910K views'
      },
      {
        title: 'PERFECT FREE FIRE SENSITIVITY FOR LOW END & HIGH END PC',
        keyTakeaway: 'General 95, Red Dot 88 with X=1.15, Y=2.65 at 800 DPI creates a controlled, laser-like trajectory without recoil bounce.',
        viewsCount: '730K views'
      },
      {
        title: 'HOW TO STOP MOUSE ACCELERATION ON BLUESTACKS 5',
        keyTakeaway: 'Disable Enhanced Pointer Precision in Windows, run MSI mode on GPU, and uncheck "Allow mouse to exit window".',
        viewsCount: '520K views'
      }
    ],
    mouseConfig: {
      dpi: 800,
      pollingRateHz: 1000,
      windowsPointerSpeed: '6/11 (Raw Input)',
      enhancePointerPrecision: false
    },
    inGameSens: {
      general: 95,
      redDot: 88,
      scope2x: 84,
      scope4x: 78,
      sniper: 48,
      freeLook: 60
    },
    emulatorSettings: {
      emulatorName: 'MSI App Player v5.9 / BlueStacks 5.14',
      version: 'Pie 64-bit Clean',
      tweak: '21058',
      xSens: 1.15,
      ySens: 2.65,
      resolution: '1920x1080',
      aspectRatio: '16:9 Landscape',
      dpi: 320,
      graphicsRenderer: 'DirectX (or Vulkan for AMD GPUs)',
      interfaceRenderer: 'Auto',
      astc: 'Disabled (for lower frame-time variance)',
      cpuCores: 4,
      ramMB: 4096,
      fpsTarget: 240,
      deviceModel: 'ASUS ROG Phone 5',
      fireButtonSizePercent: 16,
      fireButtonPosition: 'X: 47.0%, Y: 53.5%'
    },
    secretTuningNote: 'Rehullx999 recommends pressing your crouch button right before initiating a drag shot. It resets bullet spread and increases initial bullet accuracy by 35%.',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10'
  },
  {
    id: 'qubit-xd',
    name: 'Qubit XD Sensi Pro & AimX',
    tagline: 'Kernel-Synchronized Dual Curve & Anti-Shake Engine',
    youtubeChannel: 'Qubit XD Esports',
    videoHighlights: [
      {
        title: 'THE COMPLETE ESPORTS REBUILD - 800+ OPTIMIZATIONS',
        keyTakeaway: 'When Windows kernel scheduling, timer resolution (0.500ms), and mouse data queue are synchronized, input lag drops below 2.5ms.',
        viewsCount: '1.2M views'
      },
      {
        title: 'AIM X ULTIMATE: ZERO SHAKE HEADSHOT SNAPPING',
        keyTakeaway: 'Eliminates micro-jitter on high-DPI sensors while multiplying vertical drag speed on the Y-axis by 2.63x.',
        viewsCount: '870K views'
      }
    ],
    mouseConfig: {
      dpi: 800,
      pollingRateHz: 1000,
      windowsPointerSpeed: '6/11 (Linear Curve Injected)',
      enhancePointerPrecision: false
    },
    inGameSens: {
      general: 99,
      redDot: 94,
      scope2x: 88,
      scope4x: 82,
      sniper: 52,
      freeLook: 68
    },
    emulatorSettings: {
      emulatorName: 'Qubit Tuned BlueStacks 5 & MSI Hybrid',
      version: 'Tournament Edition v5.21+',
      tweak: '16450',
      xSens: 1.10,
      ySens: 2.90,
      resolution: '1920x1080 / 1440x1080 Stretched',
      aspectRatio: '16:9 / 4:3 Custom',
      dpi: 480,
      graphicsRenderer: 'OpenGL Dedicated',
      interfaceRenderer: 'DirectX',
      astc: 'Hardware Decoding',
      cpuCores: 4,
      ramMB: 4096,
      fpsTarget: 240,
      deviceModel: 'ASUS ROG Phone 5 (Rooted & Tuned)',
      fireButtonSizePercent: 13,
      fireButtonPosition: 'X: 49.0%, Y: 51.0%'
    },
    secretTuningNote: 'Qubit XD utilizes a custom Y-axis sensitivity multiplier of 2.63x relative to X-axis, ensuring effortless headshot drag with zero horizontal drift or camera shake.',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10'
  }
];
