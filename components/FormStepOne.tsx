
import React from 'react';
import { DocumentType, FormData } from '../types';
import { THEME } from '../constants';
import { Calendar, Info, FileEdit, Hash, MessageSquare, HelpCircle, FileText } from 'lucide-react';

interface FormStepOneProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepOne: React.FC<FormStepOneProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={`${THEME.spacing.sectionGap} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      {/* Header Banner using Theme Primary Color */}
      <div 
        style={{ backgroundColor: THEME.colors.primary }}
        className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl shadow-lg shadow-emerald-100 text-white mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <FileText size={20} className="text-white" />
          </div>
          <span className="font-bold tracking-wide">Nature & Identification de la Demande</span>
        </div>
      </div>

      {/* Block 1: Nature de la demande */}
      <section className="bg-white rounded-3xl p-1 border border-transparent">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <FileEdit size={22} />
          </div>
          <div>
            <h2 className={THEME.typography.h2}>Nature de la demande</h2>
            <p className={THEME.typography.label}>Étape pivot du dossier</p>
          </div>
        </div>
        
        <div className="max-w-2xl bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
            Type de document <span style={{ color: THEME.colors.secondary }}>*</span>
          </label>
          <div className="relative group">
            <select 
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="w-full p-4 pl-5 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold appearance-none cursor-pointer text-slate-700"
            >
              <option value="" disabled>Sélectionner le type d'acte...</option>
              <option value={DocumentType.ATTRIBUTION}>{DocumentType.ATTRIBUTION.toUpperCase()}</option>
              <option value={DocumentType.CESSION}>{DocumentType.CESSION.toUpperCase()}</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Identification */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className={THEME.typography.h2}>Identification</h2>
            <p className={THEME.typography.label}>Chronologie & Objet</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Objet de la demande <span style={{ color: THEME.colors.secondary }}>*</span>
            </label>
            <input 
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Date de la demande <span style={{ color: THEME.colors.secondary }}>*</span>
            </label>
            <input 
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Block 3: Référence */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Hash size={22} />
          </div>
          <div>
            <h2 className={THEME.typography.h2}>Référence administrative</h2>
            <p className={THEME.typography.label}>Identifiant unique</p>
          </div>
        </div>

        <div className="max-w-2xl space-y-4">
          <input 
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder="Laisser vide pour une génération système..."
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-700"
          />
          <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-2xl flex items-center gap-3">
             <Info size={16} className="text-blue-500" />
             <p className="text-[11px] text-blue-700 font-bold uppercase tracking-tight">Génération auto : SR-DATE-00X si vide</p>
          </div>
        </div>
      </section>

      {/* Block 4: Observation */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <MessageSquare size={22} />
          </div>
          <div>
            <h2 className={THEME.typography.h2}>Observation</h2>
            <p className={THEME.typography.label}>Commentaires facultatifs</p>
          </div>
        </div>

        <textarea 
          name="observation"
          value={formData.observation}
          onChange={handleChange}
          rows={4}
          maxLength={500}
          placeholder="Informations complémentaires..."
          className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-700"
        ></textarea>
      </section>
    </div>
  );
};

export default FormStepOne;
