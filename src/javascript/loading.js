(function () {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  const MIN_MS = 1900;
  const FADE_MS = 450;
  const start = Date.now();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function finish() {
    const elapsed = Date.now() - start;
    const wait = reducedMotion ? 300 : Math.max(0, MIN_MS - elapsed);

    window.setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");

      window.setTimeout(() => {
        loader.remove();
      }, FADE_MS);
    }, wait);
  }

  if (document.readyState === "complete") {
    finish();
  } else {
    window.addEventListener("load", finish, { once: true });
  }
})();
