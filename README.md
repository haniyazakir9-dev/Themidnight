# The Midnight Library

> *"Every book holds a little universe."*

A digital library crafted with an atmospheric **Dark Academia** aesthetic — inspired by vintage libraries, leather-bound tomes, warm candlelight, mahogany bookshelves, and aged parchment.

Built with **HTML, CSS, and JavaScript**, powered by the **Open Library API** for real-time book discovery across 30+ million titles, and featuring **The Archivist**, an AI literary companion powered by **Google Gemini 2.5 Flash**.

---

## 🏛️ Project Features

1. **Atmospheric Home Page**:
   - Regal Dark Academia typography and ambient starry particle dust.
   - Prominent search bar with instant query suggestions.
   - Keeper's daily literary epigram / quote.
   - Curated masterwork showcase (*Oscar Wilde, Mary Shelley, Donna Tartt, Dostoevsky, etc.*).
   - Procedural Web Audio API rain & hearth ambience toggle (zero external audio files needed).

2. **Universal Book Discovery & Search (Open Library API)**:
   - Search across 30M+ books by **Title**, **Author**, **Subject / Genre**, or **Universal Query**.
   - Dynamic book covers with automatic fallback to vintage embossed leather-bound SVG covers.
   - Live loading skeletons, result counts, and pagination (*Load More Volumes*).

3. **10 Book Categories**:
   - **Fiction** (*Mundus Imaginarius*)
   - **Romance** (*Amor Aeternus*)
   - **Mystery** (*Aenigma Noctis*)
   - **Fantasy** (*Regna Incantata*)
   - **Classics** (*Monumenta Litterarum*)
   - **Psychology** (*Anima Humana*)
   - **Biography** (*Vitae Illustrium*)
   - **Science Fiction** (*Astra et Machinae*)
   - **History** (*Annales Antiqui*)
   - **Poetry** (*Carmina Divina*)
   - Interactive subject browser that queries the live Open Library catalog for each category.

4. **Personal Bookshelf (`localStorage`)**:
   - Three dedicated shelves: **Want to Read**, **Currently Reading**, and **Finished**.
   - **Two Display Modes**:
     - *Vintage Wooden Shelves*: Realistic mahogany planks with brass nameplates and standing book spines.
     - *Card Grid*: Clean card layout with quick metadata and status ribbons.
   - Add custom private volumes manually.

5. **Reading Tracker & Challenge**:
   - Annual Reading Challenge goal tracker (customizable target, gold progress bar, % completed).
   - Statistics: Total books finished, total pages read, active books on lectern.
   - Quick **+10 Pages** buttons and interactive progress editor per book.
   - Reading session timeline log.

6. **Reading Journal**:
   - Styled like antique parchment cards with deckle edges and crimson wax seals.
   - Record ratings (1-5 stars/candles), memorable quotes, personal reflections, and custom tags.
   - Search and filter journal entries by title, author, or tag.

7. **Rich Book Details Modal**:
   - High-resolution cover display with 3D spine depth.
   - Live synopsis fetched dynamically from Open Library Works API.
   - Direct link to read or borrow on Open Library / Internet Archive.
   - Actions to shelve, pen a journal entry, or discuss with the AI Archivist.

8. **AI Book Companion — "The Archivist" (Gemini 2.5 Flash)**:
   - Intellectual, poetic, and warmly encouraging Dark Academia persona.
   - Recommends books based on mood, themes, tropes, or favorite authors.
   - Deconstructs literary philosophy, themes, and classical archetypes.
   - **Zero-Key Offline Mode**: Works out of the box with curated responses even before setting an API key.
   - **Flexible Key Configuration**: Configure your key securely in the browser UI or as a Vercel Serverless environment variable.

---

## 📂 Project Structure

```
The Midnight Library/
├── index.html          # Main HTML5 structure & Dark Academia layout
├── style.css           # Complete Dark Academia styling, fonts & animations
├── script.js           # Full application logic, Open Library API & LocalStorage
├── assets/
│   └── favicon.svg     # Antique gold crest with crescent moon & open book
├── api/
│   └── chat.js         # Optional Vercel Serverless Function for Gemini 2.5 Flash
├── .env.example        # Example environment variable file
├── .gitignore          # Git ignore rules for node_modules and .env files
├── vercel.json         # Vercel deployment routing configuration
├── package.json        # Project metadata
└── README.md           # Documentation & setup guide
```

---

## 💻 Running the Website Locally (VS Code)

### Option 1: Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. If you don't already have it, install the extension **Live Server** (by *Ritwick Dey*) from the VS Code Extensions tab (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Right-click on `index.html` and choose **"Open with Live Server"**.
4. Your browser will automatically open `http://127.0.0.1:5500`.

### Option 2: Direct Open
Simply double-click `index.html` in your file explorer (Finder on macOS or File Explorer on Windows) to open it directly in Google Chrome, Safari, Edge, or Firefox.

### Option 3: Python Local Server
Run this command inside the project directory:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🚀 Uploading to GitHub

1. Open your terminal in the project directory:
   ```bash
   cd "/Users/haniya/Desktop/The midnight"
   ```

2. Initialize a git repository (if not already initialized):
   ```bash
   git init
   ```

3. Add all files and make your first commit:
   ```bash
   git add .
   git commit -m "Initial commit: The Midnight Library"
   ```

4. Go to [GitHub.com](https://github.com) and click **"New repository"**.
   - Name it `the-midnight-library` (or any name you prefer).
   - Set it to **Public**.
   - Do **not** initialize with a README, .gitignore, or license (we already created them).
   - Click **"Create repository"**.

5. Link your local repository to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/the-midnight-library.git
   git push -u origin main
   ```
   *(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username)*.

---

## ⚡ Deploying to Vercel

1. Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** > **"Project"**.
3. Select your `the-midnight-library` repository and click **"Import"**.
4. In the configuration screen:
   - **Framework Preset**: *Other*
   - **Root Directory**: `./`
5. (Optional) Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key`
6. Click **"Deploy"**.
7. In ~30 seconds, your site will be live at a public URL (e.g., `https://the-midnight-library.vercel.app`)!

---

## 🔑 Configuring the Gemini API Key (Optional)

The AI Book Companion (*The Archivist*) is powered by **Gemini 2.5 Flash**. You have two secure ways to configure your key:

### Method A: Directly in the Website UI (Works on GitHub Pages & Local)
1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open the website, click on **The Archivist** tab.
3. In the greeting card, click **"Enter Gemini Key"**.
4. Paste your key. It is saved **strictly in your own browser's `localStorage`** and is never uploaded or exposed to GitHub.

### Method B: Vercel Serverless Environment Variable (Production)
1. In your [Vercel Dashboard](https://vercel.com/dashboard), open your **The Midnight Library** project.
2. Navigate to **Settings** > **Environment Variables**.
3. Add a new variable:
   - Name: `GEMINI_API_KEY`
   - Value: `your_gemini_api_key_here`
4. Redeploy the project. Requests to `/api/chat` will now securely use the serverless function without exposing your key in client-side code.

---

## 📜 License & Credits

- Book data & covers courtesy of [Open Library](https://openlibrary.org) & [Internet Archive](https://archive.org).
- AI Companion powered by [Google Gemini 2.5 Flash](https://ai.google.dev/).
- Designed with Dark Academia aesthetics for book lovers worldwide.
