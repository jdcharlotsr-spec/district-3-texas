DISTRICT 3 — ROUND-CORNER EDITION
=================================

This updated edition includes District Elder Louise Braziel and Bishop Lambert W. Gates, Sr. portraits, and uses softly rounded cards, pill-shaped buttons, rounded imagery, curved navigation, rounded FAQ panels, and polished form fields.

# District 3 — Texas State Council | PCAFI

A responsive, editable static website in **purple, gold, and white**. Includes a pastoral invitation, mission and vision, seven core commitments, leadership profiles, verified-church directory, FAQ, and an interactive pastoral inquiry form.

## Files

- `index.html` — page content and layout
- `styles.css` — all styling, responsive CSS, animations
- `script.js` — interactive navigation, dialogs, directory search/filter, inquiry preparation
- `assets/district-3-seal.png` — cropped seal from the provided graphic
- `assets/district-3-mission.png` — original supplied mission infographic

## Publish

Upload the **entire folder contents** to any static web host (GitHub Pages, Netlify, Cloudflare Pages, or a conventional hosting account). `index.html` must sit alongside `styles.css`, `script.js`, and `assets/`. There are no package dependencies or build steps.

## Edit these items before publishing

1. **Inquiry destination:** Open `script.js` and edit `SITE_CONFIG` near the top. Set `contactEmail` to a *verified, authorized District 3 email address* to enable a prepared email link; OR set `formEndpoint` to a valid Formspree endpoint to submit forms online. Without these, the form correctly **prepares an inquiry for copying/downloading** and does **not** pretend to send it. Avoid displaying personal contact info without approval.
2. **Leadership portraits:** Both approved photos are already included:
   - `assets/louise-braziel.png`
   - `assets/lambert-gates.png`

   The portraits display in the leadership cards and profile dialogs. You can replace them later using the same filenames.
3. **Leadership biographies:** Edit `LEADERS` in `script.js`. Louise Braziel's expanded biography is intentionally left open pending approved information.
4. **Church directory:** Add **verified District 3 member churches only** to the `CHURCHES` array in `script.js`. Example syntax (sample only, *not an actual congregation*):

   ```js
   const CHURCHES = [
     {name:'APPROVED CHURCH NAME', pastor:'APPROVED PASTOR NAME', city:'Houston', address:'APPROVED ADDRESS, TX', website:'https://approved-site.example'}
   ];
   ```

   Directory search, the city filter, and church cards populate automatically.
5. **District Elder's name:** The provided infographic spells the director as **Louise Braziel Benson**, while your website instructions say **Louise Braziel**. The site uses the name as requested for the website. Confirm the preferred formal name before publication.

## Confirmed public national source

- PCAFI national website: https://www.pcafintl.org/
- PCAFI founding history (November 20, 1957): https://www.pcafintl.org/copy-of-history
- National leadership: https://www.pcafintl.org/executive-bishops-cabinet
- Bishop Gates' ministry biography: https://www.kam.church/senior-pastor

**Important:** The directory is not filled with invented churches. The page displays a polished notice until verified congregation information is added. The inquiry form is not a formal affiliation or credentialing application.
