(function () {
  const body = document.body;
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && navMenu) {
    const closeNavigation = function () {
      navMenu.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    };

    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-controls", "nav-menu");

    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName.toLowerCase() === "a") {
        closeNavigation();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeNavigation();
        navToggle.focus();
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
        link.setAttribute("aria-current", "page");
      }
    });
  }

  document.querySelectorAll(".accordion-button").forEach(function (button, index) {
    const item = button.closest(".accordion-item");
    const panel = item ? item.querySelector(".accordion-panel") : null;

    if (!item || !panel) return;

    const buttonId = "accordion-button-" + (index + 1);
    const panelId = "accordion-panel-" + (index + 1);
    button.id = buttonId;
    panel.id = panelId;
    button.setAttribute("aria-controls", panelId);
    panel.setAttribute("aria-labelledby", buttonId);

    const setAccordionState = function (isOpen) {
      item.classList.toggle("is-open", isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
      panel.hidden = !isOpen;
    };

    setAccordionState(item.classList.contains("is-open"));

    button.addEventListener("click", function () {
      setAccordionState(!item.classList.contains("is-open"));
    });
  });
})();
