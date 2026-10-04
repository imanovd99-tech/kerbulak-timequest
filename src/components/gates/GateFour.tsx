import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, ShieldAlert, Landmark, Sparkles, MoveRight } from 'lucide-react';
import { HistoricalImage } from '../HistoricalImage';
import { imageMap } from '../../config/imageMap';
import { GATE4_SORT_ITEMS } from '../../data/historyData';
import { HeritageSortItem } from '../../types/game';

interface GateFourProps {
  onComplete: () => void;
  onAddScore: (points: number) => void;
}

export const GateFour: React.FC<GateFourProps> = ({ onComplete, onAddScore }) => {
  const [step, setStep] = useState<'intro' | 'q1' | 'sorting' | 'completed'>('intro');

  // Question 1
  const [q1Selected, setQ1Selected] = useState<string | null>(null);
  const [q1Status, setQ1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [q1Attempts, setQ1Attempts] = useState(0);

  // Sorting task state: mapped by item id -> 'unassigned' | 'save' | 'harm'
  const [assignments, setAssignments] = useState<Record<string, 'unassigned' | 'save' | 'harm'>>({
    'item-1': 'unassigned',
    'item-2': 'unassigned',
    'item-3': 'unassigned',
    'item-4': 'unassigned',
    'item-5': 'unassigned',
    'item-6': 'unassigned',
  });
  const [sortStatus, setSortStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [sortAttempts, setSortAttempts] = useState(0);

  const handleQ1Answer = (optionId: string) => {
    setQ1Selected(optionId);
    if (optionId === 'C') {
      setQ1Status('correct');
      if (q1Attempts === 0) onAddScore(10);
    } else {
      setQ1Status('wrong');
      setQ1Attempts((prev) => prev + 1);
    }
  };

  const handleAssignItem = (itemId: string, targetCategory: 'save' | 'harm') => {
    setAssignments((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === targetCategory ? 'unassigned' : targetCategory,
    }));
    setSortStatus('idle');
  };

  const checkSorting = () => {
    // All items must be assigned
    const allAssigned = Object.values(assignments).every((cat) => cat !== 'unassigned');
    if (!allAssigned) {
      setSortStatus('wrong');
      return;
    }

    // Check each against ground truth
    const isAllCorrect = GATE4_SORT_ITEMS.every((item) => assignments[item.id] === item.category);

    if (isAllCorrect) {
      setSortStatus('correct');
      if (sortAttempts === 0) onAddScore(10);
    } else {
      setSortStatus('wrong');
      setSortAttempts((prev) => prev + 1);
    }
  };

  const unassignedItems = GATE4_SORT_ITEMS.filter((item) => assignments[item.id] === 'unassigned');
  const saveItems = GATE4_SORT_ITEMS.filter((item) => assignments[item.id] === 'save');
  const harmItems = GATE4_SORT_ITEMS.filter((item) => assignments[item.id] === 'harm');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Gate Header */}
      <div className="text-center pb-2">
        <span className="text-xs uppercase tracking-widest text-[#1b4332] font-bold">
          4-ҚАҚПА
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          «МҰРАНЫ САҚТА»
        </h2>
        <div className="w-16 h-0.5 bg-[#1b4332] mx-auto mt-2" />
      </div>

      {/* STEP 1: INTRO */}
      {step === 'intro' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <HistoricalImage
            image={imageMap.gate4}
            aspectRatio="16:9"
            showCaption={true}
          />

          <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-3">
            <p className="text-base sm:text-lg first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1b4332] first-letter:float-left first-letter:mr-2">
              Кербұлақ ауданы археологиялық мұраға бай. Ресми мәлімет бойынша 2022 жылы аудан аумағындағы 60 археологиялық ескерткішке күзет тақталары орнатылған.
            </p>
            <p className="text-stone-700 text-sm sm:text-base">
              Тарихи орындарды қорғау — өткен дәуір шежіресін бүлінбей сақтап, болашақ зерттеушілерге жеткізудің кепілі.
            </p>
          </div>

          <div className="pt-4 border-t border-[#e8dfcf] flex justify-end">
            <button
              onClick={() => setStep('q1')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1b4332] text-amber-200 font-semibold hover:bg-[#153427] transition-colors shadow-sm"
            >
              <span>1-сұраққа өту</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: QUESTION 1 */}
      {step === 'q1' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Күзет тақталары</span>
            <span className="text-[#1b4332] font-bold">1 / 2 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            1-сұрақ: «2022 жылы Кербұлақ ауданындағы қанша археологиялық ескерткішке күзет тақталары орнатылды?»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'A', text: '18 ескерткіш' },
              { id: 'B', text: '31 ескерткіш' },
              { id: 'C', text: '60 ескерткіш' },
              { id: 'D', text: '100 ескерткіш' },
            ].map((opt) => {
              const isSelected = q1Selected === opt.id;
              const isCorrect = opt.id === 'C' && q1Status === 'correct';
              const isWrong = isSelected && q1Status === 'wrong';

              return (
                <button
                  key={opt.id}
                  onClick={() => handleQ1Answer(opt.id)}
                  className={`p-4 rounded-xl text-left border text-sm sm:text-base font-medium transition-all ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                      : isWrong
                      ? 'bg-rose-50 border-rose-300 text-rose-900'
                      : isSelected
                      ? 'bg-amber-50 border-amber-400 text-stone-900'
                      : 'bg-white border-[#dcd1bf] text-stone-800 hover:bg-[#f8f4ec]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      <strong className="mr-2 text-stone-600">{opt.id})</strong> {opt.text}
                    </span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isWrong && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>

          {q1Status === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Дұрыс! 60 археологиялық ескерткішке күзет тақталары орнатылған.</p>
                <p className="text-xs text-emerald-800 mt-0.5">Бұл ауданның тарихи мұрасын сақтауға жасалған маңызды ресми қадам.</p>
              </div>
              <button
                onClick={() => setStep('sorting')}
                className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
              >
                <span>Интерактивті тапсырма</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {q1Status === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. 2022 жылғы ресми есептегі ескерткіштер санын қайта қараңыз.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: SORTING TASK */}
      {step === 'sorting' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Танымдық интерактив</span>
            <span className="text-[#1b4332] font-bold">2 / 2 тапсырма</span>
          </div>

          <div className="border-l-4 border-[#1b4332] pl-4 py-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Интерактив: «Сақтайды ма, зиян келтіре ме?»
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Төмендегі карточкаларды оқып, әрқайсысын тиісті бағанға бөл («Мұраны сақтайды» немесе «Мұраға зиян келтіреді» батырмасын бас):
            </p>
          </div>

          {/* Unassigned Cards Pool */}
          {unassignedItems.length > 0 && (
            <div className="p-4 rounded-xl bg-[#f2ecde] border border-[#ded1be] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Бөлінбеген әрекеттер ({unassignedItems.length}):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {unassignedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs flex flex-col justify-between gap-2"
                  >
                    <span className="text-sm font-semibold text-stone-900">{item.text}</span>
                    <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                      <button
                        onClick={() => handleAssignItem(item.id, 'save')}
                        className="flex-1 text-[11px] font-bold py-1 px-2 rounded-md bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-colors"
                      >
                        ✓ Сақтайды
                      </button>
                      <button
                        onClick={() => handleAssignItem(item.id, 'harm')}
                        className="flex-1 text-[11px] font-bold py-1 px-2 rounded-md bg-rose-100 text-rose-900 hover:bg-rose-200 transition-colors"
                      >
                        ✕ Зиян
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Two Categorization Zones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Zone 1: Сақтайды */}
            <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm pb-2 border-b border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>1. «Мұраны сақтайды» ({saveItems.length})</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {saveItems.length === 0 ? (
                  <p className="text-xs text-stone-400 italic p-3 text-center">
                    Мұраны қорғайтын әрекеттерді осы санатқа қосыңыз
                  </p>
                ) : (
                  saveItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-white border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs"
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => handleAssignItem(item.id, 'save')}
                        className="text-stone-400 hover:text-stone-700 text-xs ml-2"
                        title="Алып тастау"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Zone 2: Зиян келтіреді */}
            <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/40 p-4 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm pb-2 border-b border-rose-200">
                <ShieldAlert className="w-5 h-5 text-rose-700" />
                <span>2. «Мұраға зиян келтіреді» ({harmItems.length})</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {harmItems.length === 0 ? (
                  <p className="text-xs text-stone-400 italic p-3 text-center">
                    Мұраға қауіп төндіретін әрекеттерді осы санатқа қосыңыз
                  </p>
                ) : (
                  harmItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg bg-white border border-rose-300 text-rose-950 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-2xs"
                    >
                      <span>{item.text}</span>
                      <button
                        onClick={() => handleAssignItem(item.id, 'harm')}
                        className="text-stone-400 hover:text-stone-700 text-xs ml-2"
                        title="Алып тастау"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={checkSorting}
              className="px-6 py-2.5 rounded-xl bg-[#1b4332] text-amber-200 font-bold text-sm hover:bg-[#153427] transition-colors shadow-xs"
            >
              Бөлуді тексеру
            </button>
          </div>

          {sortStatus === 'correct' && (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-sm space-y-2">
              <p className="font-bold text-base font-serif">
                «Тарихи мұра — өткеннің ғана емес, болашақ ұрпақтың да құндылығы.»
              </p>
              <p className="text-xs text-emerald-900">
                Сіз барлық карточкаларды қатесіз топтастырдыңыз!
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep('completed')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
                >
                  <span>Қақпаны аяқтау</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {sortStatus === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>
                Барлық карточканы екі бағанға толық бөліп, дұрыстығын тағы бір рет тексеріп көріңіз.
              </span>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: COMPLETED CELEBRATION */}
      {step === 'completed' && (
        <div className="bg-gradient-to-b from-[#fefbf6] to-[#f7f2e7] border-2 border-emerald-700/30 rounded-3xl p-8 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1b4332] to-[#2d5a42] text-amber-300 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
            <Landmark className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#1b4332]">
              4-ҚАҚПА СӘТТІ АЯҚТАЛДЫ!
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              «Сіз “Мұра қорғаушысы” белгісін алдыңыз!»
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Тарихи ескерткіштерді қорғау мен сақтау қағидаларын айқын меңгердіңіз.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-stone-900 font-serif">«Мұра қорғаушысы» белгісі</h5>
                <p className="text-[11px] text-stone-500">Кербұлақ ауданы · 2022 жыл</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#fef9c3] font-bold text-sm hover:bg-[#143326] transition-all shadow-md hover:scale-105"
            >
              <span>5-қақпаға өту («Уақыт қақпасы» финалы)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
