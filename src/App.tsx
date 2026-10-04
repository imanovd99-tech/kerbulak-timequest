/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/views/HomeView';
import { GameView } from './components/views/GameView';
import { ChronicleView } from './components/views/ChronicleView';
import { AboutView } from './components/views/AboutView';
import { SourcesView } from './components/views/SourcesView';
import { AppView } from './types/game';
import { BADGES } from './data/historyData';
import { Compass, BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentGate, setCurrentGate] = useState<number>(1);
  const [completedGates, setCompletedGates] = useState<number[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleStartGame = () => {
    setCurrentGate(1);
    setCurrentView('game');
  };

  const handleSelectGate = (gateNumber: number) => {
    setCurrentGate(gateNumber);
    setCurrentView('game');
  };

  const handleAddScore = (points: number) => {
    setTotalScore((prev) => prev + points);
  };

  const handleCompleteGate = (gateNumber: number) => {
    if (!completedGates.includes(gateNumber)) {
      setCompletedGates((prev) => [...prev, gateNumber]);
    }
    // Unlock corresponding badge
    const badge = BADGES.find((b) => b.gateNumber === gateNumber);
    if (badge && !unlockedBadges.includes(badge.id)) {
      setUnlockedBadges((prev) => [...prev, badge.id]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#241F1C] parchment-pattern selection:bg-[#d97706]/20 selection:text-[#1b4332]">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentGate={currentGate}
        unlockedBadgesCount={unlockedBadges.length}
        totalScore={totalScore}
        onGoHome={() => setCurrentView('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentView === 'home' && (
          <HomeView
            onStartGame={handleStartGame}
            onSelectGate={handleSelectGate}
            completedGates={completedGates}
            unlockedBadges={unlockedBadges}
            totalScore={totalScore}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'game' && (
          <GameView
            currentGate={currentGate}
            setCurrentGate={setCurrentGate}
            completedGates={completedGates}
            unlockedBadges={unlockedBadges}
            totalScore={totalScore}
            onAddScore={handleAddScore}
            onCompleteGate={handleCompleteGate}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'chronicle' && (
          <ChronicleView setCurrentView={setCurrentView} />
        )}

        {currentView === 'about' && (
          <AboutView setCurrentView={setCurrentView} />
        )}

        {currentView === 'sources' && (
          <SourcesView onStartGame={handleStartGame} />
        )}
      </main>

      {/* Curatorial Academic Footer */}
      <footer className="mt-auto border-t border-[#ded5c5] bg-[#f5efe3]/90 py-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#1b4332] text-amber-300 flex items-center justify-center font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-stone-900 font-serif text-sm">
                KERBULAK TIMEQUEST
              </p>
              <p className="text-[11px] text-stone-500">
                «Кербұлақтың цифрлық шежіресі: тарихи нысандар арқылы уақытқа саяхат» · 9-сынып өлкетану жобасы
              </p>
            </div>
          </div>

          {/* Ordered links: 1. Басты бет, 2. Жоба туралы, 3. Цифрлық шежіре, 4. Дереккөздер, 5. Ойынды бастау */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium">
            <button
              onClick={() => setCurrentView('home')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Басты бет
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setCurrentView('about')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Жоба туралы
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setCurrentView('chronicle')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Цифрлық шежіре
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={() => setCurrentView('sources')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Дереккөздер
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={handleStartGame}
              className="hover:text-[#1b4332] font-semibold text-[#1b4332] transition-colors cursor-pointer"
            >
              Ойынды бастау
            </button>
          </div>

          <div className="text-[11px] text-stone-500 text-center md:text-right">
            <span>Жетісу облысы, Кербұлақ ауданы</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
