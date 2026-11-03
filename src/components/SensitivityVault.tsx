import React, { useState } from 'react';
import { CREATOR_SENSITIVITIES } from '../data/creatorSensitivities';
import { CreatorProfile } from '../types';
import {
  Crosshair,
  Youtube,
  MousePointer2,
  Sliders,
  Copy,
  Check,
  Download,
  Target,
  Sparkles,
  Flame,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { generateCreatorSensiJson, downloadFile } from '../data/scriptsGenerator';

export const SensitivityVault: React.FC = () => {
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile>(CREATOR_SENSITIVITIES[0]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sensi Converter State
  const [inputDpi, setInputDpi] = useState<number>(selectedCreator.mouseConfig.dpi);
  const [targetDpi, setTargetDpi] = useState<number>(1000);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Sensitivity calculation
  const convertedX = (selectedCreator.emulatorSettings.xSens * (inputDpi / targetDpi)).toFixed(2);
  const convertedY = (selectedCreator.emulatorSettings.ySens * (inputDpi / targetDpi)).toFixed(2);
  const yRatio = (selectedCreator.emulatorSettings.ySens / selectedCreator.emulatorSettings.xSens).toFixed(2);

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-400/30 text-yellow-400 text-xs font-mono mb-3">
          <Crosshair className="w-3.5 h-3.5" />
          <span>YouTube Pro Vault • Verified Configurations</span>
        </div>
        <h2 className="font-orbitron text-2xl md:text-4xl font-black text-white tracking-wide uppercase mb-3">
          Pro Esports <span className="text-yellow-400 text-glow-purple">Sensitivity Hub</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base font-jakarta leading-relaxed">
          Exhaustive settings, emulator tweaks (16450, 21058), and vertical drag ratios from YouTube creators: Quantum XD, Borak 777, Rehullx999, and Qubit XD.
        </p>
      </div>

      {/* Creator Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {CREATOR_SENSITIVITIES.map((creator) => {
          const isActive = selectedCreator.id === creator.id;
          return (
            <button
              key={creator.id}
              onClick={() => {
                setSelectedCreator(creator);
                setInputDpi(creator.mouseConfig.dpi);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-yellow-500/15 via-[#120a24] to-black border-yellow-400/50 shadow-[0_0_25px_rgba(234,179,8,0.2)]'
                  : 'bg-white/[0.02] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-yellow-400">
                  {creator.name}
                </span>
                <Youtube className="w-3.5 h-3.5 text-red-500" />
              </div>
              <div className="text-xs text-slate-300 font-jakarta font-semibold line-clamp-1">
                {creator.tagline}
              </div>
              <div className="mt-2 text-[11px] font-mono text-slate-400">
                Tweak: <span className="text-white font-bold">{creator.emulatorSettings.tweak}</span> • DPI: <span className="text-white font-bold">{creator.mouseConfig.dpi}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Creator In-Depth Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Left Column: Emulator Settings & Mouse Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Dossier Card */}
          <div className="bg-[#090514]/95 border border-white/[0.08] rounded-3xl p-5 md:p-7 shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest font-bold">
                  Active Profile
                </span>
                <h3 className="font-orbitron text-2xl font-black text-white">
                  {selectedCreator.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-jakarta">
                  {selectedCreator.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const json = generateCreatorSensiJson(selectedCreator);
                    downloadFile(`${selectedCreator.id}_sensi_config.json`, json, 'application/json');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-jakarta text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-yellow-400" />
                  Export .JSON
                </button>
                <button
                  onClick={() => {
                    const cfg = `[QubitXD_Sensi_Profile]\nCreator=${selectedCreator.name}\nTweak=${selectedCreator.emulatorSettings.tweak}\nX_Sens=${selectedCreator.emulatorSettings.xSens}\nY_Sens=${selectedCreator.emulatorSettings.ySens}\nMouse_DPI=${selectedCreator.mouseConfig.dpi}\nInGame_General=${selectedCreator.inGameSens.general}\nInGame_RedDot=${selectedCreator.inGameSens.redDot}`;
                    handleCopy(cfg, 'cfg');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 font-jakarta text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedKey === 'cfg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy BSTweaker
                </button>
              </div>
            </div>

            {/* In-Game Free Fire Sliders */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-yellow-400" />
                In-Game Sensitivity Matrix
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">General</span>
                    <span className="font-mono font-bold text-yellow-400">{selectedCreator.inGameSens.general}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-400 h-full" style={{ width: `${selectedCreator.inGameSens.general}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">Red Dot</span>
                    <span className="font-mono font-bold text-red-400">{selectedCreator.inGameSens.redDot}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-400 h-full" style={{ width: `${selectedCreator.inGameSens.redDot}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">2X Scope</span>
                    <span className="font-mono font-bold text-cyan-400">{selectedCreator.inGameSens.scope2x}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full" style={{ width: `${selectedCreator.inGameSens.scope2x}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">4X Scope</span>
                    <span className="font-mono font-bold text-purple-400">{selectedCreator.inGameSens.scope4x}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full" style={{ width: `${selectedCreator.inGameSens.scope4x}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">Sniper</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedCreator.inGameSens.sniper}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full" style={{ width: `${selectedCreator.inGameSens.sniper}%` }} />
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-jakarta">Free Look</span>
                    <span className="font-mono font-bold text-slate-300">{selectedCreator.inGameSens.freeLook}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full" style={{ width: `${selectedCreator.inGameSens.freeLook}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* BlueStacks / MSI Keymapping Tweak & Drag Multiplier */}
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-4 mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-cyan-400" />
                  Emulator Keymapping &amp; Tweak Coordinates
                </span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  Y/X Ratio: <strong className="text-white">{yRatio}x Drag Boost</strong>
                </span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 text-[10px] block">TWEAK CODE</span>
                  <span className="text-cyan-400 font-bold text-base">{selectedCreator.emulatorSettings.tweak}</span>
                </div>

                <div className="bg-black/40 p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 text-[10px] block">X SENSITIVITY</span>
                  <span className="text-yellow-400 font-bold text-base">{selectedCreator.emulatorSettings.xSens}</span>
                </div>

                <div className="bg-black/40 p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 text-[10px] block">Y SENSITIVITY (DRAG)</span>
                  <span className="text-red-400 font-bold text-base">{selectedCreator.emulatorSettings.ySens}</span>
                </div>

                <div className="bg-black/40 p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-slate-400 text-[10px] block">FIRE BUTTON</span>
                  <span className="text-purple-400 font-bold text-base">{selectedCreator.emulatorSettings.fireButtonSizePercent}%</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Recommended Resolution: <strong className="text-slate-200">{selectedCreator.emulatorSettings.resolution}</strong></span>
                <span>Device Profile: <strong className="text-slate-200">{selectedCreator.emulatorSettings.deviceModel}</strong></span>
              </div>
            </div>

            {/* Secret Technique Note */}
            <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-xs text-yellow-200 leading-relaxed font-jakarta">
              <strong className="text-yellow-400 font-bold block mb-1">
                ⭐ {selectedCreator.name}'s Secret Headshot Technique:
              </strong>
              {selectedCreator.secretTuningNote}
            </div>
          </div>
        </div>

        {/* Right Column: YouTube Video Breakdowns & Sensi Converter (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* YouTube Video Takeaways */}
          <div className="bg-[#090514]/95 border border-white/[0.08] rounded-3xl p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                Verified YouTube Tutorials
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedCreator.youtubeChannel}
              </span>
            </div>

            <div className="space-y-3">
              {selectedCreator.videoHighlights.map((vid, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-red-500/30 transition-all">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span className="text-red-400 font-bold">Video #{idx + 1}</span>
                    <span>{vid.viewsCount}</span>
                  </div>
                  <h5 className="font-jakarta font-bold text-xs text-white mb-1.5 leading-snug">
                    {vid.title}
                  </h5>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {vid.keyTakeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive DPI / Sensi Ratio Converter */}
          <div className="bg-[#090514]/95 border border-cyan-500/30 rounded-3xl p-5 md:p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                DPI Converter &amp; Scale
              </span>
              <span className="text-[11px] font-mono text-slate-400">1:1 Muscle Memory</span>
            </div>

            <p className="text-xs text-slate-300 mb-4 font-jakarta leading-relaxed">
              Convert {selectedCreator.name}'s configuration to your exact mouse DPI without altering distance-to-headshot.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">
                  Creator DPI
                </label>
                <select
                  value={inputDpi}
                  onChange={(e) => setInputDpi(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={400}>400 DPI</option>
                  <option value={800}>800 DPI</option>
                  <option value={1000}>1000 DPI</option>
                  <option value={1200}>1200 DPI</option>
                  <option value={1600}>1600 DPI</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase">
                  Your Mouse DPI
                </label>
                <select
                  value={targetDpi}
                  onChange={(e) => setTargetDpi(Number(e.target.value))}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 font-bold"
                >
                  <option value={400}>400 DPI</option>
                  <option value={800}>800 DPI</option>
                  <option value={1000}>1000 DPI</option>
                  <option value={1200}>1200 DPI</option>
                  <option value={1600}>1600 DPI</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center font-mono">
              <span className="text-[11px] text-slate-300 block mb-1">
                Calculated Emulator Sens at {targetDpi} DPI:
              </span>
              <div className="flex items-center justify-center gap-6 font-bold text-sm">
                <div>
                  X-Sens: <span className="text-yellow-400 font-extrabold">{convertedX}</span>
                </div>
                <div>
                  Y-Sens: <span className="text-red-400 font-extrabold">{convertedY}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
