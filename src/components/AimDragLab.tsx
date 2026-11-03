import React, { useState, useRef, useEffect } from 'react';
import { Target, Flame, RotateCcw, Crosshair, Award, Zap } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  xRatio: number;
  yRatio: number;
  description: string;
}

const PRESETS: Preset[] = [
  { id: 'stock', name: 'Stock Windows (1:1 Ratio)', xRatio: 1.0, yRatio: 1.0, description: 'Default ratio. Requires huge mousepad swipe to lift from chest to head.' },
  { id: 'borak', name: 'Borak 777 (1.45 / 2.35)', xRatio: 1.45, yRatio: 2.35, description: 'High vertical snap with wide horizontal tracking for aggressive shotgun one-taps.' },
  { id: 'quantum', name: 'Quantum XD (1.25 / 2.85)', xRatio: 1.25, yRatio: 2.85, description: 'Extreme Y-lift for micro-swipes on high-DPI mouse with zero latency.' },
  { id: 'rehull', name: 'Rehullx999 (1.15 / 2.65)', xRatio: 1.15, yRatio: 2.65, description: 'Balanced laser spray drag, optimal for SMG MP40 and Thompson lock.' },
  { id: 'aimx', name: 'Qubit AimX Ultimate (1.10 / 2.90)', xRatio: 1.10, yRatio: 2.90, description: 'Maximum vertical headshot snap with stabilized horizontal crosshair anti-shake.' },
];

export const AimDragLab: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[1]);
  const [score, setScore] = useState<{ headshots: number; bodyShots: number; misses: number }>({
    headshots: 0,
    bodyShots: 0,
    misses: 0,
  });
  const [lastShotResult, setLastShotResult] = useState<{
    text: string;
    damage: number;
    isHeadshot: boolean;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const crosshairRef = useRef<{ x: number; y: number }>({ x: 250, y: 320 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid backdrop
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Enemy Target Silhouette
      const targetCenterX = canvas.width / 2;
      const headY = 130;
      const headRadius = 24;
      const chestY = 220;

      // Enemy Body/Chest Hitbox
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(targetCenterX - 45, chestY - 50, 90, 140, 12);
      ctx.fill();
      ctx.stroke();

      // Enemy Head Hitbox (Target zone)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(targetCenterX, headY, headRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Head text label
      ctx.fillStyle = '#ef4444';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('HEADSHOT (CRIT)', targetCenterX, headY - 32);

      // Chest text label
      ctx.fillStyle = '#9ca3af';
      ctx.fillText('CHEST (BODY)', targetCenterX, chestY + 20);

      // Draw Crosshair
      const ch = crosshairRef.current;
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Circle
      ctx.arc(ch.x, ch.y, 10, 0, Math.PI * 2);
      ctx.stroke();
      // Cross lines
      ctx.beginPath();
      ctx.moveTo(ch.x - 16, ch.y);
      ctx.lineTo(ch.x - 5, ch.y);
      ctx.moveTo(ch.x + 5, ch.y);
      ctx.lineTo(ch.x + 16, ch.y);
      ctx.moveTo(ch.x, ch.y - 16);
      ctx.lineTo(ch.x, ch.y - 5);
      ctx.moveTo(ch.x, ch.y + 5);
      ctx.lineTo(ch.x, ch.y + 16);
      ctx.stroke();

      // Center red dot
      ctx.fillStyle = '#ff2a5f';
      ctx.beginPath();
      ctx.arc(ch.x, ch.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    setIsDragging(true);
    dragStartRef.current = { x: clickX, y: clickY };
    crosshairRef.current = { x: clickX, y: clickY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = (currentX - dragStartRef.current.x) * selectedPreset.xRatio;
    const deltaY = (currentY - dragStartRef.current.y) * selectedPreset.yRatio;

    crosshairRef.current = {
      x: dragStartRef.current.x + deltaX,
      y: dragStartRef.current.y + deltaY,
    };
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetCenterX = canvas.width / 2;
    const headY = 130;
    const headRadius = 26;

    const ch = crosshairRef.current;
    const distToHead = Math.hypot(ch.x - targetCenterX, ch.y - headY);

    if (distToHead <= headRadius) {
      // Headshot!
      const damage = Math.floor(Math.random() * 40) + 210; // 210 - 250 red damage
      setScore((prev) => ({ ...prev, headshots: prev.headshots + 1 }));
      setLastShotResult({ text: 'HEADSHOT! 🎯 INSTANT CRIT SNAP', damage, isHeadshot: true });
    } else if (
      ch.x >= targetCenterX - 50 &&
      ch.x <= targetCenterX + 50 &&
      ch.y >= 170 &&
      ch.y <= 310
    ) {
      // Body shot
      const damage = Math.floor(Math.random() * 15) + 32;
      setScore((prev) => ({ ...prev, bodyShots: prev.bodyShots + 1 }));
      setLastShotResult({ text: 'Body Shot • Drag velocity too low', damage, isHeadshot: false });
    } else {
      // Miss
      setScore((prev) => ({ ...prev, misses: prev.misses + 1 }));
      setLastShotResult({ text: 'Missed • Overshot above or strayed sideways', damage: 0, isHeadshot: false });
    }

    // Reset crosshair position to chest center for next drag attempt
    setTimeout(() => {
      crosshairRef.current = { x: canvas.width / 2, y: 240 };
    }, 450);
  };

  const resetScore = () => {
    setScore({ headshots: 0, bodyShots: 0, misses: 0 });
    setLastShotResult(null);
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono mb-3">
          <Flame className="w-3.5 h-3.5" />
          <span>Interactive Aim &amp; Recoil Simulator</span>
        </div>
        <h2 className="font-orbitron text-2xl md:text-4xl font-black text-white tracking-wide uppercase mb-3">
          One-Tap <span className="text-red-400 text-glow-purple">Drag Shot Lab</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base font-jakarta leading-relaxed">
          Experience why Borak 777 and Quantum XD use asymmetric Y-sensitivity. Click on the chest and flick your mouse UPWARD to test drag headshots!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Preset Selector & Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090514]/95 border border-white/[0.08] rounded-3xl p-5 md:p-6 shadow-2xl">
            <h3 className="font-orbitron font-bold text-lg text-white mb-3 flex items-center justify-between">
              <span>Select Tuning Profile</span>
              <button
                onClick={resetScore}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </h3>

            {/* Presets List */}
            <div className="space-y-2 mb-6">
              {PRESETS.map((p) => {
                const isSelected = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPreset(p)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-red-500/15 border-red-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-white">{p.name}</span>
                      <span className="text-red-400">Y-Ratio: {p.yRatio}x</span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-jakarta leading-relaxed">
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Scorecard */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Live Test Accuracy
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-xl">
                  <span className="text-[10px] text-red-300 block">HEADSHOTS</span>
                  <span className="font-orbitron text-xl font-black text-red-400">{score.headshots}</span>
                </div>
                <div className="bg-slate-800/40 border border-white/10 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">BODY HITS</span>
                  <span className="font-orbitron text-xl font-black text-slate-300">{score.bodyShots}</span>
                </div>
                <div className="bg-slate-800/40 border border-white/10 p-2.5 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">MISSES</span>
                  <span className="font-orbitron text-xl font-black text-slate-400">{score.misses}</span>
                </div>
              </div>

              <div className="mt-3 text-center text-xs text-slate-300 font-mono">
                Headshot Rate:{' '}
                <strong className="text-red-400">
                  {score.headshots + score.bodyShots + score.misses > 0
                    ? Math.round(
                        (score.headshots / (score.headshots + score.bodyShots + score.misses)) * 100
                      )
                    : 0}
                  %
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Canvas (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[500px] aspect-[4/3] bg-black/90 rounded-3xl border-2 border-red-500/30 overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] select-none">
            <canvas
              ref={canvasRef}
              width={500}
              height={380}
              className="w-full h-full cursor-crosshair"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />

            {/* Instruction Overlay */}
            <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] font-mono text-cyan-400 bg-black/70 px-2 py-1 rounded border border-cyan-400/30">
                ACTIVE: {selectedPreset.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-black/70 px-2 py-1 rounded">
                Click &amp; Flick UP
              </span>
            </div>

            {/* Live Shot Result Toast inside canvas */}
            {lastShotResult && (
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex items-center justify-between p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                <span className={`text-xs font-mono font-bold ${
                  lastShotResult.isHeadshot ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {lastShotResult.text}
                </span>
                {lastShotResult.damage > 0 && (
                  <span className={`font-orbitron font-black text-lg ${
                    lastShotResult.isHeadshot ? 'text-red-500 text-glow-purple' : 'text-slate-200'
                  }`}>
                    {lastShotResult.damage}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 text-center text-xs text-slate-400 font-jakarta max-w-md">
            💡 <strong>Pro Tip from Borak 777:</strong> Start clicking at the enemy chest and snap upward with a fast 1-inch mouse swipe. With Y-sensitivity set above 2.3x, the crosshair snaps right into the head hitbox with zero over-travel.
          </div>
        </div>
      </div>
    </section>
  );
};
