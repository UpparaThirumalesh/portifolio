import React, { useState } from 'react';
import { Bold, Italic, Underline, Link, List, Mail, CheckCircle, RotateCw } from 'lucide-react';

export default function EditorWidget() {
  const [subject, setSubject] = useState('Admin Panel Update: Newsletter Manager');
  const [body, setBody] = useState(`New Feature: Newsletter & Email Manager

Hello all,

Admin Newsletter & Email Manager module is now fully implemented.
- Compose rich-text newsletters instantly.
- JWT-verified secure admin publishing routes.
- Fully integrated TinyMCE components.

Best regards,
PSLV Admin Team`);

  const [isSending, setIsSending] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const startSending = () => {
    if (isSending) return;
    setIsSending(true);
    setSentCount(0);
    setHasCompleted(false);

    const interval = setInterval(() => {
      setSentCount(prev => {
        if (prev >= 540) {
          clearInterval(interval);
          setHasCompleted(true);
          setIsSending(false);
          return 542;
        }
        return prev + 45;
      });
    }, 150);
  };

  return (
    <div id="newsletter-editor-card" className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-4 font-sans text-xs text-slate-300">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
          <Mail className="w-4 h-4 text-indigo-400" />
          JWT Newsletter Publisher
        </h4>
        <span className="text-[10px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded">
          Status: Secure Connection (JWT)
        </span>
      </div>

      <div className="bg-white rounded-lg p-2.5 text-slate-800 space-y-2 border border-slate-300">
        {/* Subject */}
        <div>
          <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Subject</label>
          <input
            id="editor-subject-input"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full text-xs font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 focus:bg-white text-slate-800 px-2.5 py-1 rounded outline-indigo-500"
          />
        </div>

        {/* Toolbar mockup */}
        <div className="flex gap-1 border-y border-slate-200 py-1 text-slate-500">
          <select id="editor-font-size-select" className="bg-slate-50 border border-slate-200 text-[10px] rounded px-1 text-slate-700">
            <option>Normal</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
          </select>
          <div className="w-px bg-slate-200 mx-1"></div>
          <button id="editor-format-bold" className="hover:bg-slate-200 p-0.5 rounded transition-colors cursor-pointer"><Bold className="w-3.5 h-3.5" /></button>
          <button id="editor-format-italic" className="hover:bg-slate-200 p-0.5 rounded transition-colors cursor-pointer"><Italic className="w-3.5 h-3.5" /></button>
          <button id="editor-format-underline" className="hover:bg-slate-200 p-0.5 rounded transition-colors cursor-pointer"><Underline className="w-3.5 h-3.5" /></button>
          <div className="w-px bg-slate-200 mx-1"></div>
          <button id="editor-insert-link" className="hover:bg-slate-200 p-0.5 rounded transition-colors cursor-pointer"><Link className="w-3.5 h-3.5" /></button>
          <button id="editor-bullet-list" className="hover:bg-slate-200 p-0.5 rounded transition-colors cursor-pointer"><List className="w-3.5 h-3.5" /></button>
        </div>

        {/* Rich-text simulated editor text area */}
        <div>
          <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Body HTML</label>
          <textarea
            id="editor-body-textarea"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full text-[11px] font-sans bg-slate-50 border border-slate-200 hover:bg-slate-100 focus:bg-white text-slate-800 p-2 rounded outline-indigo-500 font-medium leading-relaxed resize-none"
          />
        </div>
      </div>

      {/* Button & stats */}
      <div className="mt-3 flex items-center justify-between gap-2.5">
        <button
          id="btn-publish-newsletter"
          onClick={startSending}
          disabled={isSending}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3.5 py-2 rounded-lg cursor-pointer disabled:opacity-50 flex items-center gap-1 hover:shadow-lg hover:shadow-indigo-500/20 transition-all border-none"
        >
          {isSending ? (
            <>
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>Delivering...</span>
            </>
          ) : (
            <>
              <Mail className="w-3.5 h-3.5" />
              <span>Dispatch Newsletter</span>
            </>
          )}
        </button>

        {isSending && (
          <div className="flex-1 text-right text-[10px] text-indigo-400 font-medium animate-pulse">
            Transmitting to {sentCount} / 542 subscribers...
          </div>
        )}

        {hasCompleted && (
          <div className="flex-1 flex justify-end items-center gap-1 text-emerald-400 text-[10px] font-bold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Success: All 542 delivered!</span>
          </div>
        )}
      </div>
    </div>
  );
}
