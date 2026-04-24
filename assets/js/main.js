(function () {
  const body = document.body;
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open");
      body.classList.toggle("nav-open");
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "a") {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        body.classList.remove("nav-open");
      }
    });
  }

  const currentPage = body.dataset.page;

  if (currentPage) {
    document.querySelectorAll(".nav-menu a").forEach(function (link) {
      const href = link.getAttribute("href") || "";

      if (
        href.includes(currentPage) ||
        (currentPage === "home" && href === "index.html")
      ) {
        link.classList.add("is-active");
      }
    });
  }

  document.querySelectorAll(".accordion-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.closest(".accordion-item");
      if (!item) return;

      item.classList.toggle("is-open");
    });
  });
})();