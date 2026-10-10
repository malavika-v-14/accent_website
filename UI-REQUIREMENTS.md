# Accent UI review — 9 October 2026

Scope: both Accent DOCX briefs, with the user's overrides: keep the existing design, no WhatsApp/OTP, email delivery or CRM integration; downloadable files and privacy policy remain placeholders. Forms are frontend previews, explicitly labelled, and do not claim to send or reserve anything.

## Implemented UI

- Eight public pages plus privacy placeholder; six navigation links and header callback action.
- Original homepage headline, collage, photographs, brand greens and Poppins retained.
- Three audience buttons in the hero, linking to the appropriate audience CTA; three photographic audience pathways.
- Audience pages use the existing photographic page-hero design, with primary actions at top and bottom.
- Job seekers: free master class, free first guidance session, updates and downloads near the top; 4 engagement, 4 course and 3 career-support cards.
- Colleges: campus conversation action, free technical talk entry, 5 service cards and 4 resources.
- Corporates: needs-call action, 5 service cards and 4 resources.
- Seven form variants: registration, guidance, updates, college enquiry, corporate needs call, callback and download. Each has at most six fields including consent; labelled inputs and privacy link. Offering title is retained in the dialog.
- Callback forms in footer and Contact; header opens the callback dialog with audience selector. Dialog supports native keyboard focus trapping and Escape dismissal.
- 14 resource groups: 6 job-seeker, 4 college, 4 corporate. Career roadmaps remain one group covering all three courses. Buttons say Download. Forms unlock a sample file; corporate downloads require a company email rather than a common personal-email domain.
- Supplied course details: audience, skills, AI layer, output, target roles and complement track.
- Events registration actions and a clear unavailable state when the database cannot load the calendar.
- Home/About definitions and facts boxes; FAQ sections with FAQPage structured data; About approach and team-profile placeholder.
- Public ecosystem copy and Admin links absent from rendered public components. No card fees.

## Deliberate limits

- No actual registration, callback, notification or personal-data storage in these preview forms.
- Final privacy wording, downloads, staff profiles, outcomes/testimonials and confirmed event schedules require Accent content. No proof claims were invented.
- CMS editing, analytics reporting/ad integrations, custom-domain deployment and phase-three admission/payment workflows are outside this UI pass. Content lists are currently developer-editable, not a completed CMS.
- Existing admin and database connection have not been certified by this UI check. The Events unavailable state does not repair database connectivity.
- Browser checks cover page rendering, responsive overflow, forms and downloads; they are not a formal WCAG certification.

## Verification

TypeScript: `npx tsc --noEmit`.
Browser test: `node scripts/brief-review.mjs`, against the development server on port 3102. Checks all nine public routes at phone/desktop sizes, one H1, footer/header forms, offering counts, download gating, keyboard dismissal and corporate email restriction. Reports/screenshots are in `.artifacts/brief-review/`.
