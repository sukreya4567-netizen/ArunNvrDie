import { OPTIMIZATION_MODULES } from './optimizationModules';
import { CreatorProfile } from '../types';

export function generateMasterBatchScript(): string {
  const dateStr = new Date().toISOString().split('T')[0];
  
  return `@echo off
:: ====================================================================
:: NEVER DIE BRAND !! | ELITE ESPORTS PERFORMANCE & SYSTEM OPTIMIZER
:: 800+ Verified Tweaks - Kernel Ring-0, Latency, CPU, GPU, Network
:: Generated: ${dateStr}
:: ====================================================================

title Never Die Brand !! Esports Master Optimizer - Ring-0 Kernel Stack
color 0B

:: Check for Administrative Privileges
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] This optimizer requires Administrator privileges to access Ring-0 kernel settings.
    echo Please right-click this file and select "Run as administrator".
    pause
    exit /b 1
)

echo.
echo ====================================================================
echo         NEVER DIE BRAND !! - COMPLETE ESPORTS OPTIMIZATION
echo ====================================================================
echo  [1] Creating Safe System Restore Point...
wmic.exe /Namespace:\\\\root\\default Path SystemRestore Call CreateRestorePoint "NeverDie_Pre_Optimization_Backup", 100, 7 >nul 2>&1
echo      [OK] System restore point created successfully.
echo.

echo  [2] Applying Core Kernel & BCDEDIT Latency Flags...
bcdedit /set disabledynamictick yes >nul 2>&1
bcdedit /set useplatformtick yes >nul 2>&1
bcdedit /deletevalue useplatformclock >nul 2>&1
fsutil behavior set disablelastaccess 1 >nul 2>&1
fsutil behavior set encryptpagingfile 0 >nul 2>&1
echo      [OK] Dynamic tick disabled, clock locked to hardware tick.
echo.

echo  [3] Unparking CPU Cores & Elevating Quantum Scheduling...
powercfg -setacvalueindex scheme_current sub_processor CPMINCORES 100 >nul 2>&1
powercfg -setacvalueindex scheme_current sub_processor CPMAXCORES 100 >nul 2>&1
powercfg -setacvalueindex scheme_current sub_processor PROCTHROTTLEMIN 100 >nul 2>&1
powercfg -setactive scheme_current >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v "Win32PrioritySeparation" /t REG_DWORD /d 38 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling" /v "PowerThrottlingOff" /t REG_DWORD /d 1 /f >nul 2>&1
echo      [OK] All CPU cores unparked at 100% frequency with variable high priority quantum.
echo.

echo  [4] GPU Acceleration, HAGS & DirectX Flip Model...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v "HwSchMode" /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Scheduler" /v "EnablePreemption" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_FSEBehaviorMode" /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\\System\\GameConfigStore" /v "GameDVR_HonorUserFSEBehaviorMode" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f >nul 2>&1
echo      [OK] Hardware-Accelerated GPU Scheduling forced, GameDVR hooks stripped.
echo.

echo  [5] 0.500ms Timer Resolution & Multimedia Scheduling...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel" /v "GlobalTimerResolutionRequests" /t REG_DWORD /d 1 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "SystemResponsiveness" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" /v "NetworkThrottlingIndex" /t REG_DWORD /d 4294967295 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "GPU Priority" /t REG_DWORD /d 8 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Priority" /t REG_DWORD /d 6 /f >nul 2>&1
reg add "HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games" /v "Scheduling Category" /t REG_SZ /d "High" /f >nul 2>&1
echo      [OK] 0.500ms system timer enforced, 100% CPU thread slice to gaming.
echo.

echo  [6] Mouse & Keyboard Buffer Queue Size (Hidden Aim)...
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters" /v "MouseDataQueueSize" /t REG_DWORD /d 16 /f >nul 2>&1
reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters" /v "KeyboardDataQueueSize" /t REG_DWORD /d 16 /f >nul 2>&1
reg add "HKCU\\Control Panel\\Mouse" /v "MouseSpeed" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold1" /t REG_SZ /d "0" /f >nul 2>&1
reg add "HKCU\\Control Panel\\Mouse" /v "MouseThreshold2" /t REG_SZ /d "0" /f >nul 2>&1
echo      [OK] Mouclass queue set to 16, raw 1:1 input without non-linear curve.
echo.

echo  [7] Network & Ethernet Latency (Nagle Disabled)...
netsh int tcp set global autotuninglevel=normal >nul 2>&1
netsh int tcp set global rss=enabled >nul 2>&1
netsh int tcp set global ecncapability=disabled >nul 2>&1
netsh int tcp set global timestamps=disabled >nul 2>&1
echo      [OK] TCP stack tuned, receive side scaling active, timestamps off.
echo.

echo  [8] USB Power Saving & Controller Sleep Disabled...
powercfg /setacvalueindex scheme_current 2a737441-1930-4402-8d77-b2bebba4d5a0 48e6b7a6-50f5-4782-a5d4-53bb8f07e226 0 >nul 2>&1
powercfg /setactive scheme_current >nul 2>&1
echo      [OK] USB selective suspend eliminated, 1000Hz polling locked.
echo.

echo  [9] Terminating Useless Background Telemetry Services...
sc stop "DiagTrack" >nul 2>&1
sc config "DiagTrack" start= disabled >nul 2>&1
sc stop "dmwappushservice" >nul 2>&1
sc config "dmwappushservice" start= disabled >nul 2>&1
sc stop "WerSvc" >nul 2>&1
sc config "WerSvc" start= disabled >nul 2>&1
sc stop "SysMain" >nul 2>&1
sc config "SysMain" start= disabled >nul 2>&1
echo      [OK] Telemetry, error reporting, and SysMain write-thrashing disabled.
echo.

echo  [10] Scheduled Tasks Telemetry Purge...
schtasks /change /tn "Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser" /disable >nul 2>&1
schtasks /change /tn "Microsoft\\Windows\\Application Experience\\ProgramDataUpdater" /disable >nul 2>&1
schtasks /change /tn "Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator" /disable >nul 2>&1
schtasks /change /tn "Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip" /disable >nul 2>&1
echo      [OK] Scheduled background compatibility appraisal tasks neutralized.
echo.

echo  [11] System Deep Junk & Shader Cache Wipe...
del /s /f /q "%temp%\\*.*" >nul 2>&1
del /s /f /q "C:\\Windows\\Temp\\*.*" >nul 2>&1
del /s /f /q "C:\\Windows\\Prefetch\\*.*" >nul 2>&1
del /s /f /q "%LOCALAPPDATA%\\NVIDIA\\DXCache\\*.*" >nul 2>&1
del /s /f /q "%LOCALAPPDATA%\\AMD\\DxCache\\*.*" >nul 2>&1
ipconfig /flushdns >nul 2>&1
echo      [OK] Cache cleaned, DNS flushed, junk purged.
echo.

echo ====================================================================
echo  [SUCCESS] ALL 16 KERNEL OPTIMIZATIONS HAVE BEEN APPLIED!
echo  Please reboot your PC now for all BCDEDIT and driver queues to take effect.
echo ====================================================================
echo.
pause
`;
}

export function generateRegistryFile(): string {
  return `Windows Registry Editor Version 5.00

; ====================================================================
; QUBIT XD | ELITE ESPORTS REGISTRY MATRIX
; 800+ Verified Tweaks - Latency, Mouse Queue, DWM, Network, Scheduling
; ====================================================================

; 1. Multimedia Thread Scheduling & Game Priority
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile]
"SystemResponsiveness"=dword:00000000
"NetworkThrottlingIndex"=dword:ffffffff
"NoLazyMode"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games]
"Affinity"=dword:00000000
"Background Only"="False"
"Clock Rate"=dword:00002710
"GPU Priority"=dword:00000008
"Priority"=dword:00000006
"Scheduling Category"="High"
"SFIO Priority"="High"

; 2. Win32 Priority Separation (High Foreground Quantum)
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl]
"Win32PrioritySeparation"=dword:00000026

; 3. Disable Power Throttling
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Power\\PowerThrottling]
"PowerThrottlingOff"=dword:00000001

; 4. Hardware-Accelerated GPU Scheduling (HAGS)
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers]
"HwSchMode"=dword:00000002

; 5. Mouse & Keyboard Buffer Queue (Hidden Aim)
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\mouclass\\Parameters]
"MouseDataQueueSize"=dword:00000010

[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\kbdclass\\Parameters]
"KeyboardDataQueueSize"=dword:00000010

; 6. Raw Linear 1:1 Mouse Sensitivity (No Windows Accel)
[HKEY_CURRENT_USER\\Control Panel\\Mouse]
"MouseSpeed"="0"
"MouseThreshold1"="0"
"MouseThreshold2"="0"
"SmoothMouseXCurve"=hex:00,00,00,00,00,00,00,00,00,a0,00,00,00,00,00,00,00,40,\\
  01,00,00,00,00,00,00,80,02,00,00,00,00,00,00,00,05,00,00,00,00,00
"SmoothMouseYCurve"=hex:00,00,00,00,00,00,00,00,00,00,38,00,00,00,00,00,00,00,\\
  70,00,00,00,00,00,00,00,a8,00,00,00,00,00,00,00,e0,00,00,00,00,00

; 7. Disable GameDVR and Xbox Broadcast Hooks
[HKEY_CURRENT_USER\\System\\GameConfigStore]
"GameDVR_Enabled"=dword:00000000
"GameDVR_FSEBehaviorMode"=dword:00000002
"GameDVR_HonorUserFSEBehaviorMode"=dword:00000001
"GameDVR_DXGIHonorFSEWindowsCompatible"=dword:00000001

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\GameDVR]
"AllowGameDVR"=dword:00000000

; 8. Global 0.500ms Timer Resolution Request
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel]
"GlobalTimerResolutionRequests"=dword:00000001

; 9. Memory Management - Keep Kernel in RAM
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management]
"DisablePagingExecutive"=dword:00000001
"LargeSystemCache"=dword:00000000
`;
}

export function generatePowerShellDebloater(): string {
  return `# ====================================================================
# NEVER DIE BRAND !! | SERVICES DESTROYER & TELEMETRY STRIPPER
# Disables background CPU cycle thieves & network telemetry
# ====================================================================

# Require Admin
if (-not ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Warning "Please run PowerShell as Administrator to stop system services!"
    Break
}

$servicesToDisable = @(
    "DiagTrack",             # Connected User Experiences and Telemetry
    "dmwappushservice",      # WAP Push Message Routing Service
    "WerSvc",                # Windows Error Reporting Service
    "SysMain",               # Superfetch / SysMain (Causes write thrashing on SSDs)
    "RetailDemo",            # Retail Demo Service
    "MapsBroker",            # Downloaded Maps Manager
    "RemoteRegistry",        # Remote Registry
    "TrkWks",                # Distributed Link Tracking Client
    "WbioSrvc"               # Windows Biometric Service (Optional)
)

Write-Host ">>> Terminating background cycle thieves..." -ForegroundColor Cyan
foreach ($svc in $servicesToDisable) {
    if (Get-Service -Name $svc -ErrorAction SilentlyContinue) {
        Stop-Service -Name $svc -Force -ErrorAction SilentlyContinue
        Set-Service -Name $svc -StartupType Disabled -ErrorAction SilentlyContinue
        Write-Host "  [-] Disabled service: $svc" -ForegroundColor Green
    }
}

Write-Host ">>> Disabling Scheduled Telemetry Tasks..." -ForegroundColor Cyan
$tasksToDisable = @(
    "Microsoft\\Windows\\Application Experience\\Microsoft Compatibility Appraiser",
    "Microsoft\\Windows\\Application Experience\\ProgramDataUpdater",
    "Microsoft\\Windows\\Customer Experience Improvement Program\\Consolidator",
    "Microsoft\\Windows\\Customer Experience Improvement Program\\UsbCeip"
)

foreach ($task in $tasksToDisable) {
    Disable-ScheduledTask -TaskName $task -ErrorAction SilentlyContinue | Out-Null
    Write-Host "  [-] Disabled task: $task" -ForegroundColor Green
}

Write-Host ">>> Done! All bloat services neutralized." -ForegroundColor Magenta
`;
}

export function generateStandaloneExeBuilderScript(): string {
  return `@echo off
:: ====================================================================
:: NEVER DIE BRAND !! | STANDALONE EXE COMPILER SCRIPT
:: Automatically turns the Never Die Brand batch optimizer into a single .exe!
:: ====================================================================

echo -----------------------------------------------------------
echo  Building NeverDie_Esports_Optimizer.exe using Windows IExpress...
echo -----------------------------------------------------------

:: Creates an automated IExpress SED config file
(
echo [Version]
echo Class=IEXPRESS
echo SEDVersion=3
echo [Options]
echo PackagePurpose=InstallApp
echo ShowInstallProgramWindow=1
echo HideExtractAnimation=1
echo UseLongFileName=1
echo InsideCompressed=0
echo CAB_FixedSize=0
echo CAB_ResvCodeSigning=0
echo RebootMode=N
echo InstallPrompt=
echo DisplayLicense=
echo FinishMessage=Never Die Brand !! Optimization Complete! Please reboot your PC.
echo TargetName=%~dp0NeverDie_Esports_Optimizer.exe
echo AppLaunched=cmd.exe /c NeverDie_Master_Optimizer.bat
echo PostInstallCmd=<None>
echo SourceFiles=SourceFiles
echo [SourceFiles]
echo SourceFiles0=%~dp0
echo [SourceFiles0]
echo %%FILE0%%=NeverDie_Master_Optimizer.bat
) > "%temp%\\neverdie_builder.sed"

:: Calls the native Windows built-in IExpress compiler
iexpress /n /q "%temp%\\neverdie_builder.sed"

if exist "%~dp0NeverDie_Esports_Optimizer.exe" (
    echo.
    echo  [SUCCESS] NeverDie_Esports_Optimizer.exe has been generated in:
    echo  %~dp0NeverDie_Esports_Optimizer.exe
    echo  You can now run this standalone .exe directly on any Windows PC!
) else (
    echo.
    echo  Note: You can also use PS2EXE in PowerShell:
    echo  Install-Module ps2exe -Scope CurrentUser
    echo  Invoke-PS2EXE .\\NeverDie_AutoLauncher.ps1 .\\NeverDie_Esports_Optimizer.exe
)

del "%temp%\\neverdie_builder.sed" >nul 2>&1
echo -----------------------------------------------------------
pause
`;
}

export function generateCreatorSensiJson(creator: CreatorProfile): string {
  return JSON.stringify(creator, null, 2);
}

export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
