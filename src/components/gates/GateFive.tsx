import React, { useState } from 'react';
import { Award, ArrowUp, ArrowDown, Sparkles, CheckCircle2, AlertCircle, ArrowRight, BookOpen, RotateCcw } from 'lucide-react';
import { GATE5_TIMELINE_ITEMS, BADGES } from '../../data/historyData';
import { ChronoItem } from '../../types/game';
import { TimelineBanner } from '../TimelineBanner';

interface GateFiveProps {
  onComplete: () => void;
  onAddScore: (points: number) => void;
  totalScore: number;
  unlockedBadges: string[];
  onOpenChronicle: () => void;
}

export const GateFive: React.FC<GateFiveProps> = ({
  onComplete,
  onAddScore,
  totalScore,
  unlockedBadges,
  onOpenChronicle,
}) => {
  // Scramble the 7 items initially
  const [items, setItems] = useState<ChronoItem[]>([
    GATE5_TIMELINE_ITEMS[3], // 1979
    GATE5_TIMELINE_ITEMS[0], // б.з.д. VII-IV
    GATE5_TIMELINE_ITEMS[5], // 2022
    GATE5_TIMELINE_ITEMS[1], // 1865
    GATE5_TIMELINE_ITEMS[6], // 2023-2024
    GATE5_TIMELINE_ITEMS[2], // 1881
    GATE5_TIMELINE_ITEMS[4], // 1985
  ]);

  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [attempts, setAttempts] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    setStatus('idle');
  };

  const handlePositionAssign = (fromIndex: number, toPosition: number) => {
    const toIndex = toPosition - 1;
    if (toIndex < 0 || toIndex >= items.length || toIndex === fromIndex) return;
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    setItems(newItems);
    setStatus('idle');
  };

  const checkTimeline = () => {
    const isCorrect = items.every((item, idx) => item.order === idx + 1);
    if (isCorrect) {
      setStatus('correct');
      if (attempts === 0) onAddScore(10);
      setIsFinished(true);
      onComplete();
    } else {
      setStatus('wrong');
      setAttempts((prev) => prev + 1);
    }
  };

  // Calculate score rating
  // Max possible score is around 100 points (10 per question/task across the 5 gates)
  const maxScore = 100;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let evaluationTitle = '«Саяхатты тағы бір рет қайталап көр!»';
  if (percentage >= 90) {
    evaluationTitle = '«Кербұлақ тарихының білгірі»';
  } else if (percentage >= 70) {
    evaluationTitle = '«Жас зерттеуші»';
  } else if (percentage >= 50) {
    evaluationTitle = '«Тарих саяхатшысы»';
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Gate Header */}
      <div className="text-center pb-2">
        <span className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
          5-ҚАҚПА · ФИНАЛДЫҚ КЕЗЕҢ
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          «УАҚЫТ ҚАҚПАСЫ»
        </h2>
        <div className="w-16 h-0.5 bg-[#b45309] mx-auto mt-2" />
      </div>

      {!isFinished ? (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <TimelineBanner />

          <div className="border-l-4 border-[#b45309] pl-4 py-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Қорытынды уақыт желісін құрастыру
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Алдыңғы 4 қақпадан алған барлық тарихи мәліметтерді пайдаланып, Кербұлақ шежіресінің 7 негізгі оқиғасын ежелгіден қазіргіге дейін дұрыс хронологиялық ретпен орналастырыңыз:
            </p>
          </div>

          {/* Timeline Items List */}
          <div className="space-y-2.5">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white border border-[#ded5c5] shadow-xs hover:border-[#b45309]/60 transition-all gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#efe7d8] text-stone-700 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono tracking-wider text-[#b45309] block">
                      {item.year}
                    </span>
                    <span className="text-sm font-semibold text-stone-900">
                      {item.event}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Quick slot position select for accessibility */}
                  <select
                    value={index + 1}
                    onChange={(e) => handlePositionAssign(index, Number(e.target.value))}
                    aria-label={`${item.event} оқиғасының реттік орнын таңдау`}
                    className="text-xs border border-stone-200 rounded-md bg-stone-50 text-stone-700 px-1 py-1 mr-1"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <option key={num} value={num}>
                        {num}-орын
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-20 disabled:pointer-events-none text-stone-700"
                    title="Жоғары"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="p-1 rounded-md border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-20 disabled:pointer-events-none text-stone-700"
                    title="Төмен"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Бағыты: Сақ дәуірінен (б.з.д. VII–IV ғғ.) қазіргі зерттеулерге дейін (2023–2024 жж.).
            </p>
            <button
              onClick={checkTimeline}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#1b4332] text-amber-200 font-bold text-sm hover:bg-[#143326] transition-colors shadow-sm"
            >
              Толық уақыт желісін тексеру
            </button>
          </div>

          {status === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Жылдар мен дәуірлердің ретін қайта тексеріңіз.</span>
            </div>
          )}
        </div>
      ) : (
        /* GRAND FINAL SCREEN */
        <div className="bg-gradient-to-b from-[#fefbf6] via-[#faf5e8] to-[#f4ede0] border-2 border-[#b45309]/40 rounded-3xl p-6 sm:p-10 text-center shadow-xl space-y-8 animate-fade-in">
          {/* Trophy Header */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#b45309] to-[#f59e0b] text-white flex items-center justify-center mx-auto shadow-lg ring-8 ring-amber-100">
            <Award className="w-12 h-12" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#b45309]">
              ТАРИХИ МИССИЯ ТОЛЫҚ ОРЫНДАЛДЫ
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              «KERBULAK TIMEQUEST аяқталды!»
            </h2>
            <p className="text-base sm:text-lg text-stone-700 max-w-xl mx-auto font-serif">
              «Сіз Кербұлақтың сақ дәуірінен қазіргі археологиялық зерттеулерге дейінгі тарихи жолынан өттіңіз.»
            </p>
          </div>

          {/* Evaluation Banner */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-white border border-amber-300 shadow-sm space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
              Қорытынды бағалау нәтижесі
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#1b4332]">
              {evaluationTitle}
            </div>
            <div className="flex items-center justify-center gap-3 text-sm text-stone-600 pt-1 border-t border-stone-100">
              <span>Жалпы ұпай: <strong className="text-stone-900 font-bold">{totalScore}</strong></span>
              <span>·</span>
              <span>Нәтижелік көрсеткіш: <strong className="text-stone-900 font-bold">{percentage}%</strong></span>
            </div>
          </div>

          {/* All 5 Badges Showcase */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-stone-600 font-sans">
              Жиналған тарихи белгілер топтамасы (5/5):
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {BADGES.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl bg-white/90 border border-amber-200 shadow-2xs text-center flex flex-col items-center justify-between"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#1b4332] text-amber-300 flex items-center justify-center mx-auto mb-1.5 shadow-2xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h6 className="text-xs font-bold text-stone-900 font-serif line-clamp-1">
                    «{b.name}»
                  </h6>
                  <span className="text-[10px] text-stone-500 mt-0.5">{b.dateOrEra}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="pt-4 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenChronicle}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-amber-200 font-bold text-base hover:bg-[#143326] transition-all shadow-md hover:scale-105"
            >
              <BookOpen className="w-5 h-5" />
              <span>Кербұлақтың цифрлық шежіресін ашу</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
