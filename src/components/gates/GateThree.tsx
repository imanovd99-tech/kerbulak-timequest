import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, BookOpen, ArrowUp, ArrowDown, GripVertical, Check } from 'lucide-react';
import { HistoricalImage } from '../HistoricalImage';
import { imageMap } from '../../config/imageMap';
import { GATE3_CHRONO_ITEMS } from '../../data/historyData';
import { ChronoItem } from '../../types/game';

interface GateThreeProps {
  onComplete: () => void;
  onAddScore: (points: number) => void;
}

export const GateThree: React.FC<GateThreeProps> = ({ onComplete, onAddScore }) => {
  const [step, setStep] = useState<'intro' | 'chrono' | 'question' | 'completed'>('intro');

  // Initial shuffled order for chronology task
  const [items, setItems] = useState<ChronoItem[]>([
    GATE3_CHRONO_ITEMS[2], // 1979
    GATE3_CHRONO_ITEMS[0], // 1865
    GATE3_CHRONO_ITEMS[3], // 1985
    GATE3_CHRONO_ITEMS[1], // 1881
  ]);

  const [chronoStatus, setChronoStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [chronoAttempts, setChronoAttempts] = useState(0);

  // Question state
  const [qSelected, setQSelected] = useState<string | null>(null);
  const [qStatus, setQStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [qAttempts, setQAttempts] = useState(0);

  // Reorder functions
  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
    setChronoStatus('idle');
  };

  const handlePositionAssign = (fromIndex: number, toPosition: number) => {
    const toIndex = toPosition - 1;
    if (toIndex < 0 || toIndex >= items.length || toIndex === fromIndex) return;
    const newItems = [...items];
    const [moved] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, moved);
    setItems(newItems);
    setChronoStatus('idle');
  };

  const checkChronology = () => {
    const isCorrect = items.every((item, idx) => item.order === idx + 1);
    if (isCorrect) {
      setChronoStatus('correct');
      if (chronoAttempts === 0) onAddScore(10);
    } else {
      setChronoStatus('wrong');
      setChronoAttempts((prev) => prev + 1);
    }
  };

  const handleQuestionAnswer = (optionId: string) => {
    setQSelected(optionId);
    if (optionId === 'B') {
      setQStatus('correct');
      if (qAttempts === 0) onAddScore(10);
    } else {
      setQStatus('wrong');
      setQAttempts((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Gate Header */}
      <div className="text-center pb-2">
        <span className="text-xs uppercase tracking-widest text-[#0f4c81] font-bold">
          3-ҚАҚПА
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          «ШОҚАН ІЗІ»
        </h2>
        <div className="w-16 h-0.5 bg-[#0f4c81] mx-auto mt-2" />
      </div>

      {/* STEP 1: INTRO */}
      {step === 'intro' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <HistoricalImage
            image={imageMap.gate3}
            aspectRatio="16:9"
            showCaption={true}
          />

          <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-3">
            <p className="text-base sm:text-lg first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1b4332] first-letter:float-left first-letter:mr-2">
              Кербұлақ ауданында Шоқан Уәлихановтың тарихи мұрасын сақтайтын «Алтынемел» мемориалдық кешені орналасқан. Кешен құрамына ғалымның зираты, ескерткіші және музейі кіреді.
            </p>
            <p className="text-stone-700 text-sm sm:text-base">
              Шоқанның зираты 1865 жылмен, құлпытастың орнатылуы 1881 жылмен, ескерткіш 1979 жылмен, ал «Алтынемел» музейінің ашылуы 1985 жылмен байланысты.
            </p>
          </div>

          <div className="pt-4 border-t border-[#e8dfcf] flex justify-end">
            <button
              onClick={() => setStep('chrono')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1b4332] text-amber-200 font-semibold hover:bg-[#153427] transition-colors shadow-sm"
            >
              <span>«Уақытты ретте» тапсырмасына өту</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CHRONOLOGY TASK */}
      {step === 'chrono' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Хронологиялық желі</span>
            <span className="text-[#0f4c81] font-bold">1 / 2 тапсырма</span>
          </div>

          <div className="border-l-4 border-[#0f4c81] pl-4 py-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Интерактивті тапсырма: «Уақытты ретте»
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Төмендегі төрт тарихи оқиғаны дұрыс хронологиялық ретке орналастырыңыз (1-ден 4-ке дейін). Түймелер немесе реттік нөмір арқылы жылжытуға болады:
            </p>
          </div>

          {/* Chrono Cards List */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white border border-[#ded4c3] shadow-xs hover:border-[#0f4c81]/60 transition-all gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#f0e9dc] text-stone-700 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold font-mono tracking-wider text-[#b45309] block">
                      {item.year} жыл
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-stone-900">
                      {item.event}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {/* Position number buttons for mobile */}
                  <div className="hidden sm:flex items-center gap-1 mr-2 border-r border-stone-200 pr-2">
                    {[1, 2, 3, 4].map((pos) => (
                      <button
                        key={pos}
                        onClick={() => handlePositionAssign(index, pos)}
                        className={`w-6 h-6 rounded text-xs font-semibold ${
                          index + 1 === pos
                            ? 'bg-[#1b4332] text-amber-200'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                        title={`${pos}-орынға қою`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>

                  {/* Move Up Button */}
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none text-stone-700"
                    title="Жоғары жылжыту"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down Button */}
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    className="p-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none text-stone-700"
                    title="Төмен жылжыту"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-500">
              Оқиғаларды 1865, 1881, 1979 және 1985 жылдар ретімен қойып, тексеріңіз.
            </p>
            <button
              onClick={checkChronology}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0f4c81] text-white font-bold text-sm hover:bg-[#0c3d67] transition-colors shadow-xs"
            >
              Хронологияны тексеру
            </button>
          </div>

          {chronoStatus === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Дұрыс! Сіз Шоқан мұрасының уақыт желісін қалпына келтірдіңіз.</p>
                <p className="text-xs text-emerald-800 mt-0.5">1865 (зират) → 1881 (құлпытас) → 1979 (ескерткіш) → 1985 (музей).</p>
              </div>
              <button
                onClick={() => setStep('question')}
                className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
              >
                <span>Келесі сұрақ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {chronoStatus === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Жылдардың өсу ретіне мұқият назар аудар.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: QUESTION */}
      {step === 'question' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Мемориалдық кешен</span>
            <span className="text-[#0f4c81] font-bold">2 / 2 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            Сұрақ: «Мемориалдық кешеннің негізгі қызметі қандай?»
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { id: 'A', text: 'Сауда орталығы ретінде пайдалану' },
              { id: 'B', text: 'Шоқан Уәлихановтың өмірі мен ғылыми мұрасын сақтау және таныстыру' },
              { id: 'C', text: 'Спорт жарыстарын өткізу' },
              { id: 'D', text: 'Өнеркәсіп тарихын көрсету' },
            ].map((opt) => {
              const isSelected = qSelected === opt.id;
              const isCorrect = opt.id === 'B' && qStatus === 'correct';
              const isWrong = isSelected && qStatus === 'wrong';

              return (
                <button
                  key={opt.id}
                  onClick={() => handleQuestionAnswer(opt.id)}
                  className={`w-full p-4 rounded-xl text-left border text-sm sm:text-base font-medium transition-all ${
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

          {qStatus === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Өте дұрыс!</p>
                <p className="text-xs text-emerald-800 mt-0.5">Кешен ұлы ағартушы, ғалым Шоқан Уәлихановтың рухани мұрасын келер ұрпаққа насихаттайды.</p>
              </div>
              <button
                onClick={() => setStep('completed')}
                className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
              >
                <span>Қақпаны аяқтау</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {qStatus === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Мемориалдық кешен мен музейдің түпкі мақсатын таңда.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: COMPLETED CELEBRATION */}
      {step === 'completed' && (
        <div className="bg-gradient-to-b from-[#fefbf6] to-[#f7f2e7] border-2 border-[#0f4c81]/30 rounded-3xl p-8 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0f4c81] to-[#0284c7] text-white flex items-center justify-center mx-auto shadow-md ring-8 ring-blue-50">
            <BookOpen className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0f4c81]">
              3-ҚАҚПА СӘТТІ АЯҚТАЛДЫ!
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              «Сіз “Ғалым ізі” белгісін алдыңыз!»
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Шоқан Уәлихановтың «Алтынемел» мемориалдық кешенінің уақыт желісін толық қалпына келтірдіңіз.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#0f4c81] text-amber-300 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-stone-900 font-serif">«Ғалым ізі» белгісі</h5>
                <p className="text-[11px] text-stone-500">Алтынемел · 1865–1985 жж.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#fef9c3] font-bold text-sm hover:bg-[#143326] transition-all shadow-md hover:scale-105"
            >
              <span>4-қақпаға өту («Мұраны сақта»)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
