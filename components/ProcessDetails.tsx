
import React, { useState } from 'react';
import { Clock, Paperclip, FileText, Map, ArrowRight } from 'lucide-react';

interface ProcessDetailsProps {
  onStart: () => void;
}

const ProcessDetails: React.FC<ProcessDetailsProps> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState<'pieces' | 'documents' | 'destination'>('pieces');

  const piecesList = [
    { label: "Copie legalisée du Document d'identification (Cerficat IFU, CNIB, PASSPORT, Etc..)", count: 1, mandatory: true },
    { label: "Document d'Attribution (Original): Fiche provisoire, papillon, Copie de l'arrete de cession...", count: 1, mandatory: true },
    { label: "Quittance de paiement des droits et Taxes", count: 1, mandatory: true },
    { label: "Quittance de paiement de la Taxe de Residence ou Certificat de non imposition", count: 1, mandatory: true },
    { label: "Extrait cadastral daté et signé de moins de 03 mois", count: 1, mandatory: true },
    { label: "Fiche d'Identification Cadastrale", count: 1, mandatory: false },
    { label: "Timbre Fiscal de 500F à fournir", count: 1, mandatory: false },
    { label: "Demande Timbrée à 200F (Timbre Fiscal)", count: 1, mandatory: false },
    { label: "PV de Bornage du Terrain (si necessaire)", count: 1, mandatory: false }
  ];

  const tabClasses = (tab: typeof activeTab) => `
    flex-1 flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-black transition-all duration-300 border-b-2 shrink-0
    ${activeTab === tab 
      ? `border-emerald-600 text-emerald-900 bg-emerald-50/40` 
      : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
    }
  `;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex flex-col h-full overflow-x-hidden">
      <div className="flex justify-start mb-3">
        <div className="bg-emerald-50/60 border border-emerald-100 px-2.5 py-1 rounded-md flex items-center gap-2">
          <Clock className="text-emerald-600" size={12} />
          <span className="text-[9px] font-bold text-slate-600 tracking-tight">Délai : <span className="text-emerald-700 font-black">7 jours</span></span>
        </div>
      </div>

      <div className="bg-slate-50/50 border border-slate-100 rounded-lg p-3.5 mb-5">
        <p className="text-slate-600 text-[11px] leading-relaxed">
          Le processus de délivrance d'attestation d'attribution ou de cession provisoire de parcelle en ligne permet à toute personne physique ou morale attributaire de formaliser son dossier.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-xl shadow-sm overflow-hidden flex flex-col mb-5">
        <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar flex-nowrap bg-slate-50/20">
           <button onClick={() => setActiveTab('pieces')} className={tabClasses('pieces')}>
             <Paperclip size={12} />
             <span className="whitespace-nowrap uppercase tracking-widest">Pièces Requises</span>
           </button>
           <button onClick={() => setActiveTab('documents')} className={tabClasses('documents')}>
             <FileText size={12} />
             <span className="whitespace-nowrap uppercase tracking-widest">Actes</span>
           </button>
           <button onClick={() => setActiveTab('destination')} className={tabClasses('destination')}>
             <Map size={12} />
             <span className="whitespace-nowrap uppercase tracking-widest">Zones</span>
           </button>
        </div>

        <div className="overflow-hidden">
          {activeTab === 'pieces' && (
            <div className="animate-in fade-in duration-300">
              <div className="hidden md:block">
                <div className="grid grid-cols-12 gap-4 px-5 py-2 bg-slate-50/80 text-[8px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  <div className="col-span-8">Désignation</div>
                  <div className="col-span-2 text-center">Qté</div>
                  <div className="col-span-2 text-center">Type</div>
                </div>
                <div className="divide-y divide-slate-50 max-h-[220px] overflow-y-auto custom-scrollbar no-scrollbar">
                  {piecesList.map((piece, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 px-5 py-3 items-center hover:bg-emerald-50/20 transition-all">
                      <div className="col-span-8 text-[11px] font-bold text-slate-700 leading-tight">{piece.label}</div>
                      <div className="col-span-2 text-center">
                        <span className="font-black text-slate-400 text-[10px]">{piece.count}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase ${piece.mandatory ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                          {piece.mandatory ? 'Requis' : 'Option'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:hidden divide-y divide-slate-100">
                {piecesList.map((piece, i) => (
                  <div key={i} className="p-3 flex flex-col gap-1">
                    <h4 className="text-[10px] font-bold text-slate-800 leading-tight">{piece.label}</h4>
                    <div className="flex items-center justify-between">
                       <span className="text-[8px] font-black text-slate-400 uppercase">Quantité: {piece.count}</span>
                       <span className={`text-[7px] font-black px-1.5 py-0.5 rounded uppercase ${piece.mandatory ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-100'}`}>
                         {piece.mandatory ? 'Requis' : 'Optionnel'}
                       </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab !== 'pieces' && (
             <div className="p-8 text-center text-slate-300 text-[9px] uppercase font-black tracking-widest">En attente de données...</div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
         <div className="flex items-center gap-1.5 opacity-40">
           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
           <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Prêt</span>
         </div>
         <button 
           onClick={onStart}
           className="px-6 py-2 bg-[#064e3b] text-white rounded-lg font-black text-[11px] flex items-center justify-center gap-2 shadow-md hover:bg-emerald-900 transition-all active:scale-95 uppercase tracking-wide"
         >
           Commencer le dossier
           <ArrowRight size={14} />
         </button>
      </div>
    </div>
  );
};

export default ProcessDetails;
