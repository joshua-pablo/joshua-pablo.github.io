# Joshua Pablo — Student Portfolio

A responsive static portfolio built with HTML, CSS, JavaScript, and JSON for GitHub Pages.

## Before publishing

1. Open `js/script.js` and replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.
2. In `index.html`, replace all `YOUR_GITHUB_USERNAME` and `YOUR_EMAIL@example.com` placeholders.
3. Edit `data/projects.json` so it only lists projects you have actually built. Replace sample links with your real repositories or demos.
4. Update the education details if needed.
5. Optional: add a professional photo in `images/` and update the hero/about section if you want one.

## Folder structure

```text
yourusername.github.io/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── data/
│   └── projects.json
└── images/
```

## Preview locally

Because the project list loads through `fetch()`, use VS Code's Live Server extension instead of opening `index.html` directly from your file manager.

## Publish with GitHub Pages

1. Create a **public** GitHub repository named exactly `YOUR_GITHUB_USERNAME.github.io`.
2. Upload all files in this folder, keeping the folder structure.
3. In the repository, open **Settings → Pages**.
4. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for deployment and visit `https://YOUR_GITHUB_USERNAME.github.io`.

## Features

- Responsive layout for phones, tablets, and desktop
- Sticky navigation with active-section indication
- Light/dark theme switch
- Tagline typing effect
- Projects rendered from `data/projects.json`
- Latest five public GitHub repositories fetched from the GitHub REST API
- Contact form validation and demo thank-you message
- Back-to-top button

**Note:** The contact form is front-end only. It does not send messages to an inbox unless you connect a form service or backend.
