/**
 * Main non-Bootstrap JavaScript file for the Infiniconcept website.
 */

(function() {
  "use strict";

  let typedInstance = null;

  function initTyped() {
    const visibleTyped = document.querySelector(".typed");
    if (!visibleTyped) return;
    const dataItems = visibleTyped.getAttribute("data-typed-items");
    if (!dataItems) return;
    const typedStrings = dataItems.split(",");
    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }
    typedInstance = new Typed(visibleTyped, {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  function boot() {
    initTyped();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  document.addEventListener("headerFooterLoaded", function() {
    initTyped();
  });

  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (!selectHeader) return;
    if (!selectHeader.classList.contains("scroll-up-sticky") && !selectHeader.classList.contains("sticky-top") && !selectHeader.classList.contains("fixed-top")) return;
    window.scrollY > 100 ? selectBody.classList.add("scrolled") : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  document.addEventListener("click", function(e) {
    const toggleBtn = e.target.closest(".mobile-nav-toggle");
    if (toggleBtn) {
      document.body.classList.toggle("mobile-nav-active");
      toggleBtn.classList.toggle("bi-list");
      toggleBtn.classList.toggle("bi-x");
      return;
    }
    const dropdownToggle = e.target.closest(".navmenu .toggle-dropdown");
    if (dropdownToggle) {
      e.preventDefault();
      e.stopPropagation();
      dropdownToggle.parentNode.classList.toggle("active");
      dropdownToggle.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      return;
    }
    const navLink = e.target.closest("#navmenu a");
    if (navLink && document.body.classList.contains("mobile-nav-active")) {
      document.body.classList.remove("mobile-nav-active");
      const btn = document.querySelector(".mobile-nav-toggle");
      if (btn) {
        btn.classList.remove("bi-x");
        btn.classList.add("bi-list");
      }
    }
  });

  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", function() {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  const glightbox = GLightbox({
    selector: ".glightbox"
  });

  window.addEventListener("load", function() {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(function() {
          const section = document.querySelector(window.location.hash);
          const scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop, 10),
            behavior: "smooth"
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach(function(navmenulink) {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll(".navmenu a.active").forEach(function(link) {
          link.classList.remove("active");
        });
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  document.addEventListener("headerFooterLoaded", function() {
    navmenulinks = document.querySelectorAll(".navmenu a");
    navmenuScrollspy();
  });

})();
