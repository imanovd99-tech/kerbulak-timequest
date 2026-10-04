import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Compass, FileText, Check } from 'lucide-react';
import { ArchaeologyCard } from '../ArchaeologyCard';

interface GateTwoProps {
  onComplete: () => void;
  onAddScore: (points: number) => void;
}

export const GateTwo: React.FC<GateTwoProps> = ({ onComplete, onAddScore }) => {
  const [step, setStep] = useState<'intro' | 'q1' | 'q2' | 'task3' | 'completed'>('intro');

  // Question 1
  const [q1Selected, setQ1Selected] = useState<string | null>(null);
  const [q1Status, setQ1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [q1Attempts, setQ1Attempts] = useState(0);

  // Question 2
  const [q2Selected, setQ2Selected] = useState<string | null>(null);
  const [q2Status, setQ2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [q2Attempts, setQ2Attempts] = useState(0);

  // Task 3
  const [task3Selected, setTask3Selected] = useState<string | null>(null);
  const [task3Status, setTask3Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [task3Attempts, setTask3Attempts] = useState(0);

  const handleQ1Answer = (optionId: string) => {
    setQ1Selected(optionId);
    if (optionId === 'D') {
      setQ1Status('correct');
      if (q1Attempts === 0) onAddScore(10);
    } else {
      setQ1Status('wrong');
      setQ1Attempts((prev) => prev + 1);
    }
  };

  const handleQ2Answer = (optionId: string) => {
    setQ2Selected(optionId);
    if (optionId === 'B') {
      setQ2Status('correct');
      if (q2Attempts === 0) onAddScore(10);
    } else {
      setQ2Status('wrong');
      setQ2Attempts((prev) => prev + 1);
    }
  };

  const handleTask3Answer = (optionId: string) => {
    setTask3Selected(optionId);
    if (optionId === 'A') {
      setTask3Status('correct');
      if (task3Attempts === 0) onAddScore(10);
    } else {
      setTask3Status('wrong');
      setTask3Attempts((prev) => prev + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Gate Header Tag */}
      <div className="text-center pb-2">
        <span className="text-xs uppercase tracking-widest text-[#1b4332] font-bold">
          2-ҚАҚПА
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          «БОСТАН — ТАРИХ ӘЛІ ЗЕРТТЕЛІП ЖАТЫР»
        </h2>
        <div className="w-16 h-0.5 bg-[#1b4332] mx-auto mt-2" />
      </div>

      {/* STEP 1: INTRO */}
      {step === 'intro' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <ArchaeologyCard />

          <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-3">
            <p className="text-base sm:text-lg first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1b4332] first-letter:float-left first-letter:mr-2">
              Кербұлақтың археологиялық тарихын зерттеу өткен ғасырда аяқталған жоқ. 2023–2024 жылдары Қоғалы алқабындағы Бостан ауылы маңында археологиялық жұмыстар жүргізілді.
            </p>
            <p className="text-stone-700 text-sm sm:text-base">
              Зерттеу барысында ерте темір дәуіріне қатысты 4 археологиялық нысан қарастырылды. Ғалымдар қорғандардың құрылымы мен ерекшеліктерін салыстыру арқылы сол кезеңдегі қоғам туралы жаңа мәліметтер алды.
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
            <span>Бостан зерттеулері</span>
            <span className="text-[#1b4332] font-bold">1 / 3 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            1-сұрақ: «Бостан маңындағы археологиялық зерттеу жұмыстары қай жылдары жүргізілді?»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'A', text: '1957–1961' },
              { id: 'B', text: '2000–2001' },
              { id: 'C', text: '2017–2018' },
              { id: 'D', text: '2023–2024' },
            ].map((opt) => {
              const isSelected = q1Selected === opt.id;
              const isCorrect = opt.id === 'D' && q1Status === 'correct';
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
                <p className="font-bold">Дұрыс! Зерттеу жұмыстары 2023–2024 жылдары жүргізілді.</p>
                <p className="text-xs text-emerald-800 mt-0.5">Бұл Кербұлақ аумағындағы заманауи далалық ізденістердің нәтижесі.</p>
              </div>
              <button
                onClick={() => setStep('q2')}
                className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
              >
                <span>Келесі сұрақ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {q1Status === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Бостан ауылы маңындағы зерттеу жылдарын тексер.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: QUESTION 2 */}
      {step === 'q2' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Археологиялық нысандар</span>
            <span className="text-[#1b4332] font-bold">2 / 3 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            2-сұрақ: «Зерттеу барысында қанша археологиялық нысан қарастырылды?»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'A', text: '2 нысан' },
              { id: 'B', text: '4 нысан' },
              { id: 'C', text: '18 нысан' },
              { id: 'D', text: '31 нысан' },
            ].map((opt) => {
              const isSelected = q2Selected === opt.id;
              const isCorrect = opt.id === 'B' && q2Status === 'correct';
              const isWrong = isSelected && q2Status === 'wrong';

              return (
                <button
                  key={opt.id}
                  onClick={() => handleQ2Answer(opt.id)}
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

          {q2Status === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Дұрыс! 4 археологиялық нысан қарастырылды.</p>
                <p className="text-xs text-emerald-800 mt-0.5">Олар ерте темір дәуіріне жатады.</p>
              </div>
              <button
                onClick={() => setStep('task3')}
                className="shrink-0 ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1b4332] text-amber-200 text-xs font-semibold hover:bg-[#143326]"
              >
                <span>3-тапсырмаға өту</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {q2Status === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Бостан ауылы маңында зерттелген нысандар санын анықтаңыз.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: TASK 3 */}
      {step === 'task3' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Далалық күнделік</span>
            <span className="text-[#1b4332] font-bold">3 / 3 тапсырма</span>
          </div>

          <div className="border-l-4 border-[#1b4332] pl-4 py-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Тапсырма: «Археологтың далалық күнделігі»
            </h3>
          </div>

          {/* Context box */}
          <div className="bg-[#f3eee2] border border-[#ded2bd] rounded-xl p-4 flex items-start gap-3">
            <FileText className="w-6 h-6 text-[#1b4332] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-stone-500">
                Далалық зерттеу жағдайы:
              </span>
              <p className="text-sm sm:text-base font-serif italic text-stone-900 mt-1">
                «Археологтар бір аумақта көлемі мен құрылысы әртүрлі бірнеше қорған анықтады.»
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-medium text-stone-900 mb-3">
              Сұрақ: «Бұл айырмашылық қандай зерттеу сұрағын туғызуы мүмкін?»
            </h4>

            <div className="space-y-2.5">
              {[
                { id: 'A', text: 'Қоғам мүшелерінің әлеуметтік жағдайында айырмашылық болды ма?' },
                { id: 'B', text: 'Қазіргі ауылда қанша адам тұрады?' },
                { id: 'C', text: 'Қорғандар қандай түске боялған?' },
                { id: 'D', text: 'Автокөлік жолы қашан салынған?' },
              ].map((opt) => {
                const isSelected = task3Selected === opt.id;
                const isCorrect = opt.id === 'A' && task3Status === 'correct';
                const isWrong = isSelected && task3Status === 'wrong';

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleTask3Answer(opt.id)}
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
          </div>

          {task3Status === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Өте дұрыс ғылыми тұжырым!</p>
                <p className="text-xs text-emerald-800 mt-0.5">Қорғандардың көлемі мен құрылысы ежелгі дәуірдегі әлеуметтік жіктеліс пен қоғам құрылымын көрсетеді.</p>
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

          {task3Status === 'wrong' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Тағы бір рет ойланып көр. Археологиялық нысандардың көлемі мен құрылысы сол кезеңдегі қоғам туралы қандай дерек береді?</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: COMPLETED CELEBRATION */}
      {step === 'completed' && (
        <div className="bg-gradient-to-b from-[#fefbf6] to-[#f7f2e7] border-2 border-emerald-700/30 rounded-3xl p-8 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1b4332] to-[#2d5a42] text-amber-300 flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50">
            <Compass className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#1b4332]">
              2-ҚАҚПА СӘТТІ АЯҚТАЛДЫ!
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              «Сіз “Зерттеуші” белгісін алдыңыз!»
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Бостан ауылы маңындағы заманауи қазба жұмыстарының ғылыми мәнін толық меңгердіңіз.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-stone-200 shadow-xs text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-stone-900 font-serif">«Зерттеуші» белгісі</h5>
                <p className="text-[11px] text-stone-500">Бостан ауылы · 2023–2024 жж.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#fef9c3] font-bold text-sm hover:bg-[#143326] transition-all shadow-md hover:scale-105"
            >
              <span>3-қақпаға өту («Шоқан ізі»)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
