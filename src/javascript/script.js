$(document).ready(function() {
    $('#nav_list .nav-item a').on('click', function() {
        $('#nav_list .nav-item').removeClass('active');

        $(this).parent().addClass('active');
    });

    $("#nav_list .nav-item a").click(function(e) {
        e.preventDefault();
        const target = $(this).attr("href");

        // scroll suave
        $("html, body").animate({
        scrollTop: $(target).offset().top
        }, 600);
    });

    // scroll spy
    const sections = $("section"); // todas as seções
    const navItems = $("#nav_list .nav-item");

    $(window).on("scroll", function() {
        let currentScroll = $(this).scrollTop();

        sections.each(function() {
            const sectionTop = $(this).offset().top - 80; // 80px de margem para topo
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                const id = $(this).attr("id");

                // remove active de todos
                navItems.removeClass("active");

                // adiciona active no item correspondente
                $("#nav_list .nav-item a[href='#" + id + "']").parent().addClass("active");
            }
        });
    });

    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    $(".accordion-header").click(function () {
        const body = $(this).next(".accordion-body"); // o corpo logo abaixo do botão
        const parent = $(this).parent(".accordion");

        $(".accordion-body").not(body).removeClass("active");
        $(".accordion").not(parent).removeClass("active");

        // alterna o atual
        body.toggleClass("active");
        parent.toggleClass("active");
    });
})

