# Ever Wealth Legacy — Website

A fully **static** website (plain HTML/CSS/JS — no build step, no server, no database),
so it can be hosted **for free** on GitHub Pages, Cloudflare Pages or Netlify.

## Preview locally
Just open `index.html` in a browser, or run a tiny local server:

```
python -m http.server 8000
```

then visit http://localhost:8000

## Folder map
| Path | What it is |
|---|---|
| `index.html` | Home page (hero, services, team, moving blog & social panels, FAQ) |
| `about.html`, `why-us.html` | About + full team / Why choose us |
| `will-drafting.html`, `legacy-planning.html`, `wealth-management.html`, `financial-planning.html` | Service detail pages (placeholder copy) |
| `resources.html` | Lists ALL blogs + social posts with filter tabs |
| `contact.html` | Lead form (Book a Consultation) — every CTA button points here |
| `blog/` | One HTML file per blog post + `_template.html` to copy for new posts |
| `data/*.js` | **The files you edit day-to-day** (team, blogs, social, testimonials) |
| `js/include.js` | Site config (phone, address, socials) + shared header/footer |
| `js/form.js` | Sends the form to Google Sheets — paste your Apps Script URL here |
| `google-apps-script/Code.gs` | Backend script to paste into Google Apps Script |
| `assets/` | Logo + favicon (replace `logo.svg` with the official logo file) |

## Everyday updates (no coding needed)
* **Contact details / social links** → edit the `EWL.config` block at the top of `js/include.js`. Updates header, footer, WhatsApp button and contact page everywhere.
* **Team members** → edit `data/team.js`. Add photos to `assets/team/` and set `photo: "assets/team/name.jpg"`; leave `""` for an initials avatar.
* **Blog panel** → edit `data/blogs.js`. To add a post: copy `blog/_template.html` → `blog/my-post.html`, write the content, then add an entry at the TOP of `data/blogs.js`. It automatically appears in the moving home panel and on Resources.
* **Social panel** → edit `data/social.js` with the link to each reel/short/post. For YouTube, set `youtubeId` and the thumbnail loads automatically.
* **Testimonials** → edit `data/testimonials.js`.
* **Hero banner & section photos** → every logo-placeholder box is an image slot. Put your photo in `assets/` and set the path in the page's bottom script: `HERO_IMAGE` / `WHY_IMAGE` in `index.html`, `SECTION_IMAGE` in `about.html` / `why-us.html`. Leave `""` to keep the logo placeholder. Hero photos look best around 1000x800px (landscape, under ~300KB).

## Connect the form to Google Sheets (one time, ~5 min)
1. Create a Google Sheet (e.g. "EWL Website Leads") with the Google account that should own the leads.
2. In the Sheet: **Extensions → Apps Script**, delete any sample code, paste the contents of `google-apps-script/Code.gs`, save.
3. **Deploy → New deployment → Web app**, set *Execute as: Me* and *Who has access: Anyone*, then **Deploy** and authorize.
4. Copy the Web App URL and paste it into `js/form.js` as `GOOGLE_SCRIPT_URL`.
5. Test the form — a "Leads" tab appears with Timestamp, Name, Phone, Email, Service, Message, Page, Status. Share the Sheet with your team.

> Tip: in the Sheet use **Tools → Notification settings** to get an email whenever a new lead arrives.

## Free hosting (pick one)
* **Cloudflare Pages / Netlify**: drag-and-drop this folder in their dashboard → done (free SSL + CDN).
* **GitHub Pages**: push this folder to a repo → Settings → Pages → deploy from branch.
* Point your domain (e.g. everwealthlegacy.in) at it, then update the domain in `sitemap.xml` and `robots.txt`.

## Before going live — checklist
- [ ] Replace `assets/logo.svg` with the official logo (same filename = zero code changes)
- [ ] Real phone/WhatsApp/email/address in `js/include.js`
- [ ] Real social profile URLs in `js/include.js` and real post links in `data/social.js`
- [ ] Replace placeholder copy on service pages, About, Why Us, FAQ, Privacy, Terms
- [ ] Team photos + bios in `data/team.js`
- [ ] Google Sheets form connected (`js/form.js`)
- [ ] Google Map iframe on `contact.html`
- [ ] Add Google Analytics / Meta Pixel snippet to every page `<head>` if desired

## Ideas for later (not built yet)
* Lead magnet: downloadable "Will Readiness Checklist" PDF in exchange for email
* Newsletter signup (same Apps Script, second sheet tab)
* Fee calculator / will-readiness quiz
* Multilingual toggle (Hindi/Marathi)
* Client login for document status (would need a backend service)
* WhatsApp Business API auto-reply for the chat button
