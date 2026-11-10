# ACS — Admissions &amp; Career Services

Static marketing site for ACS (Admissions &amp; Career Services), an admissions
and career consultancy serving students from India, Nepal and Sri Lanka.

**Positioning:** honest, commission-free admissions counselling. The site makes
no claims about results, years in business, or students placed.

---

## Running it

It is plain HTML/CSS/JS with no build step. Serve the directory with anything:

```bash
# from the repo root
python3 -m http.server 8901 --bind 127.0.0.1
# then open http://127.0.0.1:8901/index.html
```

Opening `index.html` directly from disk also works.

---

## Structure

```
index.html              Home page
pages/                  60 content pages
css/style.css           Global stylesheet (nav, cards, process, CTA, footer)
css/study-uk.css        Extra styles for the UK destination page
js/components.js        Nav megamenu + footer + partner modal (injected at runtime)
js/nav.js               Fallback nav behaviour for pages without components.js
images/                 5 WebP assets + 1 PNG favicon fallback
```

### The nav and footer are injected by JavaScript

`js/components.js` renders `ACS_NAV` and `ACS_FOOTER` into `<div id="acs-nav">`
and `<div id="acs-footer">` on `DOMContentLoaded`, using `NAV_CATEGORIES` as its
data source. Consequences worth knowing:

- **A page must include both placeholder divs and both script tags**, or it
  renders with no navigation at all. This was a real bug — `study-uk.html` was
  missing both and shipped with zero nav.
- **Editing the menu is a one-line change** in `NAV_CATEGORIES`; it updates
  every page at once. Do not hand-edit nav markup per page.
- Adding a page means adding it to `NAV_CATEGORIES`, or it will be unreachable.

### Contact and lead capture

Both `pages/contact.html` and `pages/login.html` POST JSON to a Google Apps
Script web app, which appends rows to a Google Sheet. There is no backend code
in this repository.

`pages/login.html` also does Firebase Google sign-in and writes user records to
a Firebase Realtime Database.

---

## ⚠️ Security — action required

**1. Firebase Realtime Database rules.** `pages/login.html` contains a
`databaseURL` and the client writes user records (`name`, `email`, `photo`,
`lastLogin`) to `users/{uid}`. Firebase client config is *meant* to be public,
but that is not true of the *database*. If the rules allow unauthenticated
reads, anyone who views source can read every stored student record.

Check at: Firebase console → **Realtime Database → Rules**. The safe rule is:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

This has **not** been verified — the database was not reachable from here.

**2. Apps Script endpoint.** The web app URL in the two files above is
world-writable by design (that is how a static form works). Confirm the script
only appends rows and does not expose the sheet on GET.

**3. `images/imm3.html` was deleted.** The original zip contained a scraped
ChatGPT session page with an email address, IP address and account IDs embedded
in it. It has been removed; if you hold a copy of the original zip anywhere,
delete it too.

---

## Change log

All work was done locally against a git baseline of the original zip.
One commit per phase, so a regression can be bisected:

| Commit | Phase |
| --- | --- |
| `Import original site as-is` | Baseline — the original zip, unedited |
| `Remove fabricated claims…` | Truthfulness: fake stats, invented staff bios, fake testimonials, broken WhatsApp links |
| `Optimize images…` | Payload: PNG→WebP, extracted 2.1 MB inline base64, deleted unreferenced assets |
| `Fix broken nav/footer…` | Deleted the orphan advisory-board page; fixed 12 broken home links |
| `Add SEO foundation…` | Meta descriptions, canonicals, Open Graph, JSON-LD |
| `Fix dead country-card links…` | Remaining dead links and fabricated stats |
| `Build 4 real destination pages…` | USA / Germany / Australia / Japan were placeholders |
| `Replace remaining stubs…` | Real pages for the last 6 stubs; honest pre-launch status pages |

Nothing has been pushed anywhere. This is local work only.

### Note on the About page

There is no "Meet Our Counsellors" section on the About page. The original one
was removed in the truthfulness pass (see the change log below). If real staff
bios are added later they should be written from confirmed details rather than
restored from the original copy — the originals carried specific credential
claims ("Former MBA admissions officer", "10+ years") that could not be verified
from the source, and none of the three `images/team/*.jpg` files they referenced
were ever included in the zip, so all three photos were dead links.

---

## Verification

Last full pass: all **61 pages** served and checked in a real browser —

- nav and footer injected on every page
- 0 broken images
- 0 dead `href="#"` links and 0 placeholder WhatsApp links
- 0 horizontal overflow
- every JSON-LD block parses
- all local `href`/`src` references resolve on disk (367 refs)

Site payload went from **27 MB to ~980 KB**; images from **17 MB to ~380 KB**.
