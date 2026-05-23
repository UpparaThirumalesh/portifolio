import React, { useState, useEffect, useRef } from 'react';
import { 
  Laptop, 
  Award, 
  GraduationCap, 
  Code, 
  Github, 
  Linkedin, 
  Mail, 
  Compass, 
  BookOpen, 
  FileText, 
  Menu, 
  X, 
  ExternalLink, 
  CheckCircle, 
  Terminal, 
  BrainCircuit, 
  ChevronRight,
  ArrowDown
} from 'lucide-react';
import { PROJECTS, EXPERTISE_CATEGORIES, ACHIEVEMENTS } from './data';
import ChatbotWidget from './components/ChatbotWidget';
import TalentScanWidget from './components/TalentScanWidget';
import ExpenseSharingWidget from './components/ExpenseSharingWidget';
import KooliAppWidget from './components/KooliAppWidget';
import CertsSkillsEducationWidget from './components/CertsSkillsEducationWidget';
import ContactFormWidget from './components/ContactFormWidget';

const TITLES = [
  "Full Stack Developer",
  "Software Engineer",
  "Electrical & Electronics Engineer",
  "DSA & Competitive Coder"
];

export default function App() {
  const [activeTitleIdx, setActiveTitleIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    return localStorage.getItem('portfolio_profile_photo') || null;
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        localStorage.setItem('portfolio_profile_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const clearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePhoto(null);
    localStorage.removeItem('portfolio_profile_photo');
  };

  // Tab-based navigation state
  const [activeTab, setActiveTab] = useState('home');

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth typing effect for header titles
  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = TITLES[activeTitleIdx];
      
      if (!isDeleting) {
        // Typing letters
        setTypedText(currentFullText.substring(0, typedText.length + 1));
        setTypingSpeed(100);

        if (typedText === currentFullText) {
          // Pause when done typing, then start deleting
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Deleting letters
        setTypedText(currentFullText.substring(0, typedText.length - 1));
        setTypingSpeed(50);

        if (typedText === '') {
          setIsDeleting(false);
          // Next index
          setActiveTitleIdx((prev) => (prev + 1) % TITLES.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, activeTitleIdx, typingSpeed]);

  const changeTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#070D19] text-slate-100 selection:bg-indigo-500/30 selection:text-white transition-all overflow-x-hidden">
      
      {/* Glow ambient backgrounds in background coordinates */}
      <div className="absolute top-[10%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-indigo-900/10 blur-[130px] pointer-events-none select-none"></div>
      <div className="absolute top-[35%] right-[-10%] w-[38rem] h-[38rem] rounded-full bg-blue-900/15 blur-[150px] pointer-events-none select-none"></div>
      <div className="absolute bottom-[20%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-purple-900/10 blur-[140px] pointer-events-none select-none"></div>

      {/* Styled top navigation bar header */}
      <header className="fixed top-0 left-0 w-full bg-[#070D19]/80 backdrop-blur-md z-50 border-b border-slate-800/65">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <button 
            id="brand-logo" 
            onClick={() => changeTab('home')}
            className="text-xl font-black text-indigo-400 tracking-wider hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            UT
          </button>

          {/* Desktop Navbar Links */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { id: 'projects', label: 'Projects' },
              { id: 'internship', label: 'Internship' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'skills', label: 'Technical Skills' },
              { id: 'education', label: 'Education' },
              { id: 'about', label: 'About Me' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => changeTab(link.id)}
                className={`text-xs font-medium uppercase tracking-wider transition-all duration-350 cursor-pointer ${
                  activeTab === link.id 
                    ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu trigger */}
          <button
            id="btn-toggle-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu collapsible */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 w-full bg-[#080E1B] border-b border-slate-800 flex flex-col p-4 space-y-3 z-40">
            {[
              { id: 'projects', label: 'Projects' },
              { id: 'internship', label: 'Internship' },
              { id: 'certifications', label: 'Certifications' },
              { id: 'skills', label: 'Technical Skills' },
              { id: 'education', label: 'Education' },
              { id: 'about', label: 'About Me' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <button
                id={`mobile-nav-link-${link.id}`}
                key={link.id}
                onClick={() => changeTab(link.id)}
                className={`w-full text-left font-medium text-sm py-2 px-3 rounded ${
                  activeTab === link.id 
                    ? 'bg-indigo-600/10 text-indigo-400' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Tab Sections Container with custom entry transitions */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div id="home-view" className="animate-fade-in">
            {/* Hero Home Section */}
            <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-14 px-6 max-w-7xl mx-auto relative">
              <div className="flex flex-col items-center justify-center text-center space-y-7 z-10">
                
                {/* Avatar Profile frame illustration with upload capabilities */}
                <div className="flex flex-col items-center gap-3">
                  <div 
                    onClick={triggerPhotoUpload}
                    className="relative group cursor-pointer"
                    title="Click to upload your profile photo!"
                  >
                    <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl group-hover:scale-105 transition-transform duration-500"></div>
                    <div className="relative w-28 h-28 rounded-full border-4 border-indigo-500/30 shadow-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                      {profilePhoto ? (
                        <img 
                          src={profilePhoto} 
                          alt="Uppara Thirumalesh" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        /* Elegant vector avatar representation of UT */
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-indigo-600 flex items-center justify-center text-slate-100 text-3xl font-black select-none tracking-tight">
                          UT
                        </div>
                      )}
                      
                      {/* Upload overlay hover trigger */}
                      <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                        <Compass className="w-5 h-5 text-indigo-400 mb-1 animate-spin-slow" />
                        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-200 text-center leading-tight">Change<br />Photo</span>
                      </div>
                      
                      <div className="absolute inset-0 bg-slate-950/20"></div>
                      {/* Spinning technical overlay ring */}
                      <div className="absolute inset-[-4px] rounded-full border border-dashed border-indigo-400/30 animate-[spin_12s_linear_infinite]"></div>
                    </div>

                    {/* Invisible file upload dispatcher input */}
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />

                    {/* Quick clear photo badge */}
                    {profilePhoto && (
                      <button 
                        onClick={clearPhoto}
                        className="absolute -top-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-full border border-slate-950 shadow-md hover:scale-110 transition-transform cursor-pointer"
                        title="Remove custom photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  
                  <span className="text-[10px] font-mono text-indigo-400 font-medium bg-indigo-500/10 border border-indigo-400/20 px-2 py-0.5 rounded-full">
                    ▲ Click to upload photo
                  </span>
                </div>

                <div className="space-y-4 max-w-4xl">
                  <h1 id="fullname-title" className="text-4xl md:text-6xl font-black text-slate-100 tracking-tight leading-tight">
                    Uppara Thirumalesh
                  </h1>
                  
                  {/* Dynamic typing title scroller */}
                  <div className="h-7 flex items-center justify-center">
                    <span className="text-lg md:text-xl font-mono text-indigo-400 font-bold bg-slate-900/60 border border-slate-800 px-4 py-1.5 rounded-full shadow border-solid">
                      {typedText || <span className="text-slate-600">Loading profile...</span>}
                      <span className="inline-block w-[3px] h-[15px] bg-indigo-400 ml-1.5 animate-pulse"></span>
                    </span>
                  </div>

                  <p id="hero-subtitle" className="text-sm md:text-base text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed pt-2">
                    Electrical &amp; Electronics Engineering student at NIT Andhra Pradesh with passion for Full Stack Software engineering.
                  </p>
                </div>

                {/* Call to action explore button */}
                <div className="pt-2">
                  <button
                    id="btn-explore-work"
                    onClick={() => changeTab('projects')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 border-none"
                  >
                    <Compass className="w-4 h-4 animate-spin-slow" />
                    Explore My Work
                  </button>
                </div>

                {/* Grid Metric cards matching screenshot */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-10">
                  {[
                    { id: 'projects-metric', num: "4+", label: "Developed Projects", desc: "Collaborative & AI Modules", icon: Laptop, tabId: 'projects' },
                    { id: 'certifications-metric', num: "NPTEL", label: "IoT & Data Science", desc: "IIT Madras/Kgp Credentials", icon: Award, tabId: 'certifications' },
                    { id: 'edu-metric', num: "7.95 CGPA", label: "NIT Andhra Pradesh", desc: "Electrical & Electronics Eng", icon: GraduationCap, tabId: 'education' },
                    { id: 'problems-metric', num: "350+", label: "Problems Solved", desc: "LeetCode & HackerRank", icon: Code, tabId: 'about' }
                  ].map((metric, idx) => (
                    <button 
                      id={`metric-card-${idx}`}
                      key={idx} 
                      onClick={() => changeTab(metric.tabId)}
                      className="bg-[#0f192b]/80 border border-slate-800/80 p-4 rounded-xl flex flex-col items-center text-center justify-between hover:border-indigo-500/50 hover:bg-slate-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 cursor-pointer text-left w-full"
                    >
                      <div className="p-2.5 bg-indigo-950/50 text-indigo-400 rounded-lg border border-indigo-500/10 mb-2 mt-1">
                        <metric.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-lg font-black text-slate-100">{metric.num}</div>
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-1">{metric.label}</div>
                        <div className="text-[9px] text-slate-500 mt-0.5 leading-snug">{metric.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="animate-pulse pt-6">
                  <button 
                    id="btn-scroll-indicator" 
                    onClick={() => changeTab('projects')}
                    className="p-1 rounded-full text-slate-500 hover:text-indigo-400 hover:bg-slate-900 border-none cursor-pointer flex flex-col items-center gap-1.5"
                  >
                    <span className="text-[10px] tracking-widest uppercase text-slate-600 font-mono">Next page</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'projects' && (
          <div id="projects-view" className="animate-fade-in">
            {/* Projects and Contributions Section */}
            <section id="projects" className="py-20 border-t border-slate-900 bg-[#060B16] px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Header section representation */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <h2 id="projects-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Projects and <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Open Source Contributions</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                    Here, you can see my projects and open-source contributions that highlight my skills in Deep Learning, NLP, Full Stack Development, and UI/UX design. I focus on solving practical problems and real-world applications.
                  </p>
                </div>                {/* Interactive BENTO-Grid matching screenshots */}
                <div className="space-y-12">
                  
                  {/* Category Title 1: Personal Projects */}
                  <div className="border-l-4 border-indigo-400 pl-4 py-1">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">Core Applications &amp; Personal Projects</h3>
                    <p className="text-[11px] text-slate-400 font-normal">Stateful full-stack proof-of-concept architectures built and optimized recursively</p>
                  </div>

                  {/* Project 1: TalentScan AI */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Natural Language processing</span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">spaCy vectors</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-100">{PROJECTS[0].title}</h3>
                      
                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 font-mono">
                        {PROJECTS[0].tags.map((t, i) => (
                          <span key={i} className="after:content-['|'] last:after:content-none after:mx-1 opacity-90">{t}</span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {PROJECTS[0].description}
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <a 
                          id="project1-github-link" 
                          href={PROJECTS[0].githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          <Github className="w-4 h-4" />
                          <span>GitHub Repo</span>
                        </a>
                      </div>
                    </div>

                    {/* Side view interactive TalentScan AI Widget */}
                    <div className="lg:col-span-5">
                      <TalentScanWidget />
                    </div>
                  </div>

                  {/* Project 2: Collaborative Expense Sharing */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Order reverse layout for grid pattern */}
                    <div className="lg:col-span-5 order-last lg:order-first">
                      <ExpenseSharingWidget />
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Debt Settlement Algorithm</span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Graph Optimization</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-100">{PROJECTS[1].title}</h3>

                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 font-mono">
                        {PROJECTS[1].tags.map((t, i) => (
                          <span key={i} className="after:content-['|'] last:after:content-none after:mx-1 opacity-90">{t}</span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {PROJECTS[1].description}
                      </p>

                      <div className="flex items-center gap-4 pt-2">
                        <a
                          id="project2-github-link"
                          href={PROJECTS[1].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub Repo (expense-sharing-app)</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Project 3: AI Student Query Chatbot */}
                  <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-12 xl:col-span-5 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[9px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Natural Query classification</span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Academic Router</span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-slate-100">{PROJECTS[2].title}</h3>

                      <div className="flex flex-wrap gap-1 text-[10px] text-slate-400 font-mono">
                        {PROJECTS[2].tags.map((t, i) => (
                          <span key={i} className="after:content-['|'] last:after:content-none after:mx-1 opacity-90">{t}</span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {PROJECTS[2].description}
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <a
                          id="project3-github-link"
                          href={PROJECTS[2].githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub Repo</span>
                        </a>
                      </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-7 pt-4 xl:pt-0">
                      <ChatbotWidget />
                    </div>
                  </div>

                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'internship' && (
          <div id="internship-view" className="animate-fade-in">
            {/* Internship Section */}
            <section id="internship" className="py-20 border-t border-slate-900 bg-[#060B16] px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <h2 id="internship-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Professional <span className="text-amber-500">Internship Experience</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">
                    Corporate contributions, API frameworks, database designs, and mobile simulators built in production team structures.
                  </p>
                </div>

                <div className="bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-800/85">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Ram (India) Smart Digital AI Solutions Pvt. Ltd.</span>
                        <span className="text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono uppercase font-bold">Full Stack Developer Intern</span>
                      </div>
                      <span className="text-[10px] text-amber-500 font-semibold font-mono bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded">Duration: May 2025 - Jul 2025</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-100">{PROJECTS[3].title}</h3>

                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 font-mono">
                      {PROJECTS[3].tags.map((t, i) => (
                        <span key={i} className="after:content-['|'] last:after:content-none after:mx-1 opacity-90">{t}</span>
                      ))}
                    </div>

                    <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-normal">
                      <p>
                        • Developed location-based service discovery by implementing frontend UI and backend data handling using Firebase.
                      </p>
                      <p>
                        • Designed and implemented filtering and distance-based logic to efficiently retrieve and display nearby services.
                      </p>
                      <p>
                        • Integrated Firebase Realtime Database for scalable data storage and real-time updates across the application.
                      </p>
                      <p>
                        • Built interactive UI components and integrated Google Maps API for location visualization and user interaction.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <a
                        id="internship-github-link"
                        href={PROJECTS[3].githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/5 hover:bg-indigo-500/10 px-3.5 py-2 rounded-lg border border-indigo-500/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Kooli Android App Repository</span>
                      </a>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <KooliAppWidget />
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'certifications' && (
          <div id="certifications-view" className="animate-fade-in">
            {/* Educational & Professional Certifications highlight matching request */}
            <section id="certifications" className="py-20 bg-[#070D19] border-t border-slate-900 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <h2 id="certs-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Certifications &amp; Credentials
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    Verify credentials and retrieve skills verified by each certification dynamically.
                  </p>
                </div>

                <CertsSkillsEducationWidget viewMode="certifications" />

              </div>
            </section>
          </div>
        )}

        {activeTab === 'skills' && (
          <div id="skills-view" className="animate-fade-in">
            {/* Technical Expertise and Skill categories */}
            <section id="skills" className="py-20 bg-[#060B16] border-t border-slate-900 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <h2 id="skills-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Technical Expertise
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    Deep Learning, Artificial Intelligence, and Software engineering expertise fields compiled dynamically.
                  </p>
                </div>

                {/* Grid layout for categories matching screenshot visual layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {EXPERTISE_CATEGORIES.map((cat, idx) => (
                    <div 
                      id={`skill-category-card-${idx}`}
                      key={idx} 
                      className="bg-[#0f172a] border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="p-1 px-2.5 bg-indigo-500/15 border border-indigo-500/20 rounded font-mono text-[9px] text-[#818cf8] uppercase">
                            Category 0{idx + 1}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-100 text-xs tracking-tight flex items-center gap-1.5">
                          {cat.title}
                        </h4>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {cat.skills.map((s, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] font-sans font-medium bg-[#1c2c47]/65 border border-slate-700/60 hover:bg-[#1c2c47] px-2 py-0.5 rounded text-indigo-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'education' && (
          <div id="education-view" className="animate-fade-in">
            {/* Detailed Academic Qualifications Timeline */}
            <section id="education" className="py-20 bg-[#070D19] border-t border-slate-900 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <h2 id="education-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Education &amp; <span className="text-indigo-400">Aptitude Scoreboard</span>
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    Overview of academic background and merit standing indexes confirming quantitative capabilities.
                  </p>
                </div>

                <CertsSkillsEducationWidget viewMode="education" />

              </div>
            </section>
          </div>
        )}

        {activeTab === 'about' && (
          <div id="about-view" className="animate-fade-in">
            {/* About me, platforms and competitive programming stats */}
            <section id="about" className="py-20 bg-[#070D19] border-t border-slate-900 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <h2 id="about-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    About Me
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    Find my coding background, competitive milestones on coding platforms, and professional timeline.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
                  
                  {/* Description Narrative (6/12) */}
                  <div className="lg:col-span-6 bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest">Compiler Bio Console</span>
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed font-normal space-y-3.5">
                        <p>
                          Hi, I’m <span className="text-white font-bold">Uppara Thirumalesh</span>, a student in Electrical and Electronics Engineering at NIT Andhra Pradesh, with a deep interest in software engineering and web application development.
                        </p>
                        <p>
                          My skills comprise Full Stack Software Engineering, creating backend business logic systems (Python, Flask, Node.js), and database design (PostgreSQL, NoSQL, SQLite, MySQL). I'm experienced at building scalable, responsive web solutions.
                        </p>
                        <p>
                          In my free time, I love diving deep into data structures, competitive programming algorithms, and reading technology or self-improvement books. 🧠
                        </p>
                      </div>
                    </div>

                    {/* Coding Platforms I Code On from screenshot */}
                    <div className="mt-8 pt-5 border-t border-slate-850/60">
                      <h5 className="font-bold text-slate-300 text-[10px] uppercase font-mono tracking-widest mb-3">Platforms I Code On</h5>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { name: 'LeetCode', desc: '500+ Solved', color: 'bg-amber-500/10 border-amber-500/25 text-amber-400' },
                          { name: 'HackerRank', desc: '3★ Coder', color: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' },
                          { name: 'GeeksforGeeks', desc: 'Active solver', color: 'bg-indigo-500/10 border-indigo-500/25 text-indigo-300' }
                        ].map((plat, idx) => (
                          <div key={idx} className={`border p-2 px-3 rounded-lg text-center ${plat.color} hover:scale-105 transition-transform duration-300`}>
                            <div className="text-[11px] font-bold">{plat.name}</div>
                            <div className="text-[9px] text-slate-400 mt-0.5">{plat.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Achievements highlights Grid (6/12) */}
                  <div className="lg:col-span-6 bg-[#0f172a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-indigo-400" />
                      <h4 className="font-bold text-slate-200 text-xs tracking-tight uppercase font-mono tracking-wider">Recent Achievements Timeline</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1">
                      {ACHIEVEMENTS.map((ach, idx) => (
                        <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col justify-between hover:border-slate-700 transition-all">
                          <div>
                            <div className="font-bold text-slate-200 text-xs leading-snug">{ach.title}</div>
                            <p className="text-slate-400 text-[10px] mt-1 pr-1.5 leading-relaxed">{ach.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </section>
          </div>
        )}

        {activeTab === 'contact' && (
          <div id="contact-view" className="animate-fade-in">
            {/* Contact Section */}
            <section id="contact" className="py-20 bg-[#060B16] border-t border-slate-900 px-6">
              <div className="max-w-7xl mx-auto space-y-12">
                
                <div className="text-center space-y-2 max-w-2xl mx-auto">
                  <h2 id="contact-headline" className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Let's Connect
                  </h2>
                  <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                    Reach out directly for opportunities or portfolio inquiries.
                  </p>
                </div>

                <ContactFormWidget />

                {/* Social icons list precisely in center representing screenshot #3 */}
                <div className="flex items-center justify-center gap-6 pt-5">
                  {[
                    { id: 'git-social', icon: Github, href: "https://github.com/UpparaThirumalesh" },
                    { id: 'lnk-social', icon: Linkedin, href: "https://linkedin.com/in/thirumalesh-uppara-533767292" },
                    { id: 'mail-social', icon: Mail, href: "mailto:thirumalesh02468@gmail.com" },
                    { id: 'code-social', icon: Code, href: "https://leetcode.com/u/thiru86420" }
                  ].map((soc, idx) => (
                    <a
                      id={soc.id}
                      key={idx}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-905 border border-slate-800 hover:border-indigo-500 hover:text-indigo-400 text-slate-400 flex items-center justify-center cursor-pointer hover:-translate-y-1 transition-all shadow hover:shadow-indigo-500/10"
                    >
                      <soc.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

              </div>
            </section>
          </div>
        )}
      </main>

      {/* Styled Professional footer */}
      <footer className="border-t border-slate-900 bg-[#040810] py-8 px-6 text-center text-slate-500 text-[11px] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} UT. Crafted with passion by Uppara Thirumalesh. </span>
          <span className="text-slate-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
            Uppara Thirumalesh Portfolio Professional
          </span>
        </div>
      </footer>

    </div>
  );
}
