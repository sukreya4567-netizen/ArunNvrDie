import React from 'react';
import { Zap, Crosshair, Flame, Gamepad2, Gift, ArrowRight } from 'lucide-react';

interface ArsenalGridProps {
  onSelectModule: (moduleKey: string) => void;
}

export const ArsenalGrid: React.FC<ArsenalGridProps> = ({ onSelectModule }) => {
  const cards = [
    {
      id: 'optimization',
      title: 'Optimisation',
      subtitle: 'Deep System Rebuild',
      desc: 'Deep system tuning — 800+ verified tweaks across 16 core modules. Power plans, scheduler overrides, BCDEDIT latency scrubbing, and memory flushing.',
      icon: Zap,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-400/50',
      actionKey: 'optimizer',
      tag: '16 Modules',
    },
    {
      id: 'sensi-pro',
      title: 'Sensi Pro',
      subtitle: 'Verified Creator Maps',
      desc: 'Hand-tuned sensitivity maps and emulator configs from Borak 777, Quantum XD, and Rehullx999. Tested across DPIs for stick-to-head tracking.',
      icon: Crosshair,
      color: 'text-yellow-400',
      border: 'hover:border-yellow-400/50',
      actionKey: 'sensi-vault',
      tag: 'Pro DPI Vault',
    },
    {
      id: 'aimx-ultimate',
      title: 'Aim X Ultimate',
      subtitle: 'Drag Shot Lab',
      desc: 'The flagship aim suite — smooth vertical drag, zero shake, locked recoil, and instant headshot snapping tested in our interactive drag lab.',
      icon: Flame,
      color: 'text-red-400',
      border: 'hover:border-red-400/50',
      actionKey: 'drag-lab',
      tag: 'Interactive Lab',
    },
    {
      id: 'emulators',
      title: 'Emulators',
      subtitle: 'BlueStacks & MSI Player',
      desc: 'Pre-configured Android emulator builds tuned for tournament-grade 240 FPS and sub-frame input response. ASTC decoding and device profiles.',
      icon: Gamepad2,
      color: 'text-purple-400',
      border: 'hover:border-purple-400/50',
      actionKey: 'sensi-vault',
      tag: '240 FPS Unlock',
    },
    {
      id: 'free-tools',
      title: 'Free Tools & EXE',
      subtitle: 'Clean Scripts Vault',
      desc: 'A curated vault of free Windows optimizers, registry matrices, and standalone EXE compilation scripts — verified clean, no strings attached.',
      icon: Gift,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-400/50',
      actionKey: 'optimizer',
      tag: 'Instant Access',
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2 block">
          Arsenal Modules
        </span>
        <h2 className="font-orbitron text-2xl md:text-4xl font-bold uppercase text-white">
          Deploy <span className="text-cyan-400 text-glow-cyan">Modules</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              onClick={() => onSelectModule(c.actionKey)}
              className={`p-6 rounded-3xl bg-white/[0.02] border border-white/[0.07] ${c.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center ${c.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.06]">
                    {c.tag}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                  {c.subtitle}
                </div>
                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-300 font-jakarta leading-relaxed mb-6">
                  {c.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Execute Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
