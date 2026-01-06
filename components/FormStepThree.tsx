
import React from 'react';
import { FormData } from '../types';
import { THEME } from '../constants';
import { User, ShieldCheck, Mail, Phone, MapPin, Share2, Info, Users, Check, CreditCard } from 'lucide-react';

interface FormStepThreeProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepThree: React.FC<FormStepThreeProps> = ({ formData, setFormData }) => {
  const handleToggleMandataire = () => {
    setFormData(prev => ({ ...prev, isMandataire: !prev.isMandataire }));
  };

  const mockAttributaire = {
    name: "M. OUSMANE TRAORÉ",
    uniqueId: "7GHT-8HIK-L9MJ-456-2026",
    gender: "HOMME",
    maritalStatus: "Marié",
    profession: "Ingénieur en Génie Civil",
    birthDate: "12/05/1985",
    birthPlace: "BURKINA FASO / OUAGADOUGOU / PISSY",
    fatherName: "TRAORÉ SOUMAILA",
    motherName: "OUÉDRAOGO FATIMATA",
    nationality: "Burkinabè",
    emails: ["o.traore@admin.bf"],
    idCard: "03050400230028496",
    phones: ["+226 70 00 11 22"],
    address: "Ouagadougou, Secteur 15, Villa 402",
    socials: 2,
    photoUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400&h=400&auto=format&fit=crop"
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 pb-10">
      {/* Barre de statut supérieure - Plus compacte */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#064e3b] rounded-xl text-white shadow-md">
        <div className="flex items-center gap-3">
          <Users size={18} className="opacity-80" />
          <div className="flex flex-col">
            <span className="font-bold text-xs uppercase tracking-widest">Identité de l'Attributaire</span>
          </div>
        </div>
        <label className="flex items-center cursor-pointer gap-3 bg-white/10 px-4 py-1.5 rounded-lg border border-white/5 hover:bg-white/20 transition-all">
           <span className="text-[10px] font-black uppercase tracking-widest">Mandataire autorisé</span>
           <div className="relative inline-block w-8 h-4">
             <input 
               type="checkbox" 
               checked={formData.isMandataire} 
               onChange={handleToggleMandataire}
               className="opacity-0 w-0 h-0 peer" 
             />
             <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${formData.isMandataire ? 'bg-emerald-400' : 'bg-white/30'}`}></span>
             <span className={`absolute h-3 w-3 left-0.5 bottom-0.5 rounded-full transition-all duration-300 shadow-sm ${formData.isMandataire ? 'translate-x-4 bg-white' : 'bg-white'}`}></span>
           </div>
        </label>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
        {/* En-tête du bénéficiaire */}
        <div className="bg-[#064e3b] px-6 py-5 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2 rounded-lg border border-white/10">
              <ShieldCheck size={18} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-white font-black tracking-tight text-lg uppercase">{mockAttributaire.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Identité certifiée</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-white/5">
            <span className="text-[10px] text-emerald-100 font-bold tracking-widest">REF: {formData.beneficiaryId}</span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Avatar & Actions rapides */}
          <div className="md:w-1/4 flex flex-col items-center gap-4">
            <div className="w-48 h-48 rounded-2xl bg-slate-100 border-2 border-slate-50 shadow-inner overflow-hidden">
              <img 
                src={mockAttributaire.photoUrl} 
                alt="Portrait"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="w-full space-y-2">
              <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors group">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-700">Emails</span>
                <span className="text-xs font-bold text-slate-700">{mockAttributaire.emails.length}</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors group">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-700">Nationalité</span>
                <span className="text-xs font-bold text-slate-700">{mockAttributaire.nationality}</span>
              </button>
            </div>
          </div>

          {/* Données de Filiation & État Civil */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
               <div className="space-y-1">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">N° Unique Identité</span>
                 <p className="text-[14px] font-black text-emerald-900">{mockAttributaire.uniqueId}</p>
               </div>
               <div className="space-y-1">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Profession</span>
                 <p className="text-[13px] font-bold text-slate-700">{mockAttributaire.profession}</p>
               </div>
               <div className="space-y-1">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Date & Lieu de Naissance</span>
                 <p className="text-[13px] font-bold text-slate-700">{mockAttributaire.birthDate} ({mockAttributaire.birthPlace})</p>
               </div>
               <div className="space-y-1">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Filiation</span>
                 <p className="text-[11px] font-medium text-slate-500 italic">Fils de <span className="text-slate-800 font-bold not-italic">{mockAttributaire.fatherName}</span> et <span className="text-slate-800 font-bold not-italic">{mockAttributaire.motherName}</span></p>
               </div>
            </div>

            {/* Informations de contact - CONTRASTE RENFORCÉ (Soft & Pro) */}
            <div className="pt-6 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-3 gap-3">
               <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                     <CreditCard size={14} className="text-slate-400" />
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Pièce d'identité</span>
                  </div>
                  <p className="text-[13px] font-black text-slate-900 tracking-tight">{mockAttributaire.idCard}</p>
               </div>
               <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                     <Phone size={14} className="text-slate-400" />
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Téléphone Mobile</span>
                  </div>
                  <p className="text-[13px] font-black text-slate-900 tracking-tight">{mockAttributaire.phones[0]}</p>
               </div>
               <div className="p-4 bg-slate-50/70 border border-slate-100 rounded-xl hover:border-emerald-200 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                     <MapPin size={14} className="text-slate-400" />
                     <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Domicile</span>
                  </div>
                  <p className="text-[12px] font-black text-slate-900 tracking-tight truncate">{mockAttributaire.address}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message de contrôle interne - Plus discret */}
      <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-3">
         <Info size={16} className="text-amber-500 mt-0.5" />
         <div className="space-y-1">
            <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Contrôle de conformité</h4>
            <p className="text-[11px] text-amber-900/70 leading-relaxed font-medium">
              Veuillez vérifier la concordance entre la photo affichée et le demandeur présent. En cas de doute, signalez-le au service superviseur.
            </p>
         </div>
      </div>
    </div>
  );
};

export default FormStepThree;
