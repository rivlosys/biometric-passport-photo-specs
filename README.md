# Biometric Passport & Visa Photo Specifications (International)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg)](https://www.typescriptlang.org/)
[![Verification Status](https://img.shields.io/badge/Standards-ICAO%20Doc%209303%20%7C%20US%20State%20Dept%20%7C%20IRCC-success.svg)](https://usecos.app/tools/passport-photo-resizer)

> **Zero-dependency TypeScript engine and reference database of international biometric document photo requirements, chin-to-crown head height ratios, millimeter-to-pixel conversions, and 4x6" print sheet packing algorithms.**

Live interactive web implementation with zero server uploads: [UseCOS Passport Photo Resizer](https://usecos.app/tools/passport-photo-resizer).

---

## The Problem: The "Silent Rejection" Flaw

Every year, hundreds of thousands of visa, passport, and lottery applications (e.g. US DS-160, DV Lottery, IRCC Express Entry, UK HMPO) are summarily rejected by automated border/consular computer vision pipelines.

The failure is rarely because the person took a bad selfie; it is because **aspect ratio alone does not equal biometric compliance**:

1. **The Chin-to-Crown Measurement Gap**: A photo cropped to exactly 2"×2" (51×51 mm) or 35×45 mm will still be rejected if the distance from the bottom of the chin to the top of the head (crown) is not within strict statutory boundaries (e.g., US requires 50%–69% head height; Canada requires 31–36 mm out of 70 mm; Schengen requires 70%–80%).
2. **Printer DPI Scaling Distortion**: Printing a digital image directly to consumer 4×6 inch (100×150 mm) photo paper frequently fails because default OS print dialogues apply "Fit to Printable Area", altering physical millimeter dimensions by 4% to 8%.
3. **Incompatible National Aspect Ratios**: Applying for a Canadian Passport with a US 2"×2" photo results in instant rejection because Canada mandates 50×70 mm (aspect ratio 5:7, not 1:1).

This repository provides the canonical dimensions, tolerances, mathematical helper functions, and print sheet coordinate algorithms in clean, typed TypeScript.

---

## Authoritative Specifications Matrix

| Country / Standard | Physical Size | Aspect Ratio | Head Height (Chin-to-Crown) | Head % | Recommended DPI | Digital Target (300 DPI) | Official Regulatory Authority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **United States (Passport / DS-160 / DV)** | 51 × 51 mm (2" × 2") | 1:1 (Square) | 25 – 35 mm (1" – 1 3/8") | 50% – 69% | 300 / 600 | 600 × 600 px | [US Dept of State](https://travel.state.gov/content/travel/en/passports/how-apply/photos.html) |
| **Canada (Passport & PR Card)** | 50 × 70 mm (2" × 2.75") | 5:7 | 31 – 36 mm | 44% – 51% | 300 / 600 | 591 × 827 px | [IRCC / Passport Canada](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html) |
| **Canada (Visitor Visa TRV Online)** | 35 × 45 mm | 7:9 | 31 – 36 mm | 69% – 80% | 300 | 413 × 531 px | [Immigration Canada](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html) |
| **United Kingdom (HMPO Passport)** | 35 × 45 mm | 7:9 | 29 – 34 mm | 64% – 75% | 300 / 600 | 413 × 531 px | [HM Passport Office (Gov.uk)](https://www.gov.uk/photos-for-passports) |
| **Schengen Area (EU Visa)** | 35 × 45 mm | 7:9 | 32 – 36 mm | 70% – 80% | 300 | 413 × 531 px | [European Commission](https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en) |
| **India (Passport Seva PSK)** | 35 × 45 mm | 7:9 | 25 – 35 mm | 55% – 77% | 300 | 413 × 531 px | [Passport Seva Kendra](https://www.passportindia.gov.in/) |
| **India (OCI & e-Visa)** | 51 × 51 mm (2" × 2") | 1:1 (Square) | 25 – 35 mm | 50% – 69% | 300 / 600 | 600 × 600 px | [OCI Services India](https://ociservices.gov.in/) |
| **Australia & New Zealand** | 35 × 45 mm | 7:9 | 32 – 36 mm | 71% – 80% | 300 | 413 × 531 px | [Australian Passport Office](https://www.passports.gov.au/protect-your-identity-and-passports/photo-guidelines) |
| **China (Passport & Visa)** | 33 × 48 mm | 11:16 | 28 – 33 mm | 58% – 69% | 300 | 390 × 567 px | [Visa for China (CVASC)](https://www.visaforchina.cn/) |
| **Japan (Consular Visa)** | 45 × 45 mm | 1:1 (Square) | 27 – 31 mm | 60% – 69% | 300 | 531 × 531 px | [MOFA Japan](https://www.mofa.go.jp/j_info/visit/visa/index.html) |

---

## Mathematical Formulation

### 1. Millimeter to Digital Pixels Conversion
Standard print quality requires $\ge 300\text{ DPI}$. At a given DPI, the pixel count is strictly derived from physical millimeters:

$$\text{Pixels} = \left\lfloor \frac{\text{Millimeters}}{25.4} \times \text{DPI} + 0.5 \right\rfloor$$

*Example*:
- US 2" (50.8 mm) at 300 DPI: $(50.8 / 25.4) \times 300 = 600\text{ px}$.
- Canada 70 mm height at 300 DPI: $(70 / 25.4) \times 300 = 826.77 \approx 827\text{ px}$.

### 2. Biometric Crown and Chin Guides
To guarantee biometric compliance during cropping, vertical guide overlays are positioned using percentage ratios relative to total image height:

$$\text{Crown Top} \approx 10\% \text{ from top edge}$$

$$\text{Min Chin Position} = 10\% + \left( \frac{\text{Min Head mm}}{\text{Height mm}} \right) \times 100$$

$$\text{Max Chin Position} = 10\% + \left( \frac{\text{Max Head mm}}{\text{Height mm}} \right) \times 100$$

---

## 4×6 Inch Sheet Packing Algorithm

When printing photos at commercial kiosks (Walgreens, CVS, Walmart, Costco, London Drugs), printing a standard 4"×6" (100×150 mm) print is often 95% cheaper than paying for a dedicated "passport photo package".

At 300 DPI, a 4×6 inch canvas is exactly **1800 × 1200 pixels**.

### Grid Distribution Rules:
- **Square 2"×2" (US / India OCI)**: Fits **6 photos** (3 columns × 2 rows).
  - Column gap: $\approx 0\text{ px}$ to $30\text{ px}$ balance.
- **Standard 35×45 mm (UK / Schengen / India / Australia)**: Fits **8 photos** (4 columns × 2 rows).
- **Large 50×70 mm (Canada Passport / PR)**: Fits **2 photos** side-by-side with 120 px separation for consular back-stamps (guarantor signature).

---

## Installation & Quickstart

```bash
npm install biometric-passport-photo-specs
```

Or import directly in your TypeScript project:

```typescript
import {
  GLOBAL_PHOTO_PRESETS,
  getFaceGuideRatios,
  getPrintSheetLayout,
  mmToPixels,
} from 'biometric-passport-photo-specs';

// 1. Inspect specifications
const canada = GLOBAL_PHOTO_PRESETS.ca_passport;
console.log(canada.widthMm, canada.heightMm); // 50, 70
console.log(canada.minHeadMm, canada.maxHeadMm); // 31, 36

// 2. Calculate biometric crop guide overlays
const guides = getFaceGuideRatios('us_passport');
console.log(guides.crownTopPercent); // 10%
console.log(guides.minChinPercent);  // 59%
console.log(guides.maxChinPercent);  // 78.6%

// 3. Generate 4x6 print grid coordinates
const sheet = getPrintSheetLayout('us_passport');
console.log(sheet.photos.length); // 6 photos positioned on 1800x1200px canvas
```

---

## Acceptance Constraints Not Covered by Code

While this specification guarantees dimensional and aspect-ratio compliance, government agencies enforce physical capture rules that client-side cropping cannot detect:

1. **Recency**: Photos must be taken within the last 6 months (US, CA, UK).
2. **Neutral Expression**: Eyes open, mouth closed, no smiling, direct gaze into camera.
3. **Eyeglasses**: Strict ban on eyeglasses in US, Canadian, and UK applications (unless documented medical exemption).
4. **Lighting & Shadows**: Background must be evenly lit without flash reflection or facial shadowing.
5. **Canada Photographer Stamp**: Canadian passport applications require a physical photographer stamp with date and studio address on the back of one photo.

---

## Live Implementation & Tools

- **Free Browser Tool**: [UseCOS International Passport Photo Resizer](https://usecos.app/tools/passport-photo-resizer) — zero cloud upload, 100% private in-browser canvas rendering.
- **US DS-160 & DV Lottery Portal**: [UseCOS DS-160 Photo Resizer](https://usecos.app/tools/passport-photo-resizer/ds-160-photo-resizer)
- **Canada Passport & PR Cropper**: [UseCOS Canada Passport Photo Resizer](https://usecos.app/tools/passport-photo-resizer/canada-passport-photo-resizer)
- **UK Passport & HMPO Code Guide**: [UseCOS UK Passport Photo Resizer](https://usecos.app/tools/passport-photo-resizer/uk-passport-photo-35x45)
- **India OCI 2×2 Tool**: [UseCOS OCI Photo & Signature Resizer](https://usecos.app/tools/passport-photo-resizer/oci-photo-signature-resizer)

---

## License

MIT © [UseCOS Engineering](https://usecos.app). Open-source for developers, immigration consultants, and civil society tools.
