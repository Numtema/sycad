
import React from 'react';
import { 
  MapPin, FileText, ClipboardList, LayoutDashboard, 
  Settings, Users, History, HelpCircle, ChevronDown, 
  Home, Landmark, Calculator, Receipt, Shield, Mail, FileSearch, X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <MapPin size={18} />, label: "Bornage de parcelle", hasSub: true },
    { icon: <Landmark size={18} />, label: "Titre d'occupation ou Acte", hasSub: true },
    { icon: <ClipboardList size={18} />, label: "Attestation Attribution/Cession", active: true },
    { icon: <Home size={18} />, label: "Terrain autre que habitation" },
    { icon: <FileText size={18} />, label: "Titre foncier" },
    { icon: <Receipt size={18} />, label: "Mutation parcelle" },
    { icon: <FileSearch size={18} />, label: "Extrait du plan cadastral" },
    { icon: <Shield size={18} />, label: "Hypothèque" },
    { icon: <Calculator size={18} />, label: "Evaluation" },
    { icon: <Receipt size={18} />, label: "Paiement de taxe de jouissance" },
    { icon: <Landmark size={18} />, label: "Contribution foncière", badge: "NEW" },
    { icon: <Users size={18} />, label: "Gestion mandats" },
    { icon: <Settings size={18} />, label: "Demande d'exonération" },
    { icon: <Mail size={18} />, label: "Boîte courrier administratif", hasSub: true },
  ];

  return (
    <aside className={`
      fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#064e3b] text-white flex flex-col 
      z-50 border-r border-emerald-800/50 shadow-2xl transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-950/20 group-hover:scale-105 transition-transform duration-500">
             <span className="text-emerald-900 font-black text-2xl tracking-tighter">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none italic">SyC@D <span className="text-emerald-400">©</span></span>
            <span className="text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest mt-1">Plateforme Foncière</span>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-emerald-300 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide custom-sidebar-nav">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            <button 
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 group ${
                item.active 
                  ? 'bg-emerald-700 shadow-lg text-white font-bold backdrop-blur-md border border-white/10' 
                  : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`${item.active ? 'text-white' : 'text-emerald-400/60 group-hover:text-emerald-400'} transition-colors shrink-0`}>
                   {item.icon}
                </div>
                <span className="text-[13px] font-medium leading-tight text-left">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md animate-pulse">
                    {item.badge}
                  </span>
                )}
                {item.hasSub && <ChevronDown size={12} className="opacity-40 group-hover:opacity-100 transition-opacity" />}
              </div>
            </button>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 bg-emerald-950/30 backdrop-blur-sm">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-800/20 border border-white/5">
           <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
              <History size={16} />
           </div>
           <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Dernière session</p>
              <p className="text-[11px] text-white/70">Auj. à 14:32</p>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
