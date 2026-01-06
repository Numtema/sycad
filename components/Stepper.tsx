
import React, { useEffect, useRef } from 'react';
import { Step } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeStep = steps.find(s => s.status === 'active') || steps[0];

  // Auto-scroll to active step on mobile
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector(`[data-step-id="${activeStep.id}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeStep.id]);

  return (
    <div className="bg-slate-50/80 border-b border-slate-100">
      {/* Container with horizontal scroll for mobile, flex-row for desktop */}
      <div 
        ref={scrollRef}
        className="flex items-center gap-4 sm:gap-8 px-4 py-6 sm:py-12 overflow-x-auto no-scrollbar snap-x snap-mandatory md:justify-between max-w-[1200px] mx-auto"
      >
        {steps.map((step, idx) => {
          const isActive = step.status === 'active';
          const isCompleted = step.status === 'completed';
          
          return (
            <React.Fragment key={step.id}>
              <div 
                data-step-id={step.id}
                className={`flex items-center gap-3 sm:gap-5 transition-all duration-500 snap-center shrink-0 ${
                  isActive ? 'scale-105 opacity-100' : 'opacity-60 scale-95 md:scale-100 md:opacity-80'
                }`}
              >
                {/* Step Circle */}
                <div className={`
                  relative flex items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-500 border-2 
                  w-10 h-10 sm:w-14 sm:h-14 shrink-0
                  ${isActive 
                    ? 'bg-[#10b981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-400' 
                    : isCompleted 
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                      : 'bg-white border-slate-200 text-slate-300'}
                `}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} className="sm:size-28" strokeWidth={3} />
                  ) : (
                    <span className="font-black text-sm sm:text-xl italic">{step.id}</span>
                  )}
                  {isActive && (
                    <span className="absolute -inset-1 rounded-xl sm:rounded-2xl bg-emerald-400/20 animate-ping"></span>
                  )}
                </div>

                {/* Step Label - Responsive text sizes */}
                <div className="flex flex-col min-w-[80px] sm:min-w-[120px]">
                  <span className={`text-[8px] sm:text-[11px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-0.5 ${
                    isActive ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    Étape 0{step.id}
                  </span>
                  <span className={`text-[11px] sm:text-[15px] font-black whitespace-nowrap tracking-tight ${
                    isActive ? 'text-slate-900 underline decoration-emerald-500/30 decoration-2 sm:decoration-4 underline-offset-4' : 
                    isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}>
                    {step.label.split('. ')[1]}
                  </span>
                </div>
              </div>

              {/* Desktop Connector */}
              {idx < steps.length - 1 && (
                <div className={`hidden md:block flex-1 h-1 rounded-full mx-4 transition-all duration-700 ${
                  isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                }`}></div>
              )}
              {/* Mobile Connector (smaller) */}
              {idx < steps.length - 1 && (
                <div className="md:hidden w-4 h-px bg-slate-200 shrink-0"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {/* Mobile-only visual indicator of scroll */}
      <div className="md:hidden flex justify-center pb-2">
         <div className="flex gap-1">
            {steps.map(s => (
              <div key={s.id} className={`h-1 rounded-full transition-all duration-300 ${s.status === 'active' ? 'w-4 bg-emerald-600' : 'w-1 bg-slate-200'}`}></div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Stepper;
