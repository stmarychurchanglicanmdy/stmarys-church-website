// Articles listing functionality
(function() {
  'use strict';

  let currentPage = 1;
  let articlesPerPage = 6;
  let filteredArticles = [];
  let allTags = [];

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof ARTICLES !== 'undefined') {
      initArticlesPage();
      loadLatestArticles();
    }
  });

  function initArticlesPage() {
    // Only run on articles page
    if (!document.getElementById('articles-grid')) return;

    setupFilters();
    setupSearch();
    loadArticles();
  }

  function loadLatestArticles() {
    // Load latest articles on home page
    const latestContainer = document.getElementById('latest-articles');
    if (!latestContainer) return;

    const latest = ARTICLES
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    renderArticleCards(latest, latestContainer);
  }

  function setupFilters() {
    // Get all unique tags
    allTags = [...new Set(ARTICLES.flatMap(article => article.tags))].sort();
    
    // Populate tag filter
    const tagFilter = document.getElementById('tag-filter');
    if (tagFilter) {
      allTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        tagFilter.appendChild(option);
      });

      tagFilter.addEventListener('change', function() {
        currentPage = 1;
        loadArticles();
      });
    }

    // Setup sort filter
    const sortFilter = document.getElementById('sort-order');
    if (sortFilter) {
      sortFilter.addEventListener('change', function() {
        currentPage = 1;
        loadArticles();
      });
    }
  }

  function setupSearch() {
    const searchInput = document.getElementById('article-search');
    if (searchInput) {
      const debouncedSearch = window.StMarys.debounce(function() {
        currentPage = 1;
        loadArticles();
      }, 300);

      searchInput.addEventListener('input', debouncedSearch);
    }
  }

  function loadArticles() {
    const searchTerm = document.getElementById('article-search')?.value.toLowerCase() || '';
    const selectedTag = document.getElementById('tag-filter')?.value || '';
    const sortOrder = document.getElementById('sort-order')?.value || 'newest';

    // Filter articles
    filteredArticles = ARTICLES.filter(article => {
      const matchesSearch = !searchTerm || 
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm);
      
      const matchesTag = !selectedTag || article.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });

    // Sort articles
    filteredArticles.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Render articles and pagination
    renderArticlesPage();
  }

  function renderArticlesPage() {
    const container = document.getElementById('articles-grid');
    const noResults = document.getElementById('no-results');
    
    if (!container) return;

    if (filteredArticles.length === 0) {
      container.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      renderPagination(0);
      return;
    }

    if (noResults) noResults.style.display = 'none';

    // Calculate pagination
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    // Render articles
    //renderArticleCards(articlesToShow, container);

    // Render pagination
    //renderPagination(filteredArticles.length);

    // Scroll to top of articles
    //container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Render articles
    renderArticleCards(articlesToShow, container);

    // Render pagination
    renderPagination(filteredArticles.length);

    // Scroll to articles only if user filtered/searched (not on initial load)
    if (currentPage > 1 || document.getElementById('article-search')?.value || document.getElementById('tag-filter')?.value) {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function renderArticleCards(articles, container) {
    container.innerHTML = '';

    articles.forEach(article => {
      const card = createArticleCard(article);
      container.appendChild(card);
    });
  }

  function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';

    const imageHtml = article.image ? 
      `<img src="${article.image.src}" alt="${article.image.alt}" class="article-image" loading="lazy">` : '';

    const tagsHtml = article.tags.map(tag => 
      `<span class="tag">${tag}</span>`
    ).join('');

    const authorHtml = article.author ? 
      `<span class="article-author">by ${article.author}</span> • ` : '';

    card.innerHTML = `
      ${imageHtml}
      <div class="article-content">
        <header class="article-header">
          <h3 class="article-title">
            <a href="article.html?slug=${article.slug}">${article.title}</a>
          </h3>
          <div class="article-meta">
            ${authorHtml}<time datetime="${article.date}">${window.StMarys.formatDate(article.date)}</time>
          </div>
        </header>
        <p class="article-excerpt">${article.excerpt}</p>
        <div class="article-tags">${tagsHtml}</div>
        <a href="article.html?slug=${article.slug}" class="read-more">Read more</a>
      </div>
    `;

    return card;
  }

  function renderPagination(totalArticles) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    if (totalPages <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    let paginationHtml = '';

    // Previous button
    if (currentPage > 1) {
      paginationHtml += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})">Previous</button>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        paginationHtml += `<button class="pagination-btn active">${i}</button>`;
      } else if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        paginationHtml += `<button class="pagination-btn" onclick="changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        paginationHtml += `<span class="pagination-btn">...</span>`;
      }
    }

    // Next button
    if (currentPage < totalPages) {
      paginationHtml += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})">Next</button>`;
    }

    paginationContainer.innerHTML = paginationHtml;
  }

  // Global function for pagination
  window.changePage = function(page) {
    currentPage = page;
    loadArticles();
  };
})();