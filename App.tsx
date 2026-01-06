
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
import { FilePlus2, CheckCircle, Upload, CreditCard, Map as MapIcon, Users as UsersIcon, Info, FileEdit, X } from 'lucide-react';

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

  const stepIcons = [<FilePlus2 key="1" />, <MapIcon key="2" />, <UsersIcon key="3" />, <Upload key="4" />, <CreditCard key="5" />];
  
  const canGoNext = () => {
    if (currentStep === 1) return formData.documentType !== "" && formData.subject !== "";
    if (currentStep === 2) return formData.commune !== "" && formData.section !== "" && formData.parcelNumber !== "";
    if (currentStep === 3) return formData.beneficiaryId !== "";
    if (currentStep === 5) return formData.quittances.every(q => q.reference && q.date && q.amount);
    return true;
  };

  return (
    <div className="flex min-h-screen relative overflow-x-hidden" style={{ backgroundColor: THEME.colors.bgMain }}>
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col w-full min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 sm:p-6 md:p-12 lg:p-16 max-w-[1500px] mx-auto w-full transition-all duration-300">
          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] sm:text-[13px] text-slate-400 mb-6 sm:mb-10 ml-2">
            <span className="hover:text-emerald-700 cursor-pointer transition-colors font-bold">SyCAD Admin</span>
            <span className="text-slate-300 font-light">/</span>
            <span className="text-slate-900 font-black uppercase tracking-widest">Nouvelle Demande</span>
          </div>

          {/* Page Header Area */}
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 ${THEME.spacing.headerMargin} ml-2`}>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-800 px-3 sm:px-4 py-1.5 rounded-2xl text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] border border-emerald-200/50 shadow-sm shadow-emerald-900/5">Dossier Actif</div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Demande d’attestation <span className="text-emerald-600 font-black sm:italic block sm:inline">de parcelle</span>
              </h1>
            </div>
            
            <div className="hidden sm:flex w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] sm:rounded-[2.5rem] bg-emerald-50 border-2 border-emerald-100 items-center justify-center text-emerald-600 shadow-xl shadow-emerald-900/5 hover:scale-110 transition-transform cursor-pointer group">
               <div className="group-hover:rotate-12 transition-transform">
                  {viewMode === 'details' ? <FilePlus2 size={28} className="sm:size-32" /> : stepIcons[currentStep-1]}
               </div>
            </div>
          </div>

          {/* Main Content Card Container */}
          <div 
            className="bg-white shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-8 sm:mb-20 flex flex-col transition-all duration-500"
            style={{ borderRadius: window.innerWidth < 640 ? '1.5rem' : THEME.borderRadius.md }}
          >
            {/* Primary View Toggle (Top Tabs) */}
            <div className="flex bg-slate-100/30 border-b border-slate-100 p-1 sm:p-1.5 gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
               <button 
                 onClick={() => setViewMode('details')} 
                 className={`flex-1 shrink-0 px-4 sm:px-12 py-3.5 sm:py-5 text-[10px] sm:text-sm font-black transition-all rounded-[1.25rem] sm:rounded-[2rem] flex items-center justify-center gap-2 sm:gap-3 ${
                   viewMode === 'details' 
                    ? 'bg-[#064e3b] text-white shadow-lg sm:shadow-xl shadow-emerald-900/20' 
                    : 'text-slate-500 hover:bg-white hover:text-emerald-700'
                 }`}
               >
                 <Info size={16} className="sm:size-20" />
                 <span className="whitespace-nowrap">Détails processus</span>
               </button>
               <button 
                 onClick={() => setViewMode('form')} 
                 className={`flex-1 shrink-0 px-4 sm:px-12 py-3.5 sm:py-5 text-[10px] sm:text-sm font-black transition-all rounded-[1.25rem] sm:rounded-[2rem] flex items-center justify-center gap-2 sm:gap-3 ${
                   viewMode === 'form' 
                    ? 'bg-[#064e3b] text-white shadow-lg sm:shadow-xl shadow-emerald-900/20' 
                    : 'text-slate-500 hover:bg-white hover:text-emerald-700'
                 }`}
               >
                 <FileEdit size={16} className="sm:size-20" />
                 <span className="whitespace-nowrap">Création Demande</span>
               </button>
            </div>

            {viewMode === 'form' && <Stepper steps={steps} />}
            
            <div className={`flex-1 flex flex-col p-4 sm:p-8 md:p-12 lg:p-16`}>
              {viewMode === 'details' ? (
                <ProcessDetails onStart={() => setViewMode('form')} />
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                    {currentStep === 1 && <FormStepOne formData={formData} setFormData={setFormData} />}
                    {currentStep === 2 && <FormStepTwo formData={formData} setFormData={setFormData} />}
                    {currentStep === 3 && <FormStepThree formData={formData} setFormData={setFormData} />}
                    {currentStep === 4 && <FormStepFour formData={formData} setFormData={setFormData} />}
                    {currentStep === 5 && <FormStepFive formData={formData} setFormData={setFormData} />}
                  </div>

                  {/* Navigation Footer */}
                  <div className="mt-6 sm:mt-16 pt-6 sm:pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
                    <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-center sm:justify-start">
                      <button onClick={handleReset} className="px-3 sm:px-8 py-3 sm:py-4 rounded-xl text-slate-400 font-black hover:bg-slate-50 hover:text-slate-600 transition-all uppercase tracking-widest text-[9px] sm:text-xs">Réinitialiser</button>
                      <button className="px-3 sm:px-8 py-3 sm:py-4 rounded-xl text-rose-400 font-black hover:bg-rose-50 hover:text-rose-600 transition-all uppercase tracking-widest text-[9px] sm:text-xs">Abandonner</button>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-5 w-full sm:w-auto">
                      {currentStep > 1 && (
                        <button 
                          onClick={handleBack} 
                          className="flex-1 sm:flex-none px-4 sm:px-12 py-3.5 sm:py-5 rounded-[1.25rem] sm:rounded-[2rem] border-2 border-slate-100 font-black text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all shadow-sm text-xs sm:text-base"
                        >
                          Précédent
                        </button>
                      )}
                      
                      <button 
                        onClick={handleNext} 
                        disabled={!canGoNext()} 
                        className={`flex-1 sm:flex-none px-6 sm:px-16 py-3.5 sm:py-5 rounded-[1.25rem] sm:rounded-[2rem] font-black transition-all flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-lg shadow-xl sm:shadow-2xl ${
                          canGoNext() 
                            ? 'bg-[#064e3b] text-white hover:bg-emerald-900 shadow-emerald-900/30' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <span className="whitespace-nowrap">{currentStep < 5 ? 'Continuer' : 'Finaliser'}</span>
                        {currentStep < 5 ? (
                          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                          </svg>
                        ) : (
                          <CheckCircle size={20} className="sm:size-24" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700 pb-10">
             <div className="w-12 h-px bg-slate-300"></div>
             <p className="text-[8px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.4em] text-center px-4">SyCAD • SYSTEME DE GESTION FONCIERE</p>
             <div className="flex gap-4 sm:gap-8">
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400">VERSION 2.5.0-PRO</span>
                <span className="text-[7px] sm:text-[9px] font-bold text-slate-400">DÉPLOIEMENT CERTIFIÉ</span>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
