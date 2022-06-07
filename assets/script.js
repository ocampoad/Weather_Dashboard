
const currentDayEl = $(".currentDay")
const currentDayStatsEl = $(".currentDayStats")
const next5DaysEl = $(".next5Days")
const lastInput = JSON.parse(localStorage.getItem("cityWeatherData"));

function getCityListValue(event) {
    let cityValue = $(event.target).text();
    if (cityValue) {
        const cityAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=351d28b4fbd0330fa3241a105d978dd6";
        fetchFuncCity(cityAPI, cityValue)
    } else {
        alert("please input a city")
    }

};

function getCityValue() {
    let cityValue = $("input").val();
    if (cityValue) {
        const cityAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=351d28b4fbd0330fa3241a105d978dd6";
        fetchFuncCity(cityAPI, cityValue)
    } else {
        alert("please input a city")
    }

};

function fetchFuncCity(url, cityValue) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
            fetchFunccoordinates(locationURL, cityValue);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("please input a valid city")
        });
}
function fetchFunccoordinates(url, cityValue) {
    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            $("input").val("")
            currentDayEl.text("")
            next5DaysEl.text("")
            console.log('Success:', data);
            if ($("button:contains(" + cityValue.toLowerCase() + ")").length <= 0) {
                $("#searchArea").append("<button type='button' class=' btn-dark my-2 list-group-item list-group-item-action text-capitalize' id = 'cityLists'  >" + cityValue.toLowerCase() + "</button>")
            }
            let weatherIcon = data.current.weather[0].icon
            let tempinF = 1.8 * (data.current.temp - 273.15) + 32;
            let humidityVal = data.current.humidity
            let windSpeed = data.current.wind_speed
            let uvIndex = data.current.uvi
            currentDayEl.append(cityValue.toLowerCase() + ": " + moment().format("dddd, MM/DD/YY") + " ")
            currentDayEl.append(" <img src = 'http://openweathermap.org/img/wn/" + weatherIcon + ".png'>")
            currentDayEl.append("<div class=' fw-semibold'> Temperature: " + tempinF.toPrecision(4) + " °F</div>")
            currentDayEl.append("<div class=' fw-semibold'> Humidity: " + humidityVal + "%</div>")
            currentDayEl.append("<div class=' fw-semibold'> Wind: " + windSpeed + " MPH</div>")
            currentDayEl.append("<div class=' fw-semibold' id ='uvIndex'> UV Index: </div>")
            if (uvIndex < 2) {
                $("#uvIndex").append("<span class='badge text-bg-success '>" + uvIndex + "</span>")
            } else if (uvIndex < 5) {
                $("#uvIndex").append("<span class='badge text-bg-warning '>" + uvIndex + "</span>")
            } else if (uvIndex < 8) {
                $("#uvIndex").append("<span class='badge text-bg-danger '>" + uvIndex + "</span>")
            } else {
                $("#uvIndex").append("<span class='badge text-bg-dark '>" + uvIndex + "</span>")
            }
            for (i = 1; i < 7; i++) {
                let weatherIcondays = data.daily[i].weather[0].icon
                let tempinFdays = 1.8 * (data.daily[i].temp.day - 273.15) + 32;
                let humidityValdays = data.daily[i].humidity
                let windSpeeddays = data.daily[i].wind_speed
                let fiveDaysCard = $("<div class=' col-2 fw-bold border-top border-secondary'></div>")
                fiveDaysCard.append(moment().add(i, 'days').format("dddd") + "<img src = 'http://openweathermap.org/img/wn/" + weatherIcondays + ".png'></img>");
                fiveDaysCard.append("<div class=' fw-semibold'> Temperature: " + tempinFdays.toPrecision(4) + " °F</div>")
                fiveDaysCard.append("<div class=' fw-semibold'> Humidity: " + humidityValdays + "%</div>")
                fiveDaysCard.append("<div class=' fw-semibold'> Wind: " + windSpeeddays + " MPH</div>")
                next5DaysEl.append(fiveDaysCard)
            }
            data.cityValue = cityValue
            localStorage.setItem('cityWeatherData', JSON.stringify(data))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

if (lastInput != null) {
    let lat = lastInput.lat;
    let lon = lastInput.lon;
    let cityValue = lastInput.cityValue;
    const locationURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=351d28b4fbd0330fa3241a105d978dd6"
    fetchFunccoordinates(locationURL, cityValue);
}

$("#searchBtn").click(
    getCityValue);

$("#searchArea").click(
    getCityListValue);