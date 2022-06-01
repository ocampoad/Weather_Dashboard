// let lat = 37;
// let lon = -122;
const currentDayEl = $(".currentDay")
const currentDayStatsEl = $(".currentDayStats")
const next5DaysEl = $(".next5Days")

let locationVal = "Austin";

const anotherLocation = "https://api.openweathermap.org/data/2.5/weather?q=" + locationVal + "&appid=351d28b4fbd0330fa3241a105d978dd6";

let x = ''

function fetchFunc(url) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log(data.current.weather[0].main);
            currentDayEl.append(locationVal + ": " + moment().format("dddd, MM/DD/YY"))
            for (i = 1; i < 7; i++) {
                next5DaysEl.append("<div class='col-2 fw-bold'>" + moment().add(i, 'days').format("dddd") + "</div>");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

let getData = (data) => {
    fetchFunc(data)
}

fetch(anotherLocation, {
    method: 'GET',
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
        getData(locationURL);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// for (i= 0; i < 7; i++) {
//     $("h1").append(moment().add(i,'days').format("dddd"));
//     $("h1").append()
// }

