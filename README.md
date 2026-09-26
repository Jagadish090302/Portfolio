# Jagadish B — Cyberpunk Portfolio V4

V4 fixes the certificate upload/viewer bug in V3 and bundles the supplied ICT Academy certificate as a public portfolio asset.

## Certificate fix
- Uploaded files are stored in IndexedDB using the same stable asset ID saved in the certificate record.
- Existing V3 uploads are supported through a legacy index fallback.
- PDF/image previews and the public certificate popup now work from both local browser uploads and public URLs.
- The supplied one-page ICT Academy certificate is available at `assets/ICTAcademy-PRCAD01EN-Containment-Zone-Certificate.pdf` and is configured on the ICT Academy certificate entry.

## Important
A newly uploaded local certificate is visible on the browser where it was uploaded. To make a new certificate visible to everyone on GitHub Pages, place the file in the repository (for example under `assets/`) and enter its relative URL in `PUBLIC CERTIFICATE URL`.

Admin passcode remains `Jaga@2026` unless changed in the browser editor.
