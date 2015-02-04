(function($) {

    var Calendar = {

        initialize: function initialize () {

            var that = this;

            this.calendar = $('.calendar').find('tbody');
            this.calendarDate = new Date();
            this.monthArray = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            this.date = this.calendarDate.getDate();
            this.month = this.calendarDate.getMonth();
            this.year = this.calendarDate.getFullYear();

            this.updateHeader();
            this.createCalendar(this.month, this.year);

            $('.next').bind('click', function (event) {
                event.preventDefault();

                var nextMonth = ( that.month === 11 ) ? 0 : that.month + 1,
                    nextYear = ( that.month === 11 ) ? that.year + 1 : that.year;

                that.updateCalendar(nextMonth, nextYear);
            });

            $('.prev').bind('click', function (ev) {
                ev.preventDefault();

                var nextMonth = ( that.month === 0 ) ? 11 : that.month - 1
                    ,nextYear = ( that.month === 0 ) ? that.year - 1 : that.year;

                that.updateCalendar(nextMonth, nextYear);
            });

            $('.dateCell').bind('click', function () {
                $('.dateCell').removeClass('selected');
                $(this).addClass('selected');
            });

        },

        updateHeader: function updateHeader () {
            $('h2').html(this.year + ' ' + this.monthArray[this.month]);
        },

        getFirstDay: function getFirstDay () {

            var tempDate = new Date();

            tempDate.setFullYear(this.year);
            tempDate.setMonth(this.month);
            tempDate.setDate(1);

            return tempDate.getDay();
        },

        daysInMonth: function daysInMonth (month, year) {
            return 32 - new Date(year, month, 32).getDate();
        },

        createDateArray: function createDateArray(month, year) {
            var dateArray = [],
                firstDay = this.getFirstDay(),
                thisMonthLength = this.daysInMonth(month, year),
                lastMonth = ( month > 0 ) ? month - 1 : 11,
                lastYear = ( month > 0 ) ? year : year - 1,
                lastMonthLength = this.daysInMonth(lastMonth, lastYear),
                startingDate = ( firstDay === 0 ) ? lastMonthLength - 6 : lastMonthLength - ( firstDay - 1 ),
                cellSize = $('.dateCell').size();

            for ( var i = startingDate; i <= lastMonthLength; i++ ) {
                dateArray.push({
                    date: i,
                    className: 'prevDate'
                });
                startingDate++;
            }

            for ( var m = 1; m <= thisMonthLength; m++ ) {
                dateArray.push({
                    date: m,
                    className: 'currentDate'
                });
            }

            var leftCells = cellSize - dateArray.length;

            for (var n = 1; n <= leftCells; n++) {
                dateArray.push({
                    date: n,
                    className: 'nextDate'
                });
            }

            $.each($('.dateCell'), function (index, value) {
                $(value).addClass(dateArray[index].className).html(dateArray[index].date);
            });
        },

        createCalendar: function createCalendar (month, year) {

            var that = this,
                calendarRows = [];

            $('.dateRow').remove();

            for ( var i = 0; i < 6; i++) {

                var row = $('<tr/>', { 'class': 'dateRow' }).appendTo(that.calendar);

                calendarRows.push(row);
            }

            $.each(calendarRows, function (index, value) {
                for ( var n = 0; n < 7; n++ ) {
                    $('<td/>', { 'class': 'dateCell' }).appendTo(value);
                }
            });

            this.createDateArray(month, year);
        },

        updateCalendar: function updateCalendar (month, year) {
            this.calendarDate.setMonth(month);
            this.calendarDate.setFullYear(year);

            this.month = this.calendarDate.getMonth();
            this.year = this.calendarDate.getFullYear();

            this.updateHeader();
            this.createCalendar(this.month, this.year);
        }

    };

    Calendar.initialize();

}(jQuery));