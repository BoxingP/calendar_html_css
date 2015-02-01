$(".ui-datepicker").live("mousewheel DOMMouseScroll MozMousePixelScroll", function (event, delta) {
    if (delta < 0) {
        $(this).find('.ui-datepicker-next').click();
    } else {
        $(this).find('.ui-datepicker-prev').click();
    }
    event.preventDefault();
    event.stopPropagation();
});

$("#calendar").datepicker({
    showOtherMonths: true,
    dayNamesMin: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
});
