// console.log("Cloudy with a chance of meatballs.");

let searchedLocation = 'SanAnselmo,CA';

async function requestWeather() {
    const httpRequest = await $.ajax({
        method: "GET",
        // url: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sananselmo,ca?include=days,current,fcst&key=3D6EZXHLSVULQWKNPQNZGMSNW",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchedLocation}?key=3D6EZXHLSVULQWKNPQNZGMSNW`,
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

    const searchBar = $(`
        <form id='search-form'>
            <input id="search-bar" type="search" placeholder="Search Locations"></input>
        </form>
    `)
    $(currentWeather).append(searchBar);

    // const latAndLong = $('<p></p>');
    // $(latAndLong).html(`<p>${obj.latitude.toFixed(2)} &#176;N, ${obj.longitude.toFixed(2)} &#176;W</p>`);
    // $(currentWeather).append(latAndLong);

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
        <p>${currentTime(obj.timezone)}</p>\n
        <p>High ${obj.days[0].tempmax}&#176; // Low ${obj.days[0].tempmin}&#176;</p>\n
        <p>Feels Like: ${obj.currentConditions.feelslike}&#176;F</p>\n
        <p>Humidity: ${obj.currentConditions.humidity} %</p>\n
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
        const date = (`
            <p>${getTheDate(obj.days[i].datetimeEpoch, obj.timezone)}</p>\n
            <p>${dayOfWeek(obj.days[i].datetimeEpoch, obj.timezone)}</p>
        `);
        $(dateTile).html(date);
        $(forecastCard).append(dateTile);

        const iconTile = $('<div class="icon-tile"></div>');
        const iconTitleContent = $(`<p class="verySans">${obj.days[i].conditions}</p>\n<img src="icons/${obj.days[i].icon}.svg"></img>`)
        $(iconTile).html(iconTitleContent);
        $(forecastCard).append(iconTile);

        const forecastInfo = $(`<div class="forecast-info"></div>`);
        const forecastInfoContent = $(`
            <p>High ${obj.days[i].tempmax}&#176; // Low ${obj.days[i].tempmin}&#176;</p>\n
  
            <p>${obj.days[i].precipprob}% Precipitation</p>
            <p>${obj.days[i].description}</p>
        `);
        $(forecastInfo).html(forecastInfoContent);
        $(forecastCard).append(forecastInfo);

        $(forecastWeather).append(forecastCard);
    }
}

function getTheDate(epochNum, timeZone, switchControl) {
    const date = new Date(epochNum*1000);
    const options = { timeZone: `${timeZone}`};
    const tzDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return tzDate;
};

function currentTime(timeZone) {
    const date = Date.now();
    const options = { hour: 'numeric', minute: 'numeric', timeZone: `${timeZone}`};
    const tzTime = new Intl.DateTimeFormat('en-US', options).format(date);
    return tzTime;
}

function dayOfWeek(epochNum, timeZone) {
    const date = new Date(epochNum*1000);
    const options = { weekday: 'short', timeZone: `${timeZone}`};
    const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
    return weekday;
}

$(document).submit('#search-form', () => {
    console.log('submitted');
    const input = document.getElementById('search-bar')
    console.log(input.value);
    searchedLocation = input.value;
    $('#search-bar').val('')
    return false;
})

requestWeather(); 

