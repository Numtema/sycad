
import React, { useState } from 'react';
import { Clock, Paperclip, FileText, Map, ArrowRight, Landmark, Check, AlertCircle } from 'lucide-react';
import { THEME } from '../constants';

interface ProcessDetailsProps {
  onStart: () => void;
}

const ProcessDetails: React.FC<ProcessDetailsProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<'pieces' | 'documents' | 'destination'>('pieces');

  const piecesList = [
    { label: "Copie legalisée du Document d'identification (Cerficat IFU, CNIB, PASSPORT, Etc..)", count: 1, mandatory: true },
    { label: "Document d'Attribution (Original): Fiche provisoire, papillon, Copie de l'arrete de cession, Etat Descriptif Morcellement ou Fusion, autres ...", count: 1, mandatory: true },
    { label: "Quittance de paiement des droits et Taxes", count: 1, mandatory: true },
    { label: "Quittance de paiement de la Taxe de Residence ou Certificat de non imposition", count: 1, mandatory: true },
    { label: "Extrait cadastral daté et signé de moins de 03 mois", count: 1, mandatory: true },
    { label: "Fiche d'Identification Cadastrale", count: 1, mandatory: false },
    { label: "Timbre Fiscal de 500F à fournir", count: 1, mandatory: false },
    { label: "Demande Timbrée à 200F (Timbre Fiscal)", count: 1, mandatory: false },
    { label: "PV de Bornage du Terrain (si necessaire)", count: 1, mandatory: false }
  ];

  const deliveredDocuments = [
    { code: "ACP", label: "ATTESTATION DE CESSION PARCELLE", foncier: false, parcelle: true, actif: true },
    { code: "AAP", label: "ATTESTATION D'ATTRIBUTION DE PARCELLE", foncier: false, parcelle: true, actif: true }
  ];

  const destinationParcelles = [
    { code: "HAB", label: "ZONE D'HABITATION", ministere: "Ministère de l'Habitat et de l'Urbanisme" },
    { code: "COM", label: "ZONE COMMERCIALE", ministere: "Ministère du Commerce et de l'Industrie" },
    { code: "IND", label: "ZONE INDUSTRIELLE", ministere: "Ministère de l'Industrie" },
    { code: "EQU", label: "ÉQUIPEMENT PUBLIC", ministere: "Ministère de l'Administration Territoriale" }
  ];

  const tabClasses = (tab: typeof activeTab) => `
    flex-1 flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-4 sm:py-5 text-[9px] sm:text-sm font-black transition-all duration-300 border-b-2 shrink-0
    ${activeTab === tab 
      ? `border-emerald-600 text-emerald-900 bg-emerald-50/30` 
      : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }
  `;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col h-full overflow-x-hidden">
      {/* Processing Time Badge */}
      <div className="flex justify-start mb-6 sm:mb-8">
        <div className="bg-emerald-50 border border-emerald-100 px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl flex items-center gap-2 sm:gap-3 shadow-sm">
          <Clock className="text-emerald-600 size-4 sm:size-[18px]" />
          <span className="text-[10px] sm:text-sm font-bold text-slate-700">Délai : <span className="text-emerald-700 font-black">7 jour (s)</span></span>
        </div>
      </div>

      {/* Description Card */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 mb-8 sm:mb-10 shadow-inner">
        <div className="space-y-4 sm:space-y-5 text-slate-600 font-medium leading-relaxed text-xs sm:text-[16px]">
          <p className="first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-black first-letter:text-emerald-600 first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3">
            Le processus de délivrance d'attestation d'attribution ou de cession provisoire de parcelle en ligne permet à toute personne physique ou morale attributaire de parcelle ayant finalisé le paiement de la Taxe de jouissance d'obtenir ce titre d'occupation précieux.
          </p>
          <div className="flex gap-4 sm:gap-6 items-start">
             <div className="w-1 h-20 sm:w-1.5 bg-emerald-500/20 rounded-full shrink-0"></div>
             <div className="space-y-3 sm:space-y-4">
               <p className="text-[11px] sm:text-sm">
                 Il concerne aussi les personnes ayant effectué un morcellement ou une fusion de parcelles à l'aide de leur attestation d'attribution ou de cession de parcelle existante.
               </p>
               <p className="text-slate-800 font-bold text-[11px] sm:text-sm">
                 Dans ce cas, le PV de bornage et les États descriptifs sont impératifs.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* Balanced Tab Navigation */}
      <div className="bg-white border border-slate-100 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col mb-8 sm:mb-10">
        <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar flex-nowrap">
           <button onClick={() => setActiveTab('pieces')} className={tabClasses('pieces')}>
             <Paperclip size={14} className="sm:size-[18px]" />
             <span className="whitespace-nowrap">Pièces</span>
           </button>
           <button onClick={() => setActiveTab('documents')} className={tabClasses('documents')}>
             <FileText size={14} className="sm:size-[18px]" />
             <span className="whitespace-nowrap">Documents</span>
           </button>
           <button onClick={() => setActiveTab('destination')} className={tabClasses('destination')}>
             <Map size={14} className="sm:size-[18px]" />
             <span className="whitespace-nowrap">Destinations</span>
           </button>
        </div>

        {/* Tab Content Responsive Rendering */}
        <div className="overflow-hidden">
          {activeTab === 'pieces' && (
            <div className="animate-in fade-in duration-500">
              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 px-10 py-4 bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                  <div className="col-span-8">Désignation de la pièce</div>
                  <div className="col-span-2 text-center">Quantité</div>
                  <div className="col-span-2 text-center">Obligatoire</div>
                </div>
                <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {piecesList.map((piece, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 px-10 py-5 items-center hover:bg-emerald-50/30 transition-all">
                      <div className="col-span-8 text-[14.5px] font-bold text-slate-700 leading-snug">{piece.label}</div>
                      <div className="col-span-2 text-center">
                        <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto font-black text-slate-600">{piece.count}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-lg uppercase ${piece.mandatory ? 'text-emerald-700 bg-emerald-100/50' : 'text-slate-400 bg-slate-100'}`}>
                          {piece.mandatory ? 'OUI' : 'NON'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile View - Cards */}
              <div className="md:hidden divide-y divide-slate-100">
                {piecesList.map((piece, i) => (
                  <div key={i} className="p-4 space-y-2.5 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${piece.mandatory ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                      <h4 className="text-[11px] font-bold text-slate-800 leading-tight">{piece.label}</h4>
                    </div>
                    <div className="flex items-center justify-between pl-4.5">
                       <span className="text-[9px] font-black text-slate-400 uppercase">Ex: {piece.count}</span>
                       <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${piece.mandatory ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                         {piece.mandatory ? 'Requis' : 'Optionnel'}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="animate-in fade-in duration-500">
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 px-10 py-4 bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                  <div className="col-span-2">Code Acte</div>
                  <div className="col-span-5">Libellé du document</div>
                  <div className="col-span-5 flex justify-around">
                    <span className="w-24 text-center">T. Foncier</span>
                    <span className="w-24 text-center">T. Parcelle</span>
                    <span className="w-20 text-center">Actif</span>
                  </div>
                </div>
                {deliveredDocuments.map((doc, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-10 py-6 items-center hover:bg-emerald-50/30 transition-all">
                    <div className="col-span-2 font-black text-emerald-900 bg-emerald-50 w-fit px-3 py-1 rounded-lg border border-emerald-100">{doc.code}</div>
                    <div className="col-span-5 text-[15px] font-black text-slate-700">{doc.label}</div>
                    <div className="col-span-5 flex justify-around">
                       {[doc.foncier, doc.parcelle, doc.actif].map((val, idx) => (
                         <span key={idx} className={`w-20 text-center text-[10px] font-black px-2 py-1 rounded-lg border ${val ? 'text-emerald-700 bg-emerald-50 border-emerald-100' : 'text-slate-300 bg-slate-50 border-slate-100'}`}>
                           {val ? 'OUI' : 'NON'}
                         </span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:hidden divide-y divide-slate-100">
                {deliveredDocuments.map((doc, i) => (
                  <div key={i} className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <span className="font-black text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg text-[10px]">{doc.code}</span>
                       <div className="flex gap-2">
                         {doc.actif && <span className="bg-emerald-500/10 text-emerald-600 p-1 rounded-full"><Check size={10} /></span>}
                       </div>
                    </div>
                    <h4 className="text-[13px] font-black text-slate-800 leading-tight">{doc.label}</h4>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                       <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Foncier</p>
                          <p className={`text-[10px] font-bold ${doc.foncier ? 'text-emerald-700' : 'text-slate-400'}`}>{doc.foncier ? 'OUI' : 'NON'}</p>
                       </div>
                       <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Parcelle</p>
                          <p className={`text-[10px] font-bold ${doc.parcelle ? 'text-emerald-700' : 'text-slate-400'}`}>{doc.parcelle ? 'OUI' : 'NON'}</p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'destination' && (
            <div className="animate-in fade-in duration-500">
              <div className="hidden md:block">
                 <div className="grid grid-cols-12 gap-4 px-10 py-4 bg-slate-50/50 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                  <div className="col-span-2">Référence</div>
                  <div className="col-span-4">Type de destination</div>
                  <div className="col-span-6">Ministère de tutelle</div>
                </div>
                {destinationParcelles.map((dest, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-10 py-6 items-center hover:bg-emerald-50/30 transition-all">
                    <div className="col-span-2 font-black text-slate-800">{dest.code}</div>
                    <div className="col-span-4 font-bold text-slate-700">{dest.label}</div>
                    <div className="col-span-6 text-sm font-semibold text-slate-500">{dest.ministere}</div>
                  </div>
                ))}
              </div>
              <div className="md:hidden divide-y divide-slate-100">
                {destinationParcelles.map((dest, i) => (
                  <div key={i} className="p-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                       <div className="bg-slate-100 p-1.5 rounded-lg text-slate-400"><Landmark size={12} /></div>
                       <span className="font-black text-slate-900 text-[11px]">{dest.code} - {dest.label}</span>
                    </div>
                    <p className="text-[9px] text-slate-500 italic pl-9 leading-tight">{dest.ministere}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-3 text-slate-400 order-2 sm:order-1">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           <span className="text-[9px] font-black uppercase tracking-widest">Initialisation prête</span>
         </div>
         <button 
           onClick={onStart}
           className="w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-5 bg-[#064e3b] text-white rounded-[1.25rem] sm:rounded-[2rem] font-black text-sm sm:text-[18px] flex items-center justify-center gap-3 sm:gap-4 shadow-xl sm:shadow-2xl shadow-emerald-900/40 hover:bg-emerald-900 transition-all hover:-translate-y-1 active:translate-y-0 group order-1 sm:order-2"
         >
           Commencer le dossier
           <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300 sm:size-24" size={18} />
         </button>
      </div>
    </div>
  );
};

export default ProcessDetails;
