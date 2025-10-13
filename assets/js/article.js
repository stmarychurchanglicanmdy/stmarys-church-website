// Single article functionality
(function() {
  'use strict';

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof ARTICLES !== 'undefined') {
      loadArticle();
    }
  });

  function loadArticle() {
    // Only run on article page
    if (!document.getElementById('article-content')) return;

    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
      showNotFound();
      return;
    }

    const article = ARTICLES.find(a => a.slug === slug);

    if (!article) {
      showNotFound();
      return;
    }

    renderArticle(article);
    renderNavigation(article);
    updateMetadata(article);
  }

  function renderArticle(article) {
    const container = document.getElementById('article-content');
    
    const imageHtml = article.image ? 
      `<img src="${article.image.src}" alt="${article.image.alt}" class="article-hero-image" loading="lazy">` : '';

    const tagsHtml = article.tags.map(tag => 
      `<span class="tag">${tag}</span>`
    ).join('');

    const authorHtml = article.author ? 
      `<span class="article-author">by ${article.author}</span> • ` : '';

    container.innerHTML = `
      <header class="article-header">
        <h1>${article.title}</h1>
        <div class="article-meta">
          ${authorHtml}<time datetime="${article.date}">${window.StMarys.formatDate(article.date)}</time>
        </div>
        <div class="article-tags">${tagsHtml}</div>
      </header>
      ${imageHtml}
      <div class="article-body">
        ${article.contentHtml}
      </div>
    `;
  }

  function renderNavigation(currentArticle) {
    const container = document.getElementById('article-pagination');
    if (!container) return;

    // Sort articles by date (newest first)
    const sortedArticles = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));
    const currentIndex = sortedArticles.findIndex(a => a.slug === currentArticle.slug);
    
    let navigationHtml = '';

    // Previous article (newer)
    if (currentIndex > 0) {
      const prevArticle = sortedArticles[currentIndex - 1];
      navigationHtml += `
        <a href="article.html?slug=${prevArticle.slug}" class="prev-article">
          ← ${prevArticle.title}
        </a>
      `;
    } else {
      navigationHtml += '<div></div>'; // Empty div for flexbox spacing
    }

    // Next article (older)
    if (currentIndex < sortedArticles.length - 1) {
      const nextArticle = sortedArticles[currentIndex + 1];
      navigationHtml += `
        <a href="article.html?slug=${nextArticle.slug}" class="next-article">
          ${nextArticle.title} →
        </a>
      `;
    }

    container.innerHTML = navigationHtml;
  }

  function updateMetadata(article) {
    // Update page title
    const titleElement = document.getElementById('article-title');
    if (titleElement) {
      titleElement.textContent = `${article.title} - St. Mary's Church`;
    } else {
      document.title = `${article.title} - St. Mary's Church`;
    }

    // Update meta description
    const descriptionElement = document.getElementById('article-description');
    if (descriptionElement) {
      descriptionElement.content = article.excerpt;
    } else {
      const metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = article.excerpt;
      document.head.appendChild(metaDesc);
    }

    // Update canonical URL
    const canonicalElement = document.getElementById('article-canonical');
    if (canonicalElement) {
      canonicalElement.href = `https://stmarymandalay.org/article.html?slug=${article.slug}`;
    }

    // Update Open Graph tags
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.content = `${article.title} - St. Mary's Church`;

    const ogDescription = document.getElementById('og-description');
    if (ogDescription) ogDescription.content = article.excerpt;

    const ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.content = `https://stmarymandalay.org/article.html?slug=${article.slug}`;

    const ogImage = document.getElementById('og-image');
    if (ogImage && article.image) {
      ogImage.content = `https://stmarymandalay.org/${article.image.src}`;
    }
  }

  function showNotFound() {
    const contentElement = document.getElementById('article-content');
    const notFoundElement = document.getElementById('article-not-found');
    
    if (contentElement) contentElement.style.display = 'none';
    if (notFoundElement) notFoundElement.style.display = 'block';

    document.title = 'Article Not Found - St. Mary\'s Church';
  }
})();