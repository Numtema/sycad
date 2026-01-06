
import React, { useState } from 'react';
import { FormData, AttachmentMetadata } from '../types';
import { 
  Upload, FileText, Trash2, 
  Eye, Paperclip, FileCheck, X, Info
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
    const existing = formData.attachments[id];
    setTempMetadata(existing || {
      reference: '', date: '', amount: '', validityDate: '', authority: '', observation: ''
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#064e3b] rounded-xl text-white shadow-sm">
        <div className="flex items-center gap-3">
          <Paperclip size={18} className="opacity-80" />
          <span className="font-bold text-xs uppercase tracking-widest">Gestion des Pièces</span>
        </div>
        <div className="bg-white/10 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
          {Object.keys(formData.attachments).length} / {documents.filter(d => d.mandatory).length} REQUIS
        </div>
      </div>

      {editingDocId && currentDoc ? (
        <div className="animate-in zoom-in-95 duration-200 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg max-w-2xl mx-auto">
           <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2">
               <FileText size={16} className="text-emerald-600" />
               <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight truncate max-w-[300px]">{currentDoc.label}</span>
             </div>
             <button onClick={() => setEditingDocId(null)} className="text-slate-400 hover:text-rose-500 transition-colors p-1">
               <X size={18} />
             </button>
           </div>
           
           <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                 {[
                   { label: 'Référence', name: 'reference', type: 'text' },
                   { label: 'Date', name: 'date', type: 'date' },
                   { label: 'Montant', name: 'amount', type: 'text' },
                   { label: 'Date de validité', name: 'validityDate', type: 'date' }
                 ].map((field) => (
                   <div key={field.name} className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block ml-1">{field.label}</label>
                      <input 
                        name={field.name}
                        value={(tempMetadata as any)[field.name]}
                        onChange={handleMetadataChange}
                        type={field.type}
                        className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-slate-700 text-xs shadow-sm" 
                      />
                   </div>
                 ))}
              </div>
              
              <div className="border-2 border-dashed border-slate-100 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-emerald-50/30 transition-all cursor-pointer group">
                 <Upload size={20} className="text-slate-300 mb-2 group-hover:text-emerald-500 transition-colors" />
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Joindre le scan (PDF/JPG)</p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                 <button onClick={() => setEditingDocId(null)} className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Annuler</button>
                 <button onClick={saveAttachment} className="px-6 py-2 bg-[#064e3b] text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-emerald-900">Enregistrer</button>
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {documents.map((doc) => {
            const attached = !!formData.attachments[doc.id];
            return (
              <div 
                key={doc.id} 
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                  attached ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-white hover:border-emerald-100/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                   <div className={`shrink-0 ${attached ? 'text-emerald-600' : 'text-slate-300'}`}>
                      {attached ? <FileCheck size={18} /> : <FileText size={18} />}
                   </div>
                   <div className="truncate">
                      <h4 className="text-[11px] font-bold text-slate-700 leading-tight truncate">{doc.label}</h4>
                      <p className="text-[8px] font-black text-slate-400 uppercase mt-0.5">Exemplaire: {doc.exemplaire}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 ml-4">
                   <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter ${doc.mandatory ? 'text-rose-600 bg-rose-50' : 'text-slate-400 bg-slate-50'}`}>
                      {doc.mandatory ? 'Requis' : 'Option'}
                   </span>
                   <div className="flex gap-1">
                      {attached ? (
                        <>
                           <button onClick={() => startEditing(doc.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"><Eye size={14} /></button>
                           <button onClick={() => removeAttachment(doc.id)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"><Trash2 size={14} /></button>
                        </>
                      ) : (
                        <button 
                          onClick={() => startEditing(doc.id)}
                          className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 transition-colors uppercase tracking-widest"
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
      )}
      
      {!editingDocId && (
        <div className="p-4 bg-emerald-50/30 border border-emerald-100 rounded-xl flex items-start gap-3">
          <Info size={16} className="text-emerald-600 mt-0.5" />
          <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">
            Les documents marqués comme <span className="font-black">REQUIS</span> sont indispensables pour l'étude de votre dossier. Veuillez vous assurer de la lisibilité des scans.
          </p>
        </div>
      )}
    </div>
  );
};

export default FormStepFour;
