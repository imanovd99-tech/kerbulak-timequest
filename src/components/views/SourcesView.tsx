import React from 'react';
import { BookMarked, Link2, Info, ArrowRight } from 'lucide-react';
import { SOURCES_LIST } from '../../data/historyData';

interface SourcesViewProps {
  onStartGame?: () => void;
}

export const SourcesView: React.FC<SourcesViewProps> = ({ onStartGame }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <section className="text-center space-y-3 pb-6 border-b border-[#ded5c5]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332]/10 text-[#1b4332] text-xs font-bold uppercase tracking-wider">
          <BookMarked className="w-4 h-4 text-[#b45309]" />
          <span>Ғылыми негіз және библиография</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Дереккөздер
        </h1>
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-[#faf6ee] border border-[#e2d5c1] text-stone-800 font-serif italic text-base">
          «Ойында берілген тарихи ақпарат осы материалдар негізінде дайындалды.»
        </div>
      </section>

      {/* Sources List */}
      <div className="space-y-4">
        {SOURCES_LIST.map((source) => (
          <div
            key={source.id}
            className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs hover:border-[#b45309]/50 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-[#f0e9dc] text-[#1b4332] font-mono font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  0{source.id}
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {source.title}
                  </h3>
                  <p className="text-sm text-stone-700 mt-1 leading-relaxed">
                    {source.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Link Placeholder Box */}
            <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500">
              <span className="flex items-center gap-1 text-[#b45309] font-medium">
                <Link2 className="w-3.5 h-3.5" />
                Сілтеме орны: {source.urlLabel}
              </span>
              <span className="text-[11px] text-stone-400 italic">
                (Сілтеме кейін қолмен енгізіледі)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Rigor Notice */}
      <div className="p-5 rounded-2xl bg-[#f2ecde]/80 border border-[#ded1be] flex items-start gap-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <Info className="w-5 h-5 text-[#1b4332] shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 font-semibold block mb-0.5">
            Деректердің сенімділігі туралы ескертпе:
          </strong>
          Жобада ойдан шығарылған тарихи даталар, статистика немесе тұлғалар қолданылмаған. Барлық 5 қақпадағы сұрақтар мен тапсырмалар жоғарыда көрсетілген беделді ғылыми және ресми басылымдардың нақты мәліметтеріне толық сәйкес келеді.
        </div>
      </div>

      {/* Grand Primary CTA: Step 4 -> Step 5 ('Ойынды бастау' -> 1-қақпа) */}
      <div className="pt-4 text-center">
        <button
          onClick={onStartGame}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-2xl bg-[#1b4332] text-amber-200 font-serif font-bold text-lg hover:bg-[#153427] transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Ойынды бастау</span>
          <ArrowRight className="w-5 h-5 text-amber-300" />
        </button>
        <p className="text-xs text-stone-500 mt-2.5 font-serif italic">
          1-қақпа: «Бесшатыр — сақтар әлемі» кезеңіне өту
        </p>
      </div>
    </div>
  );
};
