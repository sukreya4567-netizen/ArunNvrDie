import React from 'react';
import { ArrowRight, Flame, Shield, Zap, Terminal, Sparkles, Youtube } from 'lucide-react';

interface HeroProps {
  onExploreOptimizer: () => void;
  onExploreSensitivities: () => void;
  onOpenCompletePack: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreOptimizer,
  onExploreSensitivities,
  onOpenCompletePack,
}) => {
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Verified Owner Feature Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 animate-in fade-in duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-transparent border border-cyan-400/40 text-cyan-300 text-xs font-mono shadow-[0_0_25px_rgba(0,240,255,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-white uppercase tracking-wider">Owner: ArunNvrDie From mnr</span>
          <span className="text-cyan-400 font-bold">· Lead Architect</span>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-slate-300 text-xs font-mono">
          <span>Quantum XD &bull; Borak 777 &bull; Rehullx999 Stack</span>
        </div>
      </div>

      {/* Glitch Title */}
      <h1 className="font-orbitron font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase mb-4 max-w-5xl">
        NEVER DIE{' '}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 text-glow-cyan">
          BRAND !!
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_#00f0ff] rounded-full" />
        </span>
      </h1>

      <div className="font-space text-lg sm:text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase text-slate-200 mb-6">
        Esports Performance &amp; Sensitivity Suite
      </div>

      <p className="max-w-2xl text-slate-300 text-sm sm:text-base md:text-lg font-jakarta leading-relaxed mb-8">
        Push your hardware beyond its limits. We engineer kernel-level Ring-0 optimizations, zero-delay sensitivity maps, and custom drag calibration for tournament-grade competitive dominance.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
        <button
          onClick={onExploreOptimizer}
          className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-white text-black font-space font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
        >
          <span>Explore 16-Module Optimizer</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCompletePack}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600/30 to-orange-500/30 hover:from-red-600/40 hover:to-orange-500/40 border border-red-500/50 text-red-300 hover:text-white font-space font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Flame className="w-4 h-4 text-red-400 animate-pulse" />
          <span>Complete Pack (-25%)</span>
        </button>

        <button
          onClick={onExploreSensitivities}
          className="px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-space font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
        >
          <Youtube className="w-4 h-4 text-red-500" />
          <span>YouTube Pro Sensitivities</span>
        </button>

        <a
          href="https://discord.gg/kgvSt2X7M"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#5865F2]/20 hover:bg-[#5865F2] border border-[#5865F2]/50 text-white font-space font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(88,101,242,0.3)] transition-all cursor-pointer flex items-center gap-2 hover:-translate-y-0.5"
        >
          <span>Join Discord Community</span>
        </a>
      </div>

      {/* Trust KPI Strip */}
      <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="font-orbitron font-black text-xl text-cyan-400 text-glow-cyan">800+</div>
          <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Verified Tweaks</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="font-orbitron font-black text-xl text-purple-400 text-glow-purple">0.500ms</div>
          <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Timer Resolution</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="font-orbitron font-black text-xl text-yellow-400">100%</div>
          <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Zero Placebo</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
          <div className="font-orbitron font-black text-xl text-red-400">240 FPS</div>
          <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">Emulator Target</div>
        </div>
      </div>
    </section>
  );
};
