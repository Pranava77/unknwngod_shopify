class MasonryLayout {
  constructor() {
    this.grid = document.querySelector('.product-grid');
    this.items = this.grid?.querySelectorAll('.grid__item');
    this.init();
  }

  init() {
    if (!this.grid || !this.items) return;
    
    // Add masonry class
    this.grid.classList.add('masonry-grid');
    
    // Initialize layout
    this.calculateLayout();
    
    // Add resize listener
    window.addEventListener('resize', () => {
      this.calculateLayout();
    });

    // Add intersection observer for animations
    this.setupIntersectionObserver();
  }

  calculateLayout() {
    this.items.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        // Calculate aspect ratio based height
        const height = Math.ceil(img.offsetHeight / 10) * 10;
        item.style.setProperty('--card-height', `${Math.ceil(height / 10)}`);
      }
    });
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.items.forEach(item => {
      observer.observe(item);
    });
  }
}

// Initialize masonry layout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MasonryLayout();
});

// Re-initialize on Shopify section updates
document.addEventListener('shopify:section:load', () => {
  new MasonryLayout();
}); 