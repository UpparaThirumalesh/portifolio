import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Flame, Leaf, HelpCircle, AlertTriangle } from 'lucide-react';

interface MockItem {
  name: string;
  type: string;
  image: string;
  category: 'Food Waste' | 'Residual Waste' | 'Recyclable' | 'Hazardous Waste';
  confidence: number;
  color: string;
  icon: any;
}

const TEST_ITEMS: MockItem[] = [
  {
    name: "Apple Core / Fruit Peel",
    type: "Organic",
    image: "🍎",
    category: "Food Waste",
    confidence: 99.4,
    color: "from-emerald-500 to-green-600",
    icon: Leaf
  },
  {
    name: "Used Soda Can",
    type: "Metal Alum",
    image: "🥫",
    category: "Recyclable",
    confidence: 98.7,
    color: "from-blue-500 to-indigo-600",
    icon: CheckCircle
  },
  {
    name: "Lithium-Ion Battery",
    type: "E-Waste",
    image: "🔋",
    category: "Hazardous Waste",
    confidence: 99.1,
    color: "from-red-500 to-rose-600",
    icon: alertBtn => AlertTriangle
  },
  {
    name: "Soiled Tissue / Cigarette",
    type: "Non-recyclable",
    image: "🚬",
    category: "Residual Waste",
    confidence: 97.5,
    color: "from-slate-500 to-gray-600",
    icon: Flame
  }
];

export default function DetectionWidget() {
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentItem = TEST_ITEMS[selectedItemIdx];

  const triggerSimulation = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setActiveStep(0);

    const steps = [0, 1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStep(step);
        if (step === 4) {
          setIsProcessing(false);
        }
      }, (idx + 1) * 600);
    });
  };

  return (
    <div id="detection-pipeline-container" className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-4 font-sans text-xs text-slate-300">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
          Live Neural Network Simulator
        </h4>
        <span className="text-[10px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
          99.1% Acc Model (Faster R-CNN + EfficientNetB0)
        </span>
      </div>

      {/* Select input specimen */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {TEST_ITEMS.map((item, idx) => (
          <button
            id={`btn-select-specimen-${idx}`}
            key={idx}
            onClick={() => {
              if (!isProcessing) {
                setSelectedItemIdx(idx);
                setActiveStep(-1);
              }
            }}
            disabled={isProcessing}
            className={`p-2 rounded-lg border flex flex-col items-center gap-1 cursor-pointer transition-all ${
              selectedItemIdx === idx 
                ? 'bg-blue-600/20 border-blue-500 text-white shadow' 
                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 text-slate-400'
            }`}
          >
            <span className="text-xl">{item.image}</span>
            <span className="text-[9px] text-center font-medium truncate w-full">{item.name.split(' / ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Pipeline flowchart */}
      <div className="flex flex-col gap-3 py-2 bg-slate-900/60 rounded-lg p-2.5 border border-slate-700/40">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1">
          <span>Input Specs</span>
          <span>Detection Engine</span>
          <span>Classifier Network</span>
        </div>

        <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-1">
          {/* Step 0: Input */}
          <div className={`p-2 rounded border flex flex-col items-center gap-1 flex-1 min-w-[70px] transition-all duration-300 ${
            activeStep >= 0 
              ? 'border-indigo-400 bg-indigo-950/20 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.15)]' 
              : 'border-slate-800 bg-slate-900/30 text-slate-500'
          }`}>
            <span className="font-mono text-[9px]">[IMAGE]</span>
            <span className="text-base select-none">{currentItem.image}</span>
          </div>

          <ArrowRight className={`w-3.5 h-3.5 transition-colors ${activeStep >= 1 ? 'text-indigo-400' : 'text-slate-700'}`} />

          {/* Step 1: Faster R-CNN */}
          <div className={`p-1.5 rounded border text-center flex-1 min-w-[75px] transition-all duration-300 ${
            activeStep >= 1 
              ? 'border-indigo-400 bg-indigo-950/20 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.15)]' 
              : 'border-slate-800 bg-slate-900/30 text-slate-500'
          }`}>
            <div className="font-mono text-[8px] opacity-70">Detection</div>
            <div className="font-bold text-[9px]">Faster R-CNN</div>
          </div>

          <ArrowRight className={`w-3.5 h-3.5 transition-colors ${activeStep >= 2 ? 'text-indigo-400' : 'text-slate-700'}`} />

          {/* Step 2: NMS */}
          <div className={`p-1.5 rounded border text-center flex-1 min-w-[70px] transition-all duration-300 ${
            activeStep >= 2 
              ? 'border-indigo-400 bg-indigo-950/20 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.15)]' 
              : 'border-slate-800 bg-slate-900/30 text-slate-500'
          }`}>
            <div className="font-mono text-[8px] opacity-70">Overlaps</div>
            <div className="font-bold text-[9px]">NMS Filter</div>
          </div>

          <ArrowRight className={`w-3.5 h-3.5 transition-colors ${activeStep >= 3 ? 'text-indigo-400' : 'text-slate-700'}`} />

          {/* Step 3: EfficientNetB0 */}
          <div className={`p-1.5 rounded border text-center flex-1 min-w-[80px] transition-all duration-300 ${
            activeStep >= 3 
              ? 'border-indigo-400 bg-indigo-950/20 text-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.15)]' 
              : 'border-slate-800 bg-slate-900/30 text-slate-500'
          }`}>
            <div className="font-mono text-[8px] opacity-70">Classification</div>
            <div className="font-bold text-[9px]">EfficientNetB0</div>
          </div>
        </div>
      </div>

      {/* Simulation triggers & output displays */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          id="btn-simulate-pipeline"
          onClick={triggerSimulation}
          disabled={isProcessing}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3.5 py-2.5 rounded-lg border-none hover:shadow-lg hover:shadow-indigo-500/20 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1 w-1/3"
        >
          {isProcessing ? 'Analyzing...' : 'Simulate Model'}
        </button>

        {/* Prediction Output Card */}
        <div className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-lg p-2.5 flex items-center gap-2.5 min-h-[50px]">
          {activeStep === 4 ? (
            <>
              <div className={`p-2 rounded-full bg-slate-800 text-slate-100 flex items-center justify-center`}>
                {React.createElement(currentItem.category === "Food Waste" ? Leaf : currentItem.category === "Recyclable" ? CheckCircle : currentItem.category === "Hazardous Waste" ? AlertTriangle : Flame, { className: "w-4 h-4 text-indigo-400" })}
              </div>
              <div className="flex-1 leading-normal">
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>Classification Detected</span>
                  <span className="text-emerald-400 font-semibold">{currentItem.confidence}% confidence</span>
                </div>
                <div className="text-sm font-bold text-slate-100">{currentItem.category}</div>
              </div>
            </>
          ) : (
            <div className="text-slate-500 italic text-[11px] text-center w-full flex items-center justify-center gap-1.5">
              <span>Click "Simulate Model" to execute deep learning reasoning</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
