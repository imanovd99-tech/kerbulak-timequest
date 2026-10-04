/**
 * KERBULAK TIMEQUEST - СУРЕТТЕР МӘЗІРІ (IMAGE MAP)
 *
 * Мұнда нақты сурет URL-дары, сипаттамасы (alt, caption) және
 * авторлық құқықтары (photoCredit) сақталады.
 */

export interface HistoricalImageItem {
  id: string;
  src?: string;
  localFallback?: string;
  alt: string;
  caption: string;
  photoCredit?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  isPlaceholderOnly?: boolean;
}

export const imageMap: Record<string, HistoricalImageItem> = {
  // Басты бет және 1-қақпа «Бесшатыр — сақтар әлемі»
  hero: {
    id: 'hero',
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Besshatyr.jpg',
    localFallback: '/images/besshatyr.jpg',
    alt: 'Бесшатыр қорымы',
    caption: 'Бесшатыр қорымы',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Бесшатыр қорымы',
    fallbackSubtitle: 'Жетісу облысы, Кербұлақ ауданының тарихи кеңістігі',
  },

  gate1: {
    id: 'gate1',
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Besshatyr.jpg',
    localFallback: '/images/besshatyr.jpg',
    alt: 'Бесшатыр қорымы',
    caption: 'Бесшатыр қорымы',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Бесшатыр қорымы',
    fallbackSubtitle: 'Сақ дәуіріне жататын 31 обадан тұратын тарихи кешен',
  },

  // 2-қақпа: Бостан — тарих әлі зерттеліп жатыр
  gate2: {
    id: 'gate2',
    src: '/images/bostan.svg',
    localFallback: '/images/bostan.jpg',
    alt: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    caption: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    photoCredit: 'Орындаған: А.Е. Ерғабылов. Дереккөз: Д.С. Байқонақов және т.б., Қазақстан археологиясы, 2025.',
    fallbackTitle: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    fallbackSubtitle: 'Жетісу облысы · Кербұлақ ауданы · Қоғалы алқабы · Бостан ауылы маңы',
    isPlaceholderOnly: false,
  },

  // 3-қақпа «Шоқан ізі»
  gate3: {
    id: 'gate3',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Shokan_Ualikhanov_Museum.jpg',
    localFallback: '/images/shokan.jpg',
    alt: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    caption: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    fallbackSubtitle: 'Кербұлақ ауданындағы Шоқан Уәлиханов мемориалдық кешені',
  },

  // 4-қақпа «Мұраны сақта»
  gate4: {
    id: 'gate4',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Shokan_Ualikhanov_Grave.jpg',
    localFallback: '/images/mura.jpg',
    alt: 'Шоқан Уәлиханов мемориалы',
    caption: 'Шоқан Уәлиханов мемориалы',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Шоқан Уәлиханов мемориалы',
    fallbackSubtitle: 'Тарихи-мәдени мұраны мемлекеттік сақтау және күзет тақталары',
  },

  // 5-қақпа: Уақыт қақпасы (әзірге placeholder)
  gate5: {
    id: 'gate5',
    alt: 'Кербұлақтың уақыт желісі',
    caption: 'Кербұлақтың уақыт желісі',
    fallbackTitle: 'Кербұлақтың уақыт желісі',
    fallbackSubtitle: 'Сақ дәуірінен бүгінгі күнге дейінгі толық хронологиялық шежіре',
    isPlaceholderOnly: true,
  },

  // Цифрлық шежіре бөлімдері
  chronicleBesshatyr: {
    id: 'chronicleBesshatyr',
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Besshatyr.jpg',
    localFallback: '/images/besshatyr.jpg',
    alt: 'Бесшатыр қорымы',
    caption: 'Бесшатыр қорымы',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Бесшатыр қорымы',
    fallbackSubtitle: 'Кемел Ақышев басқарған экспедиция зерттеген обалар',
  },
  chronicleShokan: {
    id: 'chronicleShokan',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Shokan_Ualikhanov_Museum.jpg',
    localFallback: '/images/shokan.jpg',
    alt: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    caption: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Шоқан Уәлихановтың «Алтынемел» мемориалдық музейі',
    fallbackSubtitle: '«Алтынемел» мемориалдық кешені (1865–1985 жж.)',
  },
  chronicleMura: {
    id: 'chronicleMura',
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Shokan_Ualikhanov_Grave.jpg',
    localFallback: '/images/mura.jpg',
    alt: 'Шоқан Уәлиханов мемориалы',
    caption: 'Шоқан Уәлиханов мемориалы',
    photoCredit: 'Фото: Yakov Fedorov / Wikimedia Commons / CC BY-SA 4.0',
    fallbackTitle: 'Шоқан Уәлиханов мемориалы',
    fallbackSubtitle: 'Кербұлақ ауданының 60 археологиялық ескерткішін қорғау',
  },
  chronicleBostan: {
    id: 'chronicleBostan',
    src: '/images/bostan.svg',
    localFallback: '/images/bostan.jpg',
    alt: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    caption: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    photoCredit: 'Орындаған: А.Е. Ерғабылов. Дереккөз: Д.С. Байқонақов және т.б., Қазақстан археологиясы, 2025.',
    fallbackTitle: 'Бостан қорымы: №48 және №56 обалардың ғылыми сызбасы',
    fallbackSubtitle: 'Қоғалы алқабы, Бостан ауылы маңындағы қазба жұмыстары',
    isPlaceholderOnly: false,
  },
};
