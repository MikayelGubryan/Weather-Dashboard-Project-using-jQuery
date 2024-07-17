// Initialize Leaflet map
var map = L.map('map').setView([0, 0], 2); // Initial view at lat 0, lng 0, zoom level 2

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to fetch weather data and display on map
$(function () {
    var cityKey = "cb1bba0ee8fe4a0c91910829241607";
    
    $("#search-btn").click(function() {
        var city = $("#city-input").val();
        if (city !== "") {  
            fetchWeather(city);
        }
    });
});

function fetchWeather(city) {
    $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?key=${cityKey}&q=${city}`,
        dataType: "json",
        method: "GET",
        data: {
            q: city,
            key: cityKey,
            units: "metric"
        },
        success: function(data) {
            displayWeather(data);
            
            // Update map to show location of city
            var lat = data.location.lat;
            var lon = data.location.lon;
            map.setView([lat, lon], 10); // Zoom level 10, adjust as needed
            
            // Add marker for city
            L.marker([lat, lon]).addTo(map)
                .bindPopup(`<b>${data.location.name}</b><br>${data.current.condition.text}`).openPopup();
        },
        error: function(err) {
            $("#weather-info").html("Something went wrong, please try again");  
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
