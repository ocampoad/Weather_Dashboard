
const currentDayEl = $(".currentDay")
const currentDayStatsEl = $(".currentDayStats")
const next5DaysEl = $(".next5Days")

const weatherObj = {
    "Clear": "<i class='fa-solid fa-sun'></i>",
    "Clouds": "<i class='fa-solid fa-cloud'></i>",
}

function fetchFunccoordinates(url) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            for (i = 1; i < 7; i++) {
                next5DaysEl.append("<div class=' card col-1 fw-bold me-1'>" + moment().add(i, 'days').format("dddd") + "</div>")
                next5DaysEl.append("<div class=' fw-semibold'> Temperature: "+ tempinF.toPrecision(4)+ " °F</div>")
                next5DaysEl.append("<div class=' fw-semibold'> Humidity: "+ humidityVal+ "%</div>")
                next5DaysEl.append("<div class=' fw-semibold'> Wind: "+ windSpeed+ " MPH</div>")
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
            let tempinF = 1.8*(data.main.temp - 273.15)+32;
            let humidityVal = data.main.humidity
            let windSpeed = data.wind.speed
            const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
            currentDayEl.append(cityValue + ": " + moment().format("dddd, MM/DD/YY") + " ")
            currentDayEl.append(" <img src = 'http://openweathermap.org/img/wn/" + weatherIcon + ".png'>")
            currentDayEl.append("<div class=' fw-semibold'> Temperature: "+ tempinF.toPrecision(4)+ " °F</div>")
            currentDayEl.append("<div class=' fw-semibold'> Humidity: "+ humidityVal+ "%</div>")
            currentDayEl.append("<div class=' fw-semibold'> Wind: "+ windSpeed+ " MPH</div>")
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
    if (cityValue) {
        const cityAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=351d28b4fbd0330fa3241a105d978dd6";
        if ($("button:contains(" + cityValue + ")").length <= 0) {
            $("#searchArea").append("<button type='button' class=' btn-dark my-2 list-group-item list-group-item-action ' id = 'cityLists'  >" + cityValue + "</button>") 
        } 
        fetchFuncCity(cityAPI, cityValue)
        $("input").val("")
        currentDayEl.text("")
        next5DaysEl.text("")
    } else {
        alert("please input a city")
    }

};

{/* <div class="list-group">
  <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
    The current button
  </button>
  <button type="button" class="list-group-item list-group-item-action">A second button item</button>
  <button type="button" class="list-group-item list-group-item-action">A third button item</button>
  <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
  <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
</div> */}