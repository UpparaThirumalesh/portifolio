import React, { useState } from 'react';
import { CERTIFICATIONS, EDUCATION } from '../data';
import {
  Award,
  GraduationCap,
  CheckCircle,
  Star,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CertsSkillsEducationWidgetProps {
  viewMode?: 'all' | 'certifications' | 'education';
}

export default function CertsSkillsEducationWidget({
  viewMode = 'all'
}: CertsSkillsEducationWidgetProps) {

  const [selectedCertId, setSelectedCertId] = useState<number>(1);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  const selectedCert =
    CERTIFICATIONS.find(
      c => c.id === selectedCertId
    ) || CERTIFICATIONS[0];

  // Academic scores
  const cgpa = 8.02;
  const cgpaInPercentage = cgpa * 10; // 80.2%

  const intermediateScore = 98.3;

  const compositeAcademicScore = Math.round(
    (cgpaInPercentage + intermediateScore) / 2
  );

  return (
    <div
      id="certs-skills-education-widget"
      className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-5 space-y-6 text-xs text-slate-300"
    >

      {/* Certification Section */}
      {(viewMode === "all" || viewMode === "certifications") && (
        <div>

          <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400"/>
            Verified Professional Credentials
          </h4>

          <div className="space-y-2 mt-3">

            {CERTIFICATIONS.map(cert => (

              <button
                key={cert.id}
                onClick={() => setSelectedCertId(cert.id)}
                className={`w-full p-3 rounded-lg border text-left ${
                  selectedCertId === cert.id
                    ? "bg-indigo-600/15 border-indigo-500"
                    : "bg-slate-800 border-slate-700"
                }`}
              >

                <div className="font-bold">
                  {cert.title}
                </div>

                <div className="text-xs text-slate-400">
                  {cert.issuer} • {cert.date}
                </div>

              </button>

            ))}

          </div>

        </div>
      )}

      {/* Education Section */}

      {(viewMode === "all" || viewMode === "education") && (

        <div className="border-t border-slate-700 pt-5">

          <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-400"/>
            Education Timeline
          </h4>

          <div className="space-y-3 mt-3">

            {EDUCATION.map((edu, idx) => (

              <div
                key={idx}
                className="bg-slate-900 p-3 rounded-lg border border-slate-700"
              >

                <h5 className="font-bold text-white">
                  {edu.institution}
                </h5>

                <p className="text-indigo-400">
                  {edu.degree}
                </p>

                <p className="text-slate-400">
                  {edu.specialization}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  {edu.grade}
                </p>

              </div>

            ))}

          </div>

          {/* Academic Score */}

          <div className="mt-5 bg-slate-900 p-4 rounded-lg">

            <div className="flex justify-between">

              <span>CGPA</span>

              <span className="font-bold text-white">
                {cgpa}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Equivalent %</span>

              <span className="font-bold text-white">
                {cgpaInPercentage}%
              </span>

            </div>

            <div className="flex justify-between">

              <span>Intermediate Score</span>

              <span className="font-bold text-white">
                {intermediateScore}%
              </span>

            </div>

            <div className="flex justify-between border-t border-slate-700 mt-3 pt-3">

              <span className="text-indigo-400">
                Composite Score
              </span>

              <span className="font-bold text-indigo-300">
                {compositeAcademicScore}%
              </span>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}