// console.log("Cloudy with a chance of meatballs.");

async function requestWeather() {
    const httpRequest = await $.ajax({
        method: "GET",
        // url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?include=days,current,fcst&key=3D6EZXHLSVULQWKNPQNZGMSNW",
        url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?key=3D6EZXHLSVULQWKNPQNZGMSNW",
        success: function(response){
            console.log(response);
            postCurrentWeather(response);
            postForecast(response);
        }
    })
}

function postCurrentWeather(obj) {
    const currentWeather = $('#current-container');

    const currentLocation = $('<h1></h1>');
    $(currentLocation).html(obj.resolvedAddress);
    $(currentWeather).append(currentLocation);

    const latAndLong = $('<p></p>');
    $(latAndLong).html(`${obj.latitude.toFixed(2)} &#176;N, ${obj.longitude.toFixed(2)} &#176;W`);
    $(currentWeather).append(latAndLong);

    const todaysWeatherCard = $(`<div id="today" class="current-card"></div`);
    $(currentWeather).append(todaysWeatherCard);

    const todayTitle = $('<h1>Current Weather</h1>');
    $(todaysWeatherCard).append(todayTitle);

    const todayContainer = $('<aside id="today-container"></aside>');
    $(todaysWeatherCard).append(todayContainer);

    const iconTile = $('<div id="icon-tile"></div>');
    $(iconTile).html(`<h5>Condition</h5>\n<img src="icons/${obj.currentConditions.icon}.svg"></img>`);
    $(todayContainer).append(iconTile);

    const todayInfo = $('<div id="today-info"></div>');
    $(todayInfo).html(`<p>${obj.currentConditions.temp}</p>\n<p>${obj.currentConditions.feelslike}</p>`);
    $(todayContainer).append(todayInfo);
}

function postForecast(obj) {
    const forecastWeather = $('#forecast-container');

    const forecastTitle = $('<h1>3-Day Forecast</h1>');
    $(forecastWeather).append(forecastTitle);
    
    for (let i = 1; i < 4; i++) {
        const forecastCard = $('<aside class="forecast-card"></aside>');

        const dateTile = $('<div class="date-tile"></div>');
        const dayOfWeek = (`<p>${obj.days[i].datetime}</p>\n<p>MM/DD</p>`);
        $(dateTile).html(dayOfWeek);
        $(forecastCard).append(dateTile);

        const iconTile = $('<div id="icon-tile"></div>');
        const iconTitleContent = $(`<h5>${obj.days[i].conditions}</h5>\n<img src="icons/${obj.days[i].icon}.svg"></img>`)
        $(iconTile).html(iconTitleContent);
        $(forecastCard).append(iconTile);

        const forecastInfo = $(`<div class="forecast-info"></div>`);
        const forecastInfoContent = $(`<p>High <strong>${obj.days[i].tempmax}&#176;</strong> // Low <strong>${obj.days[i].tempmin}&#176;</strong></p>`);
        $(forecastInfo).html(forecastInfoContent);
        $(forecastCard).append(forecastInfo);

        $(forecastWeather).append(forecastCard);
    }
}

requestWeather(); 