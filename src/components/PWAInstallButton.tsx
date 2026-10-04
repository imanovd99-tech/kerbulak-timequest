import React, { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-colors shadow-xs"
        title="Қосымшаны орнату (PWA)"
      >
        <Download className="w-3.5 h-3.5 text-emerald-800" />
        <span className="hidden sm:inline">Қосымшаны орнату</span>
        <span className="sm:hidden">Орнату</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors shadow-xs"
          title="iPhone / iPad-қа орнату"
        >
          <Smartphone className="w-3.5 h-3.5 text-stone-600" />
          <span className="hidden sm:inline">iOS-қа орнату</span>
          <span className="sm:hidden">Орнату</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-[#fdfbf7] border border-[#d8cfbe] p-6 shadow-2xl text-stone-900">
              <div className="flex items-center justify-between pb-3 border-b border-[#e5dac6]">
                <h3 className="text-base font-bold text-stone-900">iPhone / iPad құрылғысына орнату</h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-stone-500 hover:text-stone-800 rounded-md"
                  aria-label="Жабу"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-sm text-stone-700 leading-relaxed">
                1. Safari браузеріндегі төменгі <span className="font-semibold text-stone-900">«Бөлісу» (Share)</span> түймесін басыңыз.<br />
                2. Мәзірді төмен жылжытып, <span className="font-semibold text-stone-900">«Басты экранға қосу» (Add to Home Screen)</span> тармағын таңдаңыз.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-[#1b4332] py-2.5 text-sm font-semibold text-[#fef9c3] hover:bg-[#143326] transition-colors"
              >
                Түсінікті
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
