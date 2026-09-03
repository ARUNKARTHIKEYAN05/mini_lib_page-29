# ReadHub Online Library

A static online library website with registration, login, and a book collection page.

## Project structure

```text
.
├── index.html
├── style.css
├── asset/
├── homepage/
│   ├── home.html
│   └── home.css
├── loginpage/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── registerpage/
│   ├── register.html
│   ├── register.css
│   └── register.js
└── .github/workflows/static.yml
```

## Run locally

Open `index.html` in a browser, or serve the folder with any static web server. Registration and login use browser `localStorage`, so they are intended for local demonstration only.

## Push to GitHub

```bash
git init
git add .
git commit -m "Prepare ReadHub static site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repository>.git
git push -u origin main
```

The included GitHub Actions workflow deploys the repository to GitHub Pages after a push to `main`. In the repository settings, open **Pages** and set the source to **GitHub Actions**.
