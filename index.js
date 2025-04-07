document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Dropdown functionality for mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default action
      e.stopPropagation(); // Stop event from bubbling up
      
      const dropdown = this.closest('.dropdown');
      
      if (window.innerWidth <= 768) {
        // Toggle current dropdown without affecting the main menu
        dropdown.classList.toggle('active');
      }
    });
  });
  
  // Add active class to current page link
  const currentLocation = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href && currentLocation.includes(href) && href !== '#') {
      item.classList.add('active');
    }
  });
  
  // Prevent clicks inside the nav links from closing the menu
  navLinks.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Close menu when clicking outside, but not when clicking on nav elements
  document.addEventListener('click', function(e) {
    const isClickInsideNavLinks = navLinks.contains(e.target);
    const isClickOnMenuToggle = menuToggle.contains(e.target);
    
    if (!isClickInsideNavLinks && !isClickOnMenuToggle) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
      
      // Also close any open dropdowns
      document.querySelectorAll('.dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Specifically for dropdown menu items, prevent them from closing the main menu
  const dropdownMenuLinks = document.querySelectorAll('.dropdown-menu a');
  
  dropdownMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only stop propagation, don't prevent default so links still work
      e.stopPropagation();
    });
  });
});