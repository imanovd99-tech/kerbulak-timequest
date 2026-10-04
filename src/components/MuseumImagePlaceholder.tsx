import React, { useState } from 'react';
import { Camera, Image as ImageIcon, MapPin, ZoomIn } from 'lucide-react';

interface MuseumImagePlaceholderProps {
  title: string;
  subtitle?: string;
  aspectRatio?: '16:9' | '4:3' | '3:2';
  src?: string;
  caption?: string;
  className?: string;
}

export const MuseumImagePlaceholder: React.FC<MuseumImagePlaceholderProps> = ({
  title,
  subtitle,
  aspectRatio = '16:9',
  src,
  caption,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '4:3'
      ? 'aspect-4/3'
      : 'aspect-3/2';

  if (src && !imageError) {
    return (
      <figure className={`overflow-hidden rounded-xl border border-[#d6cebe] bg-[#f5f0e6] shadow-xs ${className}`}>
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-900`}>
          <img
            src={src}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        {(caption || title) && (
          <figcaption className="p-3 text-xs text-stone-600 border-t border-[#e2d8c7] bg-[#fbf9f5] flex items-center justify-between">
            <span className="font-medium text-stone-800">{caption || title}</span>
            <span className="text-[11px] text-stone-500">Кербұлақ ауданы</span>
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-2xl border-2 border-dashed border-[#cbbfae] bg-gradient-to-br from-[#f8f5ee] via-[#f3eee2] to-[#eae2d2] p-5 shadow-xs flex flex-col justify-between overflow-hidden group select-none ${className}`}
    >
      {/* Decorative steppe geometric watermark corner lines */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b45309]/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b45309]/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b45309]/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b45309]/40 pointer-events-none" />

      {/* Top bar with museum badge */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1b4332]/10 border border-[#1b4332]/20 text-[#1b4332] text-[11px] font-semibold tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Сурет кейін енгізіледі</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
          <MapPin className="w-3 h-3 text-[#b45309]" />
          <span>Жетісу облысы</span>
        </div>
      </div>

      {/* Center artwork container */}
      <div className="my-auto text-center px-4 py-2 z-10 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/80 border border-[#d6cbba] shadow-xs flex items-center justify-center text-[#1b4332] mb-3 group-hover:scale-105 transition-transform duration-300">
          <ImageIcon className="w-7 h-7 stroke-[1.5] text-[#1b4332]" />
        </div>
        <h4 className="text-lg md:text-xl font-serif font-bold text-stone-900 tracking-tight">
          «{title}»
        </h4>
        {subtitle && (
          <p className="mt-1 text-xs md:text-sm text-stone-600 max-w-md mx-auto line-clamp-2">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom instructional note */}
      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-[#dfd4c3]/80 z-10">
        <span>Деректік фото кейін енгізіледі</span>
        <span className="text-[#b45309] font-medium">Кербұлақ ауданы</span>
      </div>

      {/* Subtle background circular pattern */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="w-64 h-64 rounded-full border-8 border-stone-800" />
      </div>
    </div>
  );
};
