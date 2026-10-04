import React from 'react';
import { BookOpen, ExternalLink, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { CHRONICLE_SECTIONS } from '../../data/historyData';
import { HistoricalImage } from '../HistoricalImage';
import { ArchaeologyCard } from '../ArchaeologyCard';
import { imageMap } from '../../config/imageMap';
import { AppView } from '../../types/game';

interface ChronicleViewProps {
  setCurrentView: (view: AppView) => void;
}

export const ChronicleView: React.FC<ChronicleViewProps> = ({ setCurrentView }) => {
  const getSectionImage = (sectionId: string) => {
    switch (sectionId) {
      case 'sec-besshatyr':
        return imageMap.chronicleBesshatyr;
      case 'sec-chokan':
        return imageMap.chronicleShokan;
      case 'sec-qorgau':
        return imageMap.chronicleMura;
      case 'sec-bostan':
        return imageMap.chronicleBostan;
      default:
        return imageMap.hero;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      {/* Editorial Header */}
      <section className="text-center space-y-3 pb-6 border-b border-[#ded5c5]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b4332]/10 text-[#1b4332] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#b45309]" />
          <span>Қорытынды цифрлық өнім · 9-сынып өлкетану</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Кербұлақтың цифрлық шежіресі
        </h1>
        <p className="text-base sm:text-lg text-stone-600 font-serif italic max-w-2xl mx-auto">
          Тарихи нысандар, археологиялық кешендер және уақыт маршруты
        </p>
      </section>

      {/* Visual Timeline Stream */}
      <div className="relative border-l-2 border-[#b45309]/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {CHRONICLE_SECTIONS.map((section, idx) => (
          <article
            key={section.id}
            className="relative bg-white border border-[#ded5c5] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#b45309]/50 transition-all space-y-6"
          >
            {/* Timeline node circle */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-8 w-6 h-6 rounded-full bg-[#1b4332] border-4 border-[#faf7f2] shadow-xs flex items-center justify-center text-[10px] text-amber-300 font-bold">
              {idx + 1}
            </div>

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#b45309] block">
                  {idx + 1}-бөлім
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
                  {section.title}
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f4eee3] border border-[#e2d6c1] text-xs font-semibold text-[#1b4332] shrink-0 self-start sm:self-auto">
                <Calendar className="w-3.5 h-3.5 text-[#b45309]" />
                <span>{section.period}</span>
              </div>
            </div>

            {/* Dedicated Historical Image or Archaeology Field Card */}
            {section.id === 'sec-bostan' ? (
              <ArchaeologyCard />
            ) : (
              <HistoricalImage
                image={getSectionImage(section.id)}
                aspectRatio="16:9"
                showCaption={true}
              />
            )}

            {/* Short Narrative Content */}
            <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed">
              <p>{section.description}</p>
            </div>

            {/* Official Source Marker */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-[#fbf9f4] p-3.5 rounded-xl border border-[#ded5c5]">
              <div className="flex items-start sm:items-center gap-2 text-stone-700">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#1b4332] text-amber-200 shrink-0">
                  Дереккөз №{section.sourceNumber}
                </span>
                <span className="font-medium text-stone-800">{section.sourceText}</span>
              </div>
              <button
                onClick={() => setCurrentView('sources')}
                className="text-stone-500 hover:text-stone-900 inline-flex items-center gap-1 font-semibold self-end sm:self-auto cursor-pointer"
              >
                <span>Толық тізім</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Summary Bar: Step 3 -> Step 4 ('Дереккөздер') */}
      <div className="bg-[#1b4332] text-stone-100 rounded-3xl p-8 text-center space-y-4 shadow-md">
        <h3 className="text-2xl font-serif font-bold text-amber-200">
          «Тарихи мұра — өткеннің ғана емес, болашақ ұрпақтың да құндылығы.»
        </h3>
        <p className="text-sm text-stone-300 max-w-xl mx-auto">
          Бұл цифрлық шежіре Кербұлақ ауданының археологиялық және тарихи мұраларын сақтау мен таныстыруға арналған ғылыми-өлкетанулық ізденіс қорытындысы.
        </p>
        <div className="pt-2">
          <button
            onClick={() => setCurrentView('sources')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-amber-400 text-stone-950 font-bold text-base hover:bg-amber-300 transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Дереккөздерге өту</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

