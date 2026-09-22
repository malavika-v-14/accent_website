# Accent website

A refreshed Next.js website for Accent, retaining the forest green, mint and Poppins brand direction from the SRS.

## Run on your laptop

Install Node.js 20 or newer, extract this ZIP, and open the `accent-web` folder in VS Code. In its terminal run:

```sh
npm install
npm run dev
```

Open http://localhost:3000. No database is required to review the page layouts and service interactions.

For a production build:

```sh
npm run build
npm start
```

## Design refresh

- Preserved the SRS palette: forest `#0B3D1E`, accent `#16A34A`, leaf `#79C24A`, mint `#E9F5EA` and white, with Poppins typography.
- Added a layered photographic hero, separate college and corporate pathways, and a moving brand ribbon.
- Redesigned service cards with matching line icons, expandable details, audience switching and existing enquiry forms.
- Added a four-tab ecosystem explorer with arrow-key, Home and End navigation.
- Redesigned About, Events and Contact to match the homepage, with date cards, event filters and visible contact-form labels.
- Added scroll reveals, hover transitions and floating accents, with reduced-motion support.
- Responsive layouts support mobile, tablet and desktop screens.

## Database and enquiries

To receive form submissions, copy `.env.example` to `.env` and set your PostgreSQL `DATABASE_URL`. On Windows PowerShell:

```powershell
Copy-Item .env.example .env
npm run db:generate
npm run db:push
```

Forms write to the existing Prisma models via `/api/mou`, `/api/consultation` and `/api/contact`. They do not send email notifications or reserve calendar appointments. A missing database produces an error message in the form, with a direct email fallback.

## Files to edit

- `src/components/Hero.tsx`: homepage headline and layered photo composition.
- `src/app/page.tsx`: audience pathways and homepage sections.
- `src/components/EcosystemExplorer.tsx`: interactive ecosystem tabs.
- `src/components/ServiceCatalog.tsx`: audience controls, service details and enquiry forms.
- `src/components/Motion.tsx`: progressive scroll-reveal behavior.
- `src/app/globals.css`: responsive design system and animation.
- `src/lib/images.ts` and `public/images/`: local photography.

## Assets and content

Photos are stored locally, so photo loading does not require an external image provider. Source URLs are recorded in `public/images/CREDITS.md`. These are illustrative stock images, not photographs claimed to depict Accent sessions. No commercial template assets are included.

Poppins loads from Google Fonts, with a system sans-serif fallback. Google Maps requires network access.

Events remain demonstration data in `src/lib/events.ts`; the UI refresh does not change database integration. Form endpoints and Prisma models are preserved.

## Admin module

A password-protected admin area lives at `/admin` (separate layout, no public Navbar/Footer, so it never affects the public pages):

- `/admin` – dashboard with counts of published/draft events and new enquiries.
- `/admin/events` – create, edit, publish/unpublish events.
- `/admin/inquiries` – review and update status/notes on contact messages, MoU applications and consultation requests.
- `/admin/services` – edit the college/company service catalog text shown on the public Services section.
- `/admin/account` – change the signed-in admin's password.

Sessions are server-side (hashed tokens in `AdminSession`), passwords are hashed with scrypt, and login is rate-limited. Run the schema update once, then create your first login:

\`\`\`sh
npm run db:generate
npm run db:push
npm run admin:create -- --email you@accent.com --password "ChooseAStrongPassword1" --name "Your Name"
\`\`\`

Then sign in at `/admin/login`. Run `npm run admin:create` again any time to reset that email's password.

## Verification

The production build and TypeScript checks pass. A headless Chrome review checked all five pages at 390, 768, 1024 and 1440px, visible image loading, horizontal overflow, service expansion, audience deep links, the two enquiry forms, ecosystem keyboard navigation, event filtering, FAQs, mobile navigation and reduced motion. All 55 checks passed with no JavaScript runtime errors.

Screenshots and the review report are in `.artifacts/ui-review/`. The review can be repeated with a production server on port 3100 using `node scripts/ui-review.mjs`; it uses a locally installed Chrome and an isolated browser profile. Live database submissions were not made during the visual review.
