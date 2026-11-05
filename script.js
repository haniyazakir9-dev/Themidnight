/**
 * ==============================================================================
 * THE MIDNIGHT LIBRARY - JAVASCRIPT CORE
 * Tagline: "Every book holds a little universe."
 * Aesthetic: Dark Academia
 * APIs: Open Library API & Google Gemini 2.5 Flash
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 1. CONFIGURATION & MASTER DATA
// ------------------------------------------------------------------------------

const CONFIG = {
  WEBSITE_NAME: 'The Midnight Library',
  TAGLINE: 'Every book holds a little universe.',
  OPEN_LIBRARY_SEARCH_URL: 'https://openlibrary.org/search.json',
  OPEN_LIBRARY_SUBJECT_URL: 'https://openlibrary.org/subjects',
  OPEN_LIBRARY_WORKS_URL: 'https://openlibrary.org',
  OPEN_LIBRARY_COVER_URL: 'https://covers.openlibrary.org/b/id',
  AI_API_ENDPOINT: '/api/chat',
  ITEMS_PER_PAGE: 20
};

// 10 Required Categories with Dark Academia aesthetics and Open Library subjects
const CATEGORIES = [
  {
    id: 'fiction',
    name: 'Fiction',
    subject: 'fiction',
    latinSubtitle: 'Mundus Imaginarius',
    icon: 'fa-feather-pointed',
    description: 'Tales of human longing, intricate destinies, and evocative journeys.'
  },
  {
    id: 'romance',
    name: 'Romance',
    subject: 'romance',
    latinSubtitle: 'Amor Aeternus',
    icon: 'fa-heart',
    description: 'Tender devotions, tempestuous passions, and clandestine confessions.'
  },
  {
    id: 'mystery',
    name: 'Mystery',
    subject: 'mystery',
    latinSubtitle: 'Aenigma Noctis',
    icon: 'fa-magnifying-glass',
    description: 'Enshadowed alleys, labyrinthine clues, and secrets buried beneath time.'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    subject: 'fantasy',
    latinSubtitle: 'Regna Incantata',
    icon: 'fa-wand-magic-sparkles',
    description: 'Mythic realms, forbidden sorcery, and kingdoms bathed in starlight.'
  },
  {
    id: 'classics',
    name: 'Classics',
    subject: 'classic_literature',
    latinSubtitle: 'Monumenta Litterarum',
    icon: 'fa-landmark',
    description: 'Timeless masterpieces of antiquity, enlightenment, and Victorian prose.'
  },
  {
    id: 'psychology',
    name: 'Psychology',
    subject: 'psychology',
    latinSubtitle: 'Anima Humana',
    icon: 'fa-brain',
    description: 'The labyrinth of human consciousness, cognition, and hidden motives.'
  },
  {
    id: 'biography',
    name: 'Biography',
    subject: 'biography',
    latinSubtitle: 'Vitae Illustrium',
    icon: 'fa-scroll',
    description: 'Chronicled lives of philosophers, monarchies, rebels, and visionaries.'
  },
  {
    id: 'science-fiction',
    name: 'Science Fiction',
    subject: 'science_fiction',
    latinSubtitle: 'Astra et Machinae',
    icon: 'fa-compass-drafting',
    description: 'Cosmic frontiers, distant centuries, and speculative futures.'
  },
  {
    id: 'history',
    name: 'History',
    subject: 'history',
    latinSubtitle: 'Annales Antiqui',
    icon: 'fa-hourglass-half',
    description: 'Echoes of fallen empires, parchment treaties, and monumental eras.'
  },
  {
    id: 'poetry',
    name: 'Poetry',
    subject: 'poetry',
    latinSubtitle: 'Carmina Divina',
    icon: 'fa-pen-nib',
    description: 'Lyrical reflections, midnight verses, and incandescent truths.'
  }
];

// Curated Masterpieces for the Hero / Featured Showcase
const FEATURED_BOOKS = [
  {
    id: 'OL27479W',
    key: '/works/OL27479W',
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    first_publish_year: 1890,
    cover_id: 12821219,
    description: 'A philosophical gothic masterpiece exploring eternal youth, aestheticism, corruption, and the tragic price of vanity.',
    subjects: ['Classics', 'Gothic', 'Philosophy', 'Fiction'],
    pages: 254
  },
  {
    id: 'OL262758W',
    key: '/works/OL262758W',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    first_publish_year: 1818,
    cover_id: 8555811,
    description: 'The monumental tale of Victor Frankenstein and the sentient creature brought to life through forbidden science.',
    subjects: ['Gothic Horror', 'Science Fiction', 'Classics'],
    pages: 280
  },
  {
    id: 'OL15446051W',
    key: '/works/OL15446051W',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    first_publish_year: 1866,
    cover_id: 8235116,
    description: 'A psychological examination of guilt, morality, and redemption centered on the impoverished former student Raskolnikov in St. Petersburg.',
    subjects: ['Psychology', 'Classics', 'Philosophy'],
    pages: 671
  },
  {
    id: 'OL33827W',
    key: '/works/OL33827W',
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    first_publish_year: 1847,
    cover_id: 8231998,
    description: 'A tempestuous tale of passionate vengeance and doomed love across the wild Yorkshire moors.',
    subjects: ['Romance', 'Classics', 'Gothic'],
    pages: 416
  },
  {
    id: 'OL103123W',
    key: '/works/OL103123W',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    first_publish_year: 1847,
    cover_id: 8743392,
    description: 'An enduring gothic bildungsroman following an orphaned governess who navigates moral integrity, fierce independence, and dark secrets at Thornfield Hall.',
    subjects: ['Romance', 'Classics', 'Gothic'],
    pages: 507
  },
  {
    id: 'OL2163649W',
    key: '/works/OL2163649W',
    title: 'The Secret History',
    author: 'Donna Tartt',
    first_publish_year: 1992,
    cover_id: 11181290,
    description: 'The definitive modern Dark Academia novel: a group of eccentric classics students at an elite Vermont college cross moral boundaries with fateful consequences.',
    subjects: ['Mystery', 'Fiction', 'Dark Academia'],
    pages: 559
  }
];

// Dark Academia Quotes
const LITERARY_QUOTES = [
  { quote: 'Between the covers of a book is a lovely place to be.', author: 'Unknown Archivist' },
  { quote: 'Whatever our souls are made of, his and mine are the same.', author: 'Emily Brontë, Wuthering Heights' },
  { quote: 'The books that the world calls immoral are books that show the world its own shame.', author: 'Oscar Wilde, The Picture of Dorian Gray' },
  { quote: 'There is no friend as loyal as a book.', author: 'Ernest Hemingway' },
  { quote: 'Beauty is terror. Whatever we call beautiful, we quiver before it.', author: 'Donna Tartt, The Secret History' },
  { quote: 'I read so I can live more than one life in more than one place.', author: 'Anne Tyler' }
];

// ------------------------------------------------------------------------------
// 2. LOCAL STORAGE MANAGER
// ------------------------------------------------------------------------------

const STORAGE_KEYS = {
  BOOKSHELF: 'midnight_library_bookshelf_v1',
  JOURNAL: 'midnight_library_journal_v1',
  TRACKER_GOAL: 'midnight_library_goal_v1',
  READING_SESSIONS: 'midnight_library_sessions_v1',
  USER_GEMINI_KEY: 'midnight_library_gemini_key_v1'
};

const StorageManager = {
  init() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.BOOKSHELF)) {
        localStorage.setItem(STORAGE_KEYS.BOOKSHELF, JSON.stringify([
          {
            id: 'OL27479W',
            key: '/works/OL27479W',
            title: 'The Picture of Dorian Gray',
            author: 'Oscar Wilde',
            first_publish_year: 1890,
            cover_id: 12821219,
            shelf: 'currently-reading',
            pages: 254,
            currentPage: 168,
            rating: 5,
            dateAdded: new Date(Date.now() - 7 * 86400000).toISOString()
          },
          {
            id: 'OL2163649W',
            key: '/works/OL2163649W',
            title: 'The Secret History',
            author: 'Donna Tartt',
            first_publish_year: 1992,
            cover_id: 11181290,
            shelf: 'finished',
            pages: 559,
            currentPage: 559,
            rating: 5,
            dateAdded: new Date(Date.now() - 30 * 86400000).toISOString(),
            dateFinished: new Date(Date.now() - 5 * 86400000).toISOString()
          },
          {
            id: 'OL262758W',
            key: '/works/OL262758W',
            title: 'Frankenstein',
            author: 'Mary Shelley',
            first_publish_year: 1818,
            cover_id: 8555811,
            shelf: 'want-to-read',
            pages: 280,
            currentPage: 0,
            rating: 0,
            dateAdded: new Date(Date.now() - 14 * 86400000).toISOString()
          }
        ]));
      }

      if (!localStorage.getItem(STORAGE_KEYS.JOURNAL)) {
        localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify([
          {
            id: 'entry_seed_1',
            bookId: 'OL2163649W',
            bookTitle: 'The Secret History',
            bookAuthor: 'Donna Tartt',
            date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
            rating: 5,
            favoriteQuotes: '“Beauty is terror. Whatever we call beautiful, we quiver before it. And what could be more terrifying and beautiful, to souls like the Greeks or our own, than to lose control completely?”',
            reflections: 'A mesmerizing descent into obsession, classical scholarship, and moral transgression under the winter chill of Vermont. The dialogue of Julian Morse resonates with chilling elegance.',
            tags: ['Dark Academia', 'Classics', 'Favorites']
          },
          {
            id: 'entry_seed_2',
            bookId: 'OL27479W',
            bookTitle: 'The Picture of Dorian Gray',
            bookAuthor: 'Oscar Wilde',
            date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
            rating: 5,
            favoriteQuotes: '“There is only one thing in the world worse than being talked about, and that is not being talked about.”',
            reflections: 'Lord Henry’s intoxicating paradoxes and the slow moral decay mirrored in the hidden canvas. A masterpiece of aesthetic philosophy.',
            tags: ['Victorian', 'Philosophy', 'Gothic']
          }
        ]));
      }

      if (!localStorage.getItem(STORAGE_KEYS.TRACKER_GOAL)) {
        localStorage.setItem(STORAGE_KEYS.TRACKER_GOAL, '24');
      }

      if (!localStorage.getItem(STORAGE_KEYS.READING_SESSIONS)) {
        localStorage.setItem(STORAGE_KEYS.READING_SESSIONS, JSON.stringify([
          {
            id: 'sess_1',
            bookId: 'OL27479W',
            bookTitle: 'The Picture of Dorian Gray',
            pagesRead: 35,
            date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
            notes: 'Read chapters 10-12 by candle glow.'
          }
        ]));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  },

  getBookshelf() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKSHELF) || '[]');
    } catch {
      return [];
    }
  },

  saveBookshelf(books) {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKSHELF, JSON.stringify(books));
      window.dispatchEvent(new CustomEvent('midnight:bookshelf-updated'));
      return true;
    } catch {
      return false;
    }
  },

  findBook(idOrKey) {
    const books = this.getBookshelf();
    return books.find(b => b.id === idOrKey || b.key === idOrKey);
  },

  addToBookshelf(book, shelf = 'want-to-read') {
    const books = this.getBookshelf();
    const id = book.id || book.key || `custom_${Date.now()}`;
    const existingIdx = books.findIndex(b => b.id === id || (b.key && b.key === book.key));

    const totalPages = book.pages || book.number_of_pages || (book.number_of_pages_median || 320);

    const record = {
      id: id,
      key: book.key || `/works/${id}`,
      title: book.title || 'Untitled Volume',
      author: book.author || (Array.isArray(book.author_name) ? book.author_name.join(', ') : 'Unknown Author'),
      first_publish_year: book.first_publish_year || book.publish_year || 'Classic',
      cover_id: book.cover_id || book.cover_i || null,
      shelf: shelf,
      pages: totalPages,
      currentPage: shelf === 'finished' ? totalPages : (shelf === 'currently-reading' ? (book.currentPage || 1) : 0),
      rating: book.rating || 0,
      dateAdded: new Date().toISOString(),
      dateFinished: shelf === 'finished' ? new Date().toISOString() : null,
      notes: book.notes || ''
    };

    if (existingIdx >= 0) {
      books[existingIdx] = { ...books[existingIdx], ...record, shelf };
      if (shelf === 'finished' && !books[existingIdx].dateFinished) {
        books[existingIdx].dateFinished = new Date().toISOString();
        books[existingIdx].currentPage = books[existingIdx].pages;
      }
    } else {
      books.unshift(record);
    }

    this.saveBookshelf(books);
    return record;
  },

  removeFromBookshelf(bookId) {
    const books = this.getBookshelf().filter(b => b.id !== bookId && b.key !== bookId);
    this.saveBookshelf(books);
  },

  updateProgress(bookId, currentPage, totalPages = null) {
    const books = this.getBookshelf();
    const book = books.find(b => b.id === bookId || b.key === bookId);
    if (!book) return null;

    const previousPage = book.currentPage || 0;
    if (totalPages && totalPages > 0) book.pages = parseInt(totalPages, 10);

    const newPage = Math.min(Math.max(0, parseInt(currentPage, 10) || 0), book.pages);
    book.currentPage = newPage;

    if (newPage > previousPage) {
      this.logReadingSession(book.id, newPage - previousPage, `Turned pages ${previousPage} to ${newPage}`);
    }

    if (newPage >= book.pages && book.shelf !== 'finished') {
      book.shelf = 'finished';
      book.dateFinished = new Date().toISOString();
    } else if (newPage > 0 && book.shelf === 'want-to-read') {
      book.shelf = 'currently-reading';
    }

    this.saveBookshelf(books);
    return book;
  },

  getBooksByShelf(shelf) {
    const books = this.getBookshelf();
    if (!shelf || shelf === 'all') return books;
    return books.filter(b => b.shelf === shelf);
  },

  getReadingGoal() {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEYS.TRACKER_GOAL) || '24', 10);
    } catch {
      return 24;
    }
  },

  setReadingGoal(val) {
    try {
      const g = Math.max(1, parseInt(val, 10) || 24);
      localStorage.setItem(STORAGE_KEYS.TRACKER_GOAL, g.toString());
      return g;
    } catch {
      return 24;
    }
  },

  getReadingStats() {
    const books = this.getBookshelf();
    const currentYear = new Date().getFullYear();

    const finished = books.filter(b => b.shelf === 'finished');
    const currentlyReading = books.filter(b => b.shelf === 'currently-reading');
    const wantToRead = books.filter(b => b.shelf === 'want-to-read');

    const finishedThisYear = finished.filter(b => {
      if (!b.dateFinished) return true;
      return new Date(b.dateFinished).getFullYear() === currentYear;
    });

    let totalPagesRead = 0;
    books.forEach(b => {
      if (b.shelf === 'finished') totalPagesRead += (b.pages || 0);
      else if (b.shelf === 'currently-reading') totalPagesRead += (b.currentPage || 0);
    });

    const goal = this.getReadingGoal();
    const progressPercent = Math.min(100, Math.round((finishedThisYear.length / goal) * 100));

    return {
      totalBooks: books.length,
      finishedCount: finished.length,
      finishedThisYear: finishedThisYear.length,
      currentlyReadingCount: currentlyReading.length,
      wantToReadCount: wantToRead.length,
      totalPagesRead,
      goal,
      progressPercent
    };
  },

  getReadingSessions() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.READING_SESSIONS) || '[]');
    } catch {
      return [];
    }
  },

  logReadingSession(bookId, pagesRead, notes = '') {
    try {
      const sessions = this.getReadingSessions();
      const book = this.findBook(bookId);
      const session = {
        id: `sess_${Date.now()}`,
        bookId,
        bookTitle: book ? book.title : 'Personal Reading Hour',
        pagesRead: parseInt(pagesRead, 10) || 1,
        date: new Date().toISOString().split('T')[0],
        notes: notes || 'Quiet reading hour.'
      };
      sessions.unshift(session);
      if (sessions.length > 50) sessions.pop();
      localStorage.setItem(STORAGE_KEYS.READING_SESSIONS, JSON.stringify(sessions));
      return session;
    } catch {
      return null;
    }
  },

  getJournalEntries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.JOURNAL) || '[]');
    } catch {
      return [];
    }
  },

  saveJournalEntry(entry) {
    try {
      const entries = this.getJournalEntries();
      const id = entry.id || `entry_${Date.now()}`;
      const existingIdx = entries.findIndex(e => e.id === id);

      const record = {
        id,
        bookId: entry.bookId || '',
        bookTitle: entry.bookTitle || 'Untitled Musings',
        bookAuthor: entry.bookAuthor || 'Anonymous',
        date: entry.date || new Date().toISOString().split('T')[0],
        rating: parseInt(entry.rating, 10) || 5,
        favoriteQuotes: entry.favoriteQuotes || '',
        reflections: entry.reflections || '',
        tags: Array.isArray(entry.tags)
          ? entry.tags
          : (entry.tags ? entry.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
        updatedAt: new Date().toISOString()
      };

      if (existingIdx >= 0) entries[existingIdx] = record;
      else entries.unshift(record);

      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
      window.dispatchEvent(new CustomEvent('midnight:journal-updated'));
      return record;
    } catch {
      return null;
    }
  },

  deleteJournalEntry(id) {
    try {
      const entries = this.getJournalEntries().filter(e => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
      window.dispatchEvent(new CustomEvent('midnight:journal-updated'));
      return true;
    } catch {
      return false;
    }
  },

  // Client-side user Gemini key (kept strictly in user's browser localStorage)
  getUserGeminiKey() {
    return localStorage.getItem(STORAGE_KEYS.USER_GEMINI_KEY) || '';
  },

  setUserGeminiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem(STORAGE_KEYS.USER_GEMINI_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER_GEMINI_KEY);
    }
  }
};

// ------------------------------------------------------------------------------
// 3. API SERVICE (Open Library & Gemini 2.5 Flash)
// ------------------------------------------------------------------------------

const ApiService = {
  cache: new Map(),

  getCoverUrl(coverId, size = 'M') {
    if (!coverId) return null;
    return `${CONFIG.OPEN_LIBRARY_COVER_URL}/${coverId}-${size}.jpg`;
  },

  generateCoverFallback(title = 'Volume', author = 'Anonymous') {
    const safeTitle = (title || 'Volume').slice(0, 32);
    const safeAuthor = (author || 'Anonymous').slice(0, 24);

    const palettes = [
      { bg: '#1c1512', border: '#c5a059', spine: '#120d0b' },
      { bg: '#2b1115', border: '#d4af37', spine: '#1a080b' },
      { bg: '#0f1f1d', border: '#a89060', spine: '#081211' },
      { bg: '#171726', border: '#c0a062', spine: '#0c0c16' }
    ];
    const sum = safeTitle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const p = palettes[sum % palettes.length];

    const escapeXml = (str) => String(str).replace(/[<>&'"]/g, c => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
      }
    });

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300" width="100%" height="100%">
      <defs>
        <linearGradient id="g_${sum}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.bg}"/>
          <stop offset="100%" stop-color="${p.spine}"/>
        </linearGradient>
        <linearGradient id="gold_${sum}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5e18a"/>
          <stop offset="50%" stop-color="${p.border}"/>
          <stop offset="100%" stop-color="#8a6925"/>
        </linearGradient>
      </defs>
      <rect width="200" height="300" rx="4" fill="url(#g_${sum})"/>
      <rect x="0" y="0" width="14" height="300" fill="${p.spine}" opacity="0.7"/>
      <line x1="14" y1="0" x2="14" y2="300" stroke="url(#gold_${sum})" stroke-width="1.2" opacity="0.6"/>
      <rect x="22" y="14" width="164" height="272" rx="2" fill="none" stroke="url(#gold_${sum})" stroke-width="1.5" opacity="0.8"/>
      <rect x="26" y="18" width="156" height="264" rx="2" fill="none" stroke="url(#gold_${sum})" stroke-width="0.8" stroke-dasharray="3,3" opacity="0.5"/>
      <polygon points="26,18 34,18 26,26" fill="url(#gold_${sum})"/>
      <polygon points="182,18 174,18 182,26" fill="url(#gold_${sum})"/>
      <polygon points="26,282 34,282 26,274" fill="url(#gold_${sum})"/>
      <polygon points="182,282 174,282 182,274" fill="url(#gold_${sum})"/>
      <circle cx="107" cy="85" r="24" fill="none" stroke="url(#gold_${sum})" stroke-width="1.2" opacity="0.7"/>
      <path d="M 107 72 L 109 81 L 118 81 L 111 86 L 114 95 L 107 90 L 100 95 L 103 86 L 96 81 L 105 81 Z" fill="url(#gold_${sum})" opacity="0.85"/>
      <text x="107" y="145" text-anchor="middle" fill="#f5eedc" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="14" letter-spacing="0.5">
        ${escapeXml(safeTitle)}
      </text>
      <line x1="60" y1="165" x2="154" y2="165" stroke="url(#gold_${sum})" stroke-width="1" opacity="0.6"/>
      <text x="107" y="188" text-anchor="middle" fill="#d4af37" font-family="'Cinzel', Georgia, serif" font-size="11" letter-spacing="1">
        ${escapeXml(safeAuthor.toUpperCase())}
      </text>
      <text x="107" y="260" text-anchor="middle" fill="#a08960" font-family="'Cormorant Garamond', serif" font-size="9" font-style="italic" opacity="0.8">
        The Midnight Library Edition
      </text>
    </svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  },

  async searchBooks(query, type = 'all', page = 1) {
    if (!query || !query.trim()) return { docs: [], numFound: 0 };
    const q = query.trim();
    let url = `${CONFIG.OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(q)}&page=${page}&limit=${CONFIG.ITEMS_PER_PAGE}`;

    if (type === 'title') url = `${CONFIG.OPEN_LIBRARY_SEARCH_URL}?title=${encodeURIComponent(q)}&page=${page}&limit=${CONFIG.ITEMS_PER_PAGE}`;
    else if (type === 'author') url = `${CONFIG.OPEN_LIBRARY_SEARCH_URL}?author=${encodeURIComponent(q)}&page=${page}&limit=${CONFIG.ITEMS_PER_PAGE}`;
    else if (type === 'subject') url = `${CONFIG.OPEN_LIBRARY_SEARCH_URL}?subject=${encodeURIComponent(q)}&page=${page}&limit=${CONFIG.ITEMS_PER_PAGE}`;

    const cacheKey = `search_${type}_${q}_${page}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Open Library error: ${res.status}`);
    const data = await res.json();

    const normalized = {
      numFound: data.numFound || 0,
      page,
      docs: (data.docs || []).map(doc => {
        const id = doc.key ? doc.key.replace('/works/', '') : `b_${Math.random()}`;
        const author = Array.isArray(doc.author_name) ? doc.author_name.slice(0, 2).join(', ') : (doc.author_name || 'Unknown Author');
        return {
          id,
          key: doc.key || `/works/${id}`,
          title: doc.title || 'Untitled Book',
          author,
          first_publish_year: doc.first_publish_year || doc.publish_year?.[0] || 'Classic',
          cover_id: doc.cover_i || null,
          number_of_pages_median: doc.number_of_pages_median || 320,
          edition_count: doc.edition_count || 1,
          subjects: Array.isArray(doc.subject) ? doc.subject.slice(0, 4) : []
        };
      })
    };

    this.cache.set(cacheKey, normalized);
    return normalized;
  },

  async getBooksBySubject(subjectSlug, limit = 24) {
    const cacheKey = `subj_${subjectSlug}_${limit}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    const url = `${CONFIG.OPEN_LIBRARY_SUBJECT_URL}/${encodeURIComponent(subjectSlug)}.json?limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Subject API returned ${res.status}`);
    const data = await res.json();

    const works = (data.works || []).map(w => {
      const id = w.key ? w.key.replace('/works/', '') : `w_${Math.random()}`;
      const author = Array.isArray(w.authors) ? w.authors.map(a => a.name).join(', ') : 'Unknown Author';
      return {
        id,
        key: w.key,
        title: w.title,
        author,
        first_publish_year: w.first_publish_year || 'Classic',
        cover_id: w.cover_id || null,
        subjects: Array.isArray(w.subject) ? w.subject.slice(0, 4) : [subjectSlug],
        number_of_pages_median: 300
      };
    });

    const result = { works };
    this.cache.set(cacheKey, result);
    return result;
  },

  async getBookDetails(workKey) {
    if (!workKey) return null;
    const cleanKey = workKey.startsWith('/') ? workKey : `/works/${workKey}`;
    const cacheKey = `details_${cleanKey}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);

    try {
      const res = await fetch(`${CONFIG.OPEN_LIBRARY_WORKS_URL}${cleanKey}.json`);
      if (!res.ok) throw new Error('Details fetch failed');
      const data = await res.json();

      let description = '';
      if (typeof data.description === 'string') description = data.description;
      else if (data.description && typeof data.description.value === 'string') description = data.description.value;

      if (description) {
        description = description.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        description = description.replace(/---\n.*$/s, '').trim();
      }

      const details = {
        title: data.title,
        description: description || 'No synopsis is recorded in the archives for this volume yet. You may explore editions directly through the Open Library catalog.',
        subjects: Array.isArray(data.subjects) ? data.subjects.slice(0, 10) : [],
        openLibraryUrl: `https://openlibrary.org${cleanKey}`
      };

      this.cache.set(cacheKey, details);
      return details;
    } catch {
      return {
        description: 'The ancient archives hold bibliographic references for this tome.',
        subjects: [],
        openLibraryUrl: `https://openlibrary.org${cleanKey}`
      };
    }
  },

  /**
   * Ask Gemini 2.5 Flash
   * Supports:
   * 1. Direct browser call if user supplied their Gemini API Key in localStorage (zero backend needed!)
   * 2. Serverless /api/chat call if running on Vercel with server environment variables
   * 3. Intelligent Dark Academia offline fallback if neither is configured
   */
  async askArchivist(message, history = [], bookContext = null) {
    const userKey = StorageManager.getUserGeminiKey();

    // Route 1: Direct Gemini 2.5 Flash call via browser if key is set
    if (userKey) {
      try {
        const reply = await this.callGeminiDirect(userKey, message, history, bookContext);
        return {
          success: true,
          reply,
          model: 'gemini-2.5-flash',
          isLive: true
        };
      } catch (err) {
        console.warn('Direct Gemini call failed:', err);
      }
    }

    // Route 2: Try Vercel Serverless Function /api/chat
    try {
      const res = await fetch(CONFIG.AI_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history, bookContext })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          return {
            success: true,
            reply: data.reply,
            model: data.model || 'gemini-2.5-flash',
            isLive: true
          };
        }
      }
    } catch {
      // Local/offline environment
    }

    // Route 3: Curated Dark Academia offline reflections
    return {
      success: true,
      isLive: false,
      isMock: true,
      reply: this.generateOfflineReply(message, bookContext),
      notice: 'The Archivist is currently in offline contemplation mode. To activate live Gemini 2.5 Flash, click the key icon to provide your API key or configure GEMINI_API_KEY on Vercel.'
    };
  },

  async callGeminiDirect(apiKey, message, history, bookContext) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const systemText = `You are "The Archivist", the resident literary scholar at The Midnight Library.
Aesthetic & Tone: Dark Academia — erudite, poetic, warmly inviting, steeped in classical literature, gothic fiction, philosophy, and poetry.
Recommend books with titles, authors, and years (e.g. *The Secret History* by Donna Tartt, 1992). Give 2-4 thoughtful recommendations with brief reasons.
${bookContext ? `Current volume under discussion: "${bookContext.title}" by ${bookContext.author || 'Unknown'}.` : ''}`;

    const contents = [];
    const recent = history.slice(-6);
    for (const h of recent) {
      if (h.role === 'user' || h.role === 'assistant' || h.role === 'model') {
        contents.push({
          role: h.role === 'assistant' ? 'model' : h.role,
          parts: [{ text: h.content || '' }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemText }] },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || 'Gemini API call failed');
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'The archives remain quiet.';
  },

  generateOfflineReply(query, bookContext) {
    const q = (query || '').toLowerCase();

    if (bookContext) {
      return `Welcome, fellow scholar. You are inspecting ***${bookContext.title}*** by ${bookContext.author || 'an esteemed author'}.\n\nThis volume resonates profoundly in the dim cloisters of literature. It questions the fragile boundary between mortal obsession, aesthetic devotion, and the passage of time. If this work stirs your mind, you would deeply enjoy:\n\n1. ***The Secret History*** by Donna Tartt (1992)\n2. ***The Shadow of the Wind*** by Carlos Ruiz Zafón (2001)\n3. ***Brideshead Revisited*** by Evelyn Waugh (1945)`;
    }

    if (q.includes('dark academia') || q.includes('secret history') || q.includes('gothic')) {
      return `For those who yearn for candlelit libraries, Greek tragedies, moral ambiguity, and collegiate secrets, I offer these masterworks:\n\n1. ***The Secret History*** by Donna Tartt (1992) — The cornerstone of the genre. An elite cabal of classics students at Hampden College succumb to Dionysian frenzy.\n2. ***If We Were Villains*** by M.L. Rio (2018) — Seven Shakespearean actors at an elite conservatory blur drama with blood.\n3. ***The Picture of Dorian Gray*** by Oscar Wilde (1890) — Decadence, vanity, and a cursed canvas bearing the toll of sin.\n4. ***Babel*** by R.F. Kuang (2022) — Oxford University's Royal Institute of Translation, magic, and imperial sorrow.`;
    }

    if (q.includes('mystery') || q.includes('detective') || q.includes('murder')) {
      return `For a midnight enveloped in fog and clandestine investigations, consider these tomes:\n\n1. ***The Name of the Rose*** by Umberto Eco (1980) — A Franciscan friar investigates bizarre deaths in a labyrinthine 14th-century monastery library.\n2. ***The Alienist*** by Caleb Carr (1994) — Gilded Age Manhattan, psychological profiling, and dark chases through tenement shadows.\n3. ***The Moonstone*** by Wilkie Collins (1868) — The monumental foundation of English detective fiction.`;
    }

    if (q.includes('poetry') || q.includes('poem')) {
      return `Poetry is the distillation of celestial wonder and midnight sorrow:\n\n1. ***The Complete Poems*** of John Keats — Romantic melancholy and immortal beauty.\n2. ***Ariel*** by Sylvia Plath — Fierce, electric, and astonishingly intense imagery.\n3. ***The Waste Land*** by T.S. Eliot — Classical allusions and elegiac modern prose.`;
    }

    return `The quiet of midnight is fertile ground for reading. You asked: "${query}".\n\nTo discover a volume that mirrors your spirit tonight, explore our **Classics**, **Mystery**, and **Philosophy** shelves. Books are mirrors; they reveal not only another world, but the quiet contours of our own minds.`;
  }
};

// ------------------------------------------------------------------------------
// 4. UI COMPONENT CONTROLLER
// ------------------------------------------------------------------------------

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getShelfLabel(shelf) {
  switch (shelf) {
    case 'currently-reading': return 'Currently Reading';
    case 'finished': return 'Finished';
    case 'want-to-read':
    default: return 'Want to Read';
  }
}

const UI = {
  toastContainer: null,
  audioContext: null,
  ambientNode: null,
  isAudioPlaying: false,

  showToast(message, type = 'info', duration = 3500) {
    if (!this.toastContainer) {
      const c = document.createElement('div');
      c.id = 'toast-container';
      c.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none';
      document.body.appendChild(c);
      this.toastContainer = c;
    }

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto transform transition-all duration-300 translate-y-4 opacity-0 flex items-center gap-3 px-5 py-3.5 rounded-lg border shadow-2xl backdrop-blur-md ${
      type === 'success'
        ? 'bg-[#1b1713]/95 border-[#c5a059] text-[#f4ebd9]'
        : type === 'warning'
        ? 'bg-[#261614]/95 border-[#d97736] text-[#f4ebd9]'
        : 'bg-[#171412]/95 border-[#9a8050]/60 text-[#eae0cc]'
    }`;

    const icon = type === 'success' ? 'fa-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-scroll';
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-[#d4af37] text-sm"></i>
      <span class="font-serif text-xs tracking-wide">${message}</span>
      <button class="ml-2 text-[#9e917d] hover:text-[#f4ebd9] transition"><i class="fa-solid fa-xmark text-xs"></i></button>
    `;

    toast.querySelector('button').onclick = () => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    };

    this.toastContainer.appendChild(toast);
    requestAnimationFrame(() => toast.classList.remove('translate-y-4', 'opacity-0'));

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  },

  toggleAmbience() {
    if (this.isAudioPlaying) {
      if (this.ambientNode) {
        try {
          this.ambientNode.source.stop();
          this.ambientNode.source.disconnect();
        } catch {}
        this.ambientNode = null;
      }
      this.isAudioPlaying = false;
      this.showToast('Ambience hushed.', 'info');
      return false;
    } else {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
          this.showToast('Web Audio not supported.', 'warning');
          return false;
        }
        if (!this.audioContext) this.audioContext = new AudioCtx();
        if (this.audioContext.state === 'suspended') this.audioContext.resume();

        const bufferSize = this.audioContext.sampleRate * 2;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(380, this.audioContext.currentTime);

        const gain = this.audioContext.createGain();
        gain.gain.setValueAtTime(0.06, this.audioContext.currentTime);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);

        source.start(0);
        this.ambientNode = { source, gain };
        this.isAudioPlaying = true;
        this.showToast('Midnight library rain & hearth ambience awakened.', 'success');
        return true;
      } catch (e) {
        console.warn('Audio failed:', e);
        return false;
      }
    }
  },

  renderBookCard(book) {
    const coverUrl = book.cover_id ? ApiService.getCoverUrl(book.cover_id, 'M') : (book.cover_url || null);
    const fallback = ApiService.generateCoverFallback(book.title, book.author);
    const saved = StorageManager.findBook(book.id || book.key);

    const card = document.createElement('div');
    card.className = 'book-card group relative flex flex-col bg-[#1a1512] rounded-lg border border-[#c5a059]/25 hover:border-[#d4af37]/70 shadow-lg hover:shadow-2xl hover:shadow-[#d4af37]/10 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden';

    let shelfBadge = '';
    if (saved) {
      const label = saved.shelf === 'currently-reading' ? 'Reading' : saved.shelf === 'finished' ? 'Finished' : 'Want to Read';
      const color = saved.shelf === 'currently-reading' ? 'bg-[#936622] text-[#fff6e0]' : saved.shelf === 'finished' ? 'bg-[#1b4332] text-[#d8f3dc]' : 'bg-[#3d2618] text-[#f4ebd9]';
      shelfBadge = `<span class="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 text-[10px] font-serif uppercase tracking-wider rounded border border-[#d4af37]/30 shadow ${color}">${label}</span>`;
    }

    card.innerHTML = `
      ${shelfBadge}
      <div class="book-cover-wrap relative aspect-[2/3] w-full overflow-hidden bg-[#120d0b] cursor-pointer">
        <img 
          src="${coverUrl || fallback}" 
          alt="${escapeHtml(book.title)}"
          loading="lazy"
          onerror="this.onerror=null; this.src='${fallback}';"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div class="book-spine-glow"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#140f0c] via-transparent to-transparent opacity-60"></div>
        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 p-3">
          <button class="btn-inspect px-3 py-1.5 rounded bg-[#c5a059] hover:bg-[#d4af37] text-[#120d0b] text-xs font-serif font-bold uppercase tracking-wider shadow transition">
            <i class="fa-solid fa-book-open mr-1"></i> Inspect
          </button>
        </div>
      </div>

      <div class="p-3.5 flex flex-col flex-grow justify-between bg-gradient-to-b from-[#1b1613] to-[#16110e]">
        <div>
          <h4 class="font-serif font-bold text-sm text-[#f5eedc] group-hover:text-[#e5c158] transition line-clamp-2 leading-snug cursor-pointer btn-title">
            ${escapeHtml(book.title)}
          </h4>
          <p class="font-serif italic text-xs text-[#a89984] mt-1 line-clamp-1">
            ${escapeHtml(book.author || 'Unknown Author')}
          </p>
        </div>

        <div class="pt-3 mt-2 border-t border-[#c5a059]/15 flex items-center justify-between text-[11px] text-[#8e816d]">
          <span><i class="fa-regular fa-calendar mr-1"></i>${book.first_publish_year || 'Classic'}</span>
          ${book.number_of_pages_median ? `<span><i class="fa-regular fa-file-lines mr-1"></i>${book.number_of_pages_median} pp</span>` : ''}
        </div>

        <div class="mt-3 flex gap-1.5">
          <button class="btn-shelf-action flex-grow py-1.5 px-2 rounded text-xs font-serif border border-[#c5a059]/40 hover:border-[#d4af37] bg-[#221a15] hover:bg-[#2c221b] text-[#e8dec8] transition flex items-center justify-center gap-1.5">
            <i class="fa-solid ${saved ? 'fa-bookmark text-[#d4af37]' : 'fa-plus'} text-[11px]"></i>
            <span>${saved ? getShelfLabel(saved.shelf) : 'Add to Shelf'}</span>
          </button>
          <button class="btn-inspect-alt p-1.5 px-2.5 rounded text-xs border border-[#c5a059]/20 hover:border-[#d4af37]/60 bg-[#1e1713] text-[#a89984] hover:text-[#f4ebd9] transition" title="Inspect Volume">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
    `;

    const openDetails = () => UI.openBookDetailsModal(book);
    card.querySelector('.btn-inspect').onclick = openDetails;
    card.querySelector('.btn-inspect-alt').onclick = openDetails;
    card.querySelector('.btn-title').onclick = openDetails;
    card.querySelector('.book-cover-wrap').onclick = (e) => {
      if (!e.target.closest('.btn-inspect')) openDetails();
    };

    const shelfBtn = card.querySelector('.btn-shelf-action');
    shelfBtn.onclick = (e) => {
      e.stopPropagation();
      UI.openShelfPicker(book, shelfBtn);
    };

    return card;
  },

  openShelfPicker(book, triggerElement) {
    const existing = document.getElementById('shelf-picker-popover');
    if (existing) existing.remove();

    const rect = triggerElement.getBoundingClientRect();
    const picker = document.createElement('div');
    picker.id = 'shelf-picker-popover';
    picker.className = 'fixed z-50 w-52 bg-[#1b1512] border border-[#c5a059]/70 rounded-lg shadow-2xl p-2 text-xs font-serif backdrop-blur-md animate-fade-in';
    picker.style.top = `${rect.bottom + window.scrollY + 6}px`;
    picker.style.left = `${Math.min(window.innerWidth - 220, Math.max(10, rect.left + window.scrollX))}px`;

    const saved = StorageManager.findBook(book.id || book.key);
    const curShelf = saved ? saved.shelf : null;

    picker.innerHTML = `
      <div class="px-2 py-1 text-[10px] uppercase font-bold text-[#a08f75] tracking-wider border-b border-[#c5a059]/20 mb-1">
        Shelve in Personal Sanctuary
      </div>
      <button class="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#2b221b] text-[#f4ebd9] flex items-center justify-between transition ${curShelf === 'want-to-read' ? 'text-[#d4af37] font-bold bg-[#241c16]' : ''}" data-shelf="want-to-read">
        <span><i class="fa-regular fa-clock mr-2 text-[#c5a059]"></i> Want to Read</span>
        ${curShelf === 'want-to-read' ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
      </button>
      <button class="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#2b221b] text-[#f4ebd9] flex items-center justify-between transition ${curShelf === 'currently-reading' ? 'text-[#d4af37] font-bold bg-[#241c16]' : ''}" data-shelf="currently-reading">
        <span><i class="fa-solid fa-book-open-reader mr-2 text-[#c5a059]"></i> Currently Reading</span>
        ${curShelf === 'currently-reading' ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
      </button>
      <button class="w-full text-left px-2.5 py-1.5 rounded hover:bg-[#2b221b] text-[#f4ebd9] flex items-center justify-between transition ${curShelf === 'finished' ? 'text-[#d4af37] font-bold bg-[#241c16]' : ''}" data-shelf="finished">
        <span><i class="fa-solid fa-circle-check mr-2 text-[#c5a059]"></i> Finished</span>
        ${curShelf === 'finished' ? '<i class="fa-solid fa-check text-xs"></i>' : ''}
      </button>
      ${saved ? `
        <div class="border-t border-[#c5a059]/20 mt-1 pt-1">
          <button class="w-full text-left px-2.5 py-1 rounded hover:bg-rose-950/40 text-rose-300 flex items-center gap-2 transition" data-action="remove">
            <i class="fa-solid fa-trash-can text-xs"></i> Remove from Shelves
          </button>
        </div>
      ` : ''}
    `;

    picker.onclick = (e) => {
      const btn = e.target.closest('[data-shelf]');
      const rm = e.target.closest('[data-action="remove"]');
      if (btn) {
        StorageManager.addToBookshelf(book, btn.dataset.shelf);
        UI.showToast(`"${book.title}" shelved under ${getShelfLabel(btn.dataset.shelf)}.`, 'success');
        picker.remove();
        App.refreshView();
      } else if (rm) {
        StorageManager.removeFromBookshelf(book.id || book.key);
        UI.showToast(`"${book.title}" removed from shelves.`, 'info');
        picker.remove();
        App.refreshView();
      }
    };

    const dismiss = (e) => {
      if (!picker.contains(e.target) && e.target !== triggerElement && !triggerElement.contains(e.target)) {
        picker.remove();
        document.removeEventListener('click', dismiss);
      }
    };
    setTimeout(() => document.addEventListener('click', dismiss), 10);
    document.body.appendChild(picker);
  },

  async openBookDetailsModal(book) {
    const modal = document.getElementById('book-details-modal');
    if (!modal) return;
    const body = modal.querySelector('#modal-book-content');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const coverUrl = book.cover_id ? ApiService.getCoverUrl(book.cover_id, 'L') : (book.cover_url || null);
    const fallback = ApiService.generateCoverFallback(book.title, book.author);
    const saved = StorageManager.findBook(book.id || book.key);

    body.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div class="md:col-span-5 flex flex-col items-center">
          <div class="relative w-full max-w-[260px] aspect-[2/3] rounded-lg overflow-hidden shadow-2xl border-2 border-[#c5a059]/40 bg-[#120d0b]">
            <img 
              src="${coverUrl || fallback}" 
              alt="${escapeHtml(book.title)}"
              onerror="this.onerror=null; this.src='${fallback}';"
              class="w-full h-full object-cover"
            />
            <div class="book-spine-glow"></div>
          </div>

          <div class="w-full max-w-[260px] mt-6 bg-[#1a1410] border border-[#c5a059]/30 rounded-lg p-3">
            <label class="block font-serif text-xs uppercase tracking-wider text-[#a89984] mb-2 font-semibold">
              <i class="fa-solid fa-bookmark text-[#d4af37] mr-1"></i> Shelf Placement
            </label>
            <select id="modal-shelf-select" class="w-full bg-[#120d0b] border border-[#c5a059]/40 rounded px-3 py-2 text-xs font-serif text-[#f4ebd9] focus:outline-none focus:border-[#d4af37]">
              <option value="none" ${!saved ? 'selected' : ''}>Not on your bookshelf</option>
              <option value="want-to-read" ${saved?.shelf === 'want-to-read' ? 'selected' : ''}>Want to Read</option>
              <option value="currently-reading" ${saved?.shelf === 'currently-reading' ? 'selected' : ''}>Currently Reading</option>
              <option value="finished" ${saved?.shelf === 'finished' ? 'selected' : ''}>Finished</option>
            </select>
          </div>

          ${saved && saved.shelf === 'currently-reading' ? `
            <div class="w-full max-w-[260px] mt-3 bg-[#1e1713] border border-[#c5a059]/30 rounded-lg p-3">
              <div class="flex justify-between items-center text-xs font-serif text-[#e8dec8] mb-1.5">
                <span>Reading Progress</span>
                <span class="text-[#d4af37] font-bold">${Math.round((saved.currentPage / saved.pages) * 100)}%</span>
              </div>
              <div class="w-full h-2 bg-[#120d0b] rounded-full overflow-hidden border border-[#c5a059]/20">
                <div class="h-full bg-gradient-to-r from-[#9b7834] to-[#f4d175] transition-all" style="width: ${Math.round((saved.currentPage / saved.pages) * 100)}%"></div>
              </div>
              <p class="text-[11px] text-[#9a8973] mt-1.5">Page ${saved.currentPage} of ${saved.pages}</p>
            </div>
          ` : ''}
        </div>

        <div class="md:col-span-7 flex flex-col gap-4">
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded text-[10px] font-serif uppercase tracking-widest text-[#d4af37] bg-[#2a2019] border border-[#c5a059]/30 mb-2">
              The Midnight Archives
            </span>
            <h2 class="font-serif text-2xl md:text-3xl font-bold text-[#f5eedc] leading-tight">
              ${escapeHtml(book.title)}
            </h2>
            <p class="font-serif italic text-base text-[#c5a059] mt-1">
              By ${escapeHtml(book.author || 'Unknown Author')}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 text-xs font-serif text-[#a89984]">
            <span class="px-2.5 py-1 bg-[#1a1410] border border-[#c5a059]/20 rounded">
              <i class="fa-regular fa-calendar-check text-[#d4af37] mr-1.5"></i> ${book.first_publish_year || 'Classic Era'}
            </span>
            ${book.number_of_pages_median ? `
              <span class="px-2.5 py-1 bg-[#1a1410] border border-[#c5a059]/20 rounded">
                <i class="fa-regular fa-file-lines text-[#d4af37] mr-1.5"></i> Approx. ${book.number_of_pages_median} pages
              </span>
            ` : ''}
          </div>

          <div class="bg-[#140f0c] p-4 rounded-lg border border-[#c5a059]/20">
            <h4 class="font-serif text-xs uppercase tracking-wider text-[#a08f75] font-semibold mb-2 flex items-center gap-2">
              <i class="fa-solid fa-scroll text-[#d4af37]"></i> Synopsis & Scholar's Notes
            </h4>
            <div id="modal-synopsis-content" class="text-xs md:text-sm text-[#d8cebe] leading-relaxed font-serif max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              <div class="flex items-center gap-2 text-[#9a8973] py-4">
                <i class="fa-solid fa-spinner fa-spin text-[#d4af37]"></i>
                <span>Retrieving synopsis from Open Library...</span>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 pt-3 border-t border-[#c5a059]/20 mt-2">
            <button id="modal-btn-journal" class="px-4 py-2 rounded font-serif text-xs uppercase tracking-wider bg-[#241a14] hover:bg-[#2e221a] text-[#f4ebd9] border border-[#c5a059]/50 transition flex items-center gap-2">
              <i class="fa-solid fa-feather-pointed text-[#d4af37]"></i>
              <span>Write Journal Entry</span>
            </button>
            <button id="modal-btn-ai-discuss" class="px-4 py-2 rounded font-serif text-xs uppercase tracking-wider bg-[#322316] hover:bg-[#422e1c] text-[#f4ebd9] border border-[#d4af37]/60 transition flex items-center gap-2">
              <i class="fa-solid fa-wand-magic-sparkles text-[#d4af37]"></i>
              <span>Discuss with The Archivist</span>
            </button>
            <a id="modal-btn-openlibrary" href="https://openlibrary.org${book.key || ''}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded font-serif text-xs uppercase tracking-wider bg-[#16120f] hover:bg-[#1e1713] text-[#a89984] hover:text-[#f4ebd9] border border-[#c5a059]/20 transition flex items-center gap-2 ml-auto">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
              <span>Read on Open Library</span>
            </a>
          </div>
        </div>
      </div>
    `;

    const shelfSelect = body.querySelector('#modal-shelf-select');
    shelfSelect.onchange = () => {
      const val = shelfSelect.value;
      if (val === 'none') {
        StorageManager.removeFromBookshelf(book.id || book.key);
        UI.showToast(`Removed "${book.title}" from your bookshelf.`, 'info');
      } else {
        StorageManager.addToBookshelf(book, val);
        UI.showToast(`Placed "${book.title}" on your ${getShelfLabel(val)} shelf.`, 'success');
      }
      App.refreshView();
    };

    body.querySelector('#modal-btn-journal').onclick = () => {
      UI.closeModal(modal);
      UI.openJournalModalForBook(book);
    };

    body.querySelector('#modal-btn-ai-discuss').onclick = () => {
      UI.closeModal(modal);
      App.navigateTo('companion');
      App.sendAiMessage(`Please share your literary analysis and related recommendations for the volume "${book.title}" by ${book.author || 'an esteemed author'}.`, book);
    };

    // Load full details
    try {
      const details = await ApiService.getBookDetails(book.key || book.id);
      const synopsisEl = body.querySelector('#modal-synopsis-content');
      if (synopsisEl) {
        synopsisEl.innerHTML = `<p class="leading-relaxed whitespace-pre-line">${escapeHtml(details.description || 'No detailed synopsis recorded.')}</p>`;
      }
      if (details.openLibraryUrl) {
        const link = body.querySelector('#modal-btn-openlibrary');
        if (link) link.href = details.openLibraryUrl;
      }
    } catch {
      const synopsisEl = body.querySelector('#modal-synopsis-content');
      if (synopsisEl) synopsisEl.innerHTML = `<p class="text-[#a08f75] italic">Synopsis unavailable in offline cache.</p>`;
    }
  },

  openProgressModal(book) {
    const modal = document.getElementById('progress-modal');
    if (!modal) return;
    const saved = StorageManager.findBook(book.id || book.key);
    if (!saved) return;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    modal.querySelector('#progress-book-title').textContent = saved.title;
    const curIn = modal.querySelector('#progress-current-page');
    const totIn = modal.querySelector('#progress-total-pages');
    curIn.value = saved.currentPage || 0;
    totIn.value = saved.pages || 320;

    modal.querySelector('#progress-save-btn').onclick = () => {
      StorageManager.updateProgress(saved.id, curIn.value, totIn.value);
      UI.showToast(`Updated progress for "${saved.title}".`, 'success');
      UI.closeModal(modal);
      App.refreshView();
    };
  },

  openJournalModal(entry = null) {
    const modal = document.getElementById('journal-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const form = modal.querySelector('#journal-form');
    form.reset();

    const bookSelect = modal.querySelector('#journal-book-select');
    const books = StorageManager.getBookshelf();
    bookSelect.innerHTML = `<option value="">-- Choose from your Bookshelf (Optional) --</option>${books.map(b => `<option value="${b.id}">${escapeHtml(b.title)} (${escapeHtml(b.author)})</option>`).join('')}`;

    const titleIn = modal.querySelector('#journal-book-title');
    const authorIn = modal.querySelector('#journal-book-author');
    const dateIn = modal.querySelector('#journal-entry-date');
    const ratingIn = modal.querySelector('#journal-rating');
    const quotesIn = modal.querySelector('#journal-quotes');
    const reflIn = modal.querySelector('#journal-reflections');
    const tagsIn = modal.querySelector('#journal-tags');
    const idIn = modal.querySelector('#journal-entry-id');

    dateIn.value = new Date().toISOString().split('T')[0];

    bookSelect.onchange = () => {
      const b = books.find(x => x.id === bookSelect.value);
      if (b) {
        titleIn.value = b.title;
        authorIn.value = b.author;
      }
    };

    if (entry) {
      modal.querySelector('#journal-modal-title').textContent = 'Edit Journal Entry';
      idIn.value = entry.id;
      titleIn.value = entry.bookTitle;
      authorIn.value = entry.bookAuthor;
      dateIn.value = entry.date;
      ratingIn.value = entry.rating;
      quotesIn.value = entry.favoriteQuotes || '';
      reflIn.value = entry.reflections || '';
      tagsIn.value = (entry.tags || []).join(', ');
      if (entry.bookId) bookSelect.value = entry.bookId;
    } else {
      modal.querySelector('#journal-modal-title').textContent = 'Pen New Journal Entry';
      idIn.value = '';
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      StorageManager.saveJournalEntry({
        id: idIn.value || undefined,
        bookId: bookSelect.value || '',
        bookTitle: titleIn.value.trim() || 'Untitled Musings',
        bookAuthor: authorIn.value.trim() || 'Anonymous',
        date: dateIn.value,
        rating: parseInt(ratingIn.value, 10) || 5,
        favoriteQuotes: quotesIn.value.trim(),
        reflections: reflIn.value.trim(),
        tags: tagsIn.value.split(',').map(t => t.trim()).filter(Boolean)
      });
      UI.showToast('Journal entry etched into the archives.', 'success');
      UI.closeModal(modal);
      App.refreshView();
    };
  },

  openJournalModalForBook(book) {
    this.openJournalModal();
    const modal = document.getElementById('journal-modal');
    if (!modal) return;
    modal.querySelector('#journal-book-title').value = book.title;
    modal.querySelector('#journal-book-author').value = book.author || '';
    if (book.id) modal.querySelector('#journal-book-select').value = book.id;
  },

  openAddCustomBookModal() {
    const modal = document.getElementById('custom-book-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    const form = modal.querySelector('#custom-book-form');
    form.reset();

    form.onsubmit = (e) => {
      e.preventDefault();
      const title = modal.querySelector('#custom-title').value.trim();
      const author = modal.querySelector('#custom-author').value.trim();
      const pages = parseInt(modal.querySelector('#custom-pages').value, 10) || 300;
      const shelf = modal.querySelector('#custom-shelf').value;
      const notes = modal.querySelector('#custom-notes').value.trim();

      StorageManager.addToBookshelf({
        id: `custom_${Date.now()}`,
        title: title || 'Untitled Volume',
        author: author || 'Anonymous',
        first_publish_year: new Date().getFullYear(),
        pages,
        currentPage: shelf === 'finished' ? pages : 0,
        notes
      }, shelf);

      UI.showToast(`"${title}" shelved in personal sanctuary.`, 'success');
      UI.closeModal(modal);
      App.refreshView();
    };
  },

  closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// ------------------------------------------------------------------------------
// 5. MAIN APPLICATION CONTROLLER
// ------------------------------------------------------------------------------

const App = {
  currentSection: 'home',
  bookshelfFilter: 'all',
  bookshelfView: 'shelf',
  journalFilter: '',
  aiHistory: [],
  searchState: { query: '', type: 'all', page: 1, hasMore: false },

  init() {
    StorageManager.init();
    this.setupNavigation();
    this.setupSearch();
    this.setupCategories();
    this.setupBookshelf();
    this.setupTracker();
    this.setupJournal();
    this.setupCompanion();
    this.setupModals();
    this.setupParticles();

    // Render Home Showcase
    this.renderHome();

    // Handle hash route
    const hash = window.location.hash.replace('#', '') || 'home';
    this.navigateTo(hash);
  },

  setupNavigation() {
    document.querySelectorAll('[data-section]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo(el.dataset.section);
        const drawer = document.getElementById('mobile-drawer');
        if (drawer) drawer.classList.add('hidden');
      });
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('close-mobile-drawer');

    if (mobileBtn && drawer) mobileBtn.onclick = () => drawer.classList.remove('hidden');
    if (closeBtn && drawer) closeBtn.onclick = () => drawer.classList.add('hidden');

    const ambienceBtn = document.getElementById('ambience-toggle-btn');
    if (ambienceBtn) {
      ambienceBtn.onclick = () => {
        const on = UI.toggleAmbience();
        ambienceBtn.classList.toggle('text-[#d4af37]', on);
        ambienceBtn.classList.toggle('border-[#d4af37]', on);
        const icon = ambienceBtn.querySelector('i');
        if (icon) icon.className = on ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      };
    }

    this.updateNavbarBadges();
  },

  navigateTo(sectionId) {
    const valid = ['home', 'discover', 'categories', 'bookshelf', 'tracker', 'journal', 'companion'];
    const target = valid.includes(sectionId) ? sectionId : 'home';
    this.currentSection = target;
    window.location.hash = target;

    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
    const active = document.getElementById(`section-${target}`);
    if (active) {
      active.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('[data-section]').forEach(link => {
      if (link.dataset.section === target) {
        link.classList.add('text-[#d4af37]', 'border-[#d4af37]');
        link.classList.remove('text-[#a89984]', 'border-transparent');
      } else {
        link.classList.remove('text-[#d4af37]', 'border-[#d4af37]');
        link.classList.add('text-[#a89984]', 'border-transparent');
      }
    });

    this.refreshView();
  },

  updateNavbarBadges() {
    const badge = document.getElementById('nav-bookshelf-count');
    if (badge) {
      const count = StorageManager.getBookshelf().length;
      badge.textContent = count;
      badge.classList.toggle('hidden', count === 0);
    }
  },

  refreshView() {
    this.updateNavbarBadges();
    if (this.currentSection === 'bookshelf') this.renderBookshelf();
    if (this.currentSection === 'tracker') this.renderTracker();
    if (this.currentSection === 'journal') this.renderJournal();
    if (this.currentSection === 'categories' && !this.activeSubject) this.renderCategoryCards();
  },

  renderHome() {
    // Featured Books
    const grid = document.getElementById('featured-books-grid');
    if (grid) {
      grid.innerHTML = '';
      FEATURED_BOOKS.forEach(b => grid.appendChild(UI.renderBookCard(b)));
    }

    // Daily quote
    const quoteEl = document.getElementById('daily-quote-text');
    const authorEl = document.getElementById('daily-quote-author');
    if (quoteEl && authorEl) {
      const day = Math.floor(Date.now() / 86400000);
      const item = LITERARY_QUOTES[day % LITERARY_QUOTES.length];
      quoteEl.textContent = `“${item.quote}”`;
      authorEl.textContent = `— ${item.author}`;
    }

    // Hero search
    const heroIn = document.getElementById('hero-search-input');
    const heroBtn = document.getElementById('hero-search-btn');
    const handleHero = () => {
      const q = heroIn.value.trim();
      if (!q) return;
      this.navigateTo('discover');
      const searchIn = document.getElementById('main-search-input');
      if (searchIn) {
        searchIn.value = q;
        this.executeSearch(q, 'all', 1);
      }
    };
    if (heroBtn && heroIn) {
      heroBtn.onclick = handleHero;
      heroIn.onkeydown = (e) => { if (e.key === 'Enter') handleHero(); };
    }

    document.querySelectorAll('.hero-tag-pill').forEach(pill => {
      pill.onclick = () => {
        const q = pill.dataset.query;
        this.navigateTo('discover');
        const searchIn = document.getElementById('main-search-input');
        if (searchIn) {
          searchIn.value = q;
          this.executeSearch(q, 'all', 1);
        }
      };
    });
  },

  setupSearch() {
    const searchIn = document.getElementById('main-search-input');
    const searchBtn = document.getElementById('main-search-btn');
    const typeSelect = document.getElementById('search-type-select');
    const loadMore = document.getElementById('search-load-more-btn');

    const trigger = (page = 1) => {
      const q = searchIn.value.trim();
      const type = typeSelect ? typeSelect.value : 'all';
      if (!q) {
        UI.showToast('Please enter a title, author, or subject.', 'warning');
        return;
      }
      this.executeSearch(q, type, page);
    };

    if (searchBtn && searchIn) {
      searchBtn.onclick = () => trigger(1);
      searchIn.onkeydown = (e) => { if (e.key === 'Enter') trigger(1); };
    }

    if (loadMore) {
      loadMore.onclick = () => trigger(this.searchState.page + 1);
    }

    document.querySelectorAll('.discover-tag-pill').forEach(pill => {
      pill.onclick = () => {
        searchIn.value = pill.dataset.query;
        if (typeSelect) typeSelect.value = pill.dataset.type || 'all';
        this.executeSearch(pill.dataset.query, pill.dataset.type || 'all', 1);
      };
    });
  },

  async executeSearch(query, type = 'all', page = 1) {
    const grid = document.getElementById('search-results-grid');
    const status = document.getElementById('search-status-header');
    const loadMore = document.getElementById('search-load-more-btn');
    const empty = document.getElementById('search-empty-state');

    this.searchState = { query, type, page, hasMore: false };

    if (page === 1) {
      grid.innerHTML = '';
      if (empty) empty.classList.add('hidden');
      if (status) {
        status.innerHTML = `<div class="flex items-center gap-2 text-xs font-serif text-[#c5a059]"><i class="fa-solid fa-spinner fa-spin"></i><span>Consulting Open Library archives for "${escapeHtml(query)}"...</span></div>`;
      }
      // Skeletons
      for (let i = 0; i < 8; i++) {
        const skel = document.createElement('div');
        skel.className = 'animate-pulse bg-[#1a1410] rounded-lg border border-[#c5a059]/10 h-72';
        grid.appendChild(skel);
      }
    } else if (loadMore) {
      loadMore.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Unrolling tomes...';
      loadMore.disabled = true;
    }

    try {
      const data = await ApiService.searchBooks(query, type, page);
      if (page === 1) grid.innerHTML = '';

      if (data.docs.length === 0 && page === 1) {
        if (empty) empty.classList.remove('hidden');
        if (status) status.innerHTML = `<span class="text-xs font-serif text-[#a89984]">No volumes found for "${escapeHtml(query)}".</span>`;
        if (loadMore) loadMore.classList.add('hidden');
        return;
      }

      if (status) {
        status.innerHTML = `<span class="text-xs font-serif text-[#f4ebd9]">Discovered <strong class="text-[#d4af37]">${data.numFound.toLocaleString()}</strong> volumes in Open Library archives for "${escapeHtml(query)}"</span>`;
      }

      data.docs.forEach(book => grid.appendChild(UI.renderBookCard(book)));

      this.searchState.hasMore = (page * CONFIG.ITEMS_PER_PAGE) < data.numFound;
      if (loadMore) {
        loadMore.classList.toggle('hidden', !this.searchState.hasMore);
        loadMore.innerHTML = '<span>Retrieve Further Volumes</span> <i class="fa-solid fa-chevron-down text-xs ml-2"></i>';
        loadMore.disabled = false;
      }
    } catch (e) {
      console.error(e);
      if (page === 1) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-rose-300 font-serif">Could not reach the Open Library archive. Please check your connection.</div>`;
      }
    }
  },

  setupCategories() {
    this.renderCategoryCards();
    const backBtn = document.getElementById('category-back-btn');
    if (backBtn) {
      backBtn.onclick = () => {
        this.activeSubject = null;
        document.getElementById('category-subject-view').classList.add('hidden');
        document.getElementById('category-cards-grid').classList.remove('hidden');
      };
    }
  },

  renderCategoryCards() {
    const grid = document.getElementById('category-cards-grid');
    if (!grid) return;
    grid.innerHTML = '';

    CATEGORIES.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'group relative p-6 rounded-lg bg-gradient-to-b from-[#1d1713] to-[#16110e] border border-[#c5a059]/25 hover:border-[#d4af37] shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden';
      card.innerHTML = `
        <div class="absolute top-2 right-2 text-[#c5a059]/20 group-hover:text-[#d4af37]/60 transition text-lg">
          <i class="fa-solid fa-clover"></i>
        </div>
        <div>
          <div class="w-12 h-12 rounded-full bg-[#281f19] border border-[#c5a059]/40 group-hover:border-[#d4af37] flex items-center justify-center text-[#d4af37] mb-4 group-hover:scale-110 transition duration-300 shadow">
            <i class="fa-solid ${cat.icon} text-lg"></i>
          </div>
          <span class="text-[11px] font-serif uppercase tracking-widest text-[#a89984] group-hover:text-[#c5a059] transition">
            ${escapeHtml(cat.latinSubtitle)}
          </span>
          <h3 class="font-serif text-xl font-bold text-[#f5eedc] mt-1 group-hover:text-[#f3e5ab] transition">
            ${escapeHtml(cat.name)}
          </h3>
          <p class="font-serif text-xs text-[#9e917d] mt-2.5 leading-relaxed">
            ${escapeHtml(cat.description)}
          </p>
        </div>
        <div class="pt-4 mt-4 border-t border-[#c5a059]/15 flex items-center justify-between text-xs font-serif text-[#c5a059] group-hover:text-[#d4af37] transition">
          <span class="tracking-wide">Explore Shelf</span>
          <i class="fa-solid fa-arrow-right transform group-hover:translate-x-1 transition"></i>
        </div>
      `;
      card.onclick = () => this.exploreCategory(cat);
      grid.appendChild(card);
    });
  },

  async exploreCategory(cat) {
    this.activeSubject = cat;
    const cardsGrid = document.getElementById('category-cards-grid');
    const subjectView = document.getElementById('category-subject-view');
    const titleEl = document.getElementById('category-view-title');
    const descEl = document.getElementById('category-view-desc');
    const booksGrid = document.getElementById('category-books-grid');

    cardsGrid.classList.add('hidden');
    subjectView.classList.remove('hidden');

    titleEl.textContent = `${cat.name} — ${cat.latinSubtitle}`;
    descEl.textContent = cat.description;
    booksGrid.innerHTML = '';

    for (let i = 0; i < 8; i++) {
      const skel = document.createElement('div');
      skel.className = 'animate-pulse bg-[#1a1410] rounded-lg border border-[#c5a059]/10 h-72';
      booksGrid.appendChild(skel);
    }

    try {
      const data = await ApiService.getBooksBySubject(cat.subject, 24);
      booksGrid.innerHTML = '';
      if (!data.works || data.works.length === 0) {
        booksGrid.innerHTML = `<div class="col-span-full text-center py-12 text-[#a89984] font-serif">No works cataloged on this shelf currently.</div>`;
        return;
      }
      data.works.forEach(w => booksGrid.appendChild(UI.renderBookCard(w)));
    } catch {
      booksGrid.innerHTML = `<div class="col-span-full text-center py-12 text-rose-300 font-serif">Could not retrieve subject catalog.</div>`;
    }
  },

  setupBookshelf() {
    document.querySelectorAll('[data-shelf-filter]').forEach(btn => {
      btn.onclick = () => {
        this.bookshelfFilter = btn.dataset.shelfFilter;
        document.querySelectorAll('[data-shelf-filter]').forEach(b => {
          b.classList.remove('text-[#d4af37]', 'border-[#d4af37]');
          b.classList.add('text-[#a89984]', 'border-transparent');
        });
        btn.classList.add('text-[#d4af37]', 'border-[#d4af37]');
        btn.classList.remove('text-[#a89984]', 'border-transparent');
        this.renderBookshelf();
      };
    });

    const btnWood = document.getElementById('view-toggle-shelf');
    const btnGrid = document.getElementById('view-toggle-grid');
    if (btnWood && btnGrid) {
      btnWood.onclick = () => {
        this.bookshelfView = 'shelf';
        btnWood.classList.add('bg-[#33261c]', 'text-[#d4af37]');
        btnGrid.classList.remove('bg-[#33261c]', 'text-[#d4af37]');
        this.renderBookshelf();
      };
      btnGrid.onclick = () => {
        this.bookshelfView = 'grid';
        btnGrid.classList.add('bg-[#33261c]', 'text-[#d4af37]');
        btnWood.classList.remove('bg-[#33261c]', 'text-[#d4af37]');
        this.renderBookshelf();
      };
    }

    const btnCustom = document.getElementById('btn-add-custom-book');
    if (btnCustom) btnCustom.onclick = () => UI.openAddCustomBookModal();
  },

  renderBookshelf() {
    const container = document.getElementById('bookshelf-display-area');
    const empty = document.getElementById('bookshelf-empty-state');
    if (!container) return;

    const books = StorageManager.getBooksByShelf(this.bookshelfFilter);
    const all = StorageManager.getBookshelf();

    const badgeAll = document.getElementById('shelf-badge-all');
    const badgeWant = document.getElementById('shelf-badge-want');
    const badgeReading = document.getElementById('shelf-badge-reading');
    const badgeFinished = document.getElementById('shelf-badge-finished');

    if (badgeAll) badgeAll.textContent = all.length;
    if (badgeWant) badgeWant.textContent = all.filter(b => b.shelf === 'want-to-read').length;
    if (badgeReading) badgeReading.textContent = all.filter(b => b.shelf === 'currently-reading').length;
    if (badgeFinished) badgeFinished.textContent = all.filter(b => b.shelf === 'finished').length;

    if (books.length === 0) {
      container.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');
    container.innerHTML = '';

    if (this.bookshelfView === 'shelf') {
      const chunkSize = 5;
      const chunks = [];
      for (let i = 0; i < books.length; i += chunkSize) chunks.push(books.slice(i, i + chunkSize));

      const wrap = document.createElement('div');
      wrap.className = 'space-y-12 py-4';

      chunks.forEach((chunk, idx) => {
        const tier = document.createElement('div');
        tier.className = 'relative flex flex-col';

        const row = document.createElement('div');
        row.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-end px-6 z-10';

        chunk.forEach(book => {
          const coverUrl = book.cover_id ? ApiService.getCoverUrl(book.cover_id, 'M') : (book.cover_url || null);
          const fallback = ApiService.generateCoverFallback(book.title, book.author);

          const el = document.createElement('div');
          el.className = 'group relative flex flex-col items-center cursor-pointer transform hover:-translate-y-2 transition duration-300';
          el.innerHTML = `
            <div class="absolute -top-3 right-4 z-20 w-4 h-7 ${book.shelf === 'currently-reading' ? 'bg-[#936622]' : book.shelf === 'finished' ? 'bg-[#1b4332]' : 'bg-[#3d2618]'} rounded-b shadow border-t-0 border border-[#d4af37]/40 flex items-center justify-center">
              <i class="fa-solid fa-bookmark text-[8px] text-[#f4ebd9]"></i>
            </div>
            <div class="relative w-full aspect-[2/3] max-w-[170px] rounded overflow-hidden shadow-2xl border border-[#c5a059]/40 bg-[#120d0b]">
              <img 
                src="${coverUrl || fallback}" 
                alt="${escapeHtml(book.title)}"
                onerror="this.onerror=null; this.src='${fallback}';"
                class="w-full h-full object-cover"
              />
              <div class="book-spine-glow"></div>
            </div>
            <div class="mt-2 text-center w-full max-w-[170px]">
              <h5 class="font-serif text-xs text-[#eae0cc] truncate group-hover:text-[#d4af37] transition font-medium">${escapeHtml(book.title)}</h5>
              <p class="font-serif text-[10px] text-[#8e816d] truncate italic">${escapeHtml(book.author)}</p>
            </div>
          `;
          el.onclick = () => UI.openBookDetailsModal(book);
          row.appendChild(el);
        });

        const plank = document.createElement('div');
        plank.className = 'w-full h-7 mt-2 bg-gradient-to-r from-[#211610] via-[#3a281d] to-[#211610] rounded shadow-2xl border-t-2 border-[#543b2a] border-b border-[#120d0a] flex items-center justify-between px-6';
        plank.innerHTML = `
          <div class="w-2.5 h-2.5 rounded-full bg-[#8c733e] border border-[#d4af37]/60 shadow-inner"></div>
          <div class="px-4 py-0.5 rounded bg-[#18110c] border border-[#c5a059]/40 shadow text-[9px] font-serif uppercase tracking-widest text-[#c5a059]">Sanctuary Tier ${idx + 1}</div>
          <div class="w-2.5 h-2.5 rounded-full bg-[#8c733e] border border-[#d4af37]/60 shadow-inner"></div>
        `;

        tier.appendChild(row);
        tier.appendChild(plank);
        wrap.appendChild(tier);
      });

      container.appendChild(wrap);
    } else {
      const grid = document.createElement('div');
      grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6';
      books.forEach(b => grid.appendChild(UI.renderBookCard(b)));
      container.appendChild(grid);
    }
  },

  setupTracker() {
    const editGoal = document.getElementById('tracker-edit-goal-btn');
    if (editGoal) {
      editGoal.onclick = () => {
        const cur = StorageManager.getReadingGoal();
        const next = prompt('Enter your annual reading challenge target (number of books):', cur);
        if (next !== null && parseInt(next, 10) > 0) {
          StorageManager.setReadingGoal(next);
          UI.showToast(`Reading challenge updated to ${next} books.`, 'success');
          this.renderTracker();
        }
      };
    }

    const logBtn = document.getElementById('tracker-log-session-btn');
    if (logBtn) {
      logBtn.onclick = () => {
        const books = StorageManager.getBooksByShelf('currently-reading');
        const p = prompt('How many pages did you read in your recent session?', '25');
        if (p !== null && parseInt(p, 10) > 0) {
          const num = parseInt(p, 10);
          const targetId = books.length > 0 ? books[0].id : 'general_reading';
          StorageManager.logReadingSession(targetId, num, 'Reading hour');
          if (books.length > 0) {
            StorageManager.updateProgress(targetId, (books[0].currentPage || 0) + num);
          }
          UI.showToast(`Logged reading session of ${num} pages.`, 'success');
          this.renderTracker();
        }
      };
    }
  },

  renderTracker() {
    const stats = StorageManager.getReadingStats();

    const goalEl = document.getElementById('tracker-stat-goal');
    const finEl = document.getElementById('tracker-stat-finished-year');
    const pctEl = document.getElementById('tracker-stat-percent');
    const barEl = document.getElementById('tracker-progress-bar');

    if (goalEl) goalEl.textContent = stats.goal;
    if (finEl) finEl.textContent = stats.finishedThisYear;
    if (pctEl) pctEl.textContent = `${stats.progressPercent}%`;
    if (barEl) barEl.style.width = `${stats.progressPercent}%`;

    const totalB = document.getElementById('tracker-total-books');
    const totalP = document.getElementById('tracker-total-pages');
    const curR = document.getElementById('tracker-currently-reading');

    if (totalB) totalB.textContent = stats.finishedCount;
    if (totalP) totalP.textContent = stats.totalPagesRead.toLocaleString();
    if (curR) curR.textContent = stats.currentlyReadingCount;

    // Active books list
    const activeList = document.getElementById('tracker-active-books-list');
    if (activeList) {
      activeList.innerHTML = '';
      const reading = StorageManager.getBooksByShelf('currently-reading');

      if (reading.length === 0) {
        activeList.innerHTML = `
          <div class="p-6 text-center bg-[#181310] border border-[#c5a059]/20 rounded-lg font-serif text-xs text-[#a89984]">
            No volumes currently open on your lectern.
          </div>
        `;
      } else {
        reading.forEach(b => {
          const pct = Math.min(100, Math.round(((b.currentPage || 0) / (b.pages || 320)) * 100));
          const el = document.createElement('div');
          el.className = 'p-4 rounded-lg bg-[#191310] border border-[#c5a059]/30 shadow flex flex-col sm:flex-row gap-4 items-center justify-between';
          el.innerHTML = `
            <div class="flex items-center gap-3.5 w-full sm:w-auto">
              <div class="w-12 h-16 rounded overflow-hidden shadow border border-[#c5a059]/30 bg-[#120d0b] flex-shrink-0">
                <img 
                  src="${b.cover_id ? ApiService.getCoverUrl(b.cover_id, 'S') : ApiService.generateCoverFallback(b.title, b.author)}" 
                  alt="${escapeHtml(b.title)}" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h5 class="font-serif font-bold text-sm text-[#f5eedc] line-clamp-1">${escapeHtml(b.title)}</h5>
                <p class="font-serif italic text-xs text-[#a89984]">${escapeHtml(b.author)}</p>
                <div class="flex items-center gap-2 mt-1.5 text-xs text-[#d4af37] font-serif">
                  <span>Page ${b.currentPage || 0} of ${b.pages || 320}</span>
                  <span>•</span>
                  <span>${pct}% Complete</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button class="btn-quick-10 px-3 py-1.5 text-xs font-serif rounded bg-[#261d17] hover:bg-[#32261e] border border-[#c5a059]/30 text-[#e8dec8] transition">+10 Pages</button>
              <button class="btn-open-prog px-3 py-1.5 text-xs font-serif rounded bg-[#3d2c1c] hover:bg-[#4d3824] border border-[#d4af37]/50 text-[#fff7e6] transition font-semibold">Update</button>
            </div>
          `;
          el.querySelector('.btn-quick-10').onclick = () => {
            StorageManager.updateProgress(b.id, (b.currentPage || 0) + 10);
            UI.showToast(`Turned 10 pages in "${b.title}".`, 'success');
            this.renderTracker();
          };
          el.querySelector('.btn-open-prog').onclick = () => UI.openProgressModal(b);
          activeList.appendChild(el);
        });
      }
    }

    // Sessions timeline
    const timeline = document.getElementById('tracker-sessions-timeline');
    if (timeline) {
      timeline.innerHTML = '';
      const sessions = StorageManager.getReadingSessions().slice(0, 5);
      if (sessions.length === 0) {
        timeline.innerHTML = `<p class="font-serif text-xs text-[#8e816d] italic">No reading hours logged yet.</p>`;
      } else {
        sessions.forEach(s => {
          const item = document.createElement('div');
          item.className = 'flex items-start gap-3 text-xs font-serif border-l-2 border-[#c5a059]/40 pl-3 py-1';
          item.innerHTML = `
            <div class="flex flex-col flex-grow">
              <div class="flex justify-between items-center">
                <strong class="text-[#f5eedc]">${escapeHtml(s.bookTitle)}</strong>
                <span class="text-[10px] text-[#a08f75]">${s.date}</span>
              </div>
              <span class="text-[#d4af37] font-semibold mt-0.5">+${s.pagesRead} pages recorded</span>
            </div>
          `;
          timeline.appendChild(item);
        });
      }
    }
  },

  setupJournal() {
    const penBtn = document.getElementById('journal-pen-entry-btn');
    if (penBtn) penBtn.onclick = () => UI.openJournalModal();

    const searchIn = document.getElementById('journal-search-input');
    if (searchIn) {
      searchIn.oninput = (e) => {
        this.journalFilter = e.target.value.toLowerCase().trim();
        this.renderJournal();
      };
    }
  },

  renderJournal() {
    const container = document.getElementById('journal-entries-container');
    const empty = document.getElementById('journal-empty-state');
    if (!container) return;

    let entries = StorageManager.getJournalEntries();
    if (this.journalFilter) {
      entries = entries.filter(e =>
        e.bookTitle.toLowerCase().includes(this.journalFilter) ||
        e.bookAuthor.toLowerCase().includes(this.journalFilter) ||
        (e.reflections && e.reflections.toLowerCase().includes(this.journalFilter)) ||
        (e.tags && e.tags.some(t => t.toLowerCase().includes(this.journalFilter)))
      );
    }

    if (entries.length === 0) {
      container.innerHTML = '';
      if (empty) empty.classList.remove('hidden');
      return;
    }

    if (empty) empty.classList.add('hidden');
    container.innerHTML = '';

    entries.forEach(e => {
      const card = document.createElement('div');
      card.className = 'parchment-card p-6 rounded-lg relative flex flex-col justify-between shadow-2xl transition duration-300 transform hover:-translate-y-1';
      card.innerHTML = `
        <div class="wax-seal"><i class="fa-solid fa-feather text-amber-200 text-xs"></i></div>
        <div>
          <span class="text-[10px] font-serif uppercase tracking-widest text-[#8a7251] block mb-1">
            <i class="fa-regular fa-clock mr-1"></i> Recorded on ${e.date}
          </span>
          <h3 class="font-serif text-xl font-bold text-[#2a1e17] leading-snug">${escapeHtml(e.bookTitle)}</h3>
          <p class="font-serif italic text-xs text-[#6e583e]">By ${escapeHtml(e.bookAuthor)}</p>

          <div class="flex items-center gap-1 my-3 text-[#9a783a]">
            ${Array.from({ length: 5 }).map((_, i) => `<i class="fa-solid fa-star text-xs ${i < (e.rating || 5) ? 'text-[#b8860b]' : 'text-[#8a7251]/30'}"></i>`).join('')}
          </div>

          ${e.favoriteQuotes ? `<div class="my-3 p-3 bg-[#ede2ce] border-l-2 border-[#8c733e] rounded text-xs font-serif italic text-[#3d2e23] leading-relaxed">${escapeHtml(e.favoriteQuotes)}</div>` : ''}

          <div class="text-xs font-serif text-[#382b22] leading-relaxed mt-2.5 whitespace-pre-line">${escapeHtml(e.reflections || '')}</div>

          ${e.tags && e.tags.length > 0 ? `
            <div class="flex flex-wrap gap-1.5 mt-4">
              ${e.tags.map(t => `<span class="px-2 py-0.5 rounded text-[10px] font-serif bg-[#e3d5be] text-[#5c4430] border border-[#bfa588]/60">#${escapeHtml(t)}</span>`).join('')}
            </div>
          ` : ''}
        </div>

        <div class="pt-4 mt-5 border-t border-[#bfa588]/40 flex justify-end gap-2 text-xs font-serif">
          <button class="btn-edit-e px-3 py-1 rounded bg-[#ebdcc4] hover:bg-[#dfcdb2] text-[#423224] transition"><i class="fa-solid fa-feather text-[10px] mr-1"></i>Edit</button>
          <button class="btn-del-e px-3 py-1 rounded bg-[#dfcdb2]/60 hover:bg-rose-900 hover:text-white text-rose-900 transition"><i class="fa-solid fa-trash text-[10px] mr-1"></i>Delete</button>
        </div>
      `;

      card.querySelector('.btn-edit-e').onclick = () => UI.openJournalModal(e);
      card.querySelector('.btn-del-e').onclick = () => {
        if (confirm(`Consign entry for "${e.bookTitle}" to the shadows?`)) {
          StorageManager.deleteJournalEntry(e.id);
          UI.showToast('Journal entry excised.', 'info');
          this.renderJournal();
        }
      };

      container.appendChild(card);
    });
  },

  setupCompanion() {
    const chatIn = document.getElementById('ai-chat-input');
    const sendBtn = document.getElementById('ai-send-btn');
    const clearBtn = document.getElementById('ai-clear-chat-btn');

    const handleSend = () => {
      const msg = chatIn.value.trim();
      if (!msg) return;
      chatIn.value = '';
      this.sendAiMessage(msg);
    };

    if (sendBtn && chatIn) {
      sendBtn.onclick = handleSend;
      chatIn.onkeydown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      };
    }

    if (clearBtn) {
      clearBtn.onclick = () => {
        this.aiHistory = [];
        this.renderAiChat();
        UI.showToast('Archival memory refreshed.', 'info');
      };
    }

    document.querySelectorAll('.ai-pill').forEach(pill => {
      pill.onclick = () => {
        if (pill.dataset.prompt) this.sendAiMessage(pill.dataset.prompt);
      };
    });

    this.renderAiChat();
  },

  async sendAiMessage(msg, bookContext = null) {
    const area = document.getElementById('ai-messages-area');
    if (!area) return;

    this.aiHistory.push({ role: 'user', content: msg });
    this.renderAiChat();

    // Typing skeleton
    const typing = document.createElement('div');
    typing.id = 'ai-typing';
    typing.className = 'flex items-start gap-3 py-3';
    typing.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-[#2a1f18] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] flex-shrink-0">
        <i class="fa-solid fa-wand-magic-sparkles text-xs"></i>
      </div>
      <div class="p-3.5 rounded-lg bg-[#1a1410] border border-[#c5a059]/20 font-serif text-xs text-[#c5a059] flex items-center gap-2">
        <i class="fa-solid fa-spinner fa-spin"></i>
        <span>The Archivist is consulting the eternal catalog...</span>
      </div>
    `;
    area.appendChild(typing);
    area.scrollTop = area.scrollHeight;

    try {
      const resp = await ApiService.askArchivist(msg, this.aiHistory, bookContext);
      typing.remove();
      this.aiHistory.push({
        role: 'assistant',
        content: resp.reply,
        notice: resp.notice
      });
      this.renderAiChat();
    } catch {
      typing.remove();
      this.aiHistory.push({
        role: 'assistant',
        content: 'Forgive me, the midnight mists have occluded my sight. Please address me once more.'
      });
      this.renderAiChat();
    }
  },

  renderAiChat() {
    const area = document.getElementById('ai-messages-area');
    if (!area) return;
    area.innerHTML = '';

    const welcome = document.createElement('div');
    welcome.className = 'flex items-start gap-3.5 py-2';
    welcome.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-[#2a1f18] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] flex-shrink-0 shadow">
        <i class="fa-solid fa-book-bookmark text-xs"></i>
      </div>
      <div class="p-4 rounded-lg bg-[#18120e] border border-[#c5a059]/30 max-w-2xl font-serif text-xs md:text-sm text-[#e8dec8] leading-relaxed shadow-lg">
        <p class="font-bold text-[#f5eedc] mb-1 font-serif">Welcome, scholar of the night.</p>
        <p>I am <em>The Archivist</em>, your literary companion within The Midnight Library. Inquire regarding gothic mysteries, classical tragedies, poetry, or invite me to divine your next treasured read.</p>
        <div class="flex items-center gap-2 mt-3 pt-2 border-t border-[#c5a059]/15">
          <span class="text-[10px] uppercase tracking-wider text-[#d4af37]/80 bg-[#241a13] px-2 py-0.5 rounded border border-[#c5a059]/30">
            Powered by Gemini 2.5 Flash
          </span>
          <button id="btn-configure-gemini-key" class="text-[10px] font-serif text-[#c5a059] hover:text-[#f4ebd9] transition underline ml-auto">
            <i class="fa-solid fa-key mr-1"></i> ${StorageManager.getUserGeminiKey() ? 'Update Gemini Key' : 'Enter Gemini Key'}
          </button>
        </div>
      </div>
    `;
    area.appendChild(welcome);

    const keyBtn = welcome.querySelector('#btn-configure-gemini-key');
    if (keyBtn) {
      keyBtn.onclick = () => {
        const cur = StorageManager.getUserGeminiKey();
        const next = prompt('Enter your Google Gemini API key (stored securely in your browser):', cur);
        if (next !== null) {
          StorageManager.setUserGeminiKey(next);
          UI.showToast(next.trim() ? 'Gemini API Key saved.' : 'Gemini API Key removed.', 'info');
          this.renderAiChat();
        }
      };
    }

    this.aiHistory.forEach(msg => {
      const isUser = msg.role === 'user';
      const row = document.createElement('div');
      row.className = `flex items-start gap-3.5 py-2 ${isUser ? 'flex-row-reverse' : ''}`;

      if (isUser) {
        row.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-[#3d2b1b] border border-[#c5a059]/40 flex items-center justify-center text-[#f4ebd9] flex-shrink-0">
            <i class="fa-regular fa-user text-xs"></i>
          </div>
          <div class="p-3.5 rounded-lg bg-[#2b1f16] border border-[#c5a059]/40 max-w-xl font-serif text-xs md:text-sm text-[#f5eedc] leading-relaxed">
            ${escapeHtml(msg.content)}
          </div>
        `;
      } else {
        const formatMarkdown = (txt) => {
          let s = escapeHtml(txt);
          s = s.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-[#f5eedc]"><em>$1</em></strong>');
          s = s.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#f5eedc]">$1</strong>');
          s = s.replace(/\*(.*?)\*/g, '<em class="text-[#d4af37]">$1</em>');
          return s;
        };

        row.innerHTML = `
          <div class="w-8 h-8 rounded-full bg-[#221812] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] flex-shrink-0">
            <i class="fa-solid fa-feather-pointed text-xs"></i>
          </div>
          <div class="p-4 rounded-lg bg-[#18120e] border border-[#c5a059]/30 max-w-2xl font-serif text-xs md:text-sm text-[#e8dec8] leading-relaxed">
            <div class="leading-relaxed whitespace-pre-line">${formatMarkdown(msg.content)}</div>
            ${msg.notice ? `<div class="mt-3 pt-2 border-t border-[#c5a059]/20 text-[10px] text-[#a08f75] italic flex items-center gap-1.5"><i class="fa-solid fa-circle-info text-[#c5a059]"></i><span>${escapeHtml(msg.notice)}</span></div>` : ''}
          </div>
        `;
      }

      area.appendChild(row);
    });

    area.scrollTop = area.scrollHeight;
  },

  setupModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('btn-close-modal') || e.target.closest('.btn-close-modal')) {
          UI.closeModal(modal);
        }
      };
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(m => UI.closeModal(m));
        const p = document.getElementById('shelf-picker-popover');
        if (p) p.remove();
      }
    });

    window.addEventListener('midnight:bookshelf-updated', () => this.refreshView());
    window.addEventListener('midnight:journal-updated', () => this.refreshView());
  },

  setupParticles() {
    const canvas = document.getElementById('ambience-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.onresize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.4 + 0.1,
      sy: -(Math.random() * 0.3 + 0.1),
      sx: (Math.random() - 0.5) * 0.2
    }));

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y += p.sy;
        p.x += p.sx;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    };
    loop();
  }
};

// Start application
document.addEventListener('DOMContentLoaded', () => App.init());
