import React from 'react';
import { CurrencyCode, CurrencyInfo } from '../types';
import { ShoppingCart, Terminal, Zap, Crosshair, Flame, Gamepad2, Gift, Cpu, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentCurrency: CurrencyCode;
  currencyRates: Record<CurrencyCode, CurrencyInfo>;
  onSelectCurrency: (code: CurrencyCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCompletePack: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  currencyRates,
  onSelectCurrency,
  cartCount,
  onOpenCart,
  onOpenCompletePack,
  activeTab,
  onSelectTab,
}) => {
  const [currMenuOpen, setCurrMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const curr = currencyRates[currentCurrency] || currencyRates.USD;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 bg-[#030305]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => {
            onSelectTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.25)] group-hover:border-cyan-400 transition-all">
            <span className="font-orbitron font-extrabold text-sm text-cyan-400">ND</span>
          </div>
          <div>
            <div className="font-orbitron font-black text-lg tracking-widest uppercase">
              NEVER DIE <span className="text-cyan-400 text-glow-cyan">BRAND !!</span>
            </div>
            <div className="text-[10px] tracking-wider text-slate-400 uppercase -mt-1 font-space flex items-center gap-1.5 flex-wrap">
              <span>Esports Kernel Suite</span>
              <span className="text-cyan-400 font-mono font-bold bg-cyan-500/10 border border-cyan-400/30 px-1.5 py-0.2 rounded text-[9px]">
                Owner: ArunNvrDie From mnr
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Nav Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.07]">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-cyan-500/15 text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Home
          </button>
          <button
            onClick={() => onSelectTab('optimizer')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'optimizer'
                ? 'bg-cyan-500/15 text-white border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            Optimisation
          </button>
          <button
            onClick={() => onSelectTab('sensi-vault')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'sensi-vault'
                ? 'bg-yellow-500/15 text-white border border-yellow-400/40 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-yellow-400" />
            Sensi Pro & YT Creators
          </button>
          <button
            onClick={() => onSelectTab('drag-lab')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'drag-lab'
                ? 'bg-red-500/15 text-white border border-red-400/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-red-400" />
            Aim Drag Lab
          </button>
          <button
            onClick={() => onSelectTab('ai-tuner')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'ai-tuner'
                ? 'bg-purple-500/15 text-white border border-purple-400/40 shadow-[0_0_15px_rgba(112,0,255,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            AI Rig Tuner
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Complete Pack Quick Button (from Screenshot 54) */}
          <button
            onClick={onOpenCompletePack}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-orange-500/30 border border-red-500/50 hover:border-red-400 text-xs font-jakarta font-bold text-red-300 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.25)] cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Complete Pack</span>
            <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded font-mono font-bold">-25%</span>
          </button>

          {/* Currency Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCurrMenuOpen(!currMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-xs font-jakarta font-bold text-white transition-all cursor-pointer"
            >
              <img
                src={`https://flagcdn.com/w40/${curr.flag}.png`}
                alt={currentCurrency}
                className="w-4 h-3 object-cover rounded-xs"
              />
              <span>{currentCurrency}</span>
            </button>

            {currMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#090514]/95 border border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl z-50">
                {(Object.keys(currencyRates) as CurrencyCode[]).map((code) => {
                  const item = currencyRates[code];
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectCurrency(code);
                        setCurrMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-jakarta transition-all cursor-pointer ${
                        currentCurrency === code
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w40/${item.flag}.png`}
                          alt={code}
                          className="w-4 h-3 object-cover rounded-xs"
                        />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono text-slate-400">{item.symbol}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cart Pill */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-jakarta font-extrabold text-xs shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:brightness-110 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="bg-white text-black px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-white cursor-pointer"
          >
            <span className="text-xs font-mono">MENU</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-3 bg-[#080412]/98 border border-white/10 rounded-2xl space-y-1">
          <button
            onClick={() => {
              onSelectTab('home');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-jakarta font-bold text-slate-300 hover:bg-white/[0.05]"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            Home
          </button>
          <button
            onClick={() => {
              onSelectTab('optimizer');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-jakarta font-bold text-slate-300 hover:bg-white/[0.05]"
          >
            <Zap className="w-4 h-4 text-cyan-400" />
            16-Module Optimizer (Screenshot 54)
          </button>
          <button
            onClick={() => {
              onSelectTab('sensi-vault');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-jakarta font-bold text-slate-300 hover:bg-white/[0.05]"
          >
            <Crosshair className="w-4 h-4 text-yellow-400" />
            Pro Sensi (Quantum XD, Borak 777, Rehull)
          </button>
          <button
            onClick={() => {
              onSelectTab('drag-lab');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-jakarta font-bold text-slate-300 hover:bg-white/[0.05]"
          >
            <Flame className="w-4 h-4 text-red-400" />
            Interactive Aim Drag Lab
          </button>
          <button
            onClick={() => {
              onSelectTab('ai-tuner');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-jakarta font-bold text-slate-300 hover:bg-white/[0.05]"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            AI Custom Rig Tuner
          </button>
          <button
            onClick={() => {
              onOpenCompletePack();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-red-500/20 text-red-300 text-xs font-jakarta font-bold border border-red-500/40"
          >
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-400" />
              View Complete Pack (Screenshot 54)
            </span>
            <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-mono">-25%</span>
          </button>
        </div>
      )}
    </nav>
  );
};
