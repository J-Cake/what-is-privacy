let revealTimer = null;

const tooltip = $(".tooltip");

$("article a").on('mouseover', function (e) {
    const text = $(this).text();

    revealTimer = setTimeout(function () {
        tooltip.text(text);
        tooltip.show();

        tooltip.css("left", (e.pageX + 10) + "px");
        tooltip.css("top", e.pageY + "px");

        $('article a').mouseleave(function () {
            clearTimeout(revealTimer);
            $(".tooltip").hide().text('');
        });

    }, 1000);
});

tooltip.hide();