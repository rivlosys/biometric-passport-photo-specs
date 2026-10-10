import assert from 'node:assert';
import {
  GLOBAL_PHOTO_PRESETS,
  getFaceGuideRatios,
  getPrintSheetLayout,
  mmToPixels,
} from './index.ts';

console.log('Running biometric passport photo specs verification...');

// 1. Verify US Passport Presets
const us = GLOBAL_PHOTO_PRESETS.us_passport;
assert.strictEqual(us.widthMm, 51);
assert.strictEqual(us.heightMm, 51);
assert.strictEqual(us.aspectRatio, 1);
assert.strictEqual(us.targetWidthPx, 600);
assert.strictEqual(us.targetHeightPx, 600);
console.log('✓ US Passport 2"x2" specs match official State Dept criteria');

// 2. Verify Canada Passport Presets
const ca = GLOBAL_PHOTO_PRESETS.ca_passport;
assert.strictEqual(ca.widthMm, 50);
assert.strictEqual(ca.heightMm, 70);
assert.strictEqual(ca.minHeadMm, 31);
assert.strictEqual(ca.maxHeadMm, 36);
console.log('✓ Canada Passport 50x70mm & 31-36mm head limits match IRCC criteria');

// 3. Verify UK Passport Presets
const uk = GLOBAL_PHOTO_PRESETS.uk_passport;
assert.strictEqual(uk.widthMm, 35);
assert.strictEqual(uk.heightMm, 45);
assert.strictEqual(uk.minHeadMm, 29);
assert.strictEqual(uk.maxHeadMm, 34);
console.log('✓ UK Passport 35x45mm & 29-34mm chin-to-crown match HMPO criteria');

// 4. Test Millimeter to Pixel Conversions
assert.strictEqual(mmToPixels(25.4, 300), 300); // 1 inch = 25.4mm = 300px at 300 DPI
assert.strictEqual(mmToPixels(50.8, 300), 600); // 2 inches = 600px at 300 DPI
console.log('✓ Millimeter-to-pixel formula accuracy verified at 300 DPI');

// 5. Test Face Guide Ratios
const usGuides = getFaceGuideRatios('us_passport');
assert.ok(usGuides.minChinPercent > usGuides.crownTopPercent);
assert.ok(usGuides.maxChinPercent > usGuides.minChinPercent);
console.log('✓ Biometric crown-to-chin guide overlays verified');

// 6. Test 4x6 Print Sheet Layouts
const usSheet = getPrintSheetLayout('us_passport');
assert.strictEqual(usSheet.photos.length, 6, 'US 2x2" should pack 6 photos on 4x6" paper');

const ukSheet = getPrintSheetLayout('uk_passport');
assert.strictEqual(ukSheet.photos.length, 8, 'UK 35x45mm should pack 8 photos on 4x6" paper');

const caSheet = getPrintSheetLayout('ca_passport');
assert.strictEqual(caSheet.photos.length, 2, 'Canada 50x70mm should pack 2 photos side-by-side');
console.log('✓ 4x6 inch print sheet layout algorithms verified');

console.log('\nAll biometric passport photo specifications passed successfully!');
