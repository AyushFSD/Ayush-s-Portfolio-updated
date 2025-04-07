document.addEventListener("DOMContentLoaded", function () {
  // ========= Project Tab Switching =========
  const projectNavItems = document.querySelectorAll(".project-nav-item");
  const projectCategories = document.querySelectorAll(".project-category");

  projectNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      // Remove 'active' class from all nav items and add to clicked one
      projectNavItems.forEach((navItem) => navItem.classList.remove("active"));
      this.classList.add("active");

      // Hide all categories and show only the selected one
      projectCategories.forEach((category) => category.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });

  // ========= Project Card Animation on Scroll =========
  const projectCards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  projectCards.forEach((card) => observer.observe(card)); // <-- Uncommented this

  // ========= Project Links Placeholder Alert =========
  const projectLinks = document.querySelectorAll(".project-links a");
  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
        alert("Project link coming soon!");
      }
    });
  });

  // ========= Mobile Navigation Toggle =========
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  // Create an overlay for closing menu on outside click
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  body.appendChild(overlay);

  // Function to toggle mobile menu visibility
  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active"); // Using 'active' for consistency
    overlay.classList.toggle("active");

    // Prevent background scrolling
    body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // ========= Handle Dropdowns in Mobile View =========
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();

        const dropdown = this.parentElement;

        // Toggle clicked dropdown
        dropdown.classList.toggle("active");

        // Close other dropdowns
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== this) {
            otherToggle.parentElement.classList.remove("active");
          }
        });
      }
    });
  });

  // ========= Close Menu on Nav Link Click (Non-dropdown only) =========
  document.querySelectorAll(".nav-links a:not(.dropdown-toggle)").forEach((item) => {
    item.addEventListener("click", function () {
      if (!this.closest(".dropdown-menu") && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // ========= Close Menu on Dropdown Menu Item Click =========
  document.querySelectorAll(".dropdown-menu a").forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // ========= Auto-Close Menu on Resize to Desktop =========
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// ========= Smooth Scroll for Anchor Links =========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ========= Highlight Nav Link on Scroll =========
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const headerHeight = document.querySelector("header").offsetHeight;

    if (window.pageYOffset >= sectionTop - headerHeight - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});
