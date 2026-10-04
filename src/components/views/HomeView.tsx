import React from 'react';
import { ArrowRight, Compass, Shield, BookOpen, Landmark, Award, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { AppView } from '../../types/game';
import { BADGES } from '../../data/historyData';
import { imageMap } from '../../config/imageMap';
import { HistoricalImage } from '../HistoricalImage';

interface HomeViewProps {
  onStartGame: () => void;
  onSelectGate: (gateNumber: number) => void;
  completedGates: number[];
  unlockedBadges: string[];
  totalScore: number;
  setCurrentView: (view: AppView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartGame,
  onSelectGate,
  completedGates,
  unlockedBadges,
  totalScore,
  setCurrentView,
}) => {
  const gatesMeta = [
    {
      number: 1,
      title: '«БЕСШАТЫР — САҚТАР ӘЛЕМІ»',
      era: 'б.з.д. VII–IV ғғ.',
      desc: '31 обадан тұратын сақ патшалар қорымы және Кемел Ақышев экспедициясы.',
      icon: Shield,
      badgeName: 'Сақ мұрасы',
      imageKey: 'gate1',
    },
    {
      number: 2,
      title: '«БОСТАН — ТАРИХ ӘЛІ ЗЕРТТЕЛІП ЖАТЫР»',
      era: '2023–2024 жж.',
      desc: 'Қоғалы алқабындағы 4 жаңа археологиялық нысан және заманауи қазбалар.',
      icon: Compass,
      badgeName: 'Зерттеуші',
      imageKey: 'gate2',
    },
    {
      number: 3,
      title: '«ШОҚАН ІЗІ»',
      era: '1865–1985 жж.',
      desc: 'Шоқан Уәлихановтың Алтынемел кешенінің уақыт желісі (зират, құлпытас, ескерткіш, музей).',
      icon: BookOpen,
      badgeName: 'Ғалым ізі',
      imageKey: 'gate3',
    },
    {
      number: 4,
      title: '«МҰРАНЫ САҚТА»',
      era: '2022 жыл',
      desc: '60 археологиялық ескерткішке орнатылған күзет тақталары және қорғау мәдениеті.',
      icon: Landmark,
      badgeName: 'Мұра қорғаушысы',
      imageKey: 'gate4',
    },
    {
      number: 5,
      title: '«УАҚЫТ ҚАҚПАСЫ»',
      era: 'Қорытынды кезең',
      desc: 'Сақ дәуірінен қазіргі зерттеулерге дейінгі толық хронологиялық шежіре.',
      icon: Award,
      badgeName: 'Уақыт шебері',
      imageKey: 'gate5',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* HERO SECTION WITH HERO IMAGE BLOCK */}
      <section className="relative overflow-hidden rounded-3xl border border-[#ded3be] bg-gradient-to-b from-[#faf6ee] via-[#f7f0e3] to-[#f0e7d6] p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Subtle decorative ornaments */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#1b4332]/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#b45309]/5 blur-2xl pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1b4332]/10 border border-[#1b4332]/20 text-[#1b4332] text-xs font-bold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5 text-[#b45309]" />
              <span>9-сынып өлкетану жобасы · Жетісу облысы</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.1]">
              KERBULAK <span className="text-[#b45309]">TIMEQUEST</span>
            </h1>

            <p className="text-base sm:text-xl font-serif text-[#1b4332] font-semibold">
              «Кербұлақ тарихына интерактивті саяхат»
            </p>

            <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto">
              Кербұлақтың тарихи уақыт қақпаларын ашып, сақ дәуірінен қазіргі археологиялық зерттеулерге дейін саяхат жаса.
            </p>
          </div>

          {/* Dedicated Hero Image Block */}
          <div className="max-w-3xl mx-auto">
            <HistoricalImage
              image={imageMap.hero}
              aspectRatio="16:9"
              className="border-2 border-[#d8ccb9] shadow-md"
              showCaption={true}
            />
          </div>

          {/* Primary CTA: Step 1 -> Step 2 ('Жоба туралы') */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentView('about')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#1b4332] text-amber-200 font-bold text-base hover:bg-[#153427] transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Жобамен танысу</span>
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </button>

            <button
              onClick={() => setCurrentView('chronicle')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/90 hover:bg-white text-stone-800 border border-[#d6cbba] font-semibold text-sm transition-all shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#b45309]" />
              <span>Цифрлық шежірені көру</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5 HISTORICAL GATES & PROGRESS INDICATOR */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-[#e2d8c7]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              5 тарихи қақпа
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Әр қақпа Кербұлақтың маңызды тарихи кезеңі мен нысанын ашады
            </p>
          </div>

          {/* Overall Progress Widget */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#ded5c5] shadow-2xs">
            <div className="text-right">
              <span className="text-[11px] uppercase font-bold text-stone-500 block">Прогресс</span>
              <span className="text-sm font-bold text-[#1b4332]">
                {completedGates.length} / 5 қақпа ашылды
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-[#1b4332] flex items-center justify-center font-bold text-xs text-stone-800">
              {Math.round((completedGates.length / 5) * 100)}%
            </div>
          </div>
        </div>

        {/* Gates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gatesMeta.map((gate) => {
            const isCompleted = completedGates.includes(gate.number);
            const IconComponent = gate.icon;

            return (
              <div
                key={gate.number}
                onClick={() => onSelectGate(gate.number)}
                className={`group cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-gradient-to-b from-[#fefbf6] to-[#f8f3e7] border-amber-300 shadow-sm hover:border-[#b45309]'
                    : 'bg-white/80 border-[#ded5c5] hover:border-[#1b4332]/60 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-[#f0e9dd] text-stone-800 font-mono font-bold text-xs flex items-center justify-center">
                      0{gate.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#b45309]">
                      {gate.era}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#1b4332] transition-colors leading-snug">
                    {gate.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {gate.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-stone-700">
                    <IconComponent className="w-4 h-4 text-[#b45309]" />
                    <span>«{gate.badgeName}» белгісі</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[#1b4332] group-hover:translate-x-0.5 transition-transform">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ашылды
                      </span>
                    ) : (
                      <>
                        <span>Қақпаны ашу</span>
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COLLECTED BADGES SHOWCASE */}
      <section className="rounded-2xl border border-[#ded5c5] bg-[#fbf9f4] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#b45309]" />
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Тарихи белгілер коллекциясы
            </h3>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {unlockedBadges.length} / 5 жиналды
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {BADGES.map((b) => {
            const isUnlocked = unlockedBadges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isUnlocked
                    ? 'bg-white border-amber-300 text-stone-900 shadow-2xs'
                    : 'bg-stone-100/50 border-stone-200 text-stone-400 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1.5 ${
                    isUnlocked
                      ? 'bg-[#1b4332] text-amber-300'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold font-serif line-clamp-1">
                  «{b.name}»
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {b.gateNumber}-қақпа
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

