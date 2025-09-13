# Poetry Website - FIXED VERSION

A Jekyll-powered poetry website that works reliably on GitHub Pages.

## 🚨 FIXES APPLIED TO RESOLVE COMMON ISSUES

This version addresses the common problems that cause Jekyll sites to break on GitHub Pages:

### ✅ Fixed Issues:
- **CSS not loading** - Fixed file paths with proper `relative_url` filters
- **JavaScript errors** - Simplified JS to avoid compatibility issues  
- **Liquid syntax errors** - Fixed all template syntax and removed problematic code
- **Baseurl configuration** - Proper setup for GitHub Pages project sites
- **Front matter errors** - Added proper YAML front matter to all files
- **Plugin compatibility** - Only using GitHub Pages compatible plugins

## 🚀 SETUP INSTRUCTIONS

### 1. Update Configuration
Edit `_config.yml` and change these lines:
```yaml
baseurl: "/your-repository-name"  # Replace with your actual repo name
url: "https://your-username.github.io"  # Replace with your GitHub username
```

### 2. Repository Setup
1. Create a new GitHub repository
2. Upload ALL files from this project  
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "gh-pages" branch
6. Save

### 3. Enable GitHub Actions
The site will automatically build and deploy using GitHub Actions when you push changes.

## 📁 PROJECT STRUCTURE

```
poetry-website/
├── _config.yml              # Jekyll configuration  
├── Gemfile                   # Ruby dependencies
├── index.html                # Homepage
├── _layouts/                 # Page templates
│   ├── default.html         # Base layout
│   └── poem.html            # Poem page layout
├── _includes/               # Reusable components  
│   ├── header.html          # Site header
│   └── footer.html          # Site footer
├── _poems/                  # Poem collections
│   ├── romance/             # Romance poems
│   ├── nature/              # Nature poems
│   └── philosophy/          # Philosophy poems
├── _books/                  # Book information
├── pages/                   # Static pages
│   ├── about.html           # About page
│   ├── genres.html          # Genre browser  
│   └── books.html           # Books page
├── assets/                  # Static files
│   ├── css/main.css         # Stylesheet
│   └── js/main.js           # JavaScript
└── .github/workflows/       # GitHub Actions
    └── deploy.yml           # Auto-deployment
```

## ✍️ ADDING NEW POEMS

Create new files in the `_poems/` folders:

**Example: `_poems/romance/my-poem.md`**
```markdown
---
layout: poem
title: "My Beautiful Poem"
genre: romance
date: 2025-09-13
excerpt: "A short description"
tags: [love, heart, emotion]
---

Your poem content here
Line by line
Stanza by stanza
```

## 🔧 TROUBLESHOOTING

### Site not loading?
1. Check that `baseurl` in `_config.yml` matches your repository name exactly
2. Ensure GitHub Pages is enabled in repository settings
3. Wait 5-10 minutes for GitHub Actions to build and deploy

### CSS still not working?
1. Check that all files uploaded correctly
2. Verify the `assets/css/main.css` file exists
3. Try a hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Build failing?
1. Check GitHub Actions tab for error details
2. Ensure all files have proper YAML front matter (the `---` blocks)
3. Check for typos in `_config.yml`

### JavaScript not working?
1. Check browser console for errors (F12 → Console tab)
2. Ensure `assets/js/main.js` file exists and uploaded correctly

## 🌟 FEATURES INCLUDED

- ✅ **Responsive design** - Works on all devices
- ✅ **Dark/light theme** - Toggle with moon/sun button
- ✅ **Search functionality** - Search poems by title/content
- ✅ **Genre filtering** - Filter poems by category  
- ✅ **Social sharing** - Share poems easily
- ✅ **Print friendly** - Clean printing layout
- ✅ **SEO optimized** - Meta tags and structured data

## 📊 WHAT'S DIFFERENT FROM ORIGINAL

This fixed version:
- Removes complex Liquid logic that can cause build failures
- Uses only GitHub Pages compatible plugins
- Simplifies JavaScript to avoid compatibility issues
- Fixes all file path references
- Adds proper error handling
- Includes comprehensive front matter

## 🎯 NEXT STEPS

1. Replace sample poems with your own content
2. Update author information in `_config.yml`
3. Add your social media links
4. Customize colors in `assets/css/main.css` if desired

## 📞 SUPPORT

If you still have issues:
1. Check GitHub Actions build logs for specific errors
2. Verify all files uploaded correctly
3. Ensure `_config.yml` has correct baseurl and url settings
4. Try creating a completely new repository with these files

This version is specifically designed to work reliably on GitHub Pages without the common issues that break Jekyll deployments.