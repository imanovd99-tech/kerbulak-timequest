import React from 'react';
import { Landmark, Compass, ShieldCheck, History, Calendar, CheckCircle } from 'lucide-react';

interface TimelineBannerProps {
  className?: string;
  showTimelineTrack?: boolean;
}

export const TIMELINE_MILESTONES = [
  {
    year: 'б.з.д. VII–IV ғғ.',
    title: 'Бесшатыр қорымы',
    desc: 'Сақ дәуірінің 31 патшалық обасы',
    category: 'Сақ дәуірі',
    icon: Landmark,
  },
  {
    year: '1865',
    title: 'Шоқан Уәлиханов зираты',
    desc: 'Тезек төре ауылы, Алтынемел',
    category: 'Ғалым мұрасы',
    icon: History,
  },
  {
    year: '1881',
    title: 'Мәрмәр құлпытас',
    desc: 'Шоқан бейітіне құлпытас орнатылуы',
    category: 'Құлпытас',
    icon: History,
  },
  {
    year: '1979',
    title: 'Шоқан ескерткіші',
    desc: 'Мемориалдық ескерткіштің ашылуы',
    category: 'Мемориал',
    icon: Landmark,
  },
  {
    year: '1985',
    title: '«Алтынемел» музейі',
    desc: '150 жылдығына арналған музей кешені',
    category: 'Музей',
    icon: Landmark,
  },
  {
    year: '2022',
    title: 'Күзет тақталары',
    desc: '60 тарихи ескерткішті мемлекеттік қорғау',
    category: 'Мұраны қорғау',
    icon: ShieldCheck,
  },
  {
    year: '2023–2024',
    title: 'Бостан зерттеулері',
    desc: 'Қоғалы алқабы, 4 жаңа нысандағы қазбалар',
    category: 'Жаңа археология',
    icon: Compass,
  },
];

export const TimelineBanner: React.FC<TimelineBannerProps> = ({
  className = '',
  showTimelineTrack = true,
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* 1. COMPOSITE VISUAL BANNER / COLLAGE */}
      <div className="overflow-hidden rounded-3xl border-2 border-[#d8ccb9] bg-[#1b4332] text-white shadow-lg relative">
        {/* Decorative background grid and lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#143427] via-[#1b4332]/95 to-[#153125] z-0" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 p-5 sm:p-7 space-y-5">
          {/* Header Title & Tag */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <History className="w-3.5 h-3.5" />
                <span>Тарихи-инфографикалық шежіре</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-amber-100 tracking-tight">
                «Кербұлақ: Сақ дәуірінен бүгінгі зерттеулерге дейін»
              </h3>
            </div>
            <div className="text-xs text-stone-300 font-medium sm:text-right">
              <span>9-сынып өлкетану қорытындысы</span>
              <div className="text-amber-300/80 font-mono text-[11px]">Жетісу облысы</div>
            </div>
          </div>

          {/* 4 Pillars Collage Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
            {/* Pillar 1: Besshatyr */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 aspect-4/3 group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/30/Besshatyr.jpg"
                alt="Бесшатыр қорымы"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  б.з.д. VII–IV ғғ.
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Бесшатыр сақ обалары
                </span>
              </div>
            </div>

            {/* Pillar 2: Shokan Museum */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 aspect-4/3 group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Shokan_Ualikhanov_Museum.jpg"
                alt="Шоқан Уәлиханов музейі"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  1865 · 1985
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Шоқан мұрасы мен музейі
                </span>
              </div>
            </div>

            {/* Pillar 3: Shokan Memorial */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 aspect-4/3 group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Shokan_Ualikhanov_Grave.jpg"
                alt="Шоқан мемориалы"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  1881 · 2022
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Мемориал мен күзет
                </span>
              </div>
            </div>

            {/* Pillar 4: Bostan Archeological Research */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-white aspect-4/3 group">
              <img
                src="/images/bostan.svg"
                alt="Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы"
                className="w-full h-full object-contain p-1 bg-white transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent flex flex-col justify-end p-2.5 sm:p-3 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                  2023–2024
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-white leading-tight">
                  Бостан зерттеулері
                </span>
              </div>
            </div>
          </div>

          {/* Banner summary message */}
          <div className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-serif italic pt-1 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              «Кербұлақ ауданының мұрасы — сақ дәуірінің қорымдарынан басталған ұлы өркениеттің бүгінгі ғылыми жалғасы.»
            </span>
            <span className="text-[11px] text-amber-300 font-mono shrink-0 not-italic">
              7 негізгі тарихи белес
            </span>
          </div>
        </div>
      </div>

      {/* 2. CHRONOLOGICAL INFOGRAPHIC STEPPER (7 MILESTONES) */}
      {showTimelineTrack && (
        <div className="bg-[#fcfaf7] border border-[#ded5c5] rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5dcce] pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b45309]" />
              <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                Кербұлақ шежіресінің хронологиялық уақыт желісі
              </h4>
            </div>
            <span className="text-xs font-semibold text-[#1b4332] bg-[#1b4332]/10 px-2.5 py-1 rounded-md">
              7 кезең
            </span>
          </div>

          {/* Responsive Milestone Cards Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5 relative">
            {TIMELINE_MILESTONES.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.year}
                  className="relative p-3 rounded-2xl bg-white border border-[#ded5c5] hover:border-[#b45309] transition-all shadow-2xs flex flex-col justify-between space-y-2 group"
                >
                  {/* Top step & icon */}
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-full bg-[#1b4332] text-amber-300 text-[10px] font-bold flex items-center justify-center font-mono">
                      {index + 1}
                    </span>
                    <IconComp className="w-3.5 h-3.5 text-[#b45309]" />
                  </div>

                  {/* Year badge */}
                  <div>
                    <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[#b45309] font-mono font-bold text-xs">
                      {item.year}
                    </span>
                    <h5 className="font-serif font-bold text-stone-900 text-xs sm:text-[13px] mt-1.5 leading-snug">
                      {item.title}
                    </h5>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-stone-500 leading-snug">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
