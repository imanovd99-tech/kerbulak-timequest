import React, { useState } from 'react';
import { Compass, Menu, X, Award, ChevronRight, Home, Sparkles } from 'lucide-react';
import { AppView } from '../types/game';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentGate: number;
  unlockedBadgesCount: number;
  totalScore: number;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentGate,
  unlockedBadgesCount,
  totalScore,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // New precise section order:
  // 1. Басты бет
  // 2. Жоба туралы
  // 3. Цифрлық шежіре
  // 4. Дереккөздер
  // 5. Ойынды бастау
  const navLinks: { view: AppView; label: string }[] = [
    { view: 'about', label: 'Жоба туралы' },
    { view: 'chronicle', label: 'Цифрлық шежіре' },
    { view: 'sources', label: 'Дереккөздер' },
    { view: 'game', label: 'Ойынды бастау' },
  ];

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fbf9f5]/95 backdrop-blur-md border-b border-[#e5dac8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="text-left group flex items-center gap-2.5 focus:outline-hidden cursor-pointer"
              title="Басты бетке өту"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1b4332] to-[#0f291e] border border-[#b45309]/30 flex items-center justify-center text-amber-400 shadow-xs group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-base font-extrabold tracking-wider text-stone-900 font-sans block leading-none">
                  KERBULAK <span className="text-[#b45309]">TIMEQUEST</span>
                </span>
                <span className="text-[10px] text-stone-500 font-medium tracking-tight block mt-0.5">
                  Кербұлақ тарихына интерактивті саяхат
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (1. Басты бет, 2. Жоба туралы, 3. Цифрлық шежіре, 4. Дереккөздер, 5. Ойынды бастау) */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onGoHome}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'text-[#1b4332] font-semibold border-b-2 border-[#1b4332] pb-0.5'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Басты бет
            </button>
            {navLinks.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  currentView === item.view
                    ? 'text-[#1b4332] font-semibold border-b-2 border-[#1b4332] pb-0.5'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions & Game Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Game Progress / Badges indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#f2ecdf] border border-[#ded3bf] px-3 py-1.5 rounded-lg text-xs">
              {currentView === 'game' && (
                <div className="flex items-center gap-1 text-[#1b4332] font-bold border-r border-[#d4c6af] pr-2">
                  <span>Қақпа:</span>
                  <span className="bg-[#1b4332] text-amber-200 px-1.5 py-0.5 rounded text-[11px]">
                    {currentGate}/5
                  </span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-stone-700 font-semibold" title="Жиналған белгілер">
                <Award className="w-3.5 h-3.5 text-[#b45309]" />
                <span>{unlockedBadgesCount}/5 белгі</span>
              </div>
              <div className="flex items-center gap-1 text-[#b45309] font-bold border-l border-[#d4c6af] pl-2" title="Жиналған ұпай">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{totalScore} ұпай</span>
              </div>
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 focus:outline-hidden cursor-pointer"
              aria-label="Мәзірді ашу"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5dac8] bg-[#fbf9f5] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e5dac8] text-xs font-semibold text-stone-600">
            <span>Прогресс: {currentGate}/5 қақпа</span>
            <span className="text-[#b45309]">{totalScore} ұпай · {unlockedBadgesCount}/5 белгі</span>
          </div>
          <button
            onClick={() => {
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg text-left text-sm font-semibold text-stone-800 hover:bg-[#efe7d8] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4 text-stone-600" />
              Басты бет
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
          {navLinks.map((item) => (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-sm font-medium cursor-pointer ${
                currentView === item.view
                  ? 'bg-[#1b4332] text-amber-200 font-semibold'
                  : 'text-stone-800 hover:bg-[#efe7d8]'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
