document.addEventListener("DOMContentLoaded", function () {
  const projectNavItems = document.querySelectorAll(".project-nav-item"),
    projectCategories = document.querySelectorAll(".project-category");

  projectNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      projectNavItems.forEach((navItem) => navItem.classList.remove("active"));
      this.classList.add("active");
      projectCategories.forEach((category) =>
        category.classList.remove("active")
      );
      document.getElementById(targetId).classList.add("active");
    });
  });

  const projectCards = document.querySelectorAll(".project-card"),
    observer = new IntersectionObserver(
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

  // projectCards.forEach(card => observer.observe(card));

  const projectLinks = document.querySelectorAll(".project-links a");
  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
        alert("Project link coming soon!");
      }
    });
  });

  const menuToggle = document.querySelector(".menu-toggle"),
    navLinks = document.querySelector(".nav-links"),
    body = document.body,
    overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  body.appendChild(overlay);

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
  }

  menuToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  document.querySelectorAll(".nav-links a").forEach((item) => {
    item.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) toggleMenu();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navLinks.classList.contains("active"))
      toggleMenu();
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight,
        targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll("section"),
    navLinks = document.querySelectorAll(".nav-links a");
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop,
      headerHeight = document.querySelector("header").offsetHeight;
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
