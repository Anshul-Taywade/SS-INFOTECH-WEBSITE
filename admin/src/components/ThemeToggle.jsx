import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center h-[36px] w-[70px] rounded-full p-1 cursor-pointer transition-all duration-300 select-none hover:scale-[1.05] shadow-md border ${
        isDark 
          ? 'bg-[#1E293B] border-[#334155] shadow-black/30' 
          : 'bg-[#E9D5FF] border-[#D8B4FE] shadow-purple-500/10'
      }`}
    >
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none text-xs">
        <Sun 
          size={14} 
          className={`transition-opacity duration-300 ${
            isDark ? 'text-amber-400/40 opacity-40' : 'text-amber-600 opacity-0'
          }`} 
        />
        <Moon 
          size={14} 
          className={`transition-opacity duration-300 ${
            isDark ? 'text-indigo-300 opacity-0' : 'text-slate-500/50 opacity-50'
          }`} 
        />
      </div>

      {/* Sliding White Thumb */}
      <span
        className={`relative z-10 flex items-center justify-center w-[28px] h-[28px] rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isDark ? 'translate-x-[34px]' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon size={14} className="text-[#7C3AED] transition-transform duration-300 fill-[#7C3AED]/20" />
        ) : (
          <Sun size={14} className="text-[#A855F7] transition-transform duration-300 fill-[#A855F7]/20" />
        )}
      </span>
    </button>
  );
}
