(function ($) {
    
    var mousewheelEvent = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

    $(".container").live(mousewheelEvent, function (event) {
        var evt = window.event || event;
        var del = event.detail ? event.detail * (-120) : evt.wheelDelta;

        if (del < 0) {
            $(this).find('.next').click();
        } else {
            $(this).find('.prev').click();
        }

        event.preventDefault();
        event.stopPropagation();
    });

}(jQuery));