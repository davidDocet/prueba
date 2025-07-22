// Cargar componente HTML en contenedor
async function loadComponent(id, url) {
  const res = await fetch(url);
  const html = await res.text();
  if (id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
}

// Cargar un script JS con callback cuando termine
function loadScript(url, callbackName) {
  const script = document.createElement("script");
  script.src = url;
  script.onload = () => {
    // Ejecutar la función global pasada como nombre si existe
    if (callbackName && typeof window[callbackName] === "function") {
      window[callbackName]();
    } else if (callbackName) {
      console.error(`❌ ${callbackName} no está definida después de cargar ${url}`);
    }
  };
  document.body.appendChild(script);
}

// Cargar múltiples secciones de forma secuencial
async function loadSectionsSequentially(sectionsList) {
  for (const section of sectionsList) {
    const container = document.getElementById(section.id);
    if (container) {
      await loadComponent(section.id, section.html);
      if (section.js) loadScript(section.js); // carga el script si está definido
    } else {
      console.warn(`⚠️ No se encontró el contenedor ${section.id}`);
    }
  }
}

// Secuencia principal
window.addEventListener("DOMContentLoaded", async () => {
  // 1. Cargar header y menú
  await loadComponent("header-container", "components/header.html");
  await loadComponent("menu-mobile-container", "components/menu.html");
  loadScript("js/navbarMenu.js", "initNavbarMenu");

  // 2. Cargar main.html (que contiene los divs de secciones)
  await loadComponent("main-content", "components/main.html");

  // 3. Lista de secciones a cargar dentro del main
  const sections = [
    { id: "hero-container", html: "components/hero.html", js: "js/hero.js" },
    { id: "cards-container", html: "components/cards.html", js: "js/cards.js" },
    { id: "testimonios-container", html: "components/testimonios.html", js: null }
  ];

  // 4. Esperar a que main.html haya creado los contenedores
  const secInterval = setInterval(() => {
    const mainReady = document.getElementById("hero-container");
    if (mainReady) {
      clearInterval(secInterval);
      loadSectionsSequentially(sections);
    }
  }, 50);
});
