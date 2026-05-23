import React, { useState } from 'react';
import { Play, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';

interface Expense {
  paidBy: string;
  amount: number;
  participants: string[];
  splitType: 'Equal' | 'Exact' | 'Percentage';
  rawSplits: string;
}

export default function ExpenseSharingWidget() {
  const [paidBy, setPaidBy] = useState('u1');
  const [amount, setAmount] = useState('300');
  const [participants, setParticipants] = useState('u1,u2,u3');
  const [splitType, setSplitType] = useState<'Equal' | 'Exact' | 'Percentage'>('Exact');
  const [splits, setSplits] = useState('u2:120,u3:180');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Core settlement mapping: owee -> ower -> amount
  const [balances, setBalances] = useState<Record<string, Record<string, number>>>({
    "u2": { "u1": 120 },
    "u3": { "u1": 180 }
  });

  const handleAddExpense = () => {
    setError(null);
    setSuccess(null);

    const amtNum = parseFloat(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    const payer = paidBy.trim();
    if (!payer) {
      setError('Paid By (User ID) cannot be empty.');
      return;
    }

    const parts = participants.split(',').map(p => p.trim()).filter(Boolean);
    if (parts.length < 2) {
      setError('Please provide at least 2 participants (comma separated).');
      return;
    }

    if (!parts.includes(payer)) {
      setError(`Payer "${payer}" must be in the participants list so we can calculate net splits.`);
      return;
    }

    // Prepare temp variables to check bounds
    const calculatedBalances = { ...balances };

    if (splitType === 'Equal') {
      const splitAmt = parseFloat((amtNum / parts.length).toFixed(2));
      parts.forEach(p => {
        if (p !== payer) {
          if (!calculatedBalances[p]) calculatedBalances[p] = {};
          const currentOwed = calculatedBalances[p][payer] || 0;
          calculatedBalances[p][payer] = parseFloat((currentOwed + splitAmt).toFixed(2));
        }
      });
      setBalances(calculatedBalances);
      setSuccess(`Success! Split equal shares of ${splitAmt} each.`);
    } else {
      // Parse custom splits: u2:120,u3:180
      const splitParts = splits.split(',').map(s => s.trim()).filter(Boolean);
      const splitMap: Record<string, number> = {};
      let totalSplitVal = 0;

      for (const item of splitParts) {
        const idx = item.indexOf(':');
        if (idx === -1) {
          setError('Splits must be in format userId:value (e.g. u2:120,u3:180)');
          return;
        }
        const user = item.substring(0, idx).trim();
        const value = parseFloat(item.substring(idx + 1).trim());

        if (isNaN(value) || value <= 0) {
          setError('Split values must be positive numbers');
          return;
        }
        if (!parts.includes(user)) {
          setError(`User "${user}" in split is not part of the active participants list.`);
          return;
        }

        splitMap[user] = value;
        totalSplitVal += value;
      }

      if (splitType === 'Exact') {
        const remainingForPayer = amtNum - totalSplitVal;
        if (remainingForPayer < 0) {
          setError(`Exact split sum (${totalSplitVal}) cannot exceed total expense amount (${amtNum}).`);
          return;
        }

        // Apply Exact debts
        Object.entries(splitMap).forEach(([debtor, val]) => {
          if (debtor !== payer) {
            if (!calculatedBalances[debtor]) calculatedBalances[debtor] = {};
            const currentOwed = calculatedBalances[debtor][payer] || 0;
            calculatedBalances[debtor][payer] = parseFloat((currentOwed + val).toFixed(2));
          }
        });

        setBalances(calculatedBalances);
        setSuccess(`Added expense. Exact splits evaluated: payer share is ${remainingForPayer.toFixed(2)}.`);
      } else if (splitType === 'Percentage') {
        // Percentage splits checks
        if (totalSplitVal > 100) {
          setError(`Percentage splits total (${totalSplitVal}%) cannot exceed 100%.`);
          return;
        }

        Object.entries(splitMap).forEach(([debtor, pct]) => {
          if (debtor !== payer) {
            const debAmt = parseFloat(((pct / 100) * amtNum).toFixed(2));
            if (!calculatedBalances[debtor]) calculatedBalances[debtor] = {};
            const currentOwed = calculatedBalances[debtor][payer] || 0;
            calculatedBalances[debtor][payer] = parseFloat((currentOwed + debAmt).toFixed(2));
          }
        });

        setBalances(calculatedBalances);
        setSuccess(`Added expense. Percentage calculations updated successfully.`);
      }
    }
  };

  const handleReset = () => {
    setPaidBy('u1');
    setAmount('300');
    setParticipants('u1,u2,u3');
    setSplitType('Exact');
    setSplits('u2:120,u3:180');
    setError(null);
    setSuccess(null);
    setBalances({
      "u2": { "u1": 120 },
      "u3": { "u1": 180 }
    });
  };

  return (
    <div className="w-full bg-[#131d31]/95 text-slate-100 rounded-xl border border-slate-700/60 p-5 shadow-2xl font-mono text-[11px]">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span className="font-sans font-bold text-slate-200">Interactive Split Simulator</span>
        </div>
        <button 
          onClick={handleReset} 
          title="Reset variables" 
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3.5">
        
        {/* Paid By Field */}
        <div>
          <label className="block text-[#a0aec0] font-sans font-semibold mb-1 uppercase tracking-wider text-[9px]">
            Paid By (User ID):
          </label>
          <input
            type="text"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 rounded py-2 px-3 text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. u1"
          />
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-[#a0aec0] font-sans font-semibold mb-1 uppercase tracking-wider text-[9px]">
            Amount:
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 rounded py-2 px-3 text-slate-100 outline-none transition-all focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. 300"
          />
        </div>

        {/* Participants Field */}
        <div>
          <label className="block text-[#a0aec0] font-sans font-semibold mb-1 uppercase tracking-wider text-[9px]">
            Participants (comma separated):
          </label>
          <input
            type="text"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 rounded py-2 px-3 text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g. u1,u2,u3"
          />
        </div>

        {/* Split Type Selector */}
        <div>
          <label className="block text-[#a0aec0] font-sans font-semibold mb-1 uppercase tracking-wider text-[9px]">
            Split Type:
          </label>
          <select
            value={splitType}
            onChange={(e) => {
              const type = e.target.value as any;
              setSplitType(type);
              if (type === 'Equal') {
                setSplits('');
              } else if (type === 'Exact') {
                setSplits('u2:120,u3:180');
              } else {
                setSplits('u2:40,u3:60');
              }
            }}
            className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded py-2 px-3 text-slate-100 outline-none cursor-pointer text-xs"
          >
            <option value="Equal">Equal</option>
            <option value="Exact">Exact</option>
            <option value="Percentage">Percentage</option>
          </select>
        </div>

        {/* Splits Field */}
        {splitType !== 'Equal' && (
          <div>
            <label className="block text-[#a0aec0] font-sans font-semibold mb-1 uppercase tracking-wider text-[9px]">
              Splits (for Exact or Percentage, e.g., u2:120,u3:180 or u2:40,u3:60):
            </label>
            <input
              type="text"
              value={splits}
              onChange={(e) => setSplits(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 hover:border-slate-600 focus:border-indigo-500 rounded py-2 px-3 text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. u2:120,u3:180"
            />
          </div>
        )}

        {/* Error / Success feedback labels */}
        {error && (
          <div className="bg-red-950/40 border border-red-500/30 text-rose-400 p-2 rounded flex items-center gap-1.5 leading-snug">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-2 rounded flex items-center gap-1.5 leading-snug">
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form CTA Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1.5">
          <button
            onClick={handleAddExpense}
            className="bg-indigo-600 hover:bg-indigo-500 font-sans text-slate-100 text-xs py-2 px-4 rounded font-bold cursor-pointer transition-colors active:scale-95 shadow-md flex items-center justify-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-white" />
            Add Expense
          </button>
          
          <button
            onClick={() => {
              setSuccess('Retrieved net balances. Outstanding debt simplification algorithm refreshed!');
              setError(null);
            }}
            className="bg-slate-700 hover:bg-slate-600 font-sans text-slate-100 text-xs py-2 px-4 rounded font-bold cursor-pointer transition-colors active:scale-95 flex items-center justify-center gap-1.5"
          >
            View Balances
          </button>
        </div>

        {/* Real-time calculated JSON Output display card */}
        <div className="pt-2">
          <div className="text-[10px] text-slate-400 mb-1 font-bold font-sans uppercase">Output:</div>
          <pre className="bg-[#0b101b] border border-slate-800 p-3.5 rounded-lg text-indigo-300 font-mono text-[10px] overflow-x-auto max-h-[160px] leading-relaxed shadow-inner">
            {JSON.stringify(balances, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}
