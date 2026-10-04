import React from 'react';
import { Shield, Compass, BookOpen, Landmark, Award, Lock, Check } from 'lucide-react';
import { Badge } from '../types/game';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  onClick?: () => void;
  compact?: boolean;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({
  badge,
  isUnlocked,
  onClick,
  compact = false,
}) => {
  const getIcon = () => {
    switch (badge.iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Landmark':
        return <Landmark className="w-5 h-5" />;
      case 'Award':
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
          isUnlocked
            ? 'bg-amber-50/80 border-amber-300 text-amber-950 shadow-xs'
            : 'bg-stone-100/70 border-stone-200 text-stone-400'
        }`}
        title={isUnlocked ? `${badge.name} — Ашылған` : `${badge.name} — Құлыптаулы`}
      >
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full ${
            isUnlocked ? 'bg-amber-500 text-white' : 'bg-stone-300 text-stone-500'
          }`}
        >
          {isUnlocked ? getIcon() : <Lock className="w-3 h-3" />}
        </span>
        <span className="font-semibold">{badge.name}</span>
        {isUnlocked && <Check className="w-3.5 h-3.5 text-emerald-700 ml-auto" />}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all duration-300 ${
        isUnlocked
          ? 'bg-gradient-to-b from-[#fffefc] to-[#fbf8f0] border-[#d8caaf] shadow-md hover:border-[#b45309]'
          : 'bg-[#f4efe6]/50 border-stone-200 opacity-70 grayscale'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs ${
            isUnlocked
              ? 'bg-gradient-to-br from-[#d97706] to-[#b45309] text-white ring-4 ring-amber-100'
              : 'bg-stone-200 text-stone-500'
          }`}
        >
          {isUnlocked ? getIcon() : <Lock className="w-5 h-5" />}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
          {badge.dateOrEra}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-1.5">
          <h4 className="text-base font-bold text-stone-900 font-serif">
            «{badge.name}»
          </h4>
          {isUnlocked && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
              Ашылды
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-stone-600 leading-relaxed">
          {badge.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500 font-medium">
        <span>{badge.gateNumber}-қақпа белгісі</span>
        <span className="text-[#1b4332] font-semibold">
          {isUnlocked ? 'Коллекцияда' : 'Құлыптаулы'}
        </span>
      </div>
    </div>
  );
};
