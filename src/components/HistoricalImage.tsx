import React, { useState } from 'react';
import { Camera, MapPin, Info } from 'lucide-react';
import { HistoricalImageItem } from '../config/imageMap';

interface HistoricalImageProps {
  image: HistoricalImageItem;
  aspectRatio?: '16:9' | '4:3' | '21:9' | 'auto';
  className?: string;
  showCaption?: boolean;
}

export const HistoricalImage: React.FC<HistoricalImageProps> = ({
  image,
  aspectRatio = '16:9',
  className = '',
  showCaption = true,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(image.src || image.localFallback);
  const [hasError, setHasError] = useState(false);

  const aspectClass =
    aspectRatio === '16:9'
      ? 'aspect-video'
      : aspectRatio === '4:3'
      ? 'aspect-4/3'
      : aspectRatio === '21:9'
      ? 'aspect-21/9'
      : '';

  // If this item is designated strictly as placeholder only (e.g. Gate 2 «Бостан»)
  if (image.isPlaceholderOnly || (!currentSrc && hasError)) {
    return (
      <figure
        className={`overflow-hidden rounded-2xl border border-[#ded5c5] bg-[#faf7f2] shadow-sm transition-all ${className}`}
      >
        <div className={`relative w-full ${aspectClass} overflow-hidden bg-gradient-to-br from-[#fbf8f2] via-[#f4eee2] to-[#eae0cd] flex flex-col justify-between p-5 sm:p-7 select-none`}>
          {/* Subtle ornamental corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#b45309]/50 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#b45309]/50 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#b45309]/50 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#b45309]/50 pointer-events-none" />

          {/* Top status */}
          <div className="flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1b4332]/10 border border-[#1b4332]/25 text-[#1b4332] text-xs font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>Сурет кейін енгізіледі</span>
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-[#b45309]" />
              <span>Кербұлақ ауданы</span>
            </span>
          </div>

          {/* Center Title */}
          <div className="my-auto text-center px-4 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/90 border border-[#d6cbba] shadow-xs flex items-center justify-center text-[#1b4332] mx-auto mb-3">
              <Camera className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-snug">
              «{image.fallbackTitle}»
            </h4>
            {image.fallbackSubtitle && (
              <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                {image.fallbackSubtitle}
              </p>
            )}
          </div>

          {/* Bottom info */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-[#ded3be] z-10">
            <span>Қоғалы алқабы</span>
            <span className="text-[#b45309] font-medium">Археологиялық ізденіс</span>
          </div>
        </div>

        {showCaption && (
          <figcaption className="p-3.5 sm:p-4 text-xs bg-[#fdfbf8] border-t border-[#e5dcce]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#b45309] shrink-0" />
              <span className="font-bold text-stone-900">{image.caption}</span>
            </div>
          </figcaption>
        )}
      </figure>
    );
  }

  // Real Image Display
  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[#ded5c5] bg-[#faf7f2] shadow-md transition-all ${className}`}
    >
      {/* <img> with object-fit: cover and guaranteed aspect ratio */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-stone-900`}>
        <img
          src={currentSrc}
          alt={image.alt || image.caption}
          referrerPolicy="no-referrer"
          loading="eager"
          onError={() => {
            // If primary URL fails, try local fallback image
            if (image.localFallback && currentSrc !== image.localFallback) {
              setCurrentSrc(image.localFallback);
            } else {
              setHasError(true);
            }
          }}
          className="w-full h-full object-cover block transition-transform duration-500 hover:scale-102"
        />
      </div>

      {/* Caption & Photo Credit Bar */}
      {showCaption && (
        <figcaption className="p-3.5 sm:p-4 text-xs bg-[#fdfbf8] border-t border-[#e5dcce] space-y-1">
          <div className="flex items-start sm:items-center gap-2">
            <Info className="w-4 h-4 text-[#b45309] shrink-0 mt-0.5 sm:mt-0" />
            <span className="font-bold text-stone-900 text-sm">
              {image.caption}
            </span>
          </div>

          {image.photoCredit && (
            <div className="text-[11px] text-stone-500 italic pl-6">
              {image.photoCredit}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
};
