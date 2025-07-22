// Este archivo debe definir globalmente la función para que navbar.js pueda usarla
function initNavbarMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menuMobile = document.getElementById("menu-mobile");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  if (!menuBtn || !menuMobile || !iconOpen || !iconClose) {
    console.warn("⚠️ Elementos del menú no encontrados.");
    return;
  }

  menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("hidden");
    iconOpen.classList.toggle("hidden");
    iconClose.classList.toggle("hidden");
  });

  menuMobile.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => {
      menuMobile.classList.add("hidden");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    })
  );
}
