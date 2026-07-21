(function () {
  const slides = [
    {
      src: "src/assets/previews_app/home.jpg",
      alt: "Tela inicial do aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/galeria.jpg",
      alt: "Galeria no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/acervo.jpg",
      alt: "Acervo no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/estampas.jpg",
      alt: "Estampas no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/amostras.jpg",
      alt: "Amostras no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/direcao.jpg",
      alt: "Direção de crochê no aplicativo Arane",
    },
    {
      src: "src/assets/previews_app/meu_perfil.jpg",
      alt: "Meu perfil no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/tracker_trad.jpg",
      alt: "Tracker tradicional no aplicativo Arane Crochê",
    },
    {
      src: "src/assets/previews_app/tracker_filet.jpg",
      alt: "Tracker filet no aplicativo Arane Crochê",
    },
  ];

  const VISIBLE = 3;
  const INTERVAL_MS = 4000;

  const root = document.getElementById("app-preview");
  if (!root || slides.length === 0) return;

  const phones = Array.from(root.querySelectorAll(".phone-frame img"));
  const dotsContainer = root.querySelector(".preview-dots");
  const carousel = root.querySelector(".preview-carousel");

  let index = 0;
  let timer = null;
  let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "preview-dot";
      button.setAttribute("aria-label", "Ir para o preview " + (i + 1));
      button.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(button);
    });
  }

  function updatePhones() {
    phones.forEach((img, slot) => {
      const slide = slides[(index + slot) % slides.length];
      img.classList.add("is-fading");

      window.setTimeout(() => {
        img.src = slide.src;
        img.alt = slide.alt;
        img.classList.remove("is-fading");
      }, 180);
    });

    if (dotsContainer) {
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
    }
  }

  function goTo(nextIndex) {
    index = ((nextIndex % slides.length) + slides.length) % slides.length;
    updatePhones();
    restartTimer();
  }

  function next() {
    goTo(index + 1);
  }

  function stopTimer() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    if (reducedMotion || slides.length <= VISIBLE) return;
    stopTimer();
    timer = window.setInterval(next, INTERVAL_MS);
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  renderDots();
  // First paint without fade delay
  phones.forEach((img, slot) => {
    const slide = slides[(index + slot) % slides.length];
    img.src = slide.src;
    img.alt = slide.alt;
  });
  if (dotsContainer) {
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }

  if (carousel) {
    carousel.addEventListener("mouseenter", stopTimer);
    carousel.addEventListener("mouseleave", startTimer);
    carousel.addEventListener("focusin", stopTimer);
    carousel.addEventListener("focusout", startTimer);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopTimer();
    else startTimer();
  });

  startTimer();
})();
