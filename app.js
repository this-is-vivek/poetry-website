// Sample data from the application requirements
const siteData = {
  poems: [
    {
      title: "Whispers of Dawn",
      genre: "nature",
      content: "Morning dew kisses the earth,\nSunlight dances through leaves,\nA symphony of awakening,\nAs nature gently breathes.\n\nGolden rays pierce the mist,\nBirds sing their morning song,\nThe world comes alive again,\nWhere peaceful moments belong.",
      excerpt: "A gentle celebration of morning's quiet beauty",
      tags: ["morning", "nature", "peaceful", "sunrise"],
      date: "2025-09-13",
      readingTime: 1
    },
    {
      title: "Hearts Entwined",
      genre: "romance",
      content: "In your eyes I find my home,\nA place where love resides,\nTwo souls dancing as one,\nWhere passion never hides.\n\nYour touch ignites my spirit,\nYour voice calms every storm,\nIn this embrace eternal,\nOur love takes perfect form.",
      excerpt: "A passionate ode to eternal love and connection",
      tags: ["love", "passion", "soulmates", "eternal"],
      date: "2025-09-12",
      readingTime: 1
    },
    {
      title: "Reflections of Time",
      genre: "philosophy",
      content: "Time flows like a river,\nCarrying dreams and tears,\nEach moment a precious gem,\nCollected through the years.\n\nWe chase tomorrow's promise,\nWhile yesterday fades away,\nBut wisdom lies in knowing,\nToday is here to stay.",
      excerpt: "Contemplating the nature of time and presence",
      tags: ["time", "wisdom", "present", "life"],
      date: "2025-09-11",
      readingTime: 1
    },
    {
      title: "Ocean's Lullaby",
      genre: "nature",
      content: "Waves whisper ancient secrets,\nTo shores that never sleep,\nThe moon pulls at the water,\nIn rhythms dark and deep.\n\nSalt air carries stories,\nOf sailors long since gone,\nWhile seagulls write their poems,\nIn the sky at break of dawn.",
      excerpt: "A meditation on the eternal dance of ocean and shore",
      tags: ["ocean", "moon", "eternal", "peace"],
      date: "2025-09-10",
      readingTime: 1
    },
    {
      title: "The Writer's Heart",
      genre: "stories",
      content: "In quiet corners of coffee shops,\nWhere inspiration dwells,\nThe writer sits with trembling hands,\nAnd stories yet to tell.\n\nEach word a bridge to somewhere new,\nEach line a whispered prayer,\nThat someone, somewhere, reads these words,\nAnd knows that someone cares.",
      excerpt: "An intimate look at the writer's creative process",
      tags: ["writing", "creativity", "connection", "purpose"],
      date: "2025-09-09",
      readingTime: 1
    },
    {
      title: "Autumn's Promise",
      genre: "philosophy",
      content: "In falling leaves I see the truth,\nThat letting go brings grace,\nEach season teaches us to trust,\nIn time's eternal pace.\n\nWhat seems like death is transformation,\nWhat feels like loss is gain,\nFor in the cycles of our lives,\nWe learn to love through pain.",
      excerpt: "Finding wisdom in the changing seasons of life",
      tags: ["seasons", "change", "wisdom", "growth"],
      date: "2025-09-08",
      readingTime: 1
    }
  ],
  books: [
    {
      title: "Echoes of the Heart",
      description: "A collection of romantic poetry exploring love, loss, and healing",
      isbn: "978-0-123456-78-9",
      pages: 120,
      publishDate: "2024-05-15",
      purchaseLinks: {
        amazon: "https://amazon.com/echoes-heart",
        local: "https://localbookstore.com/echoes-heart"
      },
      excerpt: "This collection takes readers on a journey through the many faces of love..."
    },
    {
      title: "Nature's Whispers",
      description: "Poems celebrating the beauty and wisdom found in the natural world",
      isbn: "978-0-123456-79-6",
      pages: 95,
      publishDate: "2024-08-22",
      purchaseLinks: {
        amazon: "https://amazon.com/natures-whispers",
        local: "https://localbookstore.com/natures-whispers"
      },
      excerpt: "From mountain peaks to ocean depths, discover the poetry in nature..."
    }
  ],
  author: {
    name: "Alex Rivers",
    bio: "A passionate poet and storyteller who finds inspiration in life's quiet moments and profound connections. With over a decade of writing experience, Alex has published multiple collections exploring themes of love, nature, and human experience.",
    socialLinks: {
      twitter: "@alexriverspoet",
      instagram: "@rivers_poetry",
      email: "hello@alexrivers.com"
    },
    writingJourney: "Started writing poetry in college, published first collection in 2020, featured in various literary magazines"
  },
  genres: ["romance", "nature", "philosophy", "stories"]
};

// Application state
let currentTheme = 'light';
let currentSection = 'home';
let currentGenreFilter = 'all';
let searchQuery = '';

// DOM Elements
let themeToggle, searchToggle, searchBar, searchInput, searchClear;
let navButtons, contentSections, poemModal, modalBackdrop, modalClose, modalPoemContent;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeDOMElements();
  initializeTheme();
  initializeNavigation();
  initializeSearch();
  initializeModal();
  populateContent();
  updateStats();
});

// Initialize DOM elements
function initializeDOMElements() {
  themeToggle = document.getElementById('theme-toggle');
  searchToggle = document.getElementById('search-toggle');
  searchBar = document.getElementById('search-bar');
  searchInput = document.getElementById('search-input');
  searchClear = document.getElementById('search-clear');
  navButtons = document.querySelectorAll('.nav-btn');
  contentSections = document.querySelectorAll('.content-section');
  poemModal = document.getElementById('poem-modal');
  modalBackdrop = document.getElementById('modal-backdrop');
  modalClose = document.getElementById('modal-close');
  modalPoemContent = document.getElementById('modal-poem-content');
}

// Theme management
function initializeTheme() {
  if (!themeToggle) return;
  
  setTheme(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
  }
}

// Navigation management
function initializeNavigation() {
  if (!navButtons) return;
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const section = btn.dataset.section;
      navigateToSection(section);
    });
  });
  
  // Footer navigation
  const footerNavLinks = document.querySelectorAll('.footer-nav a');
  footerNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;
      if (section) {
        navigateToSection(section);
      }
    });
  });
}

function navigateToSection(section) {
  currentSection = section;
  
  // Update navigation buttons
  if (navButtons) {
    navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });
  }
  
  // Update content sections
  if (contentSections) {
    contentSections.forEach(sec => {
      const shouldShow = sec.id === `${section}-section`;
      sec.classList.toggle('active', shouldShow);
      sec.style.display = shouldShow ? 'block' : 'none';
    });
  }
  
  // Close search if open
  hideSearch();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Search functionality
function initializeSearch() {
  if (!searchToggle || !searchBar || !searchInput || !searchClear) return;
  
  searchToggle.addEventListener('click', toggleSearch);
  searchInput.addEventListener('input', handleSearch);
  searchClear.addEventListener('click', clearSearch);
  
  // Close search on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideSearch();
    }
  });
}

function toggleSearch() {
  if (!searchBar) return;
  
  const isActive = searchBar.classList.contains('active');
  if (isActive) {
    hideSearch();
  } else {
    showSearch();
  }
}

function showSearch() {
  if (!searchBar || !searchInput) return;
  
  searchBar.classList.remove('hidden');
  searchBar.classList.add('active');
  setTimeout(() => {
    searchInput.focus();
  }, 300);
}

function hideSearch() {
  if (!searchBar) return;
  
  searchBar.classList.remove('active');
  setTimeout(() => {
    searchBar.classList.add('hidden');
  }, 300);
}

function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase();
  filterAndDisplayPoems();
  
  // Show/hide clear button
  if (searchClear) {
    searchClear.style.display = searchQuery ? 'block' : 'none';
  }
}

function clearSearch() {
  if (!searchInput || !searchClear) return;
  
  searchInput.value = '';
  searchQuery = '';
  searchClear.style.display = 'none';
  filterAndDisplayPoems();
}

// Modal management
function initializeModal() {
  if (!modalBackdrop || !modalClose) return;
  
  modalBackdrop.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function openPoemModal(poem) {
  if (!poemModal || !modalPoemContent) return;
  
  const readingTime = calculateReadingTime(poem.content);
  
  modalPoemContent.innerHTML = `
    <div class="poem-header">
      <h1>${poem.title}</h1>
      <div class="poem-meta">
        <span class="poem-genre">${poem.genre}</span>
        <span class="poem-date">${formatDate(poem.date)}</span>
        <span class="reading-time">${readingTime} min read</span>
      </div>
    </div>
    <div class="poem-text">${poem.content}</div>
    <div class="poem-tags">
      ${poem.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}
    </div>
    <div class="poem-actions">
      <button class="action-btn primary" onclick="sharePoem('${poem.title}')">Share</button>
      <button class="action-btn" onclick="printPoem()">Print</button>
    </div>
  `;
  
  poemModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!poemModal) return;
  
  poemModal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Content population
function populateContent() {
  populateGenreTabs();
  populatePoems();
  populateGenres();
  populateBooks();
  populateAuthorInfo();
}

function populateGenreTabs() {
  const genreTabs = document.getElementById('genre-tabs');
  if (!genreTabs) return;
  
  const allTab = genreTabs.querySelector('[data-genre="all"]');
  
  siteData.genres.forEach(genre => {
    const tab = document.createElement('button');
    tab.className = 'genre-tab';
    tab.dataset.genre = genre;
    tab.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      setGenreFilter(genre);
    });
    genreTabs.appendChild(tab);
  });
  
  if (allTab) {
    allTab.addEventListener('click', (e) => {
      e.preventDefault();
      setGenreFilter('all');
    });
  }
}

function setGenreFilter(genre) {
  currentGenreFilter = genre;
  
  // Update tab states
  const tabs = document.querySelectorAll('.genre-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.genre === genre);
  });
  
  filterAndDisplayPoems();
}

function filterAndDisplayPoems() {
  const filteredPoems = siteData.poems.filter(poem => {
    const matchesGenre = currentGenreFilter === 'all' || poem.genre === currentGenreFilter;
    const matchesSearch = !searchQuery || 
      poem.title.toLowerCase().includes(searchQuery) ||
      poem.genre.toLowerCase().includes(searchQuery) ||
      poem.tags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
      poem.excerpt.toLowerCase().includes(searchQuery);
    
    return matchesGenre && matchesSearch;
  });
  
  displayPoems(filteredPoems);
}

function populatePoems() {
  filterAndDisplayPoems();
  populateRecentPoems();
}

function displayPoems(poems) {
  const poemsGrid = document.getElementById('poems-grid');
  if (!poemsGrid) return;
  
  if (poems.length === 0) {
    poemsGrid.innerHTML = `
      <div class="no-results" style="text-align: center; padding: 2rem; grid-column: 1 / -1;">
        <h3>No poems found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    `;
    return;
  }
  
  poemsGrid.innerHTML = poems.map(poem => `
    <div class="poem-card ${poem.genre}" data-poem='${JSON.stringify(poem)}'>
      <div class="poem-card-image">
        <span>${poem.title}</span>
      </div>
      <div class="poem-card-content">
        <h3 class="poem-title">${poem.title}</h3>
        <p class="poem-excerpt">${poem.excerpt}</p>
        <div class="poem-meta">
          <span class="poem-genre">${poem.genre}</span>
          <span class="poem-date">${formatDate(poem.date)}</span>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click event listeners to poem cards
  const poemCards = poemsGrid.querySelectorAll('.poem-card');
  poemCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const poemData = JSON.parse(card.dataset.poem);
      openPoemModal(poemData);
    });
  });
}

function populateRecentPoems() {
  const recentPoems = document.getElementById('recent-poems');
  if (!recentPoems) return;
  
  const sortedPoems = [...siteData.poems].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
  
  recentPoems.innerHTML = sortedPoems.map(poem => `
    <div class="recent-poem" data-poem='${JSON.stringify(poem)}'>
      <h4 class="recent-poem-title">${poem.title}</h4>
      <p class="recent-poem-excerpt">${poem.excerpt}</p>
    </div>
  `).join('');
  
  // Add click event listeners to recent poems
  const recentPoemElements = recentPoems.querySelectorAll('.recent-poem');
  recentPoemElements.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const poemData = JSON.parse(element.dataset.poem);
      openPoemModal(poemData);
    });
  });
}

function populateGenres() {
  const genresGrid = document.getElementById('genres-grid');
  if (!genresGrid) return;
  
  const genreDescriptions = {
    romance: "Explore the many faces of love, passion, and human connection through heartfelt verses.",
    nature: "Discover the beauty and wisdom found in the natural world, from dawn to dusk.",
    philosophy: "Contemplate life's deeper meanings and universal truths through reflective poetry.",
    stories: "Narrative poems that tell tales of human experience, creativity, and connection."
  };
  
  genresGrid.innerHTML = siteData.genres.map(genre => {
    const poemCount = siteData.poems.filter(poem => poem.genre === genre).length;
    return `
      <div class="genre-card ${genre}" data-genre="${genre}">
        <div class="genre-card-header">
          <span>${genre.charAt(0).toUpperCase() + genre.slice(1)}</span>
        </div>
        <div class="genre-card-body">
          <h3 class="genre-card-title">${genre}</h3>
          <p class="genre-card-description">${genreDescriptions[genre] || 'Beautiful poetry awaits you.'}</p>
          <p class="genre-poem-count">${poemCount} poem${poemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>
    `;
  }).join('');
  
  // Add click event listeners to genre cards
  const genreCards = genresGrid.querySelectorAll('.genre-card');
  genreCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const genre = card.dataset.genre;
      navigateToGenre(genre);
    });
  });
}

function navigateToGenre(genre) {
  navigateToSection('home');
  setTimeout(() => {
    setGenreFilter(genre);
    const featuredSection = document.querySelector('.featured-section');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

function populateBooks() {
  const booksGrid = document.getElementById('books-grid');
  if (!booksGrid) return;
  
  booksGrid.innerHTML = siteData.books.map(book => `
    <div class="book-card">
      <div class="book-cover">
        <span>${book.title}</span>
      </div>
      <div class="book-info">
        <h3 class="book-title">${book.title}</h3>
        <p class="book-description">${book.description}</p>
        <div class="book-meta">
          <span>${book.pages} pages</span>
          <span>Published ${formatDate(book.publishDate)}</span>
        </div>
        <div class="book-links">
          <a href="${book.purchaseLinks.amazon}" target="_blank" class="book-link">Amazon</a>
          <a href="${book.purchaseLinks.local}" target="_blank" class="book-link">Local Store</a>
        </div>
      </div>
    </div>
  `).join('');
}

function populateAuthorInfo() {
  const authorName = document.getElementById('author-name');
  const authorBio = document.getElementById('author-bio');
  const writingJourney = document.getElementById('writing-journey-text');
  const socialLinks = document.getElementById('social-links');
  
  if (authorName) authorName.textContent = siteData.author.name;
  if (authorBio) authorBio.textContent = siteData.author.bio;
  if (writingJourney) writingJourney.textContent = siteData.author.writingJourney;
  
  if (socialLinks) {
    socialLinks.innerHTML = Object.entries(siteData.author.socialLinks).map(([platform, handle]) => {
      const url = platform === 'email' ? `mailto:${handle}` : 
                  platform === 'twitter' ? `https://twitter.com/${handle.replace('@', '')}` :
                  platform === 'instagram' ? `https://instagram.com/${handle.replace('@', '')}` : handle;
      
      return `<a href="${url}" target="_blank" class="social-link">${platform.charAt(0).toUpperCase() + platform.slice(1)}</a>`;
    }).join('');
  }
}

function updateStats() {
  const totalPoems = document.getElementById('total-poems');
  const totalGenres = document.getElementById('total-genres');
  const totalBooks = document.getElementById('total-books');
  
  if (totalPoems) totalPoems.textContent = siteData.poems.length;
  if (totalGenres) totalGenres.textContent = siteData.genres.length;
  if (totalBooks) totalBooks.textContent = siteData.books.length;
  
  // Animate counters
  animateCounters();
}

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    let current = 0;
    const increment = target / 20;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 100);
  });
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

function sharePoem(title) {
  if (navigator.share) {
    navigator.share({
      title: `${title} - Rivers of Words`,
      text: `Check out this beautiful poem: ${title}`,
      url: window.location.href
    });
  } else {
    // Fallback for browsers that don't support Web Share API
    const url = window.location.href;
    const text = `Check out this beautiful poem: ${title} - ${url}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Poem link copied to clipboard!');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Poem link copied to clipboard!');
    }
  }
}

function printPoem() {
  window.print();
}

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
        alert('Thank you for subscribing! You\'ll receive updates about new poems and collections.');
        this.reset();
      }
    });
  }
});

// Add CSS classes for enhanced styling
document.addEventListener('DOMContentLoaded', function() {
  // Add fade-in animation to cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all cards for animation
  document.querySelectorAll('.poem-card, .book-card, .genre-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Poem of the day functionality
function getPoemOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const poemIndex = dayOfYear % siteData.poems.length;
  return siteData.poems[poemIndex];
}

// Add poem of the day to homepage
document.addEventListener('DOMContentLoaded', function() {
  const poemOfTheDay = getPoemOfTheDay();
  const heroSection = document.querySelector('.hero-section .hero-content');
  
  if (heroSection && poemOfTheDay) {
    const poemOfDayElement = document.createElement('div');
    poemOfDayElement.className = 'poem-of-day';
    poemOfDayElement.innerHTML = `
      <div class="poem-of-day-content" style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 12px; backdrop-filter: blur(10px);">
        <h4 style="margin-bottom: 0.5rem; font-family: var(--font-serif);">Poem of the Day</h4>
        <h5 style="margin-bottom: 0.5rem; font-size: 1.1rem;">"${poemOfTheDay.title}"</h5>
        <p style="margin-bottom: 1rem; opacity: 0.9;">${poemOfTheDay.excerpt}</p>
        <button class="btn btn--secondary" data-poem='${JSON.stringify(poemOfTheDay)}' style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white;">
          Read Now
        </button>
      </div>
    `;
    
    heroSection.appendChild(poemOfDayElement);
    
    // Add click event to read now button
    const readNowBtn = poemOfDayElement.querySelector('.btn');
    readNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const poemData = JSON.parse(readNowBtn.dataset.poem);
      openPoemModal(poemData);
    });
  }
});

// Export functions for global access
window.openPoemModal = openPoemModal;
window.navigateToGenre = navigateToGenre;
window.sharePoem = sharePoem;
window.printPoem = printPoem;