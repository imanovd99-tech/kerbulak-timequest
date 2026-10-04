import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Sparkles, BookOpen, Layers, Search } from 'lucide-react';
import { HistoricalImage } from '../HistoricalImage';
import { imageMap } from '../../config/imageMap';

interface GateOneProps {
  onComplete: () => void;
  onAddScore: (points: number) => void;
}

export const GateOne: React.FC<GateOneProps> = ({ onComplete, onAddScore }) => {
  // Steps: 'intro' | 'q1' | 'q2' | 'task3' | 'completed'
  const [step, setStep] = useState<'intro' | 'q1' | 'q2' | 'task3' | 'completed'>('intro');

  // Question 1 state
  const [q1Selected, setQ1Selected] = useState<string | null>(null);
  const [q1Status, setQ1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [q1Attempts, setQ1Attempts] = useState(0);

  // Question 2 state
  const [q2Selected, setQ2Selected] = useState<string | null>(null);
  const [q2Status, setQ2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [q2Attempts, setQ2Attempts] = useState(0);

  // Task 3 state
  const [task3Selected, setTask3Selected] = useState<string | null>(null);
  const [task3Status, setTask3Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [task3Attempts, setTask3Attempts] = useState(0);

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
    if (optionId === 'B') {
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
        <span className="text-xs uppercase tracking-widest text-[#b45309] font-bold">
          1-ҚАҚПА
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
          «БЕСШАТЫР — САҚТАР ӘЛЕМІ»
        </h2>
        <div className="w-16 h-0.5 bg-[#b45309] mx-auto mt-2" />
      </div>

      {/* STEP 1: INTRO */}
      {step === 'intro' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <HistoricalImage
            image={imageMap.gate1}
            aspectRatio="16:9"
            showCaption={true}
          />

          <div className="prose prose-stone max-w-none text-stone-800 leading-relaxed space-y-3">
            <p className="text-base sm:text-lg first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1b4332] first-letter:float-left first-letter:mr-2">
              Бесшатыр қорымы — Кербұлақ ауданындағы республикалық маңызы бар археологиялық ескерткіштердің бірі. Ол сақ дәуіріне жатады. Қорым 31 обадан тұрады.
            </p>
            <p className="text-stone-700 text-sm sm:text-base">
              1957 және 1959–1961 жылдары Кемел Ақышев басқарған археологиялық экспедициялар оның 18 обасына зерттеу жүргізген. Қорғандардың күрделі құрылысы сақ қоғамының құрылыс тәжірибесі, әлеуметтік құрылымы және дүниетанымы туралы маңызды мәлімет береді.
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
            <span>Бесшатыр қорымы</span>
            <span className="text-[#b45309] font-bold">1 / 3 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            1-сұрақ: «Бесшатыр қорымы неше обадан тұрады?»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'A', text: '18 оба' },
              { id: 'B', text: '25 оба' },
              { id: 'C', text: '31 оба' },
              { id: 'D', text: '60 оба' },
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
                      : 'bg-white border-[#dcd1bf] text-stone-800 hover:bg-[#f8f4ec] hover:border-stone-400'
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

          {/* Feedback */}
          {q1Status === 'correct' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-center justify-between">
              <div>
                <p className="font-bold">Дұрыс! Бесшатыр қорымы 31 обадан тұрады.</p>
                <p className="text-xs text-emerald-800 mt-0.5">Оның 18 обасына Кемел Ақышев экспедициясы зерттеу жүргізген.</p>
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
              <span>Тағы бір рет ойланып көр. Мәтінді қайта есіңе түсір.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: QUESTION 2 */}
      {step === 'q2' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Археологиялық экспедиция</span>
            <span className="text-[#b45309] font-bold">2 / 3 тапсырма</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
            2-сұрақ: «Бесшатырды зерттеген экспедицияны кім басқарды?»
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { id: 'A', text: 'Әлкей Марғұлан' },
              { id: 'B', text: 'Кемел Ақышев' },
              { id: 'C', text: 'Шоқан Уәлиханов' },
              { id: 'D', text: 'Қаныш Сәтбаев' },
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
                      : 'bg-white border-[#dcd1bf] text-stone-800 hover:bg-[#f8f4ec] hover:border-stone-400'
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
                <p className="font-bold">Өте жақсы! Экспедицияны Кемел Ақышев басқарды.</p>
                <p className="text-xs text-emerald-800 mt-0.5">Зерттеу жұмыстары 1957 және 1959–1961 жылдары жүргізілген.</p>
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
              <span>Тағы бір рет ойланып көр. Тарихи экспедиция жетекшісін қайта таңда.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: TASK 3 */}
      {step === 'task3' && (
        <div className="bg-[#fcfaf7] border border-[#e2d8c6] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
            <span>Зерттеушілік тапсырма</span>
            <span className="text-[#b45309] font-bold">3 / 3 тапсырма</span>
          </div>

          <div className="border-l-4 border-[#b45309] pl-4 py-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Тапсырма: «Археолог көзімен қара»
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Экранда көрсетілген үш маңызды белгіні сараптап, ғылыми қорытынды жаса:
            </p>
          </div>

          {/* Three features display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center mx-auto mb-2">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-900">
                Қорғанның үлкен көлемі
              </span>
            </div>
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center mx-auto mb-2">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-900">
                Күрделі құрылыс
              </span>
            </div>
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-center">
              <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-stone-900">
                Бірнеше құрылыс элементі
              </span>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-base sm:text-lg font-medium text-stone-900 mb-3">
              Сұрақ: «Осындай археологиялық деректер бізге нені түсінуге мүмкіндік береді?»
            </h4>

            <div className="space-y-2.5">
              {[
                { id: 'A', text: 'Тек қорғанның түсін' },
                { id: 'B', text: 'Сақ қоғамының құрылыс мәдениеті мен әлеуметтік ұйымдасуын' },
                { id: 'C', text: 'Қазіргі халық санын' },
                { id: 'D', text: 'Ауа райын' },
              ].map((opt) => {
                const isSelected = task3Selected === opt.id;
                const isCorrect = opt.id === 'B' && task3Status === 'correct';
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
                <p className="font-bold">Керемет қорытынды!</p>
                <p className="text-xs text-emerald-800 mt-0.5">Сақ қоғамының құрылыс тәжірибесі, әлеуметтік құрылымы мен дүниетанымы толық дәйектелді.</p>
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
              <span>Тағы бір рет ойланып көр. Археологиялық деректердің тарихи мәнін қайта қарастыр.</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: COMPLETED CELEBRATION */}
      {step === 'completed' && (
        <div className="bg-gradient-to-b from-[#fefbf6] to-[#f7f2e7] border-2 border-[#d97706]/40 rounded-3xl p-8 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#b45309] to-[#d97706] text-white flex items-center justify-center mx-auto shadow-md ring-8 ring-amber-100">
            <Sparkles className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#b45309]">
              1-ҚАҚПА СӘТТІ АЯҚТАЛДЫ!
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              «Сіз “Сақ мұрасы” белгісін алдыңыз!»
            </h3>
            <p className="text-stone-600 text-sm max-w-md mx-auto">
              Белгі пайдаланушының жеке коллекциясына қосылды. Сіз Бесшатыр қорымының тарихи деректерін толық игердіңіз.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-white border border-amber-200 shadow-xs text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#1b4332] text-amber-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-bold text-sm text-stone-900 font-serif">«Сақ мұрасы» белгісі</h5>
                <p className="text-[11px] text-stone-500">Бесшатыр қорымы · б.з.д. VII–IV ғғ.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={onComplete}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1b4332] text-[#fef9c3] font-bold text-sm hover:bg-[#143326] transition-all shadow-md hover:scale-105"
            >
              <span>2-қақпаға өту («Бостан»)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
