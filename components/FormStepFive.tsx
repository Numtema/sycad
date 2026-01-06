
import React from 'react';
import { FormData, Quittance } from '../types';
import { Plus, MinusCircle, Info, CreditCard, Receipt, Calendar, Hash, Banknote } from 'lucide-react';

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

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#064e3b] rounded-2xl shadow-lg shadow-emerald-200/50 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
            <Receipt size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Paiements et Quittances</span>
            <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-widest mt-0.5">Justification des droits et taxes acquittés</span>
          </div>
        </div>
        <div className="bg-emerald-600/30 px-5 py-2 rounded-xl border border-white/10 flex items-center gap-3">
          <CreditCard size={18} />
          <span className="text-xs font-black uppercase">
            {formData.quittances.length} Quittance{formData.quittances.length > 1 ? 's' : ''} Enregistrée{formData.quittances.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Info Message */}
      <div className="p-5 bg-blue-50/50 border-2 border-blue-100 rounded-[1.5rem] flex items-center gap-4 shadow-sm">
        <div className="bg-blue-500 p-2 rounded-xl text-white">
          <Info size={18} />
        </div>
        <p className="text-sm text-blue-800 font-semibold">
          Veuillez renseigner les informations sur les quittances de paiement des droits et taxes
        </p>
      </div>

      {/* Add Button */}
      <div className="flex justify-center">
        <button 
          onClick={addQuittance}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#064e3b] text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-200 hover:bg-emerald-900 transition-all hover:scale-105"
        >
          <Plus size={20} />
          Ajouter une quittance
        </button>
      </div>

      {/* Quittances List */}
      <div className="space-y-6">
        {formData.quittances.map((quittance, index) => (
          <div 
            key={quittance.id}
            className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-10 relative shadow-xl shadow-slate-100 transition-all hover:border-emerald-200 group"
          >
            {formData.quittances.length > 1 && (
              <button 
                onClick={() => removeQuittance(quittance.id)}
                className="absolute top-6 right-6 text-rose-500 hover:scale-110 transition-transform opacity-60 group-hover:opacity-100"
              >
                <MinusCircle size={28} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-8">
              <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                Quittance N°0{index + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Reference Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">
                  Référence <span className="text-rose-500">(*)</span>
                </label>
                <div className="relative">
                  <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={quittance.reference}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'reference', e.target.value)}
                    placeholder="Saisir la référence"
                    className={`w-full p-4 pl-12 bg-slate-50 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 ${
                      !quittance.reference ? 'border-rose-100 placeholder:text-rose-200' : 'border-slate-100'
                    }`}
                  />
                </div>
                {!quittance.reference && (
                  <p className="text-[10px] font-bold text-rose-500 ml-1">La référence est obligatoire</p>
                )}
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">
                  Date <span className="text-rose-500">(*)</span>
                </label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="date" 
                    value={quittance.date}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'date', e.target.value)}
                    className={`w-full p-4 pl-12 bg-slate-50 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 cursor-pointer ${
                      !quittance.date ? 'border-rose-100' : 'border-slate-100'
                    }`}
                  />
                </div>
                {!quittance.date && (
                  <p className="text-[10px] font-bold text-rose-500 ml-1">La date est obligatoire</p>
                )}
              </div>

              {/* Amount Field */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">
                  Montant <span className="text-rose-500">(*)</span>
                </label>
                <div className="relative">
                  <Banknote size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="text" 
                    value={quittance.amount}
                    onChange={(e) => handleQuittanceChange(quittance.id, 'amount', e.target.value)}
                    placeholder="Ex: 50 000"
                    className={`w-full p-4 pl-12 bg-slate-50 border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-slate-700 ${
                      !quittance.amount ? 'border-rose-100 placeholder:text-rose-200' : 'border-slate-100'
                    }`}
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">FCFA</span>
                </div>
                {!quittance.amount && (
                  <p className="text-[10px] font-bold text-rose-500 ml-1">Le montant est obligatoire</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div className="mt-12 p-8 bg-emerald-50/50 border-2 border-emerald-100 rounded-[3rem] flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-emerald-200/50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-50">
           <Banknote size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
           <h5 className="font-black text-emerald-800 text-sm uppercase tracking-widest mb-1">Résumé financier</h5>
           <p className="text-[15px] text-emerald-900/60 font-semibold leading-relaxed">
             Vérifiez que les montants saisis correspondent exactement aux sommes figurant sur vos reçus originaux. 
             Toute divergence prolongera les délais de traitement de votre demande.
           </p>
        </div>
        <div className="bg-emerald-700 text-white p-6 rounded-[2rem] text-center min-w-[220px] shadow-lg shadow-emerald-200/40">
           <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Montant Total Déclaré</p>
           <p className="text-3xl font-black italic">
             {formData.quittances.reduce((acc, curr) => acc + (parseFloat(curr.amount.replace(/\s/g, '')) || 0), 0).toLocaleString()} 
             <span className="text-sm ml-2 font-bold opacity-80">FCFA</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default FormStepFive;
