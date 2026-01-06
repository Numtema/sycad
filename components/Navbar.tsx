
import React from 'react';
import { Search, Bell, Grid, Maximize2, User, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <nav className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2.5 bg-slate-100 text-emerald-900 rounded-xl lg:hidden hover:bg-emerald-50 transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative hidden md:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un dossier..." 
            className="pl-12 pr-6 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 w-64 lg:w-80 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-1 sm:gap-3">
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hidden sm:p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all sm:block">
            <Grid size={20} />
          </button>
          <button className="hidden sm:p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all sm:block">
            <Maximize2 size={20} />
          </button>
        </div>
        
        <div className="hidden sm:block h-10 w-px bg-slate-200 mx-2"></div>
        
        <div className="flex items-center gap-2 sm:gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Dr. Aminata KOFFI</p>
            <p className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block uppercase">SUPERVISEUR</p>
          </div>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-50 transition-all">
            <User size={20} className="sm:size-22" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
