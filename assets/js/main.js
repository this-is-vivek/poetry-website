// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        const themeIcon = themeToggle.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchToggle = document.getElementById('search-toggle');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Sample poems data for search (in a real Jekyll site, this would be generated)
    const poems = [
        {
            title: "Whispers of Dawn",
            excerpt: "A gentle celebration of morning's quiet beauty",
            genre: "nature",
            url: "/poems/nature/whispers-of-dawn/",
            tags: ["morning", "nature", "peaceful", "sunrise"]
        },
        {
            title: "Hearts Entwined",
            excerpt: "A passionate ode to eternal love and connection",
            genre: "romance", 
            url: "/poems/romance/hearts-entwined/",
            tags: ["love", "passion", "soulmates", "eternal"]
        },
        {
            title: "Reflections of Time",
            excerpt: "Contemplating the nature of time and presence",
            genre: "philosophy",
            url: "/poems/philosophy/reflections-of-time/",
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

    if (searchInput) {
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
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result">No poems found</div>';
            return;
        }

        const resultsHTML = results.map(poem => `
            <div class="search-result" onclick="window.location.href='${poem.url}'">
                <h4>${poem.title}</h4>
                <p>${poem.excerpt}</p>
                <div class="result-meta">
                    <span class="genre">${poem.genre}</span>
                    <span class="tags">${poem.tags.slice(0, 2).join(', ')}</span>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBox.style.display = 'none';
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });
});

// Genre Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
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
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Smooth scrolling for navigation links
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

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Reading progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const poemContent = document.querySelector('.poem-text');
    if (poemContent) {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #2c3e50);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
});

// Share functionality
function sharePoem() {
    const title = document.querySelector('.poem-title')?.textContent || 'Beautiful Poem';
    const excerpt = document.querySelector('.poem-excerpt')?.textContent || '';
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: excerpt,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback for browsers without Web Share API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showNotification('Link copied to clipboard!');
            }).catch(err => {
                console.error('Could not copy link: ', err);
                fallbackCopyToClipboard(url);
            });
        } else {
            fallbackCopyToClipboard(url);
        }
    }
}

// Print functionality
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
        console.error('Fallback: Could not copy link');
        showNotification('Could not copy link');
    }

    document.body.removeChild(textArea);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

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

// Animation keyframes (added via CSS)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .search-result {
        transition: all 0.3s ease;
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
    }

    .result-meta .genre {
        background-color: var(--secondary-color);
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
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
});