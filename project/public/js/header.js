/**
 * 날짜 시간표시(영문)
 */
function clock() {

    var seoul = new Date();
    var tz = seoul.getTime() + (seoul.getTimezoneOffset() * 60000) + (9 * 3600000);
    seoul.setTime(tz);


    var date = new Date(seoul);

    var year = date.getFullYear();
    var month = date.getMonth();
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var clockDate = date.getDate();
    var day = date.getDay();
    var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var currentTime = week[day] + ", " + monthArr[month] + " " + (clockDate<10 ? '0'+clockDate : clockDate) + ", " + year +  ", " + (hours<10 ? '0'+hours : hours) +":"+ (minutes < 10 ? '0'+minutes : minutes) + " KST (UTC+9), " ;
    $("#currentTime").html(currentTime);

}

function init() {

clock();

// 최초에 함수를 한번 실행시켜주고
setInterval(clock, 1000);

}

init();
