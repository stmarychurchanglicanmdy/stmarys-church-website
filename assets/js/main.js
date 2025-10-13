// Main JavaScript functionality
(function() {
  'use strict';

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initThemeToggle();
    updateCurrentYear();
    initSmoothScroll();
  });

  // Navigation functionality
  function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.setAttribute('aria-expanded', !isExpanded);
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when pressing Escape
      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when clicking on a link (mobile)
      const navLinks = navMenu.querySelectorAll('a');
      navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768) {
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  // Theme toggle functionality
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
      // Get saved theme or default to light
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);

      themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }

  // Update current year in footer
  function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          event.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Utility functions
  window.StMarys = {
    // Format date for display
    formatDate: function(dateString) {
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(dateString).toLocaleDateString('en-US', options);
    },

    // Create element with attributes and content
    createElement: function(tag, attributes, content) {
      const element = document.createElement(tag);
      
      if (attributes) {
        Object.keys(attributes).forEach(function(key) {
          if (key === 'className') {
            element.className = attributes[key];
          } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
          } else {
            element.setAttribute(key, attributes[key]);
          }
        });
      }
      
      if (content) {
        element.textContent = content;
      }
      
      return element;
    },

    // Debounce function for search
    debounce: function(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = function() {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    // Show/hide loading state
    setLoading: function(element, isLoading) {
      if (isLoading) {
        element.innerHTML = '<p>Loading...</p>';
        element.setAttribute('aria-busy', 'true');
      } else {
        element.removeAttribute('aria-busy');
      }
    }
  };
})();