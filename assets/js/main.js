// Visitor counter using CountAPI for global count
document.addEventListener('DOMContentLoaded', function() {
    var els = document.querySelectorAll('#visitor-count');
    if (els.length > 0) {
        fetch('https://api.countapi.xyz/update?namespace=kanika-visitors&key=global&amount=1')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(result => {
                els.forEach(function(el) {
                    el.textContent = result.value;
                });
            })
            .catch(function(error) {
                // Try to get the current value if update fails
                fetch('https://api.countapi.xyz/get?namespace=kanika-visitors&key=global')
                    .then(response => response.json())
                    .then(result => {
                        els.forEach(function(el) {
                            el.textContent = result.value;
                        });
                    })
                    .catch(function(getError) {
                        els.forEach(function(el) {
                            el.textContent = 'Error';
                        });
                        console.error('Visitor counter error:', error, getError);
                    });
            });
    } else {
        console.warn('Visitor counter element not found');
    }
});
// Dynamically set poem background image from data-image attribute
document.addEventListener('DOMContentLoaded', function() {
    var hero = document.querySelector('.poem-hero.auto-image-hero');
    if (hero && hero.dataset.image) {
        var baseurl = document.body.getAttribute('data-baseurl') || '';
        hero.style.backgroundImage = "url('" + baseurl + "/assets/images/backgrounds/" + hero.dataset.image + "')";
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center';
    }
});
// Poetry Website - Dynamic Search for ALL Poems

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initSearch();
    initGenreFilters();
});

// Global variable to store all poems data
let allPoems = [];

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

    if (!themeToggle) return;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const navTrigger = document.getElementById('nav-trigger');
    const siteNav = document.querySelector('.site-nav');

    if (navTrigger) {
        navTrigger.addEventListener('change', function() {
            if (this.checked) {
                siteNav.classList.add('nav-open');
            } else {
                siteNav.classList.remove('nav-open');
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.site-nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (navTrigger) {
                navTrigger.checked = false;
                siteNav.classList.remove('nav-open');
            }
        });
    });
}

// Dynamic Search Functionality for ALL Poems
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Load all poems data dynamically
    loadPoemsData();

    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function() {
            const isVisible = searchBox.style.display !== 'none';
            searchBox.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                searchInput.focus();
                // Show loading message while poems load
                if (allPoems.length === 0) {
                    searchResults.innerHTML = '<div class="search-result">Loading poems...</div>';
                }
            } else {
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();

            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            if (allPoems.length === 0) {
                searchResults.innerHTML = '<div class="search-result">Loading poems...</div>';
                return;
            }

            const results = searchPoems(query);
            displaySearchResults(results, query);
        });
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (searchBox && searchToggle && 
            !searchBox.contains(e.target) && 
            !searchToggle.contains(e.target)) {
            searchBox.style.display = 'none';
            if (searchInput) searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        }
    });
}

// Load all poems data from Jekyll-generated JSON
function loadPoemsData() {
    // First, try to get poems from the Jekyll-generated JSON file
    fetch(getBaseUrl() + '/poems.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('JSON file not found');
            }
            return response.json();
        })
        .then(data => {
            allPoems = data;
            console.log('Loaded', allPoems.length, 'poems for search');
        })
        .catch(error => {
            console.log('Could not load poems.json, falling back to page detection');
            // Fallback: extract poems from the current page
            extractPoemsFromPage();
        });
}

// Fallback: Extract poems from the current page
function extractPoemsFromPage() {
    const poemCards = document.querySelectorAll('.poem-card');
    allPoems = [];

    poemCards.forEach(card => {
        const titleLink = card.querySelector('h3 a, h4 a, .poem-card-title a');
        const excerpt = card.querySelector('p, .poem-card-excerpt, .poem-excerpt');
        const genreElement = card.querySelector('.genre, .poem-genre');
        const dateElement = card.querySelector('.date, time, .poem-date');

        if (titleLink) {
            allPoems.push({
                title: titleLink.textContent.trim(),
                excerpt: excerpt ? excerpt.textContent.trim() : '',
                genre: genreElement ? genreElement.textContent.trim().toLowerCase() : '',
                url: titleLink.getAttribute('href'),
                date: dateElement ? dateElement.textContent.trim() : '',
                tags: [],
                content: excerpt ? excerpt.textContent.trim() : ''
            });
        }
    });

    console.log('Extracted', allPoems.length, 'poems from page');
}

// Search through all poems
function searchPoems(query) {
    return allPoems.filter(poem => {
        // Search in title, excerpt, content, genre, and tags
        const searchFields = [
            poem.title,
            poem.excerpt,
            poem.content,
            poem.genre,
            ...(poem.tags || [])
        ].join(' ').toLowerCase();

        // Support multi-word search
        const queryWords = query.split(' ').filter(word => word.length > 0);
        return queryWords.every(word => searchFields.includes(word));
    });
}

// Display search results with highlighting
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result">No poems found for "' + escapeHtml(query) + '"</div>';
        return;
    }

    const resultsHTML = results.map(poem => {
        const highlightedTitle = highlightText(poem.title, query);
        const highlightedExcerpt = highlightText(poem.excerpt, query);

        return '<div class="search-result" onclick="navigateToPoem(\'' + poem.url + '\', event)" style="cursor: pointer;">' +
            '<h4>' + highlightedTitle + '</h4>' +
            '<p>' + highlightedExcerpt + '</p>' +
            '<div class="result-meta">' +
            '<span class="genre">' + (poem.genre.charAt(0).toUpperCase() + poem.genre.slice(1)) + '</span>' +
            (poem.date ? '<span class="date">' + poem.date + '</span>' : '') +
            '</div>' +
            '</div>';
    }).join('');

    searchResults.innerHTML = 
        '<div class="search-results-header">Found ' + results.length + ' poem' + (results.length !== 1 ? 's' : '') + '</div>' +
        resultsHTML;
}

// Navigate to poem with proper URL handling
function navigateToPoem(url, event) {
    event.preventDefault();
    event.stopPropagation();

    // Ensure URL is absolute
    if (url.startsWith('/')) {
        // URL is already absolute, use as-is
        window.location.href = url;
    } else if (url.startsWith('http')) {
        // URL is fully qualified
        window.location.href = url;
    } else {
        // URL is relative, prepend base URL
        window.location.href = getBaseUrl() + '/' + url;
    }
}

// Get the correct base URL for this site
function getBaseUrl() {
    const path = window.location.pathname;
    const segments = path.split('/');

    // For GitHub Pages project sites, the format is: /repository-name/...
    // For user sites, it's just /...
    if (segments.length > 2 && segments[1] !== '') {
        return '/' + segments[1];
    }
    return '';
}

// Highlight search terms in text
function highlightText(text, query) {
    if (!text || !query) return text;

    const queryWords = query.split(' ').filter(word => word.length > 0);
    let highlightedText = text;

    queryWords.forEach(word => {
        const regex = new RegExp('(' + escapeRegex(word) + ')', 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
    });

    return highlightedText;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Escape regex special characters
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Genre Filter Functionality
function initGenreFilters() {
    const genreButtons = document.querySelectorAll('.genre-btn');
    const poemCards = document.querySelectorAll('.poem-card');

    genreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedGenre = this.dataset.genre;

            // Update active button
            genreButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter poems
            poemCards.forEach(card => {
                const cardGenre = card.dataset.genre;
                if (selectedGenre === 'all' || cardGenre === selectedGenre) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Share functionality for poem pages
function sharePoem() {
    const title = document.querySelector('.poem-title');
    const excerpt = document.querySelector('.poem-excerpt');
    const url = window.location.href;

    const poemTitle = title ? title.textContent : 'Beautiful Poem';
    const poemExcerpt = excerpt ? excerpt.textContent : '';

    if (navigator.share) {
        navigator.share({
            title: poemTitle,
            text: poemExcerpt,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback - copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copied to clipboard!');
            }).catch(() => {
                fallbackCopyToClipboard(url);
            });
        } else {
            fallbackCopyToClipboard(url);
        }
    }
}

// Print functionality for poem pages
function printPoem() {
    window.print();
}

// Fallback copy to clipboard
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard!');
    } catch (err) {
        console.error('Could not copy link');
        showNotification('Could not copy link');
    }

    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = 
        'position: fixed;' +
        'top: 20px;' +
        'right: 20px;' +
        'background: #2c3e50;' +
        'color: white;' +
        'padding: 1rem 1.5rem;' +
        'border-radius: 8px;' +
        'z-index: 1000;' +
        'opacity: 0;' +
        'transition: opacity 0.3s ease;' +
        'box-shadow: 0 4px 12px rgba(0,0,0,0.15);';

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    // Remove notification
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add search result styling
const searchStyle = document.createElement('style');
searchStyle.textContent = `
.search-results-header {
    padding: 0.5rem 1rem;
    background-color: var(--border-color);
    font-size: 0.9rem;
    color: var(--text-light);
    border-bottom: 1px solid var(--border-color);
}

.search-result:hover {
    background-color: var(--border-color);
    transform: translateX(5px);
}

.search-result h4 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.search-result p {
    color: var(--text-light);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.result-meta {
    font-size: 0.8rem;
    color: var(--text-light);
    display: flex;
    gap: 1rem;
    align-items: center;
}

.result-meta .genre {
    background-color: var(--secondary-color);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
}

.result-meta .date {
    opacity: 0.7;
}

mark {
    background-color: #ffeb3b;
    color: #333;
    padding: 1px 2px;
    border-radius: 2px;
}

[data-theme="dark"] mark {
    background-color: #ff9800;
    color: #fff;
}
`;
document.head.appendChild(searchStyle);document.addEventListener('DOMContentLoaded', function() {
    const poemTexts = document.querySelectorAll('.poem-text');
    
    poemTexts.forEach(poemText => {
        let content = poemText.innerHTML;
        
        // Check if content contains Bengali characters and | symbols
        const hasBengali = /[\u0980-\u09FF]/.test(content);
        const hasPipeSymbol = content.includes('|');
        
        if (hasBengali && hasPipeSymbol) {
            // Add Bengali class for styling
            poemText.classList.add('bengali');
            
            // Convert | to line breaks in Bengali poems
            content = content.replace(/\s*\|\s*/g, '<br>');
            poemText.innerHTML = content;
            
            console.log('Applied Bengali formatting to poem');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const poemTexts = document.querySelectorAll('.poem-text');
    
    poemTexts.forEach(poemText => {
        let content = poemText.innerHTML;
        
        // Check if content contains Bengali characters and | symbols
        const hasBengali = /[\u0980-\u09FF]/.test(content);
        const hasPipeSymbol = content.includes('|');
        
        if (hasBengali && hasPipeSymbol) {
            // Add Bengali class for styling
            poemText.classList.add('bengali');
            
            // Convert | to line breaks in Bengali poems
            content = content.replace(/\s*\|\s*/g, '<br>');
            poemText.innerHTML = content;
            
            console.log('Applied Bengali formatting to poem');
        }
    });
});