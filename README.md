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
1. Create a new GitHub repository named `poetry-website` (or your preferred name)
2. Upload all files from this project to your repository
3. Update `_config.yml` with your personal details

### 2. Configure Your Site
Edit `_config.yml`:
```yaml
title: Your Poetry Site Name
subtitle: Your Tagline
author: Your Name  
email: your-email@example.com
baseurl: "" # Leave empty for username.github.io/repository-name
url: "https://your-username.github.io" # Change to your GitHub username
```

Update social links:
```yaml
social:
  twitter: your-twitter-handle
  instagram: your-instagram-handle
  github: your-github-username
```

### 3. Enable GitHub Pages
1. Go to your repository Settings → Pages
2. Select "Deploy from a branch" 
3. Choose "gh-pages" branch (will be created automatically)
4. Click Save

### 4. Add Your Content

#### Adding Poems
Create files in the appropriate genre folders:

**Example: _poems/romance/my-poem.md**
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
**Example: _books/my-book.md**
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
│   ├── book.html              # Book layout
│   └── page.html              # Static page layout
├── _includes/                  # Reusable components
│   ├── header.html            # Site header
│   ├── footer.html            # Site footer
│   └── poem-card.html         # Poem card component
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
├── index.html                  # Homepage
└── README.md                   # Documentation
```

## ✍️ Content Workflow

### Adding New Poems

1. **Create poem file**:
   - Navigate to appropriate genre folder (e.g., `_poems/romance/`)
   - Create new `.md` file with descriptive name

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
   As we watch the day goodbye...
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

## 🎨 Customization

### Colors and Typography
Edit CSS custom properties in `assets/css/main.css`:
```css
:root {
  --primary-color: #2c3e50;
  --secondary-color: #3498db;
  --accent-color: #e74c3c;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```

### Layout Modifications
- Modify `_layouts/default.html` for site structure
- Edit `_layouts/poem.html` for poem presentation  
- Update `_includes/header.html` for navigation

### Adding New Genres
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

Then create corresponding folders in `_poems/`.

## 📱 Mobile Experience

The site is built mobile-first with:
- Touch-friendly navigation
- Readable typography on small screens
- Optimized image loading
- Progressive Web App features
- Responsive design for all devices

## 🔍 SEO & Analytics

### Built-in SEO Features
- Meta tags and structured data
- OpenGraph and Twitter Card support
- XML sitemap generation  
- RSS feed for subscribers
- Fast loading times

### Analytics Setup (Optional)
Add to `_config.yml`:
```yaml
google_analytics: UA-XXXXXXXX-X
```

### Comments Setup (Optional)
Add to `_config.yml`:
```yaml
disqus:
  shortname: your-disqus-shortname
```

## 🚀 Deployment

### Automatic Deployment
- GitHub Actions builds and deploys on every push to main
- No manual intervention required
- SSL certificate automatically provided by GitHub Pages

### Custom Domain (Optional)
1. Add `CNAME` file to repository root with your domain name
2. Configure DNS with your domain provider
3. Enable "Enforce HTTPS" in repository settings

## 📊 Performance

### Optimization Features
- Lazy loading for images
- Minified CSS and JavaScript
- Compressed assets
- CDN delivery via GitHub Pages
- Progressive enhancement

### Expected Performance
- Lighthouse Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🛠️ Development

### Local Development
```bash
# Install dependencies
bundle install

# Serve locally with live reload
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Build for Production
```bash
bundle exec jekyll build
```

## 📝 Content Guidelines

### Writing Effective Poems
- Use clear, evocative titles
- Write compelling excerpts (1-2 sentences)
- Choose relevant tags (3-5 per poem)
- Consider reading flow and line breaks
- Include publication dates for organization

### Organizing Content
- Group similar themes in same genre
- Use consistent file naming (lowercase, hyphens)
- Include variety in poem lengths
- Balance content across genres
- Add background images that complement the mood

## 🔧 Troubleshooting

### Common Issues

**Site not deploying?**
- Check GitHub Actions tab for build errors
- Ensure `_config.yml` syntax is correct
- Verify all required files are present

**Images not showing?**
- Check file paths in front matter
- Ensure images are in correct folders
- Verify image file extensions match references

**Layout broken?**
- Validate YAML front matter syntax
- Check for missing closing tags in HTML
- Ensure CSS files are properly linked

**Search not working?**
- Check that JavaScript is loading properly
- Verify poem data structure in JS file

### Getting Help
- Review Jekyll documentation: https://jekyllrb.com/docs/
- Check GitHub Pages documentation
- Open issue in this repository for specific problems

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Submit bug reports and feature requests
- Improve documentation
- Suggest enhancements
- Share your customizations

## 💖 Acknowledgments

- Inspired by YourQuote platform design
- Built with Jekyll and GitHub Pages  
- Typography by Google Fonts (Playfair Display & Inter)
- Icons from Unicode emoji set
- Color palette inspired by modern poetry websites

---

**Happy Writing! 🌟**

Transform your poetry into a beautiful digital sanctuary that readers will love to explore. This template provides everything you need to create a professional poetry website with minimal technical knowledge required.

## Sample Content

This template includes sample poems and books to demonstrate all features:

### Sample Poems
- **Romance**: "Hearts Entwined", "Sunset Romance"  
- **Nature**: "Whispers of Dawn", "Forest Sanctuary"
- **Philosophy**: "Reflections of Time", "The Meaning We Make"
- **Stories**: "The Midnight Train"

### Sample Books
- **"Echoes of the Heart"**: A romantic poetry collection
- **"Nature's Whispers"**: Poems from the natural world

Replace the sample content with your own poems and books to make the site uniquely yours!