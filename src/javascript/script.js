$(document).ready(function () {
  function scrollToHash(hash, smooth) {
    if (!hash || hash === "#") return;
    const $section = $(hash);
    if (!$section.length) return;

    const top = $section.offset().top - 10;
    if (smooth) {
      $("html, body").animate({ scrollTop: top }, 600);
    } else {
      window.scrollTo(0, top);
    }
  }

  function bindNavbar() {
    const $navLinks = $("#nav_list .nav-item a, #mobile_nav_list .nav-item a");
    if (!$navLinks.length) return;

    // evita duplicar handlers ao reinjetar o header
    $navLinks.off(".araneNav");
    $("#mobile_btn").off(".araneNav");

    $("#nav_list .nav-item a").on("click.araneNav", function () {
      $("#nav_list .nav-item").removeClass("active");
      $(this).parent().addClass("active");
    });

    // Scroll suave para âncoras (#secao ou /#secao) quando já estamos na home
    $("#nav_list .nav-item a, #mobile_nav_list .nav-item a").on(
      "click.araneNav",
      function (e) {
        const href = $(this).attr("href") || "";
        const hashIndex = href.indexOf("#");
        if (hashIndex === -1) {
          $("#mobile_menu").removeClass("active");
          $("#mobile_btn").find("i").removeClass("fa-x").addClass("fa-bars");
          return;
        }

        const hash = href.slice(hashIndex);
        const path = href.slice(0, hashIndex);
        const onHome =
          location.pathname === "/" ||
          location.pathname === "/index.html" ||
          location.pathname === "";

        // Link de outra página (ex.: /atualizacoes/)
        if (path && path !== "/" && !path.endsWith("index.html")) {
          $("#mobile_menu").removeClass("active");
          $("#mobile_btn").find("i").removeClass("fa-x").addClass("fa-bars");
          return;
        }

        if (!onHome) {
          // De páginas internas: vai para home já na seção (/#features)
          return;
        }

        e.preventDefault();
        scrollToHash(hash, true);

        $("#mobile_menu").removeClass("active");
        $("#mobile_btn").find("i").removeClass("fa-x").addClass("fa-bars");
      }
    );

    $("#mobile_btn").on("click.araneNav", function () {
      $("#mobile_menu").toggleClass("active");
      $("#mobile_btn").find("i").toggleClass("fa-x");
    });
  }

  function bindScrollSpy() {
    const sections = $("section");
    const navItems = $("#nav_list .nav-item");
    if (!sections.length || !navItems.length) return;

    $(window).off("scroll.araneSpy").on("scroll.araneSpy", function () {
      const currentScroll = $(this).scrollTop();

      sections.each(function () {
        const sectionTop = $(this).offset().top - 80;
        const sectionBottom = sectionTop + $(this).outerHeight();

        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
          const id = $(this).attr("id");
          navItems.removeClass("active");
          $("#nav_list .nav-item a[href='#" + id + "'], #nav_list .nav-item a[href='/#" + id + "']")
            .parent()
            .addClass("active");
        }
      });
    });
  }

  function initNav() {
    bindNavbar();
    bindScrollSpy();

    // Ao abrir a home com /#features (vindo de outra página), rola até a seção
    if (location.hash) {
      setTimeout(function () {
        scrollToHash(location.hash, true);
      }, 50);
    }
  }

  initNav();
  document.addEventListener("site-header-ready", initNav);

  $(".accordion-header").click(function () {
    const body = $(this).next(".accordion-body");
    const parent = $(this).parent(".accordion");

    $(".accordion-body").not(body).removeClass("active");
    $(".accordion").not(parent).removeClass("active");

    body.toggleClass("active");
    parent.toggleClass("active");
  });
});
