import React from 'react';
import { GateOne } from '../gates/GateOne';
import { GateTwo } from '../gates/GateTwo';
import { GateThree } from '../gates/GateThree';
import { GateFour } from '../gates/GateFour';
import { GateFive } from '../gates/GateFive';
import { Check, ChevronLeft, Award } from 'lucide-react';
import { AppView } from '../../types/game';

interface GameViewProps {
  currentGate: number;
  setCurrentGate: (gate: number) => void;
  completedGates: number[];
  unlockedBadges: string[];
  totalScore: number;
  onAddScore: (points: number) => void;
  onCompleteGate: (gateNumber: number) => void;
  setCurrentView: (view: AppView) => void;
}

export const GameView: React.FC<GameViewProps> = ({
  currentGate,
  setCurrentGate,
  completedGates,
  unlockedBadges,
  totalScore,
  onAddScore,
  onCompleteGate,
  setCurrentView,
}) => {
  const gateTitles = [
    '1. Бесшатыр қорымы',
    '2. Бостан зерттеулері',
    '3. Шоқан ізі',
    '4. Мұраны сақта',
    '5. Уақыт қақпасы',
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Gate Navigation Rail */}
      <div className="bg-[#fbf9f4] border border-[#e5dac8] rounded-2xl p-3 sm:p-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#ded2bd] mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white px-2.5 py-1.5 rounded-lg border border-stone-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Басты бетке</span>
            </button>
            <span className="text-xs font-bold text-stone-700">
              Тарихи маршрут
            </span>
          </div>

          <div className="text-xs font-bold text-[#b45309]">
            {completedGates.length} / 5 қақпа аяқталды
          </div>
        </div>

        {/* Gate Selectors Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((gNum) => {
            const isCurrent = currentGate === gNum;
            const isCompleted = completedGates.includes(gNum);

            return (
              <button
                key={gNum}
                onClick={() => setCurrentGate(gNum)}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#1b4332] text-amber-200 border-[#1b4332] shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100/70'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="truncate">
                  <span className="block font-bold truncate">
                    {gateTitles[gNum - 1]}
                  </span>
                  <span className={`text-[10px] ${isCurrent ? 'text-amber-300' : 'text-stone-500'}`}>
                    {gNum}-қақпа
                  </span>
                </div>
                {isCompleted && (
                  <Check className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-amber-300' : 'text-emerald-700'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER CURRENT GATE */}
      <div className="transition-all duration-300">
        {currentGate === 1 && (
          <GateOne
            onComplete={() => {
              onCompleteGate(1);
              setCurrentGate(2);
            }}
            onAddScore={onAddScore}
          />
        )}

        {currentGate === 2 && (
          <GateTwo
            onComplete={() => {
              onCompleteGate(2);
              setCurrentGate(3);
            }}
            onAddScore={onAddScore}
          />
        )}

        {currentGate === 3 && (
          <GateThree
            onComplete={() => {
              onCompleteGate(3);
              setCurrentGate(4);
            }}
            onAddScore={onAddScore}
          />
        )}

        {currentGate === 4 && (
          <GateFour
            onComplete={() => {
              onCompleteGate(4);
              setCurrentGate(5);
            }}
            onAddScore={onAddScore}
          />
        )}

        {currentGate === 5 && (
          <GateFive
            onComplete={() => onCompleteGate(5)}
            onAddScore={onAddScore}
            totalScore={totalScore}
            unlockedBadges={unlockedBadges}
            onOpenChronicle={() => setCurrentView('chronicle')}
          />
        )}
      </div>
    </div>
  );
};
