document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (hamburger && sidebar && overlay) {
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (sidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close sidebar on pressing escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleMenu();
      }
    });
  }

  // Highlight active page link
  const currentPath = window.location.pathname;
  let currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  
  // Default to index.html if path is empty or just slash
  if (currentPage === '' || currentPage === 'index') {
    currentPage = 'index.html';
  }

  const selectActiveLink = (selector) => {
    const links = document.querySelectorAll(selector);
    links.forEach(link => {
      const href = link.getAttribute('href');
      // Exact match or fallback for root/index
      if (href === currentPage || 
          (currentPage === 'index.html' && (href === './' || href === 'index.html' || href === '')) ||
          (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  selectActiveLink('.nav-links a');
  selectActiveLink('.sidebar-links a');
}
