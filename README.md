# Rivers of Words - Poetry Website

A beautiful Jekyll-powered poetry website similar to YourQuote, optimized for GitHub Pages deployment with automatic content updates and visual enhancement features.

## 🌟 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with beautiful card-based layouts
- **Genre Organization**: Poems organized by Romance, Nature, Philosophy, and Stories
- **Automatic Deployment**: Push markdown files to GitHub and site updates automatically
- **Visual Enhancement**: Background images for poems with automatic pairing
- **Search & Filter**: Find poems by title, genre, tags, or content
- **Dark/Light Mode**: User preference toggle with system detection

### Content Management
- **Jekyll Collections**: Organized poem structure by genre folders
- **Simple Adding Process**: Add `poem1.md` + optional `poem1.jpg` to auto-deploy
- **SEO Optimized**: Meta tags, structured data, social media previews
- **RSS Feed**: Automatic feed generation for subscribers

### Interactive Features
- **Social Sharing**: Native web sharing API with fallbacks
- **Print Friendly**: Optimized CSS for printing poems
- **Related Poems**: Smart suggestions based on genre and tags
- **Reading Time**: Automatic estimation for each poem
- **Comments**: Disqus integration (optional)

## 🚀 Quick Start

### 1. Setup Repository
```bash
# Create and clone your repository
git clone https://github.com/YOUR-USERNAME/poetry-website.git
cd poetry-website

# Copy all files from this project
# Update _config.yml with your details
```

### 2. Configure Your Site
Edit `_config.yml`:
```yaml
title: Your Poetry Site Name
subtitle: Your Tagline
author: Your Name
email: your-email@example.com
baseurl: "/your-repo-name"
url: "https://your-username.github.io"
```

Update social links:
```yaml
social:
  twitter: your-twitter-handle
  instagram: your-instagram-handle
  github: your-github-username
```

### 3. Enable GitHub Pages
1. Go to your repository Settings
2. Navigate to Pages section
3. Select "Deploy from a branch"
4. Choose "gh-pages" branch (created automatically by GitHub Actions)

### 4. Add Content

#### Adding Poems
Create files in the appropriate genre folders:

**_poems/romance/my-poem.md**
```markdown
---
layout: poem
title: "My Beautiful Poem"
genre: romance
date: 2025-09-13
excerpt: "A short description of your poem"
background_image: "my-poem.jpg"  # optional
tags: [love, heart, emotion]
---

Your poem content here
Line by line
Stanza by stanza
```

#### Adding Books
**_books/my-book.md**
```markdown
---
layout: book
title: "My Poetry Collection"
subtitle: "A Collection of Heartfelt Verses"
description: "Description of your book"
isbn: "978-0-123456-78-9"
pages: 120
publish_date: 2024-05-15
cover_image: "my-book-cover.jpg"
purchase_links:
  amazon: "https://amazon.com/my-book"
  local: "https://localbookstore.com/my-book"
---

Book content and excerpts here...
```

### 5. Add Images
- **Author photo**: `assets/images/author/profile.jpg`
- **Book covers**: `assets/images/books/book-cover.jpg`
- **Poem backgrounds**: `assets/images/backgrounds/poem-bg.jpg`

## 📁 Project Structure

```
poetry-website/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Page templates
│   ├── default.html           # Base layout
│   ├── poem.html              # Individual poem layout
│   └── book.html              # Book layout
├── _includes/                  # Reusable components
│   ├── head.html              # HTML head section
│   ├── header.html            # Site header
│   └── footer.html            # Site footer
├── _poems/                     # Poem collections
│   ├── romance/               # Romance poems
│   ├── nature/                # Nature poems
│   ├── philosophy/            # Philosophy poems
│   └── stories/               # Short stories
├── _books/                     # Book collection
├── pages/                      # Static pages
│   ├── about.html             # About page
│   ├── genres.html            # Genre browser
│   └── books.html             # Books showcase
├── assets/                     # Static assets
│   ├── css/main.css           # Styles
│   ├── js/main.js             # JavaScript
│   └── images/                # Images
│       ├── author/            # Author photos
│       ├── books/             # Book covers
│       └── backgrounds/       # Poem backgrounds
├── .github/workflows/          # GitHub Actions
│   └── deploy.yml             # Auto-deployment
├── Gemfile                     # Ruby dependencies
└── README.md                   # Documentation
```

## ✍️ Content Workflow

### Adding New Poems

1. **Create poem file**:
   ```bash
   # Navigate to appropriate genre folder
   cd _poems/romance/
   
   # Create new poem file
   touch sunset-love.md
   ```

2. **Add front matter and content**:
   ```markdown
   ---
   layout: poem
   title: "Sunset Love"
   genre: romance
   date: 2025-09-13
   excerpt: "Love painted in golden hues"
   background_image: "sunset-love.jpg"
   tags: [sunset, love, golden, romantic]
   ---
   
   Golden rays embrace the sky,
   As we watch the day goodbye,
   Hand in hand, heart to heart,
   Love's masterpiece, a work of art.
   ```

3. **Add background image** (optional):
   - Add `assets/images/backgrounds/sunset-love.jpg`
   - Or let the system use a default based on genre

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add new poem: Sunset Love"
   git push origin main
   ```

5. **Site updates automatically** via GitHub Actions!

### Image Handling Options

**Option A - Manual Upload**:
- Upload matching `.jpg` file with same name as poem
- `sunset-love.md` + `sunset-love.jpg` = automatic pairing

**Option B - Automatic Generation** (Advanced):
- GitHub Actions can fetch relevant images from Unsplash API
- Based on poem content and genre
- Configure in `.github/workflows/images.yml`

## 🎨 Customization

### Colors and Typography
Edit CSS custom properties in `assets/css/main.css`:
```css
:root {
  --color-primary: #2c3e50;
  --color-secondary: #3498db;
  --color-accent: #e74c3c;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```

### Layout Modifications
- Modify `_layouts/default.html` for site structure
- Edit `_layouts/poem.html` for poem presentation
- Update `_includes/header.html` for navigation

### Genre Configuration
Add new genres in `_config.yml`:
```yaml
genres:
  - romance
  - nature
  - philosophy
  - stories
  - humor      # New genre
  - spiritual  # New genre
```

## 📱 Mobile Experience

The site is built mobile-first with:
- Touch-friendly navigation
- Readable typography on small screens
- Optimized image loading
- Progressive Web App features
- Offline reading capability (planned)

## 🔍 SEO & Analytics

### Built-in SEO Features
- Meta tags and structured data
- OpenGraph and Twitter Card support
- XML sitemap generation
- RSS feed for subscribers
- Fast loading times

### Analytics Setup
Add to `_config.yml`:
```yaml
google_analytics: UA-XXXXXXXX-X
```

### Comments Setup
Add to `_config.yml`:
```yaml
disqus:
  shortname: your-disqus-shortname
```

## 🚀 Deployment

### Automatic Deployment
- GitHub Actions builds and deploys on every push to main
- No manual intervention required
- SSL certificate automatically provided

### Custom Domain (Optional)
1. Add `CNAME` file with your domain
2. Configure DNS with your provider
3. Enable "Enforce HTTPS" in repository settings

## 📊 Performance

### Optimization Features
- Lazy loading for images
- Minified CSS and JavaScript
- Compressed assets
- CDN delivery via GitHub Pages
- Progressive enhancement

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🛠️ Development

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Build for Production
```bash
bundle exec jekyll build
```

## 📝 Content Guidelines

### Writing Poems
- Use clear, evocative titles
- Write compelling excerpts (1-2 sentences)
- Choose relevant tags (3-5 per poem)
- Consider reading flow and line breaks
- Add publication dates

### Organizing Content
- Group similar themes in same genre
- Use consistent file naming (lowercase, hyphens)
- Include variety in poem lengths
- Balance content across genres

## 🔧 Troubleshooting

### Common Issues

**Site not deploying?**
- Check GitHub Actions tab for build errors
- Ensure `_config.yml` syntax is correct
- Verify all required files are present

**Images not showing?**
- Check file paths in front matter
- Ensure images are in correct folders
- Verify image file extensions match

**Layout broken?**
- Validate YAML front matter
- Check for missing closing tags
- Ensure CSS files are properly linked

### Getting Help
- Check Jekyll documentation
- Review GitHub Pages documentation
- Open issue in this repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💖 Acknowledgments

- Inspired by YourQuote platform
- Built with Jekyll and GitHub Pages
- Typography by Google Fonts
- Icons from Unicode emoji set

---

**Happy Writing! 🌟**

Transform your poetry into a beautiful digital sanctuary that readers will love to explore.