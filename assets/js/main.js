// Poetry Website - Fixed JavaScript for GitHub Pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initThemeToggle();
    initMobileMenu();
    initSearch();
    initGenreFilters();
});

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

// Search Functionality
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Sample poems data for search
    const poems = [
        {
            title: "Hearts Entwined",
            excerpt: "A passionate ode to eternal love and connection",
            genre: "romance",
            url: "/poems/hearts-entwined/",
            tags: ["love", "passion", "soulmates", "eternal"]
        },
        {
            title: "Whispers of Dawn",
            excerpt: "A gentle celebration of morning's quiet beauty",
            genre: "nature",
            url: "/poems/whispers-of-dawn/",
            tags: ["morning", "nature", "peaceful", "sunrise"]
        },
        {
            title: "Reflections of Time",
            excerpt: "Contemplating the nature of time and presence",
            genre: "philosophy",
            url: "/poems/reflections-of-time/",
            tags: ["time", "wisdom", "present", "life"]
        }
    ];

    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function() {
            const isVisible = searchBox.style.display !== 'none';
            searchBox.style.display = isVisible ? 'none' : 'block';
            if (!isVisible) {
                searchInput.focus();
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

            const results = poems.filter(poem => 
                poem.title.toLowerCase().includes(query) ||
                poem.excerpt.toLowerCase().includes(query) ||
                poem.genre.toLowerCase().includes(query) ||
                poem.tags.some(tag => tag.toLowerCase().includes(query))
            );

            displaySearchResults(results);
        });
    }

    function displaySearchResults(results) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result">No poems found</div>';
            return;
        }

        const resultsHTML = results.map(poem => 
            '<div class="search-result" onclick="window.location.href=\'' + poem.url + '\'">' +
            '<h4>' + poem.title + '</h4>' +
            '<p>' + poem.excerpt + '</p>' +
            '<div class="result-meta">' +
            '<span class="genre">' + poem.genre + '</span>' +
            '</div>' +
            '</div>'
        ).join('');

        searchResults.innerHTML = resultsHTML;
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