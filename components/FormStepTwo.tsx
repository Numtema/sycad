
import React from 'react';
import { FormData } from '../types';
import { MapPin, Box, Layers, Maximize, Target, Info, Map } from 'lucide-react';

interface FormStepTwoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepTwo: React.FC<FormStepTwoProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const communes = [
    "PIELA",
    "MOGTEDO",
    "BAMA",
    "ORODARA",
    "PENI",
    "DOUMBALA",
    "BOBO-DIOULASSO",
    "OUAGADOUGOU"
  ];

  const usages = [
    "Habitation",
    "Commerce",
    "Industrie",
    "Espace Vert",
    "Equipement Public",
    "Culte"
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Banner for Step 2 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-emerald-700 rounded-2xl shadow-lg shadow-emerald-100 text-white mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Map size={20} className="text-white" />
          </div>
          <span className="font-bold tracking-wide">Identification de la Parcelle Objet de la Demande</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-800/40 rounded-xl text-xs font-bold border border-emerald-600/50">
           Secteur: {formData.section || '--'} | Lot: {formData.lot || '--'}
        </div>
      </div>

      {/* Block 1: Localisation Administrative */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <MapPin size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Localisation Administrative</h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Commune & Arrondissement</p>
          </div>
        </div>
        
        <div className="max-w-2xl bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
          <label className="block text-sm font-bold text-slate-700 mb-3 ml-1">
            Commune <span className="text-emerald-500 font-bold">*</span>
          </label>
          <div className="relative group">
            <select 
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              className="w-full p-4 pl-5 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold appearance-none cursor-pointer text-slate-700 group-hover:border-slate-300"
            >
              <option value="" disabled>Rechercher ou sélectionner une commune...</option>
              {communes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Block 2: Références Foncières */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Box size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Références Foncières</h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Section, Lot & Parcelle</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Section / Bloc <span className="text-emerald-500 font-bold">*</span>
            </label>
            <div className="relative">
              <Layers size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input 
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                placeholder="Ex: AB"
                className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-slate-700 uppercase"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Lot
            </label>
            <input 
              type="text"
              name="lot"
              value={formData.lot}
              onChange={handleChange}
              placeholder="Ex: 05"
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-slate-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              N° Parcelle <span className="text-emerald-500 font-bold">*</span>
            </label>
            <input 
              type="text"
              name="parcelNumber"
              value={formData.parcelNumber}
              onChange={handleChange}
              placeholder="Ex: 12"
              className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Block 3: Caractéristiques Physiques & Usage */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
            <Maximize size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Caractéristiques & Usage</h2>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Superficie & Destination</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Superficie (m²)
            </label>
            <div className="relative">
              <input 
                type="text"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                placeholder="Ex: 300"
                className="w-full p-4 pl-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold text-slate-700"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">m²</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">
              Destination / Usage
            </label>
            <select 
              name="usage"
              value={formData.usage}
              onChange={handleChange}
              className="w-full p-4 pl-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-semibold appearance-none cursor-pointer text-slate-700"
            >
              <option value="">Sélectionner l'usage...</option>
              {usages.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
        
        <div className="mt-8 p-5 bg-emerald-50/40 border border-emerald-100 rounded-[1.5rem] flex items-start gap-4 shadow-sm">
           <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 shrink-0">
              <Target size={18} />
           </div>
           <p className="text-xs text-emerald-700 leading-relaxed font-medium">
             Vérifiez soigneusement la <strong>Section</strong> et le <strong>Numéro de Parcelle</strong>. 
             Toute erreur à cette étape pourrait invalider l'attestation finale.
           </p>
        </div>
      </section>
    </div>
  );
};

export default FormStepTwo;
