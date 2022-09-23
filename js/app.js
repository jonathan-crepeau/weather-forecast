// console.log("Cloudy with a chance of meatballs.");

async function requestWeather() {
    const httpRequest = await $.ajax({
        method: "GET",
        // url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?include=days,current,fcst&key=3D6EZXHLSVULQWKNPQNZGMSNW",
        url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/exeter,nh?key=3D6EZXHLSVULQWKNPQNZGMSNW",
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

    const todayTitle = $('<h1>&nbsp;Current Weather</h1>');
    $(todaysWeatherCard).append(todayTitle);

    const todayContainer = $('<aside id="today-container"></aside>');
    $(todaysWeatherCard).append(todayContainer);

    const iconTile = $('<div id="icon-tile"></div>');
    // $(iconTile).html(`<h2>${obj.currentConditions.conditions}</h2>\n<img src="icons/${obj.currentConditions.icon}.svg"></img>`);
    $(iconTile).html(`<p id="today-condition" class="verySans">${obj.currentConditions.conditions}</p>\n
    <div id="tempCircleOuter">
    <div id="tempCircleInner">${obj.currentConditions.temp}<span id="degreeF">&#176;F</span></div>
    </div>`);
    $(todayContainer).append(iconTile);

    const todayInfo = $('<div id="today-info"></div>');
    var d = new Date(0);
    ;
    $(todayInfo).html(`
        <p>${obj.currentConditions.datetime}</p>\n
        <p>Feels Like: ${obj.currentConditions.feelslike}&#176;F</p>\n
        <p>Humidity: ${obj.currentConditions.humidity} %</p>\n
        <p>Dew Point: ${obj.currentConditions.dew} F</p>\n
        <img src="icons/${obj.currentConditions.icon}.svg"></img>
        <p>${obj.description}</p>
        
     `);
    $(todayContainer).append(todayInfo);
}

function postForecast(obj) {
    const forecastWeather = $('#forecast-container');

    const forecastTitle = $('<h1>&nbsp;3-Day Forecast</h1>');
    $(forecastWeather).append(forecastTitle);
    
    for (let i = 1; i < 4; i++) {
        const forecastCard = $('<aside class="forecast-card"></aside>');

        const dateTile = $('<div class="date-tile"></div>');
        const dayOfWeek = (`
            <p>${obj.days[i].datetime}</p>\n
            <p>${getTheDate(obj.days[i].datetimeEpoch)}</p>
        `);
        $(dateTile).html(dayOfWeek);
        $(forecastCard).append(dateTile);

        const iconTile = $('<div class="icon-tile"></div>');
        const iconTitleContent = $(`<p class="verySans">${obj.days[i].conditions}</p>\n<img src="icons/${obj.days[i].icon}.svg"></img>`)
        $(iconTile).html(iconTitleContent);
        $(forecastCard).append(iconTile);

        const forecastInfo = $(`<div class="forecast-info"></div>`);
        const forecastInfoContent = $(`
            <p>High <strong>${obj.days[i].tempmax}&#176;</strong> // Low <strong>${obj.days[i].tempmin}&#176;</strong></p>\n
  
            <p>${obj.days[i].precipprob}% Precipitation</p>
            <p>${obj.days[i].description}</p>
        `);
        $(forecastInfo).html(forecastInfoContent);
        $(forecastCard).append(forecastInfo);

        $(forecastWeather).append(forecastCard);
    }
}

function getTheDate(epochNum) {
    const date = new Date(epochNum*1000);
    const day = date.getDate();
    const month = (date.getMonth() + 1)
    return `${month}/${day}`
}

requestWeather(); 