TRINITY GLOBAL IMPEX LLP — Website (Enhanced Build)

Pages: Home (launchMyTrinity.html), About Us, Our Coffee, Origins, Quality & Sourcing,
Global Trade, Contact.

WHAT'S NEW IN THIS BUILD
- Working mobile navigation (hamburger menu) — the original site had no way to
  reach the nav links below 800px width. Fixed.
- Fully functional contact form: real-time validation + actual email delivery
  via FormSubmit.co, a free service that emails form submissions with no
  backend or API key required.
  >>> ACTION NEEDED: the form currently posts to
      https://formsubmit.co/ajax/info@trinityglobalimpex.com
      Replace "info@trinityglobalimpex.com" in contact.html with your real
      inbox, then submit the form once after launch — FormSubmit sends a
      one-time confirmation email to that inbox that you must click to
      activate delivery.
- "Add to Quote" cart: buyers can add products from the Coffee page to a
  running quote list (floating button, bottom-right), which pre-fills the
  contact form message when they check out. Stored in the browser only
  (localStorage) — no server needed.
- Interactive origins map with clickable pins + tabs for each sourcing region.
- Unit converter (kg / lb / 60kg bags / metric tons) on the Coffee page.
- Product filter tabs on the Coffee page.
- FAQ accordions (homepage + contact page).
- Testimonial carousel (placeholder quotes — replace with real buyer
  feedback once available; see coffee.html/launchMyTrinity.html).
- Newsletter signup field in the footer (client-side validation only —
  connect to Mailchimp/Brevo/etc. to actually collect addresses).
- WhatsApp click-to-chat button (floating, bottom-right) — update the
  number "918012345678" in every page and in contact.html.
- Google Maps embed on the Contact page (currently searches "Bangalore,
  India" — replace with your exact address for a precise pin).
- Basic SEO: Open Graph tags, JSON-LD Organization schema, sitemap.xml,
  robots.txt, and a simple SVG favicon (assets/favicon.svg).
- Scroll-reveal animation, animated stats counters, back-to-top button.

BEFORE LAUNCH — STILL TO DO
- Replace all placeholder contact details (phone, email, WhatsApp number,
  address) with real business details across every HTML file.
- Replace testimonial quotes with real, permissioned buyer feedback.
- Confirm the FormSubmit activation email (see above) or swap in your own
  form backend / CRM integration.
- Replace stock stats (countries served, MT exported, etc.) with accurate
  figures, or remove the stats bar if not ready to disclose them.
- Add real product photography once licensed images are available —
  hero-coffee.jpg is the only licensed photo included; it is reused
  tastefully as an accent image elsewhere. homepage-design-reference.png
  is a design mockup only and is not used in the live pages.
- Do not state or imply specific certifications (Organic, Fairtrade, ISO,
  etc.) anywhere on the site unless Trinity actually holds them — the
  Quality page intentionally avoids naming certifications it doesn't hold.
- Update sitemap.xml / robots.txt with your live domain before submitting
  to search engines.
- Configure domain, hosting and SSL.

FILES
- launchMyTrinity.html — Home (includes the launch splash screen)
- about.html, coffee.html, origins.html, quality.html, global-trade.html,
  contact.html
- styles.css, script.js — shared styles and all interactive behavior
- assets/hero-coffee.jpg — licensed hero photo, reused across pages
- assets/favicon.svg — simple original mark used as favicon
- sitemap.xml, robots.txt

Launch behavior (unchanged): launchMyTrinity.html opens with a full-screen
coffee hero splash. Click anywhere, click "Enter Website", click the ×, or
press Escape to dismiss it and reveal the normal home page.
