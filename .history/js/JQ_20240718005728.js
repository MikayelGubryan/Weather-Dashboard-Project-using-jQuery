var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var cityKey = "cb1bba0ee8fe4a0c91910829241607 ";

$(function () {
    $("#search-btn").click(function() {
        var city = $("#city-input").val();
        if (city !== "") {  
            fetchWeather(city);
        }
    });
});

function fetchWeather(city) {
    $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?key=${cityKey}&q=${city}&units=metric`,
        dataType: "json",
        method: "GET",
        success: function(data) {
            $("#weather-info").html("");
            displayWeather(data);
            
            var lat = data.location.lat;
            var lon = data.location.lon;
    
            map.setView([lat, lon], 10);
            
            if (typeof marker !== 'undefined') {
                map.removeLayer(marker);
            }
            
            var marker = L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${data.location.name}</b><br>${data.current.condition.text}`).openPopup();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Error:", errorThrown);
            $("#weather-info").html("Failed to fetch weather data. Please try again later.");
        }
    });
}


function displayWeather(data) {
    var weatherInfo = `
        <h2>${data.location.name}</h2>
        <h3>${data.location.region}, ${data.location.country}</h3>
        <h3>Local Time: ${data.location.localtime}</h3>
        <h3>Temperature: ${data.current.temp_c}°C / ${data.current.temp_f}°F</h3>
        <h3>Condition: ${data.current.condition.text}</h3>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
    `;
    $("#weather-info").html(weatherInfo);
}