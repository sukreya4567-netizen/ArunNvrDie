import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PolicyModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const content = {
    terms: {
      title: 'Terms of Service',
      subtitle: 'Qubit XD • Legal Agreement',
      sections: [
        {
          num: '01',
          head: 'Usage License',
          body: 'Every configuration, sensitivity guide, and optimization script on Qubit XD is licensed for personal, single-device use. Redistribution, resale, or public reupload of any package is strictly prohibited. Always create a system restore point before applying registry tweaks or advanced system modifications.'
        },
        {
          num: '02',
          head: 'Digital Deliverables & Reversibility',
          body: 'All products are delivered instantly as digital batch, registry, and powershell files. If you encounter setup questions, our community and support team are available on Discord. Every package comes with a 100% reversible reset script to return to stock Windows.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'Qubit XD • Client-Side Security',
      sections: [
        {
          num: '01',
          head: 'Zero Data Collection',
          body: 'Qubit XD runs in your browser. We do not collect, store, or transmit any personal information, payment credentials, or PC hardware fingerprints to external servers. Your cart items, currency preference, and downloaded scripts are saved locally on your device.'
        },
        {
          num: '02',
          head: 'Third-Party Channels',
          body: 'Support and communications route through official Discord channels, protected by end-to-end platform security and verified moderation.'
        }
      ]
    }
  }[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-[#0a0614] border border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_60px_rgba(0,240,255,0.15)] text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/30 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-orbitron font-bold text-2xl text-white mb-1">
          {content.title}
        </h3>
        <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-6">
          {content.subtitle}
        </div>

        <div className="space-y-4 mb-6">
          {content.sections.map((sec) => (
            <div key={sec.num} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-md bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center">
                  {sec.num}
                </span>
                <h4 className="font-space font-bold text-sm text-white">{sec.head}</h4>
              </div>
              <p className="text-xs text-slate-300 font-jakarta leading-relaxed pl-7">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 font-jakarta font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
