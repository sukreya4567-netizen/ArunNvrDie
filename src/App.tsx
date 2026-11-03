import React, { useState, useEffect, useRef } from 'react';
import { CurrencyCode, CurrencyInfo, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompletePackModal } from './components/CompletePackModal';
import { OptimizerSuite } from './components/OptimizerSuite';
import { SensitivityVault } from './components/SensitivityVault';
import { AimDragLab } from './components/AimDragLab';
import { AiRigTuner } from './components/AiRigTuner';
import { ArsenalGrid } from './components/ArsenalGrid';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { PolicyModal } from './components/PolicyModal';
import {
  ShieldCheck,
  Globe,
  Zap,
  Terminal,
  Fingerprint,
  Microscope,
  Gauge,
  Headset,
  CheckCircle2,
  ExternalLink,
  Flame,
  ArrowRight
} from 'lucide-react';

const CURRENCY_RATES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { symbol: '$', rate: 1, flag: 'us', label: 'US Dollar' },
  INR: { symbol: '₹', rate: 95.43, flag: 'in', label: 'Indian Rupee' },
  PKR: { symbol: '₨', rate: 277.55, flag: 'pk', label: 'Pakistani Rupee' },
  BDT: { symbol: '৳', rate: 123.3, flag: 'bd', label: 'Bangladeshi Taka' },
  GBP: { symbol: '£', rate: 0.79, flag: 'gb', label: 'British Pound' },
  SAR: { symbol: 'ر.س', rate: 3.75, flag: 'sa', label: 'Saudi Riyal' },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCompletePackOpen, setIsCompletePackOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'terms' | 'privacy' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load saved currency and cart
  useEffect(() => {
    const savedCur = localStorage.getItem('qubitCurrency') as CurrencyCode;
    if (savedCur && CURRENCY_RATES[savedCur]) {
      setCurrentCurrency(savedCur);
    }

    const savedCart = localStorage.getItem('qubitCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart:', e);
      }
    }
  }, []);

  const handleSelectCurrency = (code: CurrencyCode) => {
    setCurrentCurrency(code);
    localStorage.setItem('qubitCurrency', code);
    showToast(`Currency changed to ${code}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddToCart = (item: { id: string; title: string; priceUSD: number; category: string }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        updated = [...prev, { ...item, quantity: 1 }];
      }
      localStorage.setItem('qubitCart', JSON.stringify(updated));
      return updated;
    });

    showToast(`Added ${item.title} to cart`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      localStorage.setItem('qubitCart', JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      localStorage.setItem('qubitCart', JSON.stringify(updated));
      return updated;
    });
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem('qubitCart');
    showToast('Cart cleared');
  };

  // Background Interactive Particle Canvas matching original website
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = window.innerWidth < 640 ? 25 : 55;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    let animId: number;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030305] text-white font-jakarta relative selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      {/* Background Interactive Canvas & Grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,240,255,0.08),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      {/* Main Navigation */}
      <Navbar
        currentCurrency={currentCurrency}
        currencyRates={CURRENCY_RATES}
        onSelectCurrency={handleSelectCurrency}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCompletePack={() => setIsCompletePackOpen(true)}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        {activeTab === 'home' && (
          <>
            <Hero
              onExploreOptimizer={() => {
                setActiveTab('optimizer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreSensitivities={() => {
                setActiveTab('sensi-vault');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCompletePack={() => setIsCompletePackOpen(true)}
            />

            {/* Complete Pack Banner Card matching Screenshot 54 */}
            <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden border border-red-500/40 bg-gradient-to-r from-red-950/40 via-black to-[#10061e] p-6 sm:p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left max-w-xl">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 font-bold bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full uppercase">
                    <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>Featured in Screenshot 54</span>
                  </div>
                  <h3 className="font-orbitron text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                    COMPLETE PACK <span className="text-red-500">ESPORTS ELITE EDITION</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-jakarta leading-relaxed">
                    The full Windows stack rebuilt from the kernel up — 800+ verified optimizations, zero placebo. Includes CPU/GPU unparking, 0.500ms timer lock, services terminator, and safe restore guard.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="font-orbitron text-3xl font-black text-red-400">
                      {CURRENCY_RATES[currentCurrency].symbol}
                      {(75 * CURRENCY_RATES[currentCurrency].rate).toFixed(
                        CURRENCY_RATES[currentCurrency].rate > 10 ? 0 : 2
                      )}
                    </span>
                    <span className="font-orbitron text-xl text-slate-500 line-through">
                      {CURRENCY_RATES[currentCurrency].symbol}
                      {(100 * CURRENCY_RATES[currentCurrency].rate).toFixed(
                        CURRENCY_RATES[currentCurrency].rate > 10 ? 0 : 2
                      )}
                    </span>
                    <span className="bg-[#ff2a5f] text-white text-xs font-mono font-bold px-2 py-0.5 rounded">
                      -25%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => setIsCompletePackOpen(true)}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#ff2a5f] to-[#e61b4d] hover:brightness-110 text-white font-space font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(255,42,95,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>View 16-Item Checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      handleAddToCart({
                        id: 'complete-pack',
                        title: 'Complete Pack Esports Elite Edition',
                        priceUSD: 75,
                        category: 'System Kernel Suite',
                      });
                    }}
                    className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 text-white font-space font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </section>

            <ArsenalGrid
              onSelectModule={(key) => {
                setActiveTab(key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* The Qubit Standard (Trust Cards) */}
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400 mb-2 block">
                  Strict Verification
                </span>
                <h2 className="font-orbitron text-2xl md:text-3xl font-bold uppercase text-white">
                  Why Players <span className="text-cyan-400 text-glow-cyan">Trust Us</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                  <Terminal className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="font-space font-bold text-base text-white mb-2 uppercase">
                    Expert Developers
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our team includes competitive players and systems engineers who understand how Windows actually moves data — from Ring-0 to the frame buffer.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                  <ShieldCheck className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="font-space font-bold text-base text-white mb-2 uppercase">
                    Premium &amp; Safe
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every product runs through a full sandbox review, live-fire test, and rollback check. Zero spyware. Zero risk to your machine.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                  <Gauge className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="font-space font-bold text-base text-white mb-2 uppercase">
                    Measurable Gains
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Before &amp; after DPC latency benchmarks are published with every update. If a tweak does not move the needle, it does not ship.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
                  <Zap className="w-8 h-8 text-cyan-400 mb-4" />
                  <h4 className="font-space font-bold text-base text-white mb-2 uppercase">
                    Lifetime Updates
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Windows changes. Anti-cheats evolve. Your license does not expire. Buy once, receive every future compatibility revision free.
                  </p>
                </div>
              </div>
            </section>

            {/* Manifesto Section */}
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-purple-950/20 via-white/[0.015] to-black border border-white/[0.08] rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-space text-2xl sm:text-3xl font-bold uppercase text-white mb-3 leading-snug">
                    We don't sell presets. <br />
                    <span className="text-purple-400 text-glow-purple">We sell an unfair advantage.</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-jakarta leading-relaxed mb-4">
                    Most performance tools online are recycled scripts pulled from public forums and shipped with a logo slapped on top. We took a different road.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 font-jakarta leading-relaxed">
                    Every single line of our code is verified against competitive ranked footage, tested for sub-pixel accuracy, and reviewed before it ever touches your machine.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <Fingerprint className="w-5 h-5 text-purple-400 mb-2" />
                    <h5 className="font-space font-bold text-xs uppercase text-white mb-1">
                      Original Code Only
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      100% written and maintained in-house with zero registry bloat.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <Microscope className="w-5 h-5 text-purple-400 mb-2" />
                    <h5 className="font-space font-bold text-xs uppercase text-white mb-1">
                      Independently Audited
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Reviewed against anti-cheat compliance on Windows 10 &amp; 11.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <Gauge className="w-5 h-5 text-purple-400 mb-2" />
                    <h5 className="font-space font-bold text-xs uppercase text-white mb-1">
                      Benchmarked Always
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Publishing real frame-time &amp; DPC latency graphs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <Headset className="w-5 h-5 text-purple-400 mb-2" />
                    <h5 className="font-space font-bold text-xs uppercase text-white mb-1">
                      Direct Human Support
                    </h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Real engineers on Discord to calibrate your exact hardware.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Owner Feature Spotlight Card */}
            <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0d0720] to-purple-950/40 border border-cyan-400/40 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-[0_0_25px_rgba(0,240,255,0.4)] shrink-0">
                    <div className="w-full h-full bg-[#090514] rounded-2xl flex items-center justify-center font-orbitron font-black text-xl text-cyan-400">
                      ND
                    </div>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-400/30 mb-2 font-bold">
                      Official Brand Feature
                    </div>
                    <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-white">
                      Owner: <span className="text-cyan-400 text-glow-cyan">ArunNvrDie</span>{' '}
                      <span className="text-purple-400 font-bold">From mnr</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-jakarta mt-1.5 max-w-xl leading-relaxed">
                      Lead Systems Architect &amp; Performance Calibrator behind <strong>Never Die Brand !!</strong>. Pioneer in Ring-0 kernel scheduler unparking, BCDEDIT latency stripping, and custom BlueStacks/MSI emulator drag ratios for competitive Free Fire esports.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                  <a
                    href="https://discord.gg/kgvSt2X7M"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-white text-black font-space font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Connect With ArunNvrDie</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>

            <FaqSection />
          </>
        )}

        {activeTab === 'optimizer' && <OptimizerSuite />}
        {activeTab === 'sensi-vault' && <SensitivityVault />}
        {activeTab === 'drag-lab' && <AimDragLab />}
        {activeTab === 'ai-tuner' && <AiRigTuner />}
      </main>

      {/* Trust Strip */}
      <div className="border-t border-b border-white/[0.06] bg-black/40 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 text-xs font-mono uppercase text-slate-400 tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>100% Anti-Cheat Safe (Vanguard/EAC)</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Trusted by 45,000+ Competitive Players</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>0.500ms Timer Resolution Verified</span>
          </div>
          <a
            href="https://discord.gg/kgvSt2X7M"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#5865F2]/20 border border-[#5865F2]/40 text-[#5865F2] hover:bg-[#5865F2] hover:text-white transition-all cursor-pointer font-bold"
          >
            <span>Join Discord Community</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-12 pb-8 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.06] mt-8 text-xs text-slate-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center font-orbitron font-bold text-cyan-400 text-xs">
              ND
            </div>
            <div>
              <div className="font-orbitron font-bold text-white text-sm">
                Never Die Brand !! Esports Services
              </div>
              <div className="text-[11px] text-slate-500">
                Precision-engineered low latency utilities &amp; sensitivity configs.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <button
              onClick={() => showToast('All Nodes Operational • Latency: 12ms')}
              className="hover:text-cyan-400 cursor-pointer transition-colors"
            >
              Status: Operational
            </button>
            <a
              href="https://discord.gg/kgvSt2X7M"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Contact / Discord
            </a>
            <button
              onClick={() => setPolicyType('terms')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setPolicyType('privacy')}
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>&copy; 2026 Never Die Brand !! Esports. Owned &amp; Engineered by ArunNvrDie From mnr. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Powered by Ring-0 Kernel Stack</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CompletePackModal
        isOpen={isCompletePackOpen}
        onClose={() => setIsCompletePackOpen(false)}
        onAddToCart={() => {
          handleAddToCart({
            id: 'complete-pack',
            title: 'Complete Pack Esports Elite Edition',
            priceUSD: 75,
            category: 'Kernel Rebuild Stack',
          });
          setIsCompletePackOpen(false);
          setIsCartOpen(true);
        }}
        currentCurrency={currentCurrency}
        currencyRates={CURRENCY_RATES}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currentCurrency={currentCurrency}
        currencyRates={CURRENCY_RATES}
      />

      <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#0e0720]/95 border border-cyan-400/40 text-white text-xs font-jakarta shadow-[0_0_30px_rgba(0,240,255,0.25)] animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
