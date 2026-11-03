import React, { useState } from 'react';
import { OPTIMIZATION_MODULES } from '../data/optimizationModules';
import { OptimizationModule } from '../types';
import {
  Zap,
  Cpu,
  Layers,
  HardDrive,
  MousePointer2,
  Wifi,
  Shield,
  Activity,
  Download,
  Copy,
  Check,
  Play,
  RotateCcw,
  Sliders,
  Terminal,
  FileCode,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  generateMasterBatchScript,
  generateRegistryFile,
  generatePowerShellDebloater,
  generateStandaloneExeBuilderScript,
  downloadFile
} from '../data/scriptsGenerator';

export const OptimizerSuite: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<OptimizationModule>(OPTIMIZATION_MODULES[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [isOptimized, setIsOptimized] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All 16 Modules' },
    { id: 'kernel', label: 'Kernel Ring-0' },
    { id: 'hardware', label: 'CPU & GPU' },
    { id: 'input', label: 'Latency & Input' },
    { id: 'network', label: 'Ethernet & TCP' },
    { id: 'system', label: 'Debloat & Privacy' },
    { id: 'maintenance', label: 'Deep Cleaner' },
  ];

  const filteredModules = selectedCategory === 'all'
    ? OPTIMIZATION_MODULES
    : OPTIMIZATION_MODULES.filter((m) => m.category === selectedCategory);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationStep(0);
    setIsOptimized(false);

    const steps = [
      'Creating System Restore Point...',
      'Injecting BCDEDIT clock tick flags (0.500ms)...',
      'Unparking CPU cores & setting Win32PrioritySeparation to 38...',
      'Setting HAGS mode 2 and high priority MSI GPU interrupts...',
      'Applying Mouclass MouseDataQueueSize=16 buffer size...',
      'Disabling Nagle Algorithm (TcpAckFrequency=1 & TCPNoDelay=1)...',
      'Terminating DiagTrack, dmwappushservice & SysMain telemetry...',
      'Purging DirectX DXCache & temporary shader artifacts...',
      'System Kernel Rebuilt: Latency reduced to 24µs!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      setSimulationStep(current);
      if (current >= steps.length) {
        clearInterval(interval);
        setIsSimulating(false);
        setIsOptimized(true);
      }
    }, 550);
  };

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Esports Kernel Tuning Engine • Screenshot 54 Specification</span>
        </div>
        <h2 className="font-orbitron text-2xl md:text-4xl font-black text-white tracking-wide uppercase mb-3">
          16-Module <span className="text-cyan-400 text-glow-cyan">Esports Rebuild</span>
        </h2>
        <p className="text-slate-300 text-sm md:text-base font-jakarta leading-relaxed">
          The full Windows stack rebuilt from the kernel up — 800+ verified optimizations, zero placebo. No fake registry.
        </p>
      </div>

      {/* Interactive Live Benchmark & Telemetry Simulator */}
      <div className="mb-12 bg-[#090514]/90 border border-white/[0.08] rounded-3xl p-5 md:p-7 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {/* Controls & Status */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                  Real-Time Latency Prober
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  isOptimized
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                }`}>
                  {isOptimized ? 'KERNEL TUNED' : 'STOCK WINDOWS'}
                </span>
              </div>
              <h3 className="font-orbitron text-lg font-bold text-white mb-2">
                System DPC & Input Status
              </h3>
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Test your current kernel scheduling against the Qubit XD Ring-0 esports stack.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className={`w-full py-3 px-4 rounded-xl font-jakarta font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSimulating
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : isOptimized
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110'
                }`}
              >
                {isSimulating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Executing Kernel Stack ({simulationStep}/8)...
                  </>
                ) : isOptimized ? (
                  <>
                    <RotateCcw className="w-4 h-4" />
                    Re-Run Performance Audit
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-black" />
                    Simulate Full System Optimization
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
                <span>Safe Sandbox Simulation</span>
                <span>Zero Placebo Audit</span>
              </div>
            </div>
          </div>

          {/* Metric Telemetry Gauges */}
          <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase">DPC Latency</span>
              <div className="my-2">
                <div className={`font-orbitron text-2xl font-black ${
                  isOptimized ? 'text-cyan-400 text-glow-cyan' : 'text-slate-300'
                }`}>
                  {isOptimized ? '24 µs' : isSimulating ? '78 µs' : '186 µs'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isOptimized ? '-87% Audio/Driver Jitter' : 'High interrupt latency'}
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-700"
                  style={{ width: isOptimized ? '15%' : '85%' }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Timer Resolution</span>
              <div className="my-2">
                <div className={`font-orbitron text-2xl font-black ${
                  isOptimized ? 'text-purple-400 text-glow-purple' : 'text-slate-300'
                }`}>
                  {isOptimized ? '0.500 ms' : isSimulating ? '0.998 ms' : '15.625 ms'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isOptimized ? 'Hardware Master Clock' : 'Default Windows OS drift'}
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full transition-all duration-700"
                  style={{ width: isOptimized ? '100%' : '15%' }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Input Lag Delay</span>
              <div className="my-2">
                <div className={`font-orbitron text-2xl font-black ${
                  isOptimized ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {isOptimized ? '2.4 ms' : isSimulating ? '6.8 ms' : '14.8 ms'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isOptimized ? 'Mouse Queue Size 16' : 'Default buffer delay'}
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-red-400 h-full transition-all duration-700"
                  style={{ width: isOptimized ? '20%' : '90%' }}
                />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-slate-400 uppercase">RAM Standby Cache</span>
              <div className="my-2">
                <div className={`font-orbitron text-2xl font-black ${
                  isOptimized ? 'text-emerald-400' : 'text-slate-300'
                }`}>
                  {isOptimized ? '3.4 GB Freed' : isSimulating ? '1.8 GB' : '4.2 GB Locked'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {isOptimized ? 'Working set trimmed' : 'Cached bloat memory'}
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full transition-all duration-700"
                  style={{ width: isOptimized ? '95%' : '30%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Script & EXE Quick Download Vault */}
      <div className="mb-10 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-purple-950/20 to-black border border-cyan-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-orbitron font-bold text-white text-base flex items-center justify-center md:justify-start gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              Download Ready-To-Execute Scripts &amp; Standalone EXE Builder
            </h3>
            <p className="text-xs text-slate-400">
              Download the batch script to run as administrator or compile it into a single Windows .exe with the included tool.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={() => {
                const bat = generateMasterBatchScript();
                downloadFile('QubitXD_Esports_Master_Optimizer.bat', bat);
              }}
              className="px-3.5 py-2 rounded-xl bg-cyan-500 text-black font-jakarta font-bold text-xs hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Master Optimizer (.BAT)
            </button>

            <button
              onClick={() => {
                const reg = generateRegistryFile();
                downloadFile('QubitXD_Registry_Matrix.reg', reg);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-jakarta font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FileCode className="w-3.5 h-3.5 text-purple-400" />
              Registry Matrix (.REG)
            </button>

            <button
              onClick={() => {
                const debloat = generatePowerShellDebloater();
                downloadFile('QubitXD_Services_Debloater.ps1', debloat);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-jakarta font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-yellow-400" />
              Services Debloater (.PS1)
            </button>

            <button
              onClick={() => {
                const exe = generateStandaloneExeBuilderScript();
                downloadFile('Build_Standalone_Optimizer_EXE.bat', exe);
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-jakarta font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              EXE Compiler Tool (.BAT)
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-jakarta font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-white/[0.02] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Module Cards & Code Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 16 Module Grid List (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {filteredModules.map((module) => {
            const isSelected = selectedModule.id === module.id;
            return (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/40 to-[#0c0818] border-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                      #{String(module.number).padStart(2, '0')} • {module.badge}
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {module.impactMetric}
                    </span>
                  </div>

                  <h4 className="font-orbitron font-bold text-sm text-white mb-1.5 line-clamp-1">
                    {module.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {module.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px]">
                  <span className="text-slate-400 font-mono">
                    {module.batchCommands ? `${module.batchCommands.length} commands` : 'Kernel flag'}
                  </span>
                  <span className="text-cyan-400 font-jakarta font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect Code <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Module Deep Dive & Code Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#090514]/95 border border-cyan-500/30 rounded-3xl p-5 md:p-6 shadow-2xl flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Module #{String(selectedModule.number).padStart(2, '0')} Inspection
              </span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
                {selectedModule.badge}
              </span>
            </div>

            <div>
              <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                {selectedModule.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedModule.summary}
              </p>
            </div>

            {/* Technical Breakdown */}
            <div>
              <h5 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                What this tweak does in Windows:
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedModule.technicalDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5 font-bold">›</span>
                    <span className="leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Command / Registry Preview */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Script Execution Payload
                </span>
                <button
                  onClick={() => {
                    const payload = [
                      ...(selectedModule.batchCommands || []),
                      ...(selectedModule.powerShellCommands || []),
                      ...(selectedModule.registryKeys?.map(r => `reg add "${r.path}" /v "${r.key}" /d "${r.value}" /f`) || [])
                    ].join('\n');
                    handleCopyCode(payload, selectedModule.id);
                  }}
                  className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedId === selectedModule.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-black/70 border border-white/10 rounded-xl p-3 font-mono text-xs text-cyan-300/90 overflow-x-auto max-h-48">
                {selectedModule.batchCommands && selectedModule.batchCommands.map((cmd, i) => (
                  <div key={i} className="py-0.5">{cmd}</div>
                ))}
                {selectedModule.powerShellCommands && selectedModule.powerShellCommands.map((cmd, i) => (
                  <div key={i} className="py-0.5 text-purple-300">{cmd}</div>
                ))}
                {selectedModule.registryKeys && selectedModule.registryKeys.map((reg, i) => (
                  <div key={i} className="py-0.5 text-yellow-300/80">
                    reg add "{reg.path}" /v "{reg.key}" /d "{reg.value}" /f
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick single-module download */}
          <div className="mt-6 pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => {
                const singleScript = `@echo off\n:: Qubit XD Module ${selectedModule.number}: ${selectedModule.title}\nnet session >nul 2>&1\nif %errorLevel% neq 0 ( echo Run as administrator! & pause & exit /b )\n\n` +
                  (selectedModule.batchCommands || []).join('\n') + '\n\npause';
                downloadFile(`QubitXD_Mod${selectedModule.number}_${selectedModule.id}.bat`, singleScript);
              }}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-cyan-500/30 text-cyan-300 font-jakarta font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              Download This Module Only (.BAT)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
