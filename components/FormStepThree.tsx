
import React from 'react';
import { FormData } from '../types';
import { THEME } from '../constants';
import { User, ShieldCheck, Mail, Phone, MapPin, Globe, CreditCard, Share2, Info, Users, Check } from 'lucide-react';

interface FormStepThreeProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const FormStepThree: React.FC<FormStepThreeProps> = ({ formData, setFormData }) => {
  const handleToggleMandataire = () => {
    setFormData(prev => ({ ...prev, isMandataire: !prev.isMandataire }));
  };

  // Mock data representing the linked beneficiary record
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
    // Updated image to represent a professional black man as requested
    photoUrl: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=400&h=400&auto=format&fit=crop"
  };

  return (
    <div className={`${THEME.spacing.sectionGap} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      {/* Header Banner for Step 3 */}
      <div 
        style={{ backgroundColor: THEME.colors.primary }}
        className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl shadow-lg shadow-emerald-200/50 text-white mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
            <Users size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wide text-lg">Identité de l'Attributaire</span>
            <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Validation de la fiche bénéficiaire</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center cursor-pointer gap-3 bg-white/10 px-5 py-2.5 rounded-2xl border border-white/10 hover:bg-white/20 transition-all group">
             <span className="text-[11px] font-black uppercase tracking-widest">Mandataire autorisé</span>
             <div className="relative inline-block w-11 h-6">
               <input 
                 type="checkbox" 
                 checked={formData.isMandataire} 
                 onChange={handleToggleMandataire}
                 className="opacity-0 w-0 h-0 peer" 
               />
               <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${formData.isMandataire ? 'bg-emerald-400' : 'bg-white/30'}`}></span>
               <span className={`absolute h-4 w-4 left-1 bottom-1 rounded-full transition-all duration-300 shadow-sm ${formData.isMandataire ? 'translate-x-5 bg-white' : 'bg-white'}`}></span>
             </div>
          </label>
        </div>
      </div>

      {/* Main Content Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-50 rounded-[1.25rem] flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100">
            <User size={24} />
          </div>
          <div>
            <h2 className={THEME.typography.h2}>Détail Attributaire</h2>
            <p className={THEME.typography.label}>Informations Personnelles Certifiées</p>
          </div>
        </div>

        <div 
          className="bg-white border-2 border-slate-50 overflow-hidden shadow-2xl shadow-slate-200/50"
          style={{ borderRadius: THEME.borderRadius.xl }}
        >
          {/* Card Title Header */}
          <div 
            style={{ backgroundColor: THEME.colors.primary }}
            className="px-8 py-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-xl border border-white/10">
                <ShieldCheck size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-black tracking-wide text-xl">{mockAttributaire.name}</h3>
                <p className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.15em] mt-1 flex items-center gap-1">
                  <Check size={10} strokeWidth={4} /> Identité Vérifiée
                </p>
              </div>
            </div>
            <div className="text-emerald-100 text-[10px] font-black uppercase tracking-widest bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-white/5">
              Ref: {formData.beneficiaryId}
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col xl:flex-row gap-12">
            {/* Avatar Section */}
            <div className="xl:w-1/4 flex flex-col items-center">
               <div className="w-64 h-64 rounded-[3.5rem] bg-slate-100 border-4 border-white shadow-2xl overflow-hidden relative group">
                  <img 
                    src={mockAttributaire.photoUrl} 
                    alt="Portrait de M. Ousmane Traoré"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest bg-emerald-600 px-4 py-2 rounded-xl border border-white/30 shadow-lg">Modifier Photo</span>
                  </div>
               </div>
               
               <div className="mt-8 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 transition-colors hover:border-emerald-200 cursor-pointer group">
                    <p className={THEME.typography.label + " mb-2 opacity-50"}>Contact Mail</p>
                    <p className="text-emerald-700 font-bold flex items-center justify-center gap-2">
                      <Mail size={14} className="group-hover:scale-110 transition-transform" /> {mockAttributaire.emails.length} <span className="text-[9px] text-slate-300 font-black">VOIR</span>
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100 transition-colors hover:border-emerald-200 cursor-pointer group">
                    <p className={THEME.typography.label + " mb-2 opacity-50"}>Réseaux</p>
                    <p className="text-emerald-700 font-bold flex items-center justify-center gap-2">
                      <Share2 size={14} className="group-hover:scale-110 transition-transform" /> {mockAttributaire.socials} <span className="text-[9px] text-slate-300 font-black">VOIR</span>
                    </p>
                  </div>
               </div>
            </div>

            {/* Data Grid Section */}
            <div className="flex-1 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                 <div className="flex flex-col gap-2">
                    <span className={THEME.typography.label + " text-slate-400"}>Numéro unique d'identité</span>
                    <span className="text-[15px] font-black text-emerald-900 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-100 inline-block w-fit shadow-sm">
                       {mockAttributaire.uniqueId}
                    </span>
                 </div>

                 <div className="flex flex-col gap-2">
                    <span className={THEME.typography.label + " text-slate-400"}>Profession</span>
                    <span className="text-[15px] font-bold text-slate-700 border-b-2 border-slate-50 pb-1">{mockAttributaire.profession}</span>
                 </div>

                 <div className="flex flex-col gap-1">
                    <span className={THEME.typography.label + " text-slate-400"}>Genre / État Civil</span>
                    <span className="text-[15px] font-bold text-slate-700">{mockAttributaire.gender} • {mockAttributaire.maritalStatus}</span>
                 </div>

                 <div className="flex flex-col gap-1">
                    <span className={THEME.typography.label + " text-slate-400"}>Nationalité</span>
                    <span className="text-[15px] font-bold text-slate-700">{mockAttributaire.nationality}</span>
                 </div>

                 <div className="flex flex-col gap-1">
                    <span className={THEME.typography.label + " text-slate-400"}>Date & Lieu de Naissance</span>
                    <span className="text-[15px] font-bold text-slate-700">{mockAttributaire.birthDate} à {mockAttributaire.birthPlace}</span>
                 </div>

                 <div className="flex flex-col gap-1">
                    <span className={THEME.typography.label + " text-slate-400"}>Filiation</span>
                    <span className="text-[13px] font-medium text-slate-500 italic">Fils de <span className="text-slate-900 font-bold not-italic">{mockAttributaire.fatherName}</span> et de <span className="text-slate-900 font-bold not-italic">{mockAttributaire.motherName}</span></span>
                 </div>
              </div>

              {/* Verified Contact Info Cards */}
              <div className="pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-5">
                 <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-emerald-300 transition-all cursor-pointer group hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <CreditCard size={18} />
                       </div>
                       <span className={THEME.typography.label + " opacity-60"}>Pièce d'identité</span>
                    </div>
                    <p className="text-[14px] font-black text-slate-800">{mockAttributaire.idCard}</p>
                 </div>

                 <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-emerald-300 transition-all cursor-pointer group hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <Phone size={18} />
                       </div>
                       <span className={THEME.typography.label + " opacity-60"}>Téléphone mobile</span>
                    </div>
                    <p className="text-[14px] font-black text-slate-800">{mockAttributaire.phones[0]}</p>
                 </div>

                 <div className="p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 hover:border-emerald-300 transition-all cursor-pointer group hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <MapPin size={18} />
                       </div>
                       <span className={THEME.typography.label + " opacity-60"}>Domicile actuel</span>
                    </div>
                    <p className="text-[14px] font-black text-slate-800 truncate">{mockAttributaire.address}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Disclaimer Banner */}
        <div 
          className="mt-10 p-6 flex items-start gap-6 border-2 transition-all hover:scale-[1.01]"
          style={{ 
            backgroundColor: THEME.colors.warning + '10', 
            borderColor: THEME.colors.warning + '20',
            borderRadius: THEME.borderRadius.lg 
          }}
        >
           <div 
             className="p-3 rounded-2xl shadow-xl shrink-0"
             style={{ backgroundColor: THEME.colors.surface, color: THEME.colors.warning }}
           >
              <Info size={28} />
           </div>
           <div>
              <h4 className="font-black uppercase text-[11px] tracking-widest mb-1.5" style={{ color: THEME.colors.warning }}>Contrôle de conformité requis</h4>
              <p className="text-[14px] text-slate-700 leading-relaxed font-semibold">
                L'identité affichée est extraite du registre national. En cas de non-concordance avec les documents physiques, l'agent doit immédiatement geler la demande et notifier le service de mise à jour des données.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
};

export default FormStepThree;
