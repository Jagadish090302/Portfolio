# JAGADISH B — Cyberpunk Portfolio V3

A responsive, animated cyberpunk portfolio based on the provided resume, expanded with a browser-based admin editor and certificate viewer.

## What changed in V3

- **Everything editable from EDIT MODE**: hero copy, section titles, about, experience, skills, projects, certificates, personal details, contact, footer and custom sections.
- **Admin passcode gate** before EDIT MODE. Default: `Jaga@2026`.
- **Change admin passcode** from EDITOR → SETTINGS. The passcode hash is stored locally in the browser.
- **Certificates**: add unlimited certificate records; each can have title, issuer, date, description, public URL, and an uploaded image/PDF.
- **Cyberpunk certificate popup**: public visitors can click a certificate card. Images show in a neon framed viewer; PDFs open in an embedded viewer.
- **Custom sections**: EDITOR → NEW SECTION lets you add any section using the same `title + subtitle + content` format. New sections automatically appear in the nav and public portfolio.
- **Current Working** section is included by default with the user's AI Data Annotation work.
- **Futuristic interactions**: animated grid, scanlines, particles, cursor glow, reveal-on-scroll, card tilt, hover glow, terminal boot sequence and live status effects.
- **Backup tools**: Export/import JSON for portfolio data.

## Run locally

Open `index.html` in a modern browser. No build step is required.

## GitHub Pages

Upload all files to the repository root and enable GitHub Pages. This version is a static site and does not need a server.

## Important static-site limitation

The editor and uploaded certificate files are browser-local. A visitor on another device will not automatically receive changes you made through EDIT MODE. To publish changes to everyone, update the site files in GitHub (or use a backend/CMS in a future version).

Certificate options:

1. Upload an image/PDF in EDIT MODE. It is stored in that browser for previewing.
2. For a public certificate, upload the certificate file to the same GitHub repository (or another public storage service) and paste its public URL into **PUBLIC CERTIFICATE URL**. That URL will then work for all visitors.

## Security note

Because GitHub Pages is static, the admin passcode is a client-side gate, not true server-side authentication. A technically skilled user can inspect the JavaScript. For real security, use a backend-authenticated admin service.
