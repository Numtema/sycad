
import React from 'react';
import { FormData } from '../types';
import { MapPin, Box, Layers, Maximize, Target, Map, ChevronDown, Ruler, LayoutGrid } from 'lucide-react';

interface FormStepTwoProps {
  formData: FormData;
}

const FormStepTwo: React.FC<FormStepTwoProps & { setFormData: React.Dispatch<React.SetStateAction<FormData>> }> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const communes = ["PIELA", "MOGTEDO", "BAMA", "ORODARA", "PENI", "DOUMBALA", "BOBO-DIOULASSO", "OUAGADOUGOU"];
  const usages = ["Habitation", "Commerce", "Industrie", "Espace Vert", "Equipement Public", "Culte"];

  const inputClasses = "w-full p-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all font-bold text-[13px] text-slate-700 placeholder:text-slate-300 placeholder:font-medium shadow-sm";
  const labelClasses = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-1.5";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#064e3b] rounded-2xl text-white shadow-lg mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
            <Map size={20} className="text-emerald-400" />
          </div>
          <span className="font-black text-sm uppercase tracking-wider">Identification Parcelle</span>
        </div>
        <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-3">
           <span>Lot: <span className="text-emerald-400">{formData.lot || '--'}</span></span>
           <span className="opacity-30">|</span>
           <span>N°: <span className="text-emerald-400">{formData.parcelNumber || '--'}</span></span>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Localisation administrative</h2>
        </div>
        
        <div className="max-w-xl">
          <label className={labelClasses}>Commune <span className="text-emerald-500">*</span></label>
          <div className="relative group">
            <select 
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              className={`${inputClasses} appearance-none cursor-pointer pr-12 group-hover:border-emerald-300`}
            >
              <option value="" disabled>Sélectionner la commune...</option>
              {communes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Références Foncières</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className={labelClasses}>Section <span className="text-emerald-500">*</span></label>
            <input 
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="Ex: AB"
              className={`${inputClasses} uppercase text-center tracking-widest`}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>Lot</label>
            <input 
              type="text"
              name="lot"
              value={formData.lot}
              onChange={handleChange}
              placeholder="Ex: 05"
              className={`${inputClasses} text-center font-black`}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>N° Parcelle <span className="text-emerald-500">*</span></label>
            <input 
              type="text"
              name="parcelNumber"
              value={formData.parcelNumber}
              onChange={handleChange}
              placeholder="Ex: 12"
              className={`${inputClasses} text-center font-black`}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2 border-l-4 border-emerald-600 pl-3">
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-wider">Superficie & Usage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className={labelClasses}>
              <Ruler size={10} className="text-emerald-600" />
              Superficie (m²)
            </label>
            <div className="relative group">
              <input 
                type="text"
                name="surface"
                value={formData.surface}
                onChange={handleChange}
                placeholder="Ex: 300"
                className={`${inputClasses} pr-14 group-hover:border-emerald-300`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-[10px] uppercase group-focus-within:text-emerald-600">m²</span>
            </div>
          </div>
          <div className="space-y-2">
            <label className={labelClasses}>
              <LayoutGrid size={10} className="text-emerald-600" />
              Usage principal
            </label>
            <div className="relative group">
              <select 
                name="usage"
                value={formData.usage}
                onChange={handleChange}
                className={`${inputClasses} appearance-none cursor-pointer pr-12 group-hover:border-emerald-300`}
              >
                <option value="">Sélectionner l'usage...</option>
                {usages.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-emerald-500 transition-colors">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-4 shadow-sm">
           <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
             <Target size={20} />
           </div>
           <div className="space-y-1">
             <h4 className="text-[11px] font-black text-emerald-900 uppercase tracking-widest">Aide à la saisie</h4>
             <p className="text-[12px] text-emerald-800/80 leading-relaxed font-medium">
               Assurez-vous que les coordonnées cadastrales correspondent exactement à celles figurant sur votre titre de propriété ou certificat de bornage original.
             </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default FormStepTwo;
