import React, { useState } from 'react';
import { Smartphone, RefreshCw, UserCheck, Database, Server, PlusCircle, Terminal, ShoppingBag } from 'lucide-react';

interface ServiceRequest {
  id: string;
  user: string;
  serviceType: string;
  source: 'Android App' | 'iOS Client' | 'Web Portal';
  status: 'Pending' | 'Completed' | 'Processed';
  timestamp: string;
}

export default function KooliAppWidget() {
  const [usersCount, setUsersCount] = useState(1480);
  const [servicesCount, setServicesCount] = useState(24);
  const [selectedDb, setSelectedDb] = useState<'MySQL' | 'NoSQL'>('MySQL');
  const [requests, setRequests] = useState<ServiceRequest[]>([
    { id: 'REQ-101', user: 'Amit Kumar', serviceType: 'Electrical repair', source: 'Android App', status: 'Completed', timestamp: '10:14 AM' },
    { id: 'REQ-102', user: 'Siri Devi', serviceType: 'Home plumbing', source: 'Android App', status: 'Processed', timestamp: '11:02 AM' },
    { id: 'REQ-103', user: 'Vamsi Prasad', serviceType: 'AC Maintenance', source: 'Android App', status: 'Pending', timestamp: '11:45 AM' }
  ]);

  const [inputUser, setInputUser] = useState('');
  const [inputService, setInputService] = useState('Home Services');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Kooli REST API initialized on 0.0.0.0:3000',
    '[DB] Connected securely to primary MySQL core & MongoDB layers',
    '[AUTH] Loaded Firebase auth validation credentials (JWT tokens validated)'
  ]);

  const handleCreateRequest = () => {
    if (!inputUser.trim()) return;

    const newReq: ServiceRequest = {
      id: `REQ-${Math.floor(Math.random() * 900) + 100}`,
      user: inputUser.trim(),
      serviceType: inputService,
      source: 'Android App',
      status: 'Pending',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRequests(prev => [newReq, ...prev]);
    setUsersCount(prev => prev + 1);

    // Append logs
    setTerminalLogs(prev => [
      `[POST] /api/v1/services - Generated high-fidelity ticket ${newReq.id} for "${newReq.user}"`,
      `[MYSQL] Inserted metadata token into client transactions matrix`,
      `[NOSQL] Document-oriented JSON cached for rapid mobile rendering`,
      ...prev
    ]);

    setInputUser('');
  };

  const completeRequest = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Completed' } : r));
    setTerminalLogs(prev => [
      `[PUT] /api/v1/services/status - Updated ticket ${id} status to COMPLETED`,
      ...prev
    ]);
  };

  const resetAll = () => {
    setUsersCount(1480);
    setServicesCount(24);
    setRequests([
      { id: 'REQ-101', user: 'Amit Kumar', serviceType: 'Electrical repair', source: 'Android App', status: 'Completed', timestamp: '10:14 AM' },
      { id: 'REQ-102', user: 'Siri Devi', serviceType: 'Home plumbing', source: 'Android App', status: 'Processed', timestamp: '11:02 AM' },
      { id: 'REQ-103', user: 'Vamsi Prasad', serviceType: 'AC Maintenance', source: 'Android App', status: 'Pending', timestamp: '11:45 AM' }
    ]);
    setTerminalLogs([
      '[INIT] Kooli REST API initialized on 0.0.0.0:3000',
      '[DB] Connected securely to primary MySQL core & MongoDB layers',
      '[AUTH] Loaded Firebase auth validation credentials (JWT tokens validated)'
    ]);
  };

  return (
    <div className="w-full bg-[#11192e] rounded-xl border border-slate-700/60 p-4 shadow-xl text-slate-300 font-sans text-xs">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-100 text-xs">
          <Smartphone className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Kooli App Mobile Service Engine</span>
        </div>
        <button
          onClick={resetAll}
          className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] font-mono hover:rotate-180 transition-transform duration-300 cursor-pointer"
          title="Reset Console"
        >
          <span>Refresh</span>
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        
        {/* Left Side: Stats and Interactive Request Form (5 / 12) */}
        <div className="md:col-span-5 space-y-3.5">
          
          {/* Databases stats cards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center">
              <span className="text-[9px] font-mono text-amber-400 uppercase font-semibold block">Total Users</span>
              <div className="text-sm font-black text-white mt-0.5">{usersCount}</div>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-center">
              <span className="text-[9px] font-mono text-blue-400 uppercase font-semibold block">DB Active Layers</span>
              <div className="text-[10px] text-slate-300 font-mono mt-1 font-bold">MySQL &amp; NoSQL</div>
            </div>
          </div>

          {/* Simulate service booking dispatcher input */}
          <div className="bg-slate-950/40 border border-slate-800 p-3 rounded-lg space-y-2.5">
            <div className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest font-bold">
              Dispatch Service Request (API Test)
            </div>

            <div>
              <label className="block text-[9.5px] text-slate-400 font-medium mb-1">Customer Name:</label>
              <input
                type="text"
                value={inputUser}
                onChange={(e) => setInputUser(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded py-1 px-2 text-slate-100 outline-none placeholder:text-slate-600 text-[10.5px]"
              />
            </div>

            <div>
              <label className="block text-[9.5px] text-slate-400 font-medium mb-1">Select Service Type:</label>
              <select
                value={inputService}
                onChange={(e) => setInputService(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded py-1 px-2 text-slate-100 outline-none text-[10.5px] cursor-pointer"
              >
                <option value="Electrical Repair">Electrical Repair</option>
                <option value="Home Plumbing">Home Plumbing</option>
                <option value="AC Maintenance">AC Maintenance</option>
                <option value="Smart Appliance Setup">Smart Appliance Setup</option>
              </select>
            </div>

            <button
              onClick={handleCreateRequest}
              className="w-full bg-amber-600 hover:bg-amber-500 font-sans text-white text-[10px] py-1.5 px-3 rounded font-bold cursor-pointer transition-colors flex items-center justify-center gap-1 leading-none uppercase tracking-wider"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Book via Android API
            </button>
          </div>

        </div>

        {/* Right Side: Requests List and Terminal logs representation (7 / 12) */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          
          {/* Active Bookings List representing Image results */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-3 space-y-2 flex-1">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
              <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold">Live Booking Transactions (Android App)</span>
              <span className="text-[9px] font-mono text-slate-500">Auto-Refreshed</span>
            </div>

            <div className="space-y-1.5 max-h-[110px] overflow-y-auto scrollbar-thin pr-1">
              {requests.map(req => (
                <div key={req.id} className="bg-slate-950/60 p-2 rounded border border-slate-800/80 flex items-center justify-between text-[10px] gap-2">
                  <div className="min-w-0">
                    <span className="font-mono bg-slate-800 text-slate-300 px-1 py-0.5 rounded text-[8.5px] mr-1.5 font-bold">{req.id}</span>
                    <span className="text-white font-bold tracking-tight">{req.user}</span>
                    <span className="text-slate-400 block text-[9px] truncate">{req.serviceType} • {req.timestamp}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      req.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      req.status === 'Processed' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {req.status}
                    </span>
                    
                    {req.status === 'Pending' && (
                      <button 
                        onClick={() => completeRequest(req.id)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded p-0.5 text-[8px] cursor-pointer"
                        title="Process Transaction"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulated API Terminal logs representation */}
          <div className="bg-[#070b13] border border-slate-800 rounded p-2.5 font-mono text-[9px] leading-relaxed text-slate-400 h-[75px] overflow-y-auto">
            <div className="flex items-center gap-1 text-slate-500 mb-1 font-bold border-b border-slate-900 pb-0.5 select-none text-[8.5px]">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>LOG STREAM (FLASK SERVER OUTPUT)</span>
            </div>
            <div className="space-y-0.5">
              {terminalLogs.map((log, index) => (
                <div key={index} className="truncate">
                  <span className="text-indigo-500/90">&gt;&gt;</span> {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
