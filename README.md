# The Gamer's Hideout

A modern dark-theme gaming café website for **The Gamer's Hideout**, Dombivli.

**Address:** Shop No. 5 & 6, Ground Floor, GNP Arcadia, Opposite Pendharkar College, Dombivli, Mumbai

## Features

- **Home** – Hero “Play. Eat. Chill.”, Book Slot & View Menu, highlights (Gaming • Food • Mocktails)
- **Booking** – Date, time, number of players, gaming type (Console / PC / Party), confirmation message, WhatsApp link, payment placeholder (UPI / Razorpay)
- **Menu** – Full menu with categories and prices
- **Gallery** – Placeholders for gaming setup, food & ambience (replace with your images)
- **About** – Youth-friendly gaming café near college
- **Contact** – Address, Call & WhatsApp, opening hours, Google Map embed

## Tech

- Plain HTML, CSS, JS (no build step, fast loading)
- Dark gaming look: black & yellow, neon highlights, Orbitron + Rajdhani fonts
- Responsive layout and smooth animations
- Floating “Book Now” button on all pages
- SEO meta tags and theme-color on all pages

## Push to GitHub

**Quick setup:** See **INSTALL-AND-PUSH.md** in this folder for step-by-step “install Git + push” instructions.

1. **Install Git** (if needed): [git-scm.com](https://git-scm.com/download/win) – use default options.

2. **Open terminal** in this folder (`sak`), then run:

```bash
git init
git add .
git commit -m "Initial commit: The Gamer's Hideout website"
```

3. **Create a new repo on GitHub:**  
   Go to [github.com/new](https://github.com/new), name it (e.g. `gamers-hideout`), leave “Add a README” **unchecked**, then Create repository.

4. **Connect and push** (replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and repo name):

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

If GitHub asks for login, use a **Personal Access Token** as the password (Settings → Developer settings → Personal access tokens).

---

## Run locally

Open `index.html` in a browser, or use a simple static server:

```bash
npx serve .
```

## Customize

1. **Contact** – In `js/main.js` and `contact.html`, replace `919876543210` with your real phone number.
2. **Google Map** – In `contact.html`, replace the iframe `src` with your embed URL from Google Maps (Share → Embed).
3. **Gallery** – In `gallery.html`, replace each `.gallery-placeholder` div with `<img src="your-image.jpg" alt="...">` or add images and point `src` to them.

## File structure

```
sak/
├── index.html
├── booking.html
├── menu.html
├── gallery.html
├── about.html
├── contact.html
├── favicon.svg
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── README.md
```
