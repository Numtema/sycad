
import React, { useState } from 'react';
import { FormData, AttachmentMetadata } from '../types';
import { 
  Upload, FileText, CheckCircle, AlertCircle, Trash2, 
  Eye, Info, Paperclip, FileCheck, MinusCircle, Plus, X 
} from 'lucide-react';

interface FormStepFourProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

interface DocumentItem {
  id: string;
  label: string;
  mandatory: boolean;
  exemplaire: number;
}

const FormStepFour: React.FC<FormStepFourProps> = ({ formData, setFormData }) => {
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [tempMetadata, setTempMetadata] = useState<AttachmentMetadata>({
    reference: '',
    date: '',
    amount: '',
    validityDate: '',
    authority: '',
    observation: ''
  });

  const documents: DocumentItem[] = [
    { id: "doc-1", label: "Copie legalisée du Document d'identification (Cerficat IFU, CNIB, PASSPORT, Etc..)", mandatory: true, exemplaire: 1 },
    { id: "doc-2", label: "Document d'Attribution (Original): Fiche provisoire, papillon, Copie de l'arrete de cession, Etat Descriptif Morcellement ou Fusion, autres ...", mandatory: true, exemplaire: 1 },
    { id: "doc-3", label: "Quittance de paiement des droits et Taxes", mandatory: true, exemplaire: 1 },
    { id: "doc-4", label: "Quittance de paiement de la Taxe de Residence ou Certificat de non imposition", mandatory: true, exemplaire: 1 },
    { id: "doc-5", label: "Extrait cadastral daté et signé de moins de 03 mois", mandatory: true, exemplaire: 1 },
    { id: "doc-6", label: "Fiche d'Identification Cadastrale", mandatory: false, exemplaire: 1 },
    { id: "doc-7", label: "Timbre Fiscal de 500F à fournir", mandatory: false, exemplaire: 1 },
    { id: "doc-8", label: "Demande Timbrée à 200F (Timbre Fiscal)", mandatory: false, exemplaire: 1 },
    { id: "doc-9", label: "PV de Bornage du Terrain (si necessaire)", mandatory: false, exemplaire: 1 }
  ];

  const startEditing = (id: string) => {
    setEditingDocId(id);
    setTempMetadata(formData.attachments[id] || {
      reference: '',
      date: '',
      amount: '',
      validityDate: '',
      authority: '',
      observation: ''
    });
  };

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempMetadata(prev => ({ ...prev, [name]: value }));
  };

  const saveAttachment = () => {
    if (editingDocId) {
      setFormData(prev => ({
        ...prev,
        attachments: {
          ...prev.attachments,
          [editingDocId]: { ...tempMetadata, fileName: tempMetadata.fileName || "document_attache.pdf" }
        }
      }));
      setEditingDocId(null);
    }
  };

  const removeAttachment = (id: string) => {
    setFormData(prev => {
      const newAttachments = { ...prev.attachments };
      delete newAttachments[id];
      return { ...prev, attachments: newAttachments };
    });
    if (editingDocId === id) setEditingDocId(null);
  };

  const currentDoc = documents.find(d => d.id === editingDocId);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-[#064e3b] rounded-2xl shadow-lg shadow-emerald-200/50 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md">
            <Paperclip size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight">Pièces Jointes Obligatoires & Facultatives</span>
            <span className="text-[10px] uppercase font-bold text-emerald-100 tracking-widest mt-0.5">Vérification de la recevabilité du dossier</span>
          </div>
        </div>
        <div className="bg-white/10 px-5 py-2 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          <span className="text-xs font-black uppercase">
            {Object.keys(formData.attachments).length} / {documents.filter(d => d.mandatory).length} Requis
          </span>
        </div>
      </div>

      {editingDocId && currentDoc ? (
        <div className="animate-in zoom-in-95 duration-300">
           {/* Active Document Header */}
           <div className="bg-slate-100/50 border-2 border-slate-100 p-4 rounded-t-[2rem] flex items-center justify-between border-b-0">
             <div className="flex items-center gap-3">
               <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
               <span className="text-sm font-bold text-slate-700 truncate max-w-md">{currentDoc.label}</span>
               <span className="text-xs font-black text-slate-400 bg-white px-3 py-0.5 rounded-full border border-slate-200">{currentDoc.exemplaire}</span>
               <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{currentDoc.mandatory ? 'OUI' : 'NON'}</span>
             </div>
             <button onClick={() => setEditingDocId(null)} className="text-slate-400 hover:text-rose-500 transition-colors">
               <X size={20} />
             </button>
           </div>

           {/* Detail Form Box */}
           <div className="bg-white border-2 border-slate-100 rounded-b-[2.5rem] p-8 md:p-12 relative shadow-2xl shadow-slate-100">
             <button 
                onClick={() => setEditingDocId(null)}
                className="absolute top-4 right-4 text-rose-500 hover:scale-110 transition-transform"
             >
                <MinusCircle size={28} />
             </button>

             <div className="mb-8">
               <button className="flex items-center gap-2 px-5 py-2.5 bg-[#064e3b] text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-900 transition-all">
                 <Plus size={18} />
                 Ajouter
               </button>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Libellé</label>
                   <input 
                      type="text" 
                      value={currentDoc.label} 
                      readOnly 
                      className="w-full border-b-2 border-slate-200 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700 bg-transparent"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Référence</label>
                      <input 
                        name="reference"
                        value={tempMetadata.reference}
                        onChange={handleMetadataChange}
                        type="text" 
                        className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Date</label>
                      <div className="relative">
                        <input 
                          name="date"
                          value={tempMetadata.date}
                          onChange={handleMetadataChange}
                          type="date" 
                          className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700 cursor-pointer" 
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Montant</label>
                      <input 
                        name="amount"
                        value={tempMetadata.amount}
                        onChange={handleMetadataChange}
                        type="text" 
                        className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Date de validité</label>
                      <input 
                        name="validityDate"
                        value={tempMetadata.validityDate}
                        onChange={handleMetadataChange}
                        type="date" 
                        className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700 cursor-pointer" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Autorité de délivrance</label>
                      <input 
                        name="authority"
                        value={tempMetadata.authority}
                        onChange={handleMetadataChange}
                        type="text" 
                        className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700" 
                      />
                   </div>
                   <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">Observation</label>
                      <input 
                        name="observation"
                        value={tempMetadata.observation}
                        onChange={handleMetadataChange}
                        type="text" 
                        className="w-full border-b-2 border-slate-100 py-2 focus:outline-none focus:border-emerald-500 transition-all font-bold text-slate-700" 
                      />
                   </div>
                </div>

                {/* Drop Zone */}
                <div className="mt-10">
                   <div className="border-4 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl p-10 flex flex-col items-center justify-center group cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-emerald-500 shadow-sm transition-all mb-4">
                         <Upload size={32} />
                      </div>
                      <p className="text-slate-500 font-bold text-center">Cliquez ou faites glisser la pièce ici jointe. <span className="text-emerald-600">(pdf/image)</span></p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Taille maxi : 100 mb</p>
                   </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                   <button 
                     onClick={() => setEditingDocId(null)}
                     className="px-8 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition-all"
                   >
                     Annuler
                   </button>
                   <button 
                     onClick={saveAttachment}
                     className="px-10 py-3 bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-800 transition-all"
                   >
                     Enregistrer
                   </button>
                </div>
             </div>
           </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-6 mb-2 hidden md:flex">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Désignation du document</span>
            <div className="flex items-center gap-16 pr-12">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-12 text-center">Copies</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-16 text-center">Status</span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-24 text-center">Action</span>
            </div>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => {
              const attached = !!formData.attachments[doc.id];
              return (
                <div 
                  key={doc.id} 
                  className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-[2rem] border-2 transition-all duration-300 ${
                    attached ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-50 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-1">
                     <div className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center ${attached ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {attached ? <FileCheck size={20} /> : <FileText size={20} />}
                     </div>
                     <div className="flex flex-col pt-0.5">
                        <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{doc.label}</h4>
                        {doc.mandatory && !attached && (
                          <span className="text-[9px] font-black text-rose-500 uppercase mt-2 flex items-center gap-1">
                            <AlertCircle size={10} /> Requis
                          </span>
                        )}
                     </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-12 mt-4 md:mt-0">
                     <span className="text-sm font-black text-slate-600 w-12 text-center">{doc.exemplaire}</span>
                     <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${doc.mandatory ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                        {doc.mandatory ? 'OUI' : 'NON'}
                     </span>
                     <div className="w-24 flex justify-end">
                        {attached ? (
                          <div className="flex gap-2">
                             <button onClick={() => startEditing(doc.id)} className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200"><Eye size={16} /></button>
                             <button onClick={() => removeAttachment(doc.id)} className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200"><Trash2 size={16} /></button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => startEditing(doc.id)}
                            className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                          >
                            Joindre
                          </button>
                        )}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="mt-12 p-8 bg-amber-50/40 border-2 border-amber-100 rounded-[3rem] flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <div className="w-14 h-14 bg-white rounded-2xl shadow-xl shadow-amber-200/50 flex items-center justify-center text-amber-500 shrink-0">
           <AlertCircle size={32} />
        </div>
        <div className="text-center md:text-left">
           <h5 className="font-black text-amber-800 text-sm uppercase tracking-widest mb-1">Avertissement de recevabilité</h5>
           <p className="text-sm text-amber-900/60 font-medium leading-relaxed">
             Les originaux des pièces jointes scannées pourront être exigés par le service instructeur lors du retrait de l'attestation finale. 
             Tout document falsifié expose le demandeur à des poursuites judiciaires.
           </p>
        </div>
      </div>
    </div>
  );
};

export default FormStepFour;
