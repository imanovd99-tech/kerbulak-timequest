import React from 'react';
import { BookOpen, Compass, Award, Target, Sparkles, Layers, GraduationCap, ArrowRight } from 'lucide-react';
import { AppView } from '../../types/game';

interface AboutViewProps {
  setCurrentView: (view: AppView) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ setCurrentView }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Title */}
      <section className="text-center space-y-3 pb-6 border-b border-[#ded5c5]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332]/10 text-[#1b4332] text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-[#b45309]" />
          <span>9-сынып оқушысының өлкетану жобасы</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Жоба туралы
        </h1>
        <p className="text-base text-stone-600 font-serif italic max-w-2xl mx-auto">
          «Кербұлақтың цифрлық шежіресі: тарихи нысандар арқылы уақытқа саяхат»
        </p>
      </section>

      {/* Main Project Passport Card */}
      <section className="bg-white border border-[#ded5c5] rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Definition List Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dac8] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b45309] block">
              Жоба атауы:
            </span>
            <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
              «Кербұлақтың цифрлық шежіресі: тарихи нысандар арқылы уақытқа саяхат»
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#e5dac8] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1b4332] block">
              Цифрлық өнім:
            </span>
            <h3 className="text-xl font-sans font-extrabold text-stone-900 tracking-wide">
              KERBULAK TIMEQUEST
            </h3>
            <p className="text-xs text-stone-500 font-medium">«Кербұлақ тарихына интерактивті саяхат»</p>
          </div>
        </div>

        {/* Direction & Goal */}
        <div className="space-y-6 pt-4 border-t border-stone-100">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1b4332]/10 text-[#1b4332] flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                Бағыты:
              </h4>
              <p className="text-base text-stone-800 font-medium mt-1 leading-relaxed">
                Жетісу облысы, Кербұлақ ауданының тарихи-мәдени мұрасын цифрлық форматта таныстыру.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#b45309]/10 text-[#b45309] flex items-center justify-center shrink-0 mt-0.5">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                Мақсаты:
              </h4>
              <p className="text-base text-stone-800 font-medium mt-1 leading-relaxed">
                Кербұлақ ауданының маңызды тарихи нысандары мен оқиғалары туралы сенімді деректерді жүйелеп, оларды интерактивті цифрлық шежіре арқылы таныстыру.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-stone-500">
                Жобаның ерекшелігі:
              </h4>
              <p className="text-base text-stone-800 font-medium mt-1 leading-relaxed">
                Кербұлақтың әр кезеңге жататын тарихи нысандары бір интерактивті уақыт маршрутына біріктірілген.
              </p>
            </div>
          </div>
        </div>

        {/* Methodology note */}
        <div className="p-5 rounded-2xl bg-[#f2ecde]/80 border border-[#ded1be] space-y-2 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] block">
            Ғылыми-өлкетанулық қағида:
          </span>
          <p>
            Жобада пайдаланылған барлық тарихи ақпарат тек ресми мемлекеттік тізілімдер мен беделді ғылыми институттардың материалдарына сүйенеді. Қолданушы тек ақпаратты оқып қана қоймай, логикалық сараптама, хронологиялық тізбектеу және қорғау мәдениетін қалыптастыру тапсырмаларын өз қолымен орындайды.
          </p>
        </div>
      </section>

      {/* Navigation to next step: Step 2 -> Step 3 ('Цифрлық шежіре') */}
      <div className="pt-4 text-center">
        <button
          onClick={() => setCurrentView('chronicle')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1b4332] text-amber-200 font-serif font-bold text-base hover:bg-[#153427] transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-amber-300" />
          <span>Цифрлық шежірені көру</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
        <p className="text-xs text-stone-500 mt-2 font-serif italic">
          Келесі кезең: Кербұлақтың тарихи кешендері мен нысандарының уақыт желісі
        </p>
      </div>
    </div>
  );
};
