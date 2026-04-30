/**
 * Header and Footer Loader
 * Loads header and footer from header.html before showing the page
 */

(function() {
  "use strict";

  let cachedHeaderHtml = null;

  function applyHeaderFooter(doc) {
    let newHeader = doc.querySelector("#header_eng");
    let newFooter = doc.querySelector("#footer_eng");
    if (!newHeader) newHeader = doc.querySelector("#header");
    if (!newFooter) newFooter = doc.querySelector("#footer");

    if (newHeader) {
      const currentHeader = document.querySelector("#header");
      if (currentHeader) {
        const headerClone = newHeader.cloneNode(true);
        headerClone.id = "header";
        currentHeader.replaceWith(headerClone);
      }
    }
    if (newFooter) {
      const currentFooter = document.querySelector("#footer");
      if (currentFooter) {
        const footerClone = newFooter.cloneNode(true);
        footerClone.id = "footer";
        currentFooter.replaceWith(footerClone);
      }
    }
  }

  async function loadHeaderFooter() {
    try {
      const response = await fetch("header.html");
      if (!response.ok) {
        throw new Error("Failed to load header.html");
      }
      const html = await response.text();
      cachedHeaderHtml = html;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      applyHeaderFooter(doc);

      document.body.style.display = "";
      document.dispatchEvent(new Event("headerFooterLoaded"));
    } catch (error) {
      console.error("Error loading header/footer:", error);
      document.body.style.display = "";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadHeaderFooter);
  } else {
    loadHeaderFooter();
  }

})();
