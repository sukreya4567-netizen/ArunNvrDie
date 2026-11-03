import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Will these tweaks get me banned?',
    a: 'No. Every module operates strictly on Windows configuration layers — power plans, scheduler priority, memory handling, and input polling. We never touch game memory, inject DLLs, or modify anti-cheat protected processes (Vanguard, EAC, BattlEye). Each release is tested against current anti-cheat builds before it ships.'
  },
  {
    q: 'Is it safe to run on my main PC?',
    a: 'Yes. The installer automatically creates a Windows system restore point before applying anything, and every change is logged. If you ever want to revert, one command rolls the entire configuration back to stock Windows.'
  },
  {
    q: 'How do Borak 777 and Quantum XD achieve zero delay on emulators?',
    a: 'Their setups combine Windows 0.500ms system timer resolution, BCDEDIT disabledynamictick, Mouclass MouseDataQueueSize=16, and an asymmetric Y-sensitivity drag multiplier (2.35x to 2.85x). This eliminates the synthetic cursor smoothing and Windows acceleration that make mouse movements feel floaty.'
  },
  {
    q: 'Can I generate a standalone .exe rather than running scripts?',
    a: 'Yes! Our optimizer includes a standalone EXE Compiler Tool (`Build_Standalone_Optimizer_EXE.bat`). It utilizes native Windows IExpress and PowerShell PS2EXE to compile the batch optimizer into a single self-contained executable that you can run on any Windows machine with 1 click.'
  },
  {
    q: 'Do I have to pay again after a Windows update?',
    a: 'Never. Your license is lifetime. When Microsoft ships a new build that resets your tuning, all compatibility revisions and updated scripts remain accessible at zero extra cost.'
  },
  {
    q: 'How fast will I actually notice a difference?',
    a: 'Most users report a visible change after the very first reboot — smoother frame pacing, snappier input, and zero background micro-stutter during intense firefights. Deeper gains in DPC latency settle in as background telemetry ceases rescheduling.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2 block flex items-center justify-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5" />
          Intel Briefing
        </span>
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold uppercase text-white">
          Common <span className="text-cyan-400 text-glow-cyan">Questions</span>
        </h2>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-white/[0.03] border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.08)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left text-white font-space font-semibold text-sm md:text-base cursor-pointer"
              >
                <span className={isOpen ? 'text-cyan-400' : 'text-white'}>
                  {item.q}
                </span>
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500 text-black border-cyan-400' : 'text-slate-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 md:px-5 text-xs md:text-sm text-slate-300 font-jakarta leading-relaxed border-t border-white/[0.04] pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
