/**
 * International Biometric Passport, Visa & ID Photo Specifications Engine
 * Maintained by UseCOS Engineering (https://usecos.app/tools/passport-photo-resizer)
 *
 * Implements authoritative government & ICAO Doc 9303 document-photo presets:
 * - United States (US State Dept): 2" × 2" (51 × 51 mm), head 1"–1.375" (25–35 mm), 600×600px min
 * - Canada (IRCC / Passport Canada): 50 × 70 mm (2" × 2.75"), chin-to-crown 31–36 mm
 * - United Kingdom (HM Passport Office): 35 × 45 mm, head height 29–34 mm
 * - Schengen-style visa preset: 35 × 45 mm, head height 32–36 mm (70%–80%)
 * - India (Passport Seva & OCI): 35 × 45 mm (Passport) & 51 × 51 mm (2"×2" OCI/Visa)
 * - Australia & New Zealand: 35 × 45 mm, head height 32–36 mm
 * - China: 33 × 48 mm, head height 28–33 mm
 * - Japan: 45 × 45 mm, head height 27–31 mm
 */

export type PhotoPresetKey =
  | 'us_passport'
  | 'us_visa'
  | 'ca_passport'
  | 'ca_visa'
  | 'uk_passport'
  | 'schengen_visa'
  | 'in_passport'
  | 'in_oci'
  | 'au_passport'
  | 'cn_passport'
  | 'jp_visa'
  | 'nz_visa';

export interface PhotoPreset {
  key: PhotoPresetKey;
  country: string;
  flag: string;
  label: string;
  category: 'Passport' | 'Visa' | 'PR & ID';
  widthMm: number;
  heightMm: number;
  minHeadMm: number;
  maxHeadMm: number;
  aspectRatio: number; // width / height
  recommendedDpi: number; // standard 300 or 600 DPI
  targetWidthPx: number; // at 300 DPI
  targetHeightPx: number; // at 300 DPI
  hiResWidthPx: number; // at 600 DPI
  hiResHeightPx: number; // at 600 DPI
  description: string;
  officialSourceUrl: string;
}

export const GLOBAL_PHOTO_PRESETS: Record<PhotoPresetKey, PhotoPreset> = {
  us_passport: {
    key: 'us_passport',
    country: 'United States',
    flag: '🇺🇸',
    label: 'US Passport (2" × 2")',
    category: 'Passport',
    widthMm: 51,
    heightMm: 51,
    minHeadMm: 25,
    maxHeadMm: 35,
    aspectRatio: 1,
    recommendedDpi: 300,
    targetWidthPx: 600,
    targetHeightPx: 600,
    hiResWidthPx: 1200,
    hiResHeightPx: 1200,
    description: '2" × 2" (51 × 51 mm) square format. Head height must be between 1" and 1 3/8" (25–35 mm).',
    officialSourceUrl: 'https://travel.state.gov/content/travel/en/passports/how-apply/photos.html',
  },
  us_visa: {
    key: 'us_visa',
    country: 'United States',
    flag: '🇺🇸',
    label: 'US Visa, DS-160 & DV Lottery',
    category: 'Visa',
    widthMm: 51,
    heightMm: 51,
    minHeadMm: 25,
    maxHeadMm: 35,
    aspectRatio: 1,
    recommendedDpi: 300,
    targetWidthPx: 600,
    targetHeightPx: 600,
    hiResWidthPx: 1200,
    hiResHeightPx: 1200,
    description: 'Digital 600×600px square photo for US visa portal DS-160, DV Lottery, and Green Card.',
    officialSourceUrl: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/photos.html',
  },
  ca_passport: {
    key: 'ca_passport',
    country: 'Canada',
    flag: '🇨🇦',
    label: 'Canada Passport & PR Card',
    category: 'Passport',
    widthMm: 50,
    heightMm: 70,
    minHeadMm: 31,
    maxHeadMm: 36,
    aspectRatio: 50 / 70,
    recommendedDpi: 300,
    targetWidthPx: 591,
    targetHeightPx: 827,
    hiResWidthPx: 1181,
    hiResHeightPx: 1654,
    description: '50 mm × 70 mm (2" × 2.75"), chin to crown between 31 mm and 36 mm.',
    officialSourceUrl:
      'https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html',
  },
  ca_visa: {
    key: 'ca_visa',
    country: 'Canada',
    flag: '🇨🇦',
    label: 'Canada Visa & Visitor TRV',
    category: 'Visa',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 31,
    maxHeadMm: 36,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: '35 mm × 45 mm digital requirement for online Canadian visitor visa applications.',
    officialSourceUrl:
      'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html',
  },
  uk_passport: {
    key: 'uk_passport',
    country: 'United Kingdom',
    flag: '🇬🇧',
    label: 'UK Passport & Visa',
    category: 'Passport',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 29,
    maxHeadMm: 34,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: '35 mm × 45 mm, head measurement from crown to chin between 29 mm and 34 mm.',
    officialSourceUrl: 'https://www.gov.uk/photos-for-passports',
  },
  schengen_visa: {
    key: 'schengen_visa',
    country: 'Schengen area',
    flag: '🇪🇺',
    label: 'Schengen Visa (35 x 45 mm)',
    category: 'Visa',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 32,
    maxHeadMm: 36,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: 'Common 35 mm x 45 mm Schengen-style visa preset. Confirm destination consulate rules before submitting.',
    officialSourceUrl: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
  },
  in_passport: {
    key: 'in_passport',
    country: 'India',
    flag: '🇮🇳',
    label: 'India Passport (35 × 45 mm)',
    category: 'Passport',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 25,
    maxHeadMm: 35,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: '35 mm × 45 mm standard size for Passport Seva Kendra (PSK) applications.',
    officialSourceUrl: 'https://www.passportindia.gov.in/',
  },
  in_oci: {
    key: 'in_oci',
    country: 'India',
    flag: '🇮🇳',
    label: 'India OCI / Visa (2" × 2")',
    category: 'PR & ID',
    widthMm: 51,
    heightMm: 51,
    minHeadMm: 25,
    maxHeadMm: 35,
    aspectRatio: 1,
    recommendedDpi: 300,
    targetWidthPx: 600,
    targetHeightPx: 600,
    hiResWidthPx: 1200,
    hiResHeightPx: 1200,
    description: '51 mm × 51 mm (2" × 2") square format for Overseas Citizen of India (OCI) and e-Visa.',
    officialSourceUrl: 'https://ociservices.gov.in/',
  },
  au_passport: {
    key: 'au_passport',
    country: 'Australia & NZ',
    flag: '🇦🇺',
    label: 'Australia & NZ Passport',
    category: 'Passport',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 32,
    maxHeadMm: 36,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: '35 mm × 45 mm, head height from chin to crown between 32 mm and 36 mm.',
    officialSourceUrl: 'https://www.passports.gov.au/protect-your-identity-and-passports/photo-guidelines',
  },
  cn_passport: {
    key: 'cn_passport',
    country: 'China',
    flag: '🇨🇳',
    label: 'China Passport & Visa (33 × 48 mm)',
    category: 'Passport',
    widthMm: 33,
    heightMm: 48,
    minHeadMm: 28,
    maxHeadMm: 33,
    aspectRatio: 33 / 48,
    recommendedDpi: 300,
    targetWidthPx: 390,
    targetHeightPx: 567,
    hiResWidthPx: 780,
    hiResHeightPx: 1134,
    description: '33 mm × 48 mm with white or light blue background, head height 28–33 mm.',
    officialSourceUrl: 'https://www.visaforchina.cn/',
  },
  jp_visa: {
    key: 'jp_visa',
    country: 'Japan',
    flag: '🇯🇵',
    label: 'Japan Visa (45 × 45 mm)',
    category: 'Visa',
    widthMm: 45,
    heightMm: 45,
    minHeadMm: 27,
    maxHeadMm: 31,
    aspectRatio: 1,
    recommendedDpi: 300,
    targetWidthPx: 531,
    targetHeightPx: 531,
    hiResWidthPx: 1063,
    hiResHeightPx: 1063,
    description: '45 mm × 45 mm square photo on plain white background. Crown to chin between 27 mm and 31 mm.',
    officialSourceUrl: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
  },
  nz_visa: {
    key: 'nz_visa',
    country: 'New Zealand',
    flag: '🇳🇿',
    label: 'New Zealand Visa & NZeTA (35 × 45 mm)',
    category: 'Visa',
    widthMm: 35,
    heightMm: 45,
    minHeadMm: 32,
    maxHeadMm: 36,
    aspectRatio: 35 / 45,
    recommendedDpi: 300,
    targetWidthPx: 413,
    targetHeightPx: 531,
    hiResWidthPx: 827,
    hiResHeightPx: 1063,
    description: '35 mm × 45 mm photo (or 900×1200px digital). Head takes 70%–80% of photo, plain light background.',
    officialSourceUrl:
      'https://www.immigration.govt.nz/new-zealand-visas/apply-for-a-visa/tools-and-information/acceptable-photos',
  },
};

/**
 * Calculates guide overlay lines in percentages for viewport alignment and biometric framing.
 */
export function getFaceGuideRatios(presetKey: PhotoPresetKey) {
  const preset = GLOBAL_PHOTO_PRESETS[presetKey];
  const minHeadRatio = preset.minHeadMm / preset.heightMm;
  const maxHeadRatio = preset.maxHeadMm / preset.heightMm;

  // Typical vertical positioning: Crown begins ~8% to 12% from the top of the photo
  const crownTopPercent = 10;
  const minChinPercent = crownTopPercent + minHeadRatio * 100;
  const maxChinPercent = crownTopPercent + maxHeadRatio * 100;

  return {
    crownTopPercent,
    minChinPercent: Math.round(minChinPercent * 10) / 10,
    maxChinPercent: Math.round(maxChinPercent * 10) / 10,
    minHeadRatio,
    maxHeadRatio,
  };
}

/**
 * Returns printable 4x6 inch (1800 x 1200 px at 300 DPI) sheet positioning
 * Automatically arranges multi-photo grids based on aspect ratio:
 * - 2"x2" square (US/OCI): 6 photos (2 rows of 3)
 * - 35x45mm (UK/Schengen-style/India/Australia): 8 photos (2 rows of 4)
 * - 50x70mm (Canada): 2 photos side-by-side
 */
export function getPrintSheetLayout(presetKey: PhotoPresetKey) {
  const sheetWidthPx = 1800; // 6 inches * 300 DPI
  const sheetHeightPx = 1200; // 4 inches * 300 DPI
  const preset = GLOBAL_PHOTO_PRESETS[presetKey];

  const photoWidthPx = preset.targetWidthPx;
  const photoHeightPx = preset.targetHeightPx;

  const photos: { x: number; y: number }[] = [];

  if (preset.aspectRatio === 1) {
    // 2"x2" (600x600px) - Fit 6 photos (3 cols x 2 rows)
    const cols = 3;
    const rows = 2;
    const gapX = Math.round((sheetWidthPx - photoWidthPx * cols) / (cols + 1));
    const gapY = Math.round((sheetHeightPx - photoHeightPx * rows) / (rows + 1));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        photos.push({
          x: gapX + c * (photoWidthPx + gapX),
          y: gapY + r * (photoHeightPx + gapY),
        });
      }
    }
  } else if (photoWidthPx <= 450) {
    // 35x45mm or 33x48mm - Fit 8 photos (4 cols x 2 rows)
    const cols = 4;
    const rows = 2;
    const gapX = Math.round((sheetWidthPx - photoWidthPx * cols) / (cols + 1));
    const gapY = Math.round((sheetHeightPx - photoHeightPx * rows) / (rows + 1));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        photos.push({
          x: gapX + c * (photoWidthPx + gapX),
          y: gapY + r * (photoHeightPx + gapY),
        });
      }
    }
  } else {
    // 50x70mm (Canada) - Fit 2 photos side-by-side
    const gap = 120;
    const totalPhotosWidth = photoWidthPx * 2 + gap;
    const startX = Math.round((sheetWidthPx - totalPhotosWidth) / 2);
    const startY = Math.round((sheetHeightPx - photoHeightPx) / 2);

    photos.push({ x: startX, y: startY });
    photos.push({ x: startX + photoWidthPx + gap, y: startY });
  }

  return {
    sheetWidthPx,
    sheetHeightPx,
    photoWidthPx,
    photoHeightPx,
    photos,
  };
}

/**
 * Converts millimeters to pixels at a designated DPI.
 * Standard formula: px = round((mm / 25.4) * dpi)
 */
export function mmToPixels(mm: number, dpi: number = 300): number {
  return Math.round((mm / 25.4) * dpi);
}
