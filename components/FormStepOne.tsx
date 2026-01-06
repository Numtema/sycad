
import React from 'react';
import { DocumentType, FormData } from '../types';
import { THEME } from '../constants';
import { Info, FileText, ChevronDown, AlignLeft, Calendar } from 'lucide-react';

interface FormStepOneProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepOne: React.FC<FormStepOneProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const inputClasses = "w-full p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all font-bold text-[13px] text-slate-700 placeholder:text-slate-300 placeholder:font-medium shadow-sm";
  const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
      {/* Nature de la demande */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Nature du document</h2>
        </div>
        
        <div className="max-w-xl">
          <label className={labelClasses}>
            Type d'acte <span className="text-emerald-500">*</span>
          </label>
          <div className="relative group">
            <select 
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer pr-12 group-hover:border-emerald-300`}
            >
              <option value="" disabled className="text-slate-400">Choisir un type...</option>
              <option value={DocumentType.ATTRIBUTION} className="font-bold text-slate-700 py-2">{DocumentType.ATTRIBUTION}</option>
              <option value={DocumentType.CESSION} className="font-bold text-slate-700 py-2">{DocumentType.CESSION}</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* Identification & Date */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Détails de la demande</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>
              <AlignLeft size={10} className="text-emerald-600" />
              Objet de la demande <span className="text-emerald-500">*</span>
            </label>
            <input 
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Saisir l'objet de la demande..."
              className={inputClasses}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <Calendar size={10} className="text-emerald-600" />
              Date de la demande <span className="text-emerald-500">*</span>
            </label>
            <input 
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className={`${inputClasses} cursor-pointer`}
            />
          </div>
        </div>
      </section>

      {/* Référence Administrative */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Référence administrative</h2>
        </div>

        <div className="max-w-xl space-y-3">
          <div>
            <label className={labelClasses}>Référence manuelle (Optionnel)</label>
            <input 
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              placeholder="Saisie manuelle optionnelle..."
              className={inputClasses}
            />
          </div>
          
          <div className="px-4 py-3 bg-emerald-50/40 border border-emerald-100 rounded-xl flex items-center gap-3 shadow-sm shadow-emerald-900/5">
             <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <Info size={14} />
             </div>
             <p className="text-[11px] text-emerald-800 font-bold tracking-tight">
               Le système générera <span className="text-emerald-600 font-black px-1.5 py-0.5 bg-white rounded border border-emerald-100 italic">SR-DATE-00X</span> si ce champ est vide.
             </p>
          </div>
        </div>
      </section>

      {/* Observation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Observations complémentaires</h2>
        </div>

        <textarea 
          name="observation"
          value={formData.observation}
          onChange={handleChange}
          rows={4}
          maxLength={500}
          placeholder="Notes complémentaires utiles au traitement administratif du dossier..."
          className={`${inputClasses} resize-none no-scrollbar py-4 px-5`}
        ></textarea>
        <div className="flex justify-end pr-2">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{formData.observation.length} / 500 CARACTÈRES</span>
        </div>
      </section>
    </div>
  );
};

export default FormStepOne;
