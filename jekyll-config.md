# Jekyll Configuration Files for GitHub Pages Poetry Website

## _config.yml
```yaml
# Site settings
title: Rivers of Words
subtitle: Poetry • Stories • Reflections
description: A collection of heartfelt poetry and stories exploring love, nature, and the human experience
author: Alex Rivers
email: hello@alexrivers.com
baseurl: "/poetry-website" # Change this to your repository name
url: "https://username.github.io" # Change username to your GitHub username

# Build settings
markdown: kramdown
highlighter: rouge
permalink: /:categories/:title/
timezone: Asia/Kolkata

# Collections
collections:
  poems:
    output: true
    permalink: /:collection/:name/
  books:
    output: true
    permalink: /:collection/:name/

# Default values
defaults:
  - scope:
      path: ""
      type: "posts"
    values:
      layout: "post"
  - scope:
      path: ""
      type: "poems"
    values:
      layout: "poem"
  - scope:
      path: ""
      type: "books"
    values:
      layout: "book"

# Pagination
paginate: 6
paginate_path: "/page:num/"

# SEO settings
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
  - jekyll-paginate

# Exclude from processing
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor/bundle/
  - vendor/cache/
  - vendor/gems/
  - vendor/ruby/
  - README.md

# Genre configuration
genres:
  - romance
  - nature
  - philosophy
  - stories

# Social media
social:
  twitter: alexriverspoet
  instagram: rivers_poetry
  github: username # Change to your GitHub username

# Google Analytics (optional)
# google_analytics: UA-XXXXXXXX-X

# Disqus comments (optional)
# disqus:
#   shortname: your-disqus-shortname
```

## Gemfile
```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.3.0"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-sitemap"
gem "jekyll-seo-tag"
gem "jekyll-paginate"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# GitHub Pages
gem "github-pages", group: :jekyll_plugins
```

## Jekyll Layout Files

### _layouts/default.html
```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    {% seo %}
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="{{ "/assets/css/main.css" | relative_url }}">
    <link rel="canonical" href="{{ page.url | replace:'index.html','' | absolute_url }}">
    
    {% feed_meta %}
    
    {% if site.google_analytics %}
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '{{ site.google_analytics }}');
    </script>
    {% endif %}
</head>
<body>
    <header class="site-header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <h1 class="site-title">
                        <a href="{{ "/" | relative_url }}">{{ site.title }}</a>
                    </h1>
                    <p class="site-subtitle">{{ site.subtitle }}</p>
                </div>
                <nav class="main-nav">
                    <a href="{{ "/" | relative_url }}" class="nav-link">Home</a>
                    <a href="{{ "/genres/" | relative_url }}" class="nav-link">Genres</a>
                    <a href="{{ "/books/" | relative_url }}" class="nav-link">Books</a>
                    <a href="{{ "/about/" | relative_url }}" class="nav-link">About</a>
                </nav>
                <div class="header-controls">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                        <span class="theme-icon">🌙</span>
                    </button>
                    <button class="search-toggle" id="search-toggle" aria-label="Toggle search">
                        <span class="search-icon">🔍</span>
                    </button>
                </div>
            </div>
        </div>
    </header>

    <main class="site-content">
        {{ content }}
    </main>

    <footer class="site-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>{{ site.title }}</h3>
                    <p>{{ site.description }}</p>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="social-links">
                        {% if site.social.twitter %}
                        <a href="https://twitter.com/{{ site.social.twitter }}" target="_blank" rel="noopener">Twitter</a>
                        {% endif %}
                        {% if site.social.instagram %}
                        <a href="https://instagram.com/{{ site.social.instagram }}" target="_blank" rel="noopener">Instagram</a>
                        {% endif %}
                        <a href="{{ "/feed.xml" | relative_url }}">RSS</a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Explore</h4>
                    <nav class="footer-nav">
                        <a href="{{ "/genres/" | relative_url }}">All Genres</a>
                        <a href="{{ "/books/" | relative_url }}">Books</a>
                        <a href="{{ "/about/" | relative_url }}">About</a>
                    </nav>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; {{ "now" | date: "%Y" }} {{ site.author }}. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="{{ "/assets/js/main.js" | relative_url }}"></script>
</body>
</html>
```

### _layouts/poem.html
```html
---
layout: default
---

<article class="poem-page">
    {% if page.background_image %}
    <div class="poem-hero" style="background-image: url('{{ "/assets/images/backgrounds/" | append: page.background_image | relative_url }}');">
    {% else %}
    <div class="poem-hero poem-hero-default">
    {% endif %}
        <div class="poem-hero-overlay">
            <div class="container">
                <div class="poem-meta">
                    <span class="poem-genre">{{ page.genre | capitalize }}</span>
                    <time class="poem-date">{{ page.date | date: "%B %d, %Y" }}</time>
                </div>
                <h1 class="poem-title">{{ page.title }}</h1>
                <p class="poem-excerpt">{{ page.excerpt }}</p>
                <div class="poem-stats">
                    <span class="reading-time">{{ page.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
                    <div class="poem-tags">
                        {% for tag in page.tags %}
                        <span class="tag">{{ tag }}</span>
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="poem-content-wrapper">
        <div class="container">
            <div class="poem-content">
                <div class="poem-text">
                    {{ content }}
                </div>
                
                <div class="poem-actions">
                    <button class="btn-share" onclick="sharePoem()">Share Poem</button>
                    <button class="btn-print" onclick="printPoem()">Print</button>
                </div>
                
                <div class="poem-navigation">
                    {% assign poems = site.poems | sort: 'date' | reverse %}
                    {% for poem in poems %}
                        {% if poem.url == page.url %}
                            {% unless forloop.first %}
                                {% assign prev_poem = poems[forloop.index0 | minus: 1] %}
                            {% endunless %}
                            {% unless forloop.last %}
                                {% assign next_poem = poems[forloop.index0 | plus: 1] %}
                            {% endunless %}
                            {% break %}
                        {% endif %}
                    {% endfor %}
                    
                    <div class="nav-links">
                        {% if prev_poem %}
                        <a href="{{ prev_poem.url | relative_url }}" class="nav-link prev-link">
                            <span class="nav-label">Previous</span>
                            <span class="nav-title">{{ prev_poem.title }}</span>
                        </a>
                        {% endif %}
                        
                        {% if next_poem %}
                        <a href="{{ next_poem.url | relative_url }}" class="nav-link next-link">
                            <span class="nav-label">Next</span>
                            <span class="nav-title">{{ next_poem.title }}</span>
                        </a>
                        {% endif %}
                    </div>
                </div>
                
                <div class="related-poems">
                    <h3>Related Poems</h3>
                    <div class="related-grid">
                        {% assign related_poems = site.poems | where: "genre", page.genre | sample: 3 %}
                        {% for poem in related_poems %}
                        {% unless poem.url == page.url %}
                        <article class="poem-card">
                            <h4><a href="{{ poem.url | relative_url }}">{{ poem.title }}</a></h4>
                            <p>{{ poem.excerpt }}</p>
                            <div class="poem-meta">
                                <span class="genre">{{ poem.genre | capitalize }}</span>
                                <time>{{ poem.date | date: "%b %d" }}</time>
                            </div>
                        </article>
                        {% endunless %}
                        {% endfor %}
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>

{% if site.disqus.shortname %}
<section class="comments">
    <div class="container">
        <div id="disqus_thread"></div>
        <script>
        var disqus_config = function () {
            this.page.url = "{{ page.url | absolute_url }}";
            this.page.identifier = "{{ page.url }}";
        };
        (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://{{ site.disqus.shortname }}.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
        </script>
    </div>
</section>
{% endif %}

<script>
function sharePoem() {
    if (navigator.share) {
        navigator.share({
            title: '{{ page.title }}',
            text: '{{ page.excerpt }}',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

function printPoem() {
    window.print();
}
</script>
```

### _layouts/book.html
```html
---
layout: default
---

<article class="book-page">
    <div class="book-hero">
        <div class="container">
            <div class="book-header">
                {% if page.cover_image %}
                <div class="book-cover">
                    <img src="{{ "/assets/images/books/" | append: page.cover_image | relative_url }}" 
                         alt="{{ page.title }} book cover">
                </div>
                {% endif %}
                <div class="book-info">
                    <h1 class="book-title">{{ page.title }}</h1>
                    <p class="book-subtitle">{{ page.subtitle }}</p>
                    <div class="book-meta">
                        <span class="pages">{{ page.pages }} pages</span>
                        <span class="isbn">ISBN: {{ page.isbn }}</span>
                        <time class="publish-date">Published {{ page.publish_date | date: "%B %Y" }}</time>
                    </div>
                    <p class="book-description">{{ page.description }}</p>
                    
                    <div class="purchase-links">
                        {% if page.purchase_links.amazon %}
                        <a href="{{ page.purchase_links.amazon }}" class="btn btn-primary" target="_blank" rel="noopener">
                            Buy on Amazon
                        </a>
                        {% endif %}
                        {% if page.purchase_links.local %}
                        <a href="{{ page.purchase_links.local }}" class="btn btn-secondary" target="_blank" rel="noopener">
                            Local Bookstore
                        </a>
                        {% endif %}
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="book-content">
        <div class="container">
            {{ content }}
        </div>
    </div>
</article>
```

## Sample Collection Files

### _poems/romance/hearts-entwined.md
```markdown
---
layout: poem
title: "Hearts Entwined"
genre: romance
date: 2025-09-12
excerpt: "A passionate ode to eternal love and connection"
background_image: "hearts-entwined.jpg"
tags: [love, passion, soulmates, eternal]
---

In your eyes I find my home,
A place where love resides,
Two souls dancing as one,
Where passion never hides.

Your touch ignites my spirit,
Your voice calms every storm,
In this embrace eternal,
Our love takes perfect form.
```

### _poems/nature/whispers-of-dawn.md
```markdown
---
layout: poem
title: "Whispers of Dawn"
genre: nature
date: 2025-09-13
excerpt: "A gentle celebration of morning's quiet beauty"
background_image: "whispers-dawn.jpg"
tags: [morning, nature, peaceful, sunrise]
---

Morning dew kisses the earth,
Sunlight dances through leaves,
A symphony of awakening,
As nature gently breathes.

Golden rays pierce the mist,
Birds sing their morning song,
The world comes alive again,
Where peaceful moments belong.
```

### _poems/philosophy/reflections-of-time.md
```markdown
---
layout: poem
title: "Reflections of Time"
genre: philosophy
date: 2025-09-11
excerpt: "Contemplating the nature of time and presence"
tags: [time, wisdom, present, life]
---

Time flows like a river,
Carrying dreams and tears,
Each moment a precious gem,
Collected through the years.

We chase tomorrow's promise,
While yesterday fades away,
But wisdom lies in knowing,
Today is here to stay.
```

### _books/echoes-of-the-heart.md
```markdown
---
layout: book
title: "Echoes of the Heart"
subtitle: "A Collection of Romantic Poetry"
description: "A collection of romantic poetry exploring love, loss, and healing through the journey of the human heart."
isbn: "978-0-123456-78-9"
pages: 120
publish_date: 2024-05-15
cover_image: "echoes-heart-cover.jpg"
purchase_links:
  amazon: "https://amazon.com/echoes-heart"
  local: "https://localbookstore.com/echoes-heart"
---

## About This Collection

*Echoes of the Heart* takes readers on an emotional journey through the many faces of love. From the butterflies of new romance to the deep comfort of lasting partnership, from the pain of heartbreak to the healing power of self-love, these poems explore the full spectrum of human connection.

### Sample Poems

**"First Kiss"**
*A tender moment captured in verse...*

**"After the Storm"**
*Finding peace after heartbreak...*

**"Growing Old Together"**
*Celebrating lasting love...*

### Reviews

*"A beautiful exploration of love in all its forms. Each poem feels like a personal letter to the heart."* - Poetry Review Magazine

*"Rivera's writing captures the essence of human emotion with remarkable clarity and grace."* - Literary Quarterly

### Excerpt

> In quiet moments between heartbeats,
> Love writes its poetry on our souls,
> Each line a memory, each stanza
> A chapter in our shared story...
```

## Page Templates

### pages/about.html
```html
---
layout: default
title: About
permalink: /about/
---

<div class="about-page">
    <div class="about-hero">
        <div class="container">
            <div class="about-header">
                <div class="author-image">
                    <img src="{{ "/assets/images/author/profile.jpg" | relative_url }}" alt="{{ site.author }}">
                </div>
                <div class="author-info">
                    <h1>{{ site.author }}</h1>
                    <p class="author-tagline">Poet • Storyteller • Dreamer</p>
                    <div class="social-links">
                        {% if site.social.twitter %}
                        <a href="https://twitter.com/{{ site.social.twitter }}" target="_blank" rel="noopener">Twitter</a>
                        {% endif %}
                        {% if site.social.instagram %}
                        <a href="https://instagram.com/{{ site.social.instagram }}" target="_blank" rel="noopener">Instagram</a>
                        {% endif %}
                        <a href="mailto:{{ site.email }}">Email</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="about-content">
        <div class="container">
            <div class="content-grid">
                <section class="bio-section">
                    <h2>About Me</h2>
                    <p>I'm a passionate poet and storyteller who finds inspiration in life's quiet moments and profound connections. With over a decade of writing experience, I've published multiple collections exploring themes of love, nature, and human experience.</p>
                    
                    <p>My journey with poetry began in college, where I discovered the power of words to heal, inspire, and connect. Since then, I've been dedicated to crafting verses that speak to the heart and illuminate the beauty found in everyday moments.</p>
                    
                    <p>When I'm not writing, you'll find me hiking in nature, reading by the window with a cup of tea, or spending time with loved ones who inspire my work.</p>
                </section>
                
                <section class="journey-section">
                    <h2>Writing Journey</h2>
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="year">2020</div>
                            <div class="content">Published first poetry collection "Echoes of the Heart"</div>
                        </div>
                        <div class="timeline-item">
                            <div class="year">2022</div>
                            <div class="content">Featured in Literary Quarterly Magazine</div>
                        </div>
                        <div class="timeline-item">
                            <div class="year">2024</div>
                            <div class="content">Released "Nature's Whispers" collection</div>
                        </div>
                        <div class="timeline-item">
                            <div class="year">2025</div>
                            <div class="content">Launched this digital poetry sanctuary</div>
                        </div>
                    </div>
                </section>
            </div>
            
            <section class="contact-section">
                <h2>Let's Connect</h2>
                <p>I love hearing from readers and fellow poetry enthusiasts. Whether you want to share thoughts about a poem, discuss collaboration opportunities, or simply say hello, don't hesitate to reach out.</p>
                
                <div class="contact-methods">
                    <a href="mailto:{{ site.email }}" class="contact-link">
                        <span class="icon">📧</span>
                        <span class="text">{{ site.email }}</span>
                    </a>
                    {% if site.social.twitter %}
                    <a href="https://twitter.com/{{ site.social.twitter }}" class="contact-link" target="_blank" rel="noopener">
                        <span class="icon">🐦</span>
                        <span class="text">@{{ site.social.twitter }}</span>
                    </a>
                    {% endif %}
                </div>
            </section>
        </div>
    </div>
</div>
```

### pages/genres.html
```html
---
layout: default
title: Genres
permalink: /genres/
---

<div class="genres-page">
    <div class="page-header">
        <div class="container">
            <h1>Explore by Genre</h1>
            <p>Discover poems organized by theme and mood</p>
        </div>
    </div>
    
    <div class="genres-content">
        <div class="container">
            <div class="genre-filters">
                <button class="filter-btn active" data-genre="all">All</button>
                {% for genre in site.genres %}
                <button class="filter-btn" data-genre="{{ genre }}">{{ genre | capitalize }}</button>
                {% endfor %}
            </div>
            
            <div class="poems-grid" id="poems-grid">
                {% for poem in site.poems %}
                <article class="poem-card" data-genre="{{ poem.genre }}">
                    <div class="poem-card-content">
                        <h3><a href="{{ poem.url | relative_url }}">{{ poem.title }}</a></h3>
                        <p class="excerpt">{{ poem.excerpt }}</p>
                        <div class="poem-meta">
                            <span class="genre">{{ poem.genre | capitalize }}</span>
                            <time>{{ poem.date | date: "%b %d, %Y" }}</time>
                        </div>
                        <div class="poem-tags">
                            {% for tag in poem.tags limit:3 %}
                            <span class="tag">{{ tag }}</span>
                            {% endfor %}
                        </div>
                    </div>
                </article>
                {% endfor %}
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const poemCards = document.querySelectorAll('.poem-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.dataset.genre;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter poems
            poemCards.forEach(card => {
                if (genre === 'all' || card.dataset.genre === genre) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
</script>
```

### pages/books.html
```html
---
layout: default
title: Books
permalink: /books/
---

<div class="books-page">
    <div class="page-header">
        <div class="container">
            <h1>Published Collections</h1>
            <p>Explore my published poetry books and upcoming releases</p>
        </div>
    </div>
    
    <div class="books-content">
        <div class="container">
            <div class="books-grid">
                {% for book in site.books %}
                <article class="book-card">
                    {% if book.cover_image %}
                    <div class="book-cover">
                        <img src="{{ "/assets/images/books/" | append: book.cover_image | relative_url }}" 
                             alt="{{ book.title }} cover">
                    </div>
                    {% endif %}
                    <div class="book-info">
                        <h2><a href="{{ book.url | relative_url }}">{{ book.title }}</a></h2>
                        {% if book.subtitle %}
                        <p class="subtitle">{{ book.subtitle }}</p>
                        {% endif %}
                        <p class="description">{{ book.description }}</p>
                        <div class="book-meta">
                            <span class="pages">{{ book.pages }} pages</span>
                            <time class="publish-date">{{ book.publish_date | date: "%B %Y" }}</time>
                        </div>
                        <div class="purchase-links">
                            {% if book.purchase_links.amazon %}
                            <a href="{{ book.purchase_links.amazon }}" class="btn btn-primary" target="_blank" rel="noopener">
                                Buy on Amazon
                            </a>
                            {% endif %}
                            {% if book.purchase_links.local %}
                            <a href="{{ book.purchase_links.local }}" class="btn btn-secondary" target="_blank" rel="noopener">
                                Local Store
                            </a>
                            {% endif %}
                        </div>
                    </div>
                </article>
                {% endfor %}
            </div>
        </div>
    </div>
</div>
```

## CSS Structure (assets/css/main.css)
Your main CSS file should import the styles from the web application and add Jekyll-specific styling for collections and layouts.

## JavaScript (assets/js/main.js)
Include the interactive features from the web application and add Jekyll-specific functionality for search and filtering.

## GitHub Actions Workflow (.github/workflows/deploy.yml)
```yaml
name: Build and Deploy Jekyll Site

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
          
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4
        
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
        env:
          JEKYLL_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Setup Instructions

1. **Create a new GitHub repository** named `poetry-website` (or your preferred name)

2. **Clone the repository** and add all these files in the correct folder structure

3. **Update configuration**:
   - Change `baseurl` in `_config.yml` to match your repository name
   - Update `url` with your GitHub username
   - Add your social media handles and email

4. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch (will be created by the action)

5. **Add content**:
   - Add poems to `_poems/` folders organized by genre
   - Add book information to `_books/`
   - Add author images to `assets/images/author/`
   - Add book covers to `assets/images/books/`
   - Add poem background images to `assets/images/backgrounds/`

6. **Commit and push** - GitHub Actions will automatically build and deploy your site

## Adding New Content

### To add a new poem:
1. Create a new `.md` file in the appropriate genre folder under `_poems/`
2. Use the front matter template with title, genre, date, excerpt, tags
3. Optionally add a background image with the same name as the poem file
4. Commit to GitHub - the site will automatically rebuild

### To add a new book:
1. Create a new `.md` file in `_books/`
2. Include book metadata and purchase links
3. Add book cover image to `assets/images/books/`
4. Commit to GitHub

The site will automatically rebuild and deploy whenever you push changes to the main branch!