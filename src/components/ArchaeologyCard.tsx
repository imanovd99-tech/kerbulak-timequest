import React, { useState } from 'react';
import { MapPin, ZoomIn, X, Maximize2 } from 'lucide-react';

interface ArchaeologyCardProps {
  className?: string;
}

export const ArchaeologyCard: React.FC<ArchaeologyCardProps> = ({ className = '' }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState('/images/bostan.svg');

  return (
    <>
      <figure
        className={`overflow-hidden rounded-2xl border border-[#d6cbba] bg-white shadow-md transition-all ${className}`}
      >
        {/* Top Header: Location and Research Badge */}
        <div className="p-4 sm:p-5 pb-3 bg-[#fdfbf7] border-b border-[#e8dfcf] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1b4332]/10 border border-[#1b4332]/20 text-[#1b4332] font-semibold text-xs sm:text-sm">
            <MapPin className="w-3.5 h-3.5 text-[#b45309] shrink-0" />
            <span>Жетісу облысы · Кербұлақ ауданы · Қоғалы алқабы · Бостан ауылы маңы</span>
          </div>

          <div className="self-start sm:self-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-xs font-medium">
              2023–2024 жылдары зерттелген 4 қорған
            </span>
          </div>
        </div>

        {/* Scientific Diagram Visual Frame - object-fit: contain on white/light neutral background */}
        <div className="relative w-full bg-white p-3 sm:p-5 flex items-center justify-center overflow-hidden group">
          <div
            onClick={() => setIsZoomed(true)}
            className="relative w-full flex items-center justify-center cursor-zoom-in rounded-xl overflow-hidden hover:opacity-95 transition-opacity"
            title="Үлкейтіп көру үшін басыңыз"
          >
            <img
              src={imgSrc}
              alt="Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы"
              referrerPolicy="no-referrer"
              onError={() => {
                if (imgSrc !== '/images/bostan.jpg') {
                  setImgSrc('/images/bostan.jpg');
                }
              }}
              className="w-full h-auto max-h-[500px] sm:max-h-[620px] object-contain block mx-auto transition-transform duration-300 group-hover:scale-[1.01]"
            />

            {/* Click to inspect overlay button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(true);
              }}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs font-semibold backdrop-blur-xs shadow-md transition-all cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
              <span>Үлкейту</span>
            </button>
          </div>
        </div>

        {/* Mandatory Caption and Author/Source Credit */}
        <figcaption className="p-4 sm:p-5 bg-[#fdfbf8] border-t border-[#e8dfcf] space-y-1 text-left">
          <div className="text-sm sm:text-base font-bold text-stone-900 font-serif leading-snug">
            «Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы»
          </div>
          <div className="text-xs text-stone-600 font-sans leading-relaxed">
            Орындаған: А.Е. Ерғабылов. Дереккөз: Д.С. Байқонақов және т.б., Қазақстан археологиясы, 2025.
          </div>
        </figcaption>
      </figure>

      {/* Full-screen Inspection Modal on Click */}
      {isZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ғылыми сызбаны толық қарау"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-700 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#fcfaf7] border-b border-stone-200 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                  «Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы»
                </h4>
                <p className="text-[11px] text-stone-500">
                  Қоғалы алқабы, ерте темір дәуірі археологиялық зерттеулері
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 transition-colors cursor-pointer"
                title="Жабу"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="p-4 sm:p-6 overflow-auto flex items-center justify-center bg-white min-h-[300px] max-h-[75vh]">
              <img
                src={imgSrc}
                alt="Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[70vh]"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-[#fdfbf8] border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-stone-600">
              <span>Орындаған: А.Е. Ерғабылов. Дереккөз: Д.С. Байқонақов және т.б., Қазақстан археологиясы, 2025.</span>
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="self-end sm:self-auto font-bold text-[#1b4332] hover:underline cursor-pointer"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
