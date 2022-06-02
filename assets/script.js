
const currentDayEl = $(".currentDay")
const currentDayStatsEl = $(".currentDayStats")
const next5DaysEl = $(".next5Days")

const weatherObj = {
    "Clear":"<i class='fa-solid fa-sun'></i>",
    "Clouds":"<i class='fa-solid fa-cloud'></i>",
}

function fetchFunccoordinates(url) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log(data.current.weather[0].main);
            for (i = 1; i < 7; i++) {
                next5DaysEl.append("<div class='col-2 fw-bold'>" + moment().add(i, 'days').format("dddd") + "</div>");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function fetchFuncCity(url, cityValue) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let weatherIcon = data.weather[0].icon
            const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
            currentDayEl.append(cityValue + ": " + moment().format("dddd, MM/DD/YY") + " ")
            alert(weatherIcon)
            // currentDayEl.append(`` + weatherObj[weatherType]+``)
            currentDayEl.append(" <img src = 'http://openweathermap.org/img/wn/" + weatherIcon +".png'>")
            fetchFunccoordinates(locationURL);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

$("button").click(
    getCityValue);

function getCityValue() {
    let cityValue = $("input").val();
    alert(cityValue)
    const cityAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=351d28b4fbd0330fa3241a105d978dd6";
    fetchFuncCity(cityAPI,cityValue)
    $("input").val("")
    currentDayEl.text("")
    next5DaysEl.text("")
};

