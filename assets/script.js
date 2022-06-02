
const currentDayEl = $(".currentDay")
const currentDayStatsEl = $(".currentDayStats")
const next5DaysEl = $(".next5Days")

function fetchFunccoordinates(url, cityValue) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log(data.current.weather[0].main);
            currentDayEl.append(cityValue + ": " + moment().format("dddd, MM/DD/YY"))
            for (i = 1; i < 7; i++) {
                next5DaysEl.append("<div class='col-2 fw-bold'>" + moment().add(i, 'days').format("dddd") + "</div>");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// let getData = (data) => {
//     fetchFunc(data)
// }

function fetchFuncCity(url, cityValue) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
            fetchFunccoordinates(locationURL, cityValue);
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
    alert(cityAPI)
    fetchFuncCity(cityAPI,cityValue)
};

