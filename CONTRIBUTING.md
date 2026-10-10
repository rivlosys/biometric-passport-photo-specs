# Contributing to Biometric Passport Photo Specifications

Thank you for contributing to the **Biometric Passport Photo Specifications** engine!

This project is an open-source, zero-dependency reference database and layout engine maintained by [UseCOS](https://usecos.app). Our mission is to prevent unnecessary consular and passport rejections caused by inaccurate millimeter, head-height, and aspect-ratio dimensions.

---

## Areas Where Contributions Are Welcomed

1. **New National Presets**: Adding verified document specifications for additional countries (e.g., Singapore, Malaysia, South Africa, UAE) with citations to official immigration/consular portals.
2. **Updated Consular Digital Upload Thresholds**: Updating pixel dimensions and file size caps (KB/MB) as embassies modernize their electronic visa portals.
3. **Print Sheet Grid Optimizations**: Enhancing paper yield algorithms for alternative consumer print paper sizes (e.g., A6, 5x7 inch).

---

## Standards & Verification

- Every preset **must** cite an official government immigration or consular URL.
- Chin-to-crown head measurements must be verified against ICAO Doc 9303 or national biometric standards.
- Run tests (`node test.mjs`) before opening a pull request.

---

## Live Implementations

- [UseCOS International Passport Photo Resizer](https://usecos.app/tools/passport-photo-resizer)
- [US DS-160 & DV Lottery Photo Tool](https://usecos.app/tools/passport-photo-resizer/ds-160-photo-resizer)
- [Canada Passport & PR Cropper](https://usecos.app/tools/passport-photo-resizer/canada-passport-photo-resizer)
