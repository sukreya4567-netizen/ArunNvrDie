import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API route for AI-powered Custom Hardware & Sensi Tuner
app.post('/api/tune-rig', async (req, res) => {
  try {
    const { cpu, gpu, ram, storage, monitorHz, game, emulator, playstyle, currentIssues } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in environment.',
        fallback: true
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are the lead esports performance engineer and sensitivity calibrator for Qubit XD, specializing in low-latency Windows tuning, kernel scheduling, and Free Fire / emulator sensitivities used by creators like Quantum XD, Borak 777, Rehullx999, and Qubit XD.

The user's setup is:
- CPU: ${cpu || 'Not specified'}
- GPU: ${gpu || 'Not specified'}
- RAM: ${ram || '16GB'}
- Storage: ${storage || 'NVMe SSD'}
- Monitor Refresh Rate: ${monitorHz || '144Hz'}
- Target Game: ${game || 'Free Fire'}
- Emulator / Client: ${emulator || 'BlueStacks 5'}
- Preferred Playstyle: ${playstyle || 'One-Tap Headshot'}
- Current Bottlenecks / Issues: ${currentIssues || 'Input delay, frame drops, micro-stutters during drag shots'}

Provide an ultra-detailed, precision response in clean JSON format matching this exact schema:
{
  "systemDiagnosis": "Short assessment of their hardware balance and primary latency choke points.",
  "recommendedSettings": {
    "windowsPowerPlan": "Ultimate Performance / Custom Qubit Power Profile guidance",
    "gpuDriverSettings": "Specific NVCP or Radeon Software low latency settings",
    "emulatorConfig": {
      "renderer": "OpenGL / Vulkan / DirectX",
      "cpuCores": "e.g. 4 Cores",
      "ramAllocation": "e.g. 4096MB",
      "astcTexture": "Hardware decoding",
      "deviceProfile": "e.g. ASUS ROG Phone 5",
      "fpsTarget": "e.g. 240 FPS unlock with High Frame Rate enabled"
    },
    "sensitivity": {
      "mouseDpi": "800 or 1000",
      "windowsPointerSpeed": "6/11 (Raw Input, Enhance Pointer Precision OFF)",
      "pollingRate": "1000Hz",
      "inGame": {
        "general": 98,
        "redDot": 92,
        "scope2x": 86,
        "scope4x": 80,
        "sniper": 50,
        "freeLook": 65
      },
      "emulatorTweak": "16450 or 21058",
      "xSensitivity": 1.35,
      "ySensitivity": 2.65,
      "rationale": "Why these X/Y values match Borak 777 / Quantum XD style for this setup"
    }
  },
  "customBatchScriptSnippet": "@echo off\\n:: Custom batch snippet for this rig\\n...",
  "proTips": [
    "Tip 1 for eliminating micro-stutters",
    "Tip 2 for fire button placement and drag technique",
    "Tip 3 for DPC latency reduction"
  ]
}

Return ONLY valid JSON without markdown wrapping.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch {
      // Clean possible backticks
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error generating rig tuning:', error);
    res.status(500).json({ 
      error: 'Failed to generate tailored optimization.',
      message: error.message 
    });
  }
});

// Setup Vite in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Qubit XD Performance Engine running on port ${port}`);
  });
}

startServer();
