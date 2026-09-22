(function () {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const MIN_MS = 1200;
  const MAX_MS = 3500;
  const FADE_MS = 450;
  const start = Date.now();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let done = false;

  function finish() {
    if (done) return;
    done = true;

    const elapsed = Date.now() - start;
    const wait = reducedMotion ? 200 : Math.max(0, MIN_MS - elapsed);

    window.setTimeout(function () {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");

      window.setTimeout(function () {
        if (loader.parentNode) loader.remove();
      }, FADE_MS);
    }, wait);
  }

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }

  // Imagens grandes não devem prender a tela de loading
  window.setTimeout(finish, MAX_MS);
})();
