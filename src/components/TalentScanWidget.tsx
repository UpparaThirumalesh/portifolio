import React, { useState } from 'react';
import { RefreshCw, Search, ArrowLeft, Check, Sparkles, AlertCircle, FileText } from 'lucide-react';

interface ResumePreset {
  id: string;
  name: string;
  points: string[];
  tech: string;
}

const RESUME_PRESETS: ResumePreset[] = [
  {
    id: 'ut',
    name: 'Uppara Thirumalesh (Full Stack NLP)',
    points: [
      'AI-Powered Query Resolution System:',
      'Developed an NLP-based system for automated query handling, improving response accuracy by 30%.',
      'Implemented intent classification to process 100+ user queries efficiently.',
      'Designed backend services using Python and SQL for real-time query processing and analytics.',
    ],
    tech: 'Python, SQL, NLP (NLTK, spaCy), REST API'
  },
  {
    id: 'juniorslow',
    name: 'Junior Web Dev (Basic)',
    points: [
      'Web interface design:',
      'Created simple HTML static landing website pages.',
      'Developed simple CSS static structures.',
      'Tested basic JavaScript logic functions.'
    ],
    tech: 'HTML, CSS, JavaScript'
  }
];

const JOB_DESCRIPTIONS = [
  {
    id: 'jd1',
    title: 'Application Engineer - AI Integrations',
    requirements: 'Required: Python, SQL databases, Node.js, NLP parsing methodologies using NLTK or spaCy, RESTful APIs, and responsive custom React components.',
    matchScore: 78,
    verdict: 'The candidate is a strong fit for the Application Engineering team, demonstrating high-quality credentials in NLP architectures and REST APIs.'
  },
  {
    id: 'jd2',
    title: 'Frontend React UI Developer',
    requirements: 'Required: React.js expert, responsive Tailwind CSS styling, state machine controls, high-contrast typography, and beautiful framer animations.',
    matchScore: 45,
    verdict: 'The candidate lacks deep framework UI background but displays high quantitative learning capacities. Recommended for junior React onboarding.'
  }
];

export default function TalentScanWidget() {
  const [selectedResumeId, setSelectedResumeId] = useState('ut');
  const [selectedJdId, setSelectedJdId] = useState('jd1');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stepMsg, setStepMsg] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Find selection models
  const currentResume = RESUME_PRESETS.find(r => r.id === selectedResumeId) || RESUME_PRESETS[0];
  const currentJd = JOB_DESCRIPTIONS.find(jd => jd.id === selectedJdId) || JOB_DESCRIPTIONS[0];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setStepMsg('Scanning resume details...');
    
    setTimeout(() => {
      setStepMsg('Running NLP Tokenizer & lemmatizer checks...');
    }, 800);

    setTimeout(() => {
      setStepMsg('Computing cosine embedding similarity... (spaCy vector lookup)');
    }, 1600);

    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2400);
  };

  const resetAll = () => {
    setSelectedResumeId('ut');
    setSelectedJdId('jd1');
    setIsAnalyzing(false);
    setShowResults(false);
    setStepMsg('');
  };

  return (
    <div id="talentscan-preview-card" className="w-full bg-[#131d31] rounded-xl border border-slate-700/60 p-4 shadow-xl text-slate-300">
      
      {/* Widget Header with Reset */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-sans font-bold text-slate-100 text-xs">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>TalentScan AI</span>
        </div>
        <button
          onClick={resetAll}
          className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-mono hover:rotate-180 transition-transform duration-300 cursor-pointer"
          title="Reset"
        >
          <span className="font-sans">Reset</span>
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {!showResults ? (
        <div className="space-y-3.5">
          {/* Preset Selector */}
          <div>
            <label className="block text-[#a2b2c8] uppercase font-bold tracking-widest text-[8.5px] mb-1 font-sans">
              Select Candidate Resume:
            </label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded py-1.5 px-2.5 text-slate-200 outline-none cursor-pointer text-[11px]"
            >
              {RESUME_PRESETS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Bullet Point Extraction Box representing Image 3 */}
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[10px] space-y-1.5 leading-relaxed font-sans text-slate-300 max-h-[140px] overflow-y-auto">
            <span className="text-[9px] font-mono text-emerald-400 uppercase font-semibold">Extracted Bullet Points:</span>
            <ul className="list-disc pl-3.5 space-y-1">
              {currentResume.points.map((p, idx) => (
                <li key={idx} className={idx === 0 ? 'font-bold text-slate-200 list-none -ml-3.5' : ''}>{p}</li>
              ))}
            </ul>
            <div className="pt-1.5 border-t border-slate-800 text-[9px] font-mono text-slate-400">
              <span className="text-indigo-400 font-bold">Tech Stack:</span> {currentResume.tech}
            </div>
          </div>

          {/* Job Description Panel representing Image 3 bottom */}
          <div>
            <label className="block text-[#a2b2c8] uppercase font-bold tracking-widest text-[8.5px] mb-1 font-sans">
              Target Job Description:
            </label>
            <select
              value={selectedJdId}
              onChange={(e) => setSelectedJdId(e.target.value)}
              disabled={isAnalyzing}
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded py-1.5 px-2.5 text-slate-200 outline-none cursor-pointer text-[11px] mb-2"
            >
              {JOB_DESCRIPTIONS.map(jd => (
                <option key={jd.id} value={jd.id}>{jd.title}</option>
              ))}
            </select>
            <div className="bg-[#0b101b] p-2.5 rounded border border-slate-800/80 text-[10px] leading-relaxed text-slate-400 select-none">
              <span className="font-bold text-slate-300 font-sans block mb-0.5">Job Description Summary:</span>
              {currentJd.requirements}
            </div>
          </div>

          {/* CTA Analyze Button */}
          <div className="pt-1">
            {isAnalyzing ? (
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-center font-mono text-[10px] flex flex-col items-center gap-1.5">
                <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"></div>
                <span className="text-emerald-400">{stepMsg}</span>
              </div>
            ) : (
              <button
                onClick={handleAnalyze}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs py-2 px-4 rounded-md font-bold cursor-pointer transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                Analyze Talent Compatibility
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results View representing Image 4 */
        <div className="space-y-4 animate-fade-in text-sans">
          
          {/* Back Action Trigger Button */}
          <button 
            onClick={() => setShowResults(false)}
            className="flex items-center gap-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors border-none bg-none p-1 -m-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Inputs</span>
          </button>

          <div className="text-center py-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Analysis Results</span>
            <p className="text-xs text-slate-400 mt-0.5">Real-time talent matching report</p>
          </div>

          {/* Radial Matching Circular Gauge representing Image 4 center */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-28 h-28 flex items-center justify-center">
              
              {/* Outer SVG Circle Track */}
              <svg className="absolute w-full h-full -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="8"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="45"
                  className="stroke-amber-500 fill-none transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 45}
                  strokeDashoffset={2 * Math.PI * 45 * (1 - currentJd.matchScore / 100)}
                />
              </svg>

              <div className="text-center font-sans">
                <div className="text-2xl font-black text-white tracking-tighter">{currentJd.matchScore}%</div>
                <div className="text-[9px] text-[#a2b2c8] uppercase tracking-widest font-mono">MATCH</div>
              </div>

            </div>
          </div>

          {/* Verdict Text Area representing Image 4 bottom */}
          <div className="bg-[#0b101b] border border-slate-800 p-3.5 rounded-lg text-slate-200">
            <span className="text-[9px] font-mono text-amber-500 uppercase tracking-wider font-bold block mb-1">Verdict</span>
            <p className="text-[11px] leading-relaxed italic text-slate-300">
              "{currentJd.verdict}"
            </p>
          </div>

          {/* Keywords Matched highlights list */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block font-bold">Keywords Matched:</span>
            <div className="flex flex-wrap gap-1.5">
              {currentJd.id === 'jd1' ? (
                ['Python', 'SQL', 'spaCy', 'NLP', 'REST API', 'Flask'].map((tag, i) => (
                  <span key={i} className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-0.5 px-2 rounded-full flex items-center gap-1 font-bold">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    {tag}
                  </span>
                ))
              ) : (
                ['React.js', 'Tailwind CSS'].map((tag, i) => (
                  <span key={i} className="text-[9px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 py-0.5 px-2 rounded-full flex items-center gap-1 font-bold">
                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                    {tag}
                  </span>
                ))
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
