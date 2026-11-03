import React from 'react';
import { CurrencyCode, CurrencyInfo } from '../types';
import { Check, X, ShoppingCart, Download, ShieldCheck, Zap, Terminal } from 'lucide-react';
import {
  generateMasterBatchScript,
  generateRegistryFile,
  generatePowerShellDebloater,
  generateStandaloneExeBuilderScript,
  downloadFile
} from '../data/scriptsGenerator';

interface CompletePackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  currentCurrency: CurrencyCode;
  currencyRates: Record<CurrencyCode, CurrencyInfo>;
}

export const CompletePackModal: React.FC<CompletePackModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currentCurrency,
  currencyRates,
}) => {
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const curr = currencyRates[currentCurrency] || currencyRates.USD;
  const originalPrice = (100 * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
  const discountedPrice = (75 * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);

  const checklistItems = [
    'Core Windows Optimizations',
    'CPU Optimization (Intel/AMD)',
    'GPU Optimization (NVIDIA/AMD)',
    'DirectX & GPU Engine',
    'RAM Optimization (Auto)',
    'Latency & Input',
    'Network (Ethernet)',
    'Mouse + Keyboard Hidden Aim',
    'USB & Power Saving',
    'Services Destroyer',
    'Scheduled Tasks Cleaner',
    'Privacy Shield',
    'Telemetry Destroyer',
    'System Deep Cleaner',
    'Weekly Maintenance Tools',
    'One Time Payment',
  ];

  const handleDownloadAllScripts = () => {
    // 1. Download Master Batch
    const masterBat = generateMasterBatchScript();
    downloadFile('NeverDie_Esports_Master_Optimizer.bat', masterBat);

    // 2. Download Registry Matrix
    setTimeout(() => {
      const reg = generateRegistryFile();
      downloadFile('NeverDie_Esports_Registry_Matrix.reg', reg);
    }, 400);

    // 3. Download Standalone EXE Builder
    setTimeout(() => {
      const exeBuilder = generateStandaloneExeBuilderScript();
      downloadFile('Build_Standalone_NeverDie_Optimizer_EXE.bat', exeBuilder);
    }, 800);

    setDownloadSuccess('Never Die Brand !! Complete Pack files (.BAT, .REG, EXE Builder) downloaded!');
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#0a0614] border border-red-500/30 rounded-3xl p-5 sm:p-7 shadow-[0_0_80px_rgba(239,68,68,0.2)] text-white animate-in fade-in zoom-in-95 duration-200">
        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/30 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual Medallion */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-6 border border-red-500/40 bg-gradient-to-b from-red-950/40 to-black shadow-[0_0_30px_rgba(239,68,68,0.25)]">
          <img
            src="/assets/aistudio/Screenshot_54_4a95b0de.png"
            alt="Complete Pack Esports Elite Edition"
            className="w-full max-h-56 object-cover object-top hover:scale-102 transition-transform duration-500"
            onError={(e) => {
              // Fallback styled banner if image path fails
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-400 font-bold bg-black/60 px-2.5 py-1 rounded-md border border-red-500/30">
              Verified Kernel Stack • ArunNvrDie From mnr
            </span>
            <span className="text-[11px] font-mono text-slate-300 bg-black/60 px-2 py-0.5 rounded">
              800+ Tweaks
            </span>
          </div>
        </div>

        {/* Pricing Block matching Screenshot */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-orbitron text-3xl sm:text-4xl font-black text-red-500 tracking-tight text-glow-purple">
              {curr.symbol}{discountedPrice}
            </span>
            <span className="font-orbitron text-xl sm:text-2xl text-slate-500 line-through">
              {curr.symbol}{originalPrice}
            </span>
            <span className="bg-[#ff2a5f] text-white text-xs font-mono font-extrabold px-2 py-0.5 rounded-md uppercase shadow-[0_0_10px_rgba(255,42,95,0.4)]">
              -25%
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            The full Windows stack rebuilt from the kernel up — 800+ verified optimizations, zero placebo. No fake registry.
          </p>
        </div>

        {/* 16 Checklist Items Grid matching Screenshot */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 sm:p-5 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-jakarta">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-200">
                <Check className="w-3.5 h-3.5 text-red-500 shrink-0 stroke-[2.5]" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {downloadSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={onAddToCart}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#e61b4d] hover:brightness-110 text-white font-jakarta font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,42,95,0.4)] transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              ADD TO CART
            </button>

            <button
              onClick={handleDownloadAllScripts}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 font-jakarta font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              DOWNLOAD SCRIPT / EXE
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-400 hover:text-white font-jakarta font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>

        {/* Security guarantee footer */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Restore Point Guard Included
          </span>
          <span className="text-slate-400">Lifetime License Updates</span>
        </div>
      </div>
    </div>
  );
};
