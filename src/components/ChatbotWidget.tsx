import React, { useState } from 'react';
import { Send, Bot, RefreshCw, Calendar, Clock, MapPin, Sparkles, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp?: string;
  examDetails?: {
    subject: string;
    date: string;
    time: string;
    room: string;
  };
  timeDetails?: {
    days: string;
    hours: string;
  };
  holidayDetails?: string;
}

const POPULAR_QUERIES = [
  {
    label: "Exam Schedule",
    question: "When is my next exam?",
    answer: "Your next exam is Data Structures on 24 May 2024 at 10:00 AM in Room: CS-201."
  },
  {
    label: "College Timings",
    question: "What are the college timings?",
    answer: "College timings are Monday to Friday, 9:00 AM - 4:30 PM."
  },
  {
    label: "Holidays",
    question: "When is the college closed?",
    answer: "The college is closed on Sundays & Public Holidays."
  },
  {
    label: "Scholarships",
    question: "How can I apply for scholarship?",
    answer: "You can apply through the student portal under the scholarship section."
  }
];

export default function ChatbotWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: "Hello! I'm your AI Student Assistant. How can I help you today? 😊"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const triggerBotReply = (userQuery: string) => {
    setIsTyping(true);
    
    // Exact response mapping matching screenshot #2
    setTimeout(() => {
      let reply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'bot',
        text: ''
      };

      const queryLower = userQuery.toLowerCase();

      if (queryLower.includes('exam') || queryLower.includes('schedule') || queryLower.includes('next exam')) {
        reply.text = "Your next exam is:";
        reply.examDetails = {
          subject: "Data Structures",
          date: "24 May 2024",
          time: "10:00 AM",
          room: "CS-201"
        };
      } else if (queryLower.includes('timing') || queryLower.includes('time') || queryLower.includes('hours')) {
        reply.text = "College timings are:";
        reply.timeDetails = {
          days: "Monday to Friday",
          hours: "9:00 AM – 4:30 PM"
        };
      } else if (queryLower.includes('closed') || queryLower.includes('holiday') || queryLower.includes('sundays')) {
        reply.text = "The college is closed on:";
        reply.holidayDetails = "Sundays & Public Holidays";
      } else if (queryLower.includes('scholarship') || queryLower.includes('apply')) {
        reply.text = "You can apply through the student portal under the scholarship section.";
      } else {
        reply.text = "I parsed your query using semantic natural-intent matching rules. For current information lookups, please choose 'Exam Schedule', 'College Timings', or 'Holidays'!";
      }

      setMessages(prev => [...prev, reply]);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    triggerBotReply(text);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'bot',
        text: "Hello! I'm your AI Student Assistant. How can I help you today? 😊"
      }
    ]);
    setInputVal('');
    setIsTyping(false);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch font-sans text-xs">
      
      {/* Simulation Chat Box panel (7 cols out of 12) */}
      <div id="ai-chat-mockup-frame" className="md:col-span-8 bg-[#0f172a] rounded-xl border border-slate-700/50 shadow-xl overflow-hidden flex flex-col h-[320px]">
        
        {/* Blue Custom Status Header */}
        <div className="bg-blue-600 px-4 py-2.5 flex items-center justify-between text-white font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-blue-600">
              <Bot className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-[11px] font-bold">AI Student Assistant</div>
              <div className="flex items-center gap-1.5 text-[8.5px] opacity-90">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                <span>Online</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetChat} 
            title="Reset Chat" 
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 hover:rotate-180 transition-transform duration-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Message Feeds Scroll Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#0b0f19]">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {/* Bot Avatar Icon */}
              {m.sender === 'bot' && (
                <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-blue-400" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-lg px-3 py-2 leading-relaxed ${
                m.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none text-right' 
                  : 'bg-slate-800 border border-slate-700/50 text-slate-200 rounded-tl-none text-left shadow-md'
              }`}>
                
                <p className="text-[11px]">{m.text}</p>
                
                {/* Embedded Exam Details Block */}
                {m.examDetails && (
                  <div className="mt-2 bg-[#0d1321] border border-blue-500/20 rounded p-2 text-[10px] space-y-1 text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-blue-400">
                      <Calendar className="w-3 h-3" />
                      <span>{m.examDetails.subject}</span>
                    </div>
                    <div className="pl-4 text-[9.5px] space-y-0.5 font-mono text-slate-400">
                      <div>Date: {m.examDetails.date}</div>
                      <div>Time: {m.examDetails.time}</div>
                      <div>Room: {m.examDetails.room}</div>
                    </div>
                  </div>
                )}

                {/* Embedded College Hours details */}
                {m.timeDetails && (
                  <div className="mt-2 bg-[#0d1321] border border-teal-500/20 rounded p-2 text-[10px] space-y-1 text-slate-300">
                    <div className="flex items-center gap-1.5 font-bold text-teal-400">
                      <Clock className="w-3 h-3" />
                      <span>{m.timeDetails.days}</span>
                    </div>
                    <div className="pl-4 text-[9.5px] font-mono text-slate-400">
                      Hours: {m.timeDetails.hours}
                    </div>
                  </div>
                )}

                {/* Embedded Holidays text */}
                {m.holidayDetails && (
                  <div className="mt-2 bg-[#0d1321] border border-amber-500/20 rounded p-2 text-[10px] font-mono text-amber-400 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{m.holidayDetails}</span>
                  </div>
                )}

              </div>

              {/* User Avatar Icon */}
              {m.sender === 'user' && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}

            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 items-center text-slate-500 italic text-[10px] font-sans">
              <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                <Bot className="w-3 h-3 text-blue-400 animate-spin-slow" />
              </div>
              <span>Assistant is resolving query NLP entities...</span>
            </div>
          )}
        </div>

        {/* Input Bar Form */}
        <div className="p-2 border-t border-slate-800 bg-[#0d1322] flex items-center gap-1.5 matches-footer">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
            placeholder="Type your question..."
            className="flex-1 bg-slate-900 border border-slate-700/60 focus:border-blue-500 text-xs px-3 py-2 rounded-full outline-none text-slate-200 transition-all focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend(inputVal)}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 hover:scale-105 transition-transform shrink-0 flex items-center justify-center cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Popular Queries Sidebar (4 cols out of 12) */}
      <div className="md:col-span-4 flex flex-col justify-between space-y-2">
        <div className="bg-[#0f172a] border border-slate-800/80 rounded-xl p-3.5 flex flex-col justify-between h-full bg-gradient-to-b from-[#111930] to-[#0c1122]">
          
          <div>
            <h5 className="font-bold text-slate-200 text-[10.5px] uppercase tracking-wider font-sans mb-2 pb-1.5 border-b border-slate-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Popular Queries
            </h5>
            
            <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1 scrollbar-thin">
              {POPULAR_QUERIES.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.question)}
                  className="w-full text-left bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 p-2 rounded-lg text-[10px] hover:bg-blue-600/5 transition-all text-slate-300 leading-normal focus:ring-1 focus:ring-blue-500 cursor-pointer block"
                >
                  <span className="font-bold text-slate-200 block mb-0.5">{q.label}</span>
                  <p className="text-slate-400 truncate text-[9px]">Q: "{q.question}"</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[8px] font-mono text-slate-500 leading-relaxed uppercase">
            Powered By: NLP (NLTK, spaCy), Python | SQL | REST API, Real-time intent resolution
          </div>

        </div>
      </div>

    </div>
  );
}
