
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Stepper from './components/Stepper';
import FormStepOne from './components/FormStepOne';
import FormStepTwo from './components/FormStepTwo';
import FormStepThree from './components/FormStepThree';
import FormStepFour from './components/FormStepFour';
import FormStepFive from './components/FormStepFive';
import ProcessDetails from './components/ProcessDetails';
import { DocumentType, FormData, Step } from './types';
import { THEME } from './constants';
import { FilePlus2, CheckCircle, Info, FileEdit } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'details' | 'form'>('details');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    documentType: "",
    subject: "",
    requestDate: new Date().toISOString().split('T')[0],
    reference: "",
    observation: "",
    commune: "",
    section: "",
    lot: "",
    parcelNumber: "",
    surface: "",
    usage: "",
    isMandataire: false,
    beneficiaryId: "PER-88776655",
    attachments: {},
    quittances: [{ id: 'q-1', reference: '', date: '', amount: '' }]
  });

  const steps: Step[] = [
    { id: 1, label: "1. Informations générales", status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending' },
    { id: 2, label: "2. Parcelle concernée", status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending' },
    { id: 3, label: "3. Bénéficiaire / Parties", status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending' },
    { id: 4, label: "4. Documents à joindre", status: currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'pending' },
    { id: 5, label: "5. Paiements et quittances", status: currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : 'pending' },
  ];

  const handleNext = () => currentStep < 5 && setCurrentStep(prev => prev + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const handleReset = () => {
    if (window.confirm("Voulez-vous vraiment réinitialiser le formulaire ?")) {
      setFormData({
        documentType: "", subject: "", requestDate: new Date().toISOString().split('T')[0],
        reference: "", observation: "", commune: "", section: "", lot: "", parcelNumber: "",
        surface: "", usage: "", isMandataire: false, beneficiaryId: "PER-88776655", attachments: {},
        quittances: [{ id: 'q-1', reference: '', date: '', amount: '' }]
      });
      setCurrentStep(1);
      setViewMode('details');
    }
  };

  useEffect(() => {
    const defaultSubject = formData.documentType === DocumentType.ATTRIBUTION 
      ? "Demande d’attestation d’attribution de parcelle" 
      : formData.documentType === DocumentType.CESSION 
        ? "Demande d’attestation de cession de parcelle" 
        : "";
    if (defaultSubject) setFormData(prev => ({ ...prev, subject: defaultSubject }));
  }, [formData.documentType]);

  const canGoNext = () => {
    if (currentStep === 1) return formData.documentType !== "" && formData.subject !== "";
    if (currentStep === 2) return formData.commune !== "" && formData.section !== "" && formData.parcelNumber !== "";
    if (currentStep === 3) return formData.beneficiaryId !== "";
    if (currentStep === 5) return formData.quittances.every(q => q.reference && q.date && q.amount);
    return true;
  };

  return (
    <div className="flex h-screen overflow-hidden relative" style={{ backgroundColor: THEME.colors.bgMain }}>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto w-full no-scrollbar">
          {/* Breadcrumb - Plus discret */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 mb-4 ml-1">
            <span className="hover:text-emerald-700 cursor-pointer transition-colors font-bold uppercase tracking-wider">SyCAD Admin</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-black uppercase tracking-wider">Nouvelle Demande</span>
          </div>

          {/* Header - Compact */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 ml-1">
            <div className="space-y-1">
              <div className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border border-emerald-200/50 w-fit">Dossier Actif</div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                Demande d’attestation <span className="text-emerald-600 italic">de parcelle</span>
              </h1>
            </div>
          </div>

          <div 
            className="bg-white shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden mb-8 flex flex-col transition-all duration-500 rounded-3xl"
          >
            {/* Onglets de navigation - Réduits */}
            <div className="flex bg-slate-50 border-b border-slate-100 p-1 gap-1">
               <button 
                 onClick={() => setViewMode('details')} 
                 className={`flex-1 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black transition-all rounded-xl flex items-center justify-center gap-2 ${
                   viewMode === 'details' 
                    ? 'bg-[#064e3b] text-white shadow-lg shadow-emerald-900/10' 
                    : 'text-slate-500 hover:bg-white hover:text-emerald-700'
                 }`}
               >
                 <Info size={14} />
                 <span>Détails processus</span>
               </button>
               <button 
                 onClick={() => setViewMode('form')} 
                 className={`flex-1 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black transition-all rounded-xl flex items-center justify-center gap-2 ${
                   viewMode === 'form' 
                    ? 'bg-[#064e3b] text-white shadow-lg shadow-emerald-900/10' 
                    : 'text-slate-500 hover:bg-white hover:text-emerald-700'
                 }`}
               >
                 <FileEdit size={14} />
                 <span>Création Demande</span>
               </button>
            </div>

            {viewMode === 'form' && <Stepper steps={steps} />}
            
            <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
              {viewMode === 'details' ? (
                <ProcessDetails onStart={() => setViewMode('form')} />
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 py-2">
                    {currentStep === 1 && <FormStepOne formData={formData} setFormData={setFormData} />}
                    {currentStep === 2 && <FormStepTwo formData={formData} setFormData={setFormData} />}
                    {currentStep === 3 && <FormStepThree formData={formData} setFormData={setFormData} />}
                    {currentStep === 4 && <FormStepFour formData={formData} setFormData={setFormData} />}
                    {currentStep === 5 && <FormStepFive formData={formData} setFormData={setFormData} />}
                  </div>

                  {/* Actions de bas de page - Réduites */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button onClick={handleReset} className="text-slate-400 font-black hover:text-slate-600 transition-all uppercase tracking-widest text-[8px] sm:text-[9px]">Réinitialiser</button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      {currentStep > 1 && (
                        <button 
                          onClick={handleBack} 
                          className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-slate-200 font-black text-slate-500 hover:bg-slate-50 transition-all text-[11px]"
                        >
                          Précédent
                        </button>
                      )}
                      
                      <button 
                        onClick={handleNext} 
                        disabled={!canGoNext()} 
                        className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-black transition-all flex items-center justify-center gap-2 text-[11px] shadow-sm ${
                          canGoNext() 
                            ? 'bg-[#064e3b] text-white hover:bg-emerald-900' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <span className="whitespace-nowrap uppercase tracking-wider">{currentStep < 5 ? 'Continuer' : 'Finaliser'}</span>
                        {currentStep < 5 && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-1 opacity-40 pb-6">
             <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">SyCAD • SYSTEME DE GESTION FONCIERE</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
