/* ============================================================
   GLOBAL REALM SWITCH MACHINE
   ============================================================ */

export function initRealmSwitch(navSelector = "[data-realm-nav]") {
  const nav = document.querySelector(navSelector);
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-realm]");
    if (!btn) return;

    const realm = btn.dataset.realm;
    document.body.dataset.realm = realm;
  });
}


