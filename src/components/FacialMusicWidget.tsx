import React, { useState, useRef, useEffect } from 'react';
import { Camera, Music, Play, Pause, RefreshCw, Volume2, Shield } from 'lucide-react';

interface RecommendedTrack {
  emotion: 'Happy' | 'Calm' | 'Focused' | 'Energetic';
  trackName: string;
  artist: string;
  duration: string;
}

const TRACKS: Record<string, RecommendedTrack> = {
  Happy: { emotion: 'Happy', trackName: "Sunny Beats & Uplifting Joy", artist: "Aesthetic Sunshine", duration: "2:45" },
  Calm: { emotion: 'Calm', trackName: "Raindrops Over Warm Rivers", artist: "Mellow Chill Lofi", duration: "3:12" },
  Focused: { emotion: 'Focused', trackName: "Deep Brain Binaural Synths", artist: "Flowstate Waves", duration: "4:05" },
  Energetic: { emotion: 'Energetic', trackName: "High Octane Cyberpunk Pulse", artist: "Aero Synthwave", duration: "2:50" }
};

export default function FacialMusicWidget() {
  const [useRealCamera, setUseRealCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState<'Happy' | 'Calm' | 'Focused' | 'Energetic'>('Happy');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Progressive timer of music track when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 1.5));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
      setStream(mediaStream);
      setUseRealCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.warn("Could not access camera, running in mock mode: ", err);
      setUseRealCamera(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setUseRealCamera(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stream]);

  const handleCaptureAndScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setIsPlaying(false);

    // Simulate scanning beam animation (1800ms)
    setTimeout(() => {
      // Pick a random emotion
      const emotions: ('Happy' | 'Calm' | 'Focused' | 'Energetic')[] = ['Happy', 'Calm', 'Focused', 'Energetic'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setDetectedEmotion(randomEmotion);
      setIsScanning(false);
      setHasScanned(true);
      setIsPlaying(true);
      setProgress(0);
    }, 2000);
  };

  const activeTrack = TRACKS[detectedEmotion];

  return (
    <div id="facial-music-recommender" className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-4 text-xs">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-indigo-400" />
          Interactive Emotion Music Recommender
        </h4>
        <div className="flex gap-1">
          {!useRealCamera ? (
            <button
              id="btn-enable-webcam"
              onClick={startCamera}
              className="text-[9px] bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25 border border-indigo-500/20 px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              Enable Live Cam
            </button>
          ) : (
            <button
              id="btn-stop-webcam"
              onClick={stopCamera}
              className="text-[9px] bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/20 px-2 py-0.5 rounded cursor-pointer transition-colors"
            >
              Switch to Mock Cam
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Left Side: Camera view */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-slate-500 shadow-inner">
          {useRealCamera ? (
            <video
              id="webcam-video-element"
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            /* Styled mock camera graphic representation */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <div className="absolute inset-2 border border-dashed border-indigo-500/20 rounded"></div>
              {/* Animated corner scan lines */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-indigo-500/40"></div>
              <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-indigo-500/40"></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-indigo-500/40"></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-indigo-500/40"></div>
              
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center text-indigo-400/50 mb-3 animate-pulse">
                <Shield className="w-8 h-8" />
              </div>
              <p className="text-[10px] text-center text-slate-400">Mock Camera Feed Active</p>
              <p className="text-[9px] text-center text-slate-500 mt-1 opacity-75">Click Scan to detect face expressions</p>
            </div>
          )}

          {/* Interactive Scanning HUD Overlay */}
          {isScanning && (
            <div className="absolute inset-0 bg-indigo-500/10 flex flex-col justify-between p-3">
              <div className="text-[10px] text-indigo-400 font-mono tracking-widest animate-pulse flex justify-between">
                <span>[SCANNING FACE...]</span>
                <span>HUD_ENG_V1.9</span>
              </div>
              <div className="origin-top w-full h-0.5 bg-indigo-400 shadow-[0_0_8px_#818cf8] animate-bounce"></div>
              <div className="text-[9px] text-indigo-300 font-mono text-right">98% CALIB</div>
            </div>
          )}
        </div>

        {/* Right Side: Detected emotion + Recommended Song */}
        <div className="bg-slate-900/60 border border-slate-700/40 rounded-lg p-3 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-slate-500 font-mono uppercase">Expression Target</span>
            {hasScanned ? (
              <div className="mt-1 flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded font-semibold ${
                  detectedEmotion === 'Happy' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  detectedEmotion === 'Calm' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                  detectedEmotion === 'Focused' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  Detected: {detectedEmotion}
                </span>
                <span className="text-[10px] text-slate-400 italic">Matching tracks loaded</span>
              </div>
            ) : (
              <p id="no-emotion-scanned-text" className="text-slate-500 mt-1 italic">Scan not executed yet</p>
            )}
          </div>

          {/* Spotify-styled Playback Player */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 mt-2 flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400 ${
                isPlaying ? 'animate-spin [animation-duration:8s]' : ''
              }`}>
                <Music className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div id="recommender-track-name" className="font-bold text-slate-200 truncate">{activeTrack.trackName}</div>
                <div id="recommender-artist-name" className="text-[10px] text-slate-500 truncate">{activeTrack.artist}</div>
              </div>
            </div>

            {/* Simulated sound bar visualization */}
            {isPlaying && (
              <div className="flex items-end justify-center gap-0.5 h-6 opacity-75 my-1">
                <span className="w-1 bg-indigo-500 rounded-t animate-bounce" style={{ height: '70%', animationDelay: '0s' }}></span>
                <span className="w-1 bg-indigo-400 rounded-t animate-bounce" style={{ height: '40%', animationDelay: '0.1s' }}></span>
                <span className="w-1 bg-indigo-300 rounded-t animate-bounce" style={{ height: '90%', animationDelay: '0.2s' }}></span>
                <span className="w-1 bg-indigo-400 rounded-t animate-bounce" style={{ height: '55%', animationDelay: '0.15s' }}></span>
                <span className="w-1 bg-indigo-500 rounded-t animate-bounce" style={{ height: '80%', animationDelay: '0.3s' }}></span>
              </div>
            )}

            {/* Play progress bar */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                <span>0:{Math.floor((progress / 100) * 180).toString().padStart(2, '0')}</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>

            {/* Player controls */}
            <div className="flex justify-center items-center gap-3">
              <button
                id="btn-toggle-play"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 pl-0.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          id="btn-scan-emotion"
          onClick={handleCaptureAndScan}
          disabled={isScanning}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 hover:shadow-lg hover:shadow-indigo-500/20 transition-all border-none"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Face...</span>
            </>
          ) : (
            <>
              <Camera className="w-3.5 h-3.5" />
              <span>Capture & Predict</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
