import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MessageSquare, ShieldAlert, Trash2 } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export default function ContactFormWidget() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  // Load any previously sent local messages from localStorage
  useEffect(() => {
    try {
      const messagesStr = localStorage.getItem('pslv_portfolio_messages');
      if (messagesStr) {
        setSavedMessages(JSON.parse(messagesStr));
      }
    } catch (e) {
      console.warn("Could not read from localStorage");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsLoading(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        subject: subject || 'General Query',
        message,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      try {
        localStorage.setItem('pslv_portfolio_messages', JSON.stringify(updated));
      } catch (err) {
        console.warn("Failed saving state to localStorage");
      }

      setIsLoading(false);
      setSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Auto clear success banner in 4000ms
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const updated = savedMessages.filter(m => m.id !== id);
    setSavedMessages(updated);
    try {
      localStorage.setItem('pslv_portfolio_messages', JSON.stringify(updated));
    } catch (err) {
      console.warn("localStorage update fail");
    }
  };

  return (
    <div id="contact-panel-card" className="w-full bg-[#131D31] rounded-xl border border-slate-700/60 p-5 space-y-5 text-xs text-slate-300">
      <div className="flex justify-between items-center pr-1">
        <h4 className="font-semibold text-slate-100 text-sm flex items-center gap-1.5">
          <MessageSquare className="w-4.5 h-4.5 text-indigo-400" />
          Direct Dispatch Message Vault
        </h4>
        <span className="text-[10px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          Vault Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Contact Form Submission (7/12) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold mb-1">Your Name *</label>
              <input
                id="contact-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-900 border border-slate-700/60 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-100 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 font-semibold mb-1">Your Email *</label>
              <input
                id="contact-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                className="w-full bg-slate-900 border border-slate-700/60 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-100 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-semibold mb-1">Subject</label>
            <input
              id="contact-subject-input"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Project Consultation / Job Invitation"
              className="w-full bg-slate-900 border border-slate-700/60 focus:border-indigo-500 rounded-lg p-2 text-xs text-slate-100 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 font-semibold mb-1">Message Content *</label>
            <textarea
              id="contact-message-textarea"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message details..."
              className="w-full bg-slate-900 border border-slate-700/60 focus:border-indigo-500 rounded-lg p-2.5 text-xs text-slate-100 outline-none transition-colors resize-none leading-relaxed"
            />
          </div>

          {success && (
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg p-2 text-[11px] flex items-center gap-1.5 leading-snug">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Message dispatched! Locally stored in your browser's offline vault memory cache. Click the tab on the right to view.</span>
            </div>
          )}

          <div className="flex justify-end pt-1">
            <button
              id="btn-submit-contact"
              type="submit"
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-lg cursor-pointer border-none flex items-center gap-1.5 hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              {isLoading ? (
                <>
                  <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Storing message...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Local Message</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Messaging Logs Side View "Local Storage Logs" (5/12) */}
        <div className="lg:col-span-12 xl:col-span-5 bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 flex flex-col justify-between min-h-[220px]">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Device Outbox Trace</span>
            <h5 className="font-bold text-slate-200 mt-0.5 mb-2.5 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-indigo-400" />
              Your Dispatched Session Messages ({savedMessages.length})
            </h5>

            {savedMessages.length === 0 ? (
              <div className="text-center py-6 text-slate-500 border border-dashed border-slate-800 rounded-lg">
                <ShieldAlert className="w-6 h-6 text-slate-700 mx-auto mb-1.5" />
                <p className="text-[10px]">No messages sent yet. Fill the form to store a track record!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                {savedMessages.map(msg => (
                  <div key={msg.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex justify-between items-start gap-1.5 relative group">
                    <div className="min-w-0 flex-1 leading-normal">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200 text-[11px] truncate">{msg.name}</span>
                        <span className="text-[8px] text-slate-500 font-mono">{msg.timestamp.split(',')[0]}</span>
                      </div>
                      <div className="text-[10px] text-[#818cf8] truncate mt-0.5 font-medium">{msg.subject}</div>
                      <p className="text-slate-400 text-[10px] mt-1 line-clamp-2 bg-slate-900/50 p-1.5 rounded text-left leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                    <button
                      id={`btn-delete-msg-${msg.id}`}
                      onClick={() => deleteMessage(msg.id)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[9px] text-slate-500 leading-normal block">
              Messages are saved securely inside the client-side sandbox container's standard offline <span className="font-semibold text-slate-300">localStorage</span> buffer, replicating a real production outbox queue.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
