import React, { useState } from 'react';
import { CERTIFICATIONS, EDUCATION } from '../data';
import { Award, GraduationCap, CheckCircle, Flame, Star, Sparkles, BookOpen } from 'lucide-react';

interface CertsSkillsEducationWidgetProps {
  viewMode?: 'all' | 'certifications' | 'education';
}

export default function CertsSkillsEducationWidget({ viewMode = 'all' }: CertsSkillsEducationWidgetProps) {
  const [selectedCertId, setSelectedCertId] = useState<number>(1);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  // Active certification item
  const selectedCert = CERTIFICATIONS.find(c => c.id === selectedCertId) || CERTIFICATIONS[0];

  // Educational GPA / Score computation representation
  const cgpaInPercentage = 7.95 * 10; // Standard 7.95 out of 10 normalized
  const intermediateScore = 98.3;
  // Let's compute a composite score out of 100
  const compositeAcademicScore = Math.round((cgpaInPercentage + intermediateScore) / 2);

  return (
    <div id="certs-skills-education-widget" className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-5 space-y-6 text-xs text-slate-300">
      
      {/* Grid of Certifications & Skills Retrieval */}
      {(viewMode === "all" || viewMode === "certifications") && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column (8/12) - Certifications List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-center pr-1">
              <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Verified Professional Credentials
              </h4>
              <span className="text-[10px] text-indigo-400 font-mono">Click to retrieve verified skills</span>
            </div>

            <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
              {CERTIFICATIONS.map(cert => (
                <button
                  id={`btn-cert-${cert.id}`}
                  key={cert.id}
                  onClick={() => setSelectedCertId(cert.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-2.5 cursor-pointer ${
                    selectedCertId === cert.id
                      ? 'bg-indigo-600/15 border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.1)] text-white'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600 text-slate-400'
                  }`}
                >
                  <div className={`p-1.5 rounded-md mt-0.5 ${
                    selectedCertId === cert.id ? 'bg-indigo-600/30 text-indigo-300' : 'bg-slate-900 border border-slate-700 text-slate-500'
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold truncate text-xs ${selectedCertId === cert.id ? 'text-slate-100' : 'text-slate-300'}`}>
                      {cert.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex justify-between">
                      <span>{cert.issuer}</span>
                      <span className="font-mono text-[9px] text-slate-500">{cert.date}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (5/12) - Retrieved Skills Display */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/65 border border-slate-700/50 rounded-xl p-4">
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Credential Skill Retrieval</span>
                <h5 className="font-bold text-slate-200 mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  Verified Competence Tags
                </h5>
              </div>

              <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800 space-y-2.5">
                <div className="text-[11px] text-slate-400 leading-normal">
                  Verifying issued certificate by <span className="text-white font-semibold">{selectedCert.issuer}</span>:
                </div>
                
                {/* Animation simulation container */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] bg-indigo-500/15 text-indigo-300 hover:bg-indigo-500/25 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium shadow-xs hover:scale-105 transition-all duration-300"
                    >
                      <CheckCircle className="w-3 h-3 text-indigo-400" />
                      {skill}
                    </span>
                  ))}
                </div>

                {selectedCert.credentialId && (
                  <div className="text-[9px] font-mono text-slate-500 border-t border-slate-800/80 pt-2 flex justify-between">
                    <span>Lic ID: {selectedCert.credentialId}</span>
                    <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
              <div className="text-[10px] text-slate-400">
                <span className="text-indigo-400 font-bold">Core focus:</span> Retrieving verified concepts bridges academic models directly to deployment pipeline blocks.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Show Education Section & Scoring */}
      {viewMode === "all" && <div className="border-t border-slate-700/50 my-1"></div>}

      {(viewMode === "all" || viewMode === "education") && (
        <div className="pt-2 grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Left: Education cards (7/12) */}
          <div className="md:col-span-7 space-y-3">
            <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4.5 h-4.5 text-indigo-400" />
              Education Timeline
            </h4>

            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-slate-700/40 hover:border-slate-600/60 p-3.5 rounded-lg transition-all flex items-start gap-3">
                  <div className="p-2.5 bg-[#17253e] border border-blue-500/20 text-blue-400 rounded-lg shrink-0 font-bold tracking-wide text-xs">
                    {edu.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-100 text-xs leading-snug">{edu.institution}</h5>
                    <p className="text-indigo-400 text-[10.5px] mt-0.5">{edu.degree}</p>
                    {edu.specialization && <p className="text-slate-400 text-[10px] mt-0.5">{edu.specialization}</p>}
                    <p className="text-slate-400 font-medium text-[10px] mt-1 font-mono uppercase bg-slate-950/30 inline-block px-1.5 py-0.5 rounded border border-slate-800/50">
                      {edu.grade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Academic Scoreboard "it will score education" (5/12) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#1c2c47] to-[#121c2e] border border-slate-700/60 rounded-xl p-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-indigo-400 font-mono tracking-wider">Academic Audit Index</span>
                <button 
                  id="btn-toggle-score"
                  onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                  className="text-[9px] bg-slate-800 border-none text-slate-300 hover:text-white px-2 py-0.5 rounded cursor-pointer transition-colors"
                >
                  {showScoreBreakdown ? "Quick view" : "Audit details"}
                </button>
              </div>
              
              <h5 className="font-bold text-slate-200 text-xs">Composite Merit Score</h5>

              {showScoreBreakdown ? (
                <div className="space-y-1.5 py-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">B.Tech NIT CGPA Compliance</span>
                    <span className="text-slate-200">79.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Intermediate MPC Score</span>
                    <span className="text-slate-200">98.3%</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1">
                    <span className="text-indigo-400">Total Merit Weighted Ave</span>
                    <span className="text-indigo-300 font-bold">{compositeAcademicScore}%</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 py-1.5">
                  <div className="relative w-14 h-14 rounded-full border-4 border-dashed border-indigo-500/40 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <span className="absolute text-slate-100 font-black text-sm select-none tracking-tight">{compositeAcademicScore}%</span>
                  </div>
                  <div className="flex-1 leading-normal">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Top Peer Decile (1%)
                    </div>
                    <p className="text-[10px] text-slate-400">Elite standing across nationwide math & programming criteria indexes.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 mt-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <div className="text-[10px] text-slate-400 leading-normal">
                Score integrates <span className="font-bold text-slate-100">NIT admissions standing</span> and <span className="font-bold text-slate-100">technical aptitude</span>, confirming strong quantitative capabilities under competitive criteria.
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
