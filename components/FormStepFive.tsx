
import React from 'react';
import { FormData, Quittance } from '../types';
import { Plus, Trash2, Info, Receipt, Calendar, Hash, Banknote } from 'lucide-react';

interface FormStepFiveProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepFive: React.FC<FormStepFiveProps> = ({ formData, setFormData }) => {
  const addQuittance = () => {
    const newQuittance: Quittance = {
      id: `q-${Date.now()}`,
      reference: '',
      date: '',
      amount: ''
    };
    setFormData(prev => ({
      ...prev,
      quittances: [...prev.quittances, newQuittance]
    }));
  };

  const removeQuittance = (id: string) => {
    if (formData.quittances.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      quittances: prev.quittances.filter(q => q.id !== id)
    }));
  };

  const handleQuittanceChange = (id: string, field: keyof Quittance, value: string) => {
    setFormData(prev => ({
      ...prev,
      quittances: prev.quittances.map(q => q.id === id ? { ...q, [field]: value } : q)
    }));
  };

  const totalAmount = formData.quittances.reduce((acc, curr) => {
    const val = parseFloat(curr.amount.replace(/\s/g, '')) || 0;
    return acc + val;
  }, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#064e3b] rounded-xl text-white shadow-sm mb-2">
        <div className="flex items-center gap-3">
          <Receipt size={18} className="opacity-80" />
          <span className="font-bold text-xs uppercase tracking-widest">Paiements & Quittances</span>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
           Total: {totalAmount.toLocaleString()} FCFA
        </div>
      </div>

      <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center gap-3">
        <Info size={16} className="text-emerald-600" />
        <p className="text-[10px] text-emerald-800 font-medium uppercase tracking-tight">Renseignez les justificatifs de paiement des droits et taxes.</p>
      </div>

      <div className="flex justify-start">
        <button 
          onClick={addQuittance}
          className="flex items-center gap-2 px-4 py-2 bg-[#064e3b] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-emerald-900 transition-all"
        >
          <Plus size={14} />
          Ajouter une quittance
        </button>
      </div>

      <div className="space-y-4">
        {formData.quittances.map((quittance, index) => (
          <div 
            key={quittance.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm transition-all hover:border-emerald-200"
          >
            {formData.quittances.length > 1 && (
              <button 
                onClick={() => removeQuittance(quittance.id)}
                className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            )}

            <div className="flex items-center gap-2 mb-6">
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Justificatif #{index + 1}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Référence <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Hash size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={quittance.reference}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'reference', e.target.value)}
                    placeholder="Réf. quittance"
                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-[12px] text-slate-700 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Date <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Calendar size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="date" 
                    value={quittance.date}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'date', e.target.value)}
                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-[12px] text-slate-700 cursor-pointer shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Montant <span className="text-rose-500">*</span></label>
                <div className="relative">
                  <Banknote size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={quittance.amount}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'amount', e.target.value)}
                    placeholder="Montant FCFA"
                    className="w-full p-2.5 pl-9 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-[12px] text-slate-700 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-[#064e3b] text-white rounded-xl flex items-center justify-between shadow-lg shadow-emerald-900/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg"><Banknote size={20} /></div>
          <div>
            <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-60">Somme Totale</p>
            <p className="text-xl font-black italic tracking-tight">{totalAmount.toLocaleString()} FCFA</p>
          </div>
        </div>
        <div className="hidden sm:block text-[10px] font-medium opacity-50 uppercase tracking-widest italic">Calcul automatique SyCAD</div>
      </div>
    </div>
  );
};

export default FormStepFive;
