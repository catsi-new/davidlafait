/* Filtres par statut (pages thématiques) et clic sur la carte (ordinateur uniquement). */
(function () {
  "use strict";
  // Filtres fusionnés avec la légende : un clic trie, un second clic sur le même statut réaffiche tout.
  document.querySelectorAll(".filters.static-filters").forEach(function (group) {
    var grid = document.querySelector(".cards-grid");
    var buttons = group.querySelectorAll("[data-filter]");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.dataset.filter;
        if (value !== "all" && button.getAttribute("aria-pressed") === "true") value = "all";
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.filter === value)); });
        grid.querySelectorAll(".fiche").forEach(function (card) {
          card.hidden = value !== "all" && card.dataset.status !== value;
        });
      });
    });
  });
  // Clic gauche sur l’image : ouvre la source dans un nouvel onglet, seulement avec une souris.
  // Le clic droit (Copier l’image) n’est pas intercepté.
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  document.addEventListener("click", function (event) {
    if (!fine.matches || event.button !== 0) return;
    var img = event.target.closest ? event.target.closest(".card-visual img") : null;
    if (!img) return;
    var card = img.closest(".fiche");
    var link = card && card.querySelector("a.source-link");
    if (link && /^https?:\/\//.test(link.href)) window.open(link.href, "_blank", "noopener,noreferrer");
  });
})();
