const { type } = require("jquery");

$(document).ready(function () {
    var cityKey = "cb1bba0ee8fe4a0c91910829241607";
    $("#search-btn").click(function() {
        var city = $("#city-input").val();
        if(city = "") {
            fetchWeather(city);
        }
    })
});

function fetchWeather(city) {
    $.ajax({
        url: `https://api.weatherapi.com/v1/current.json?key=${cityKey}&q=${city}`,
        data-type: "json",
        method: "GET",
        data: {
            q: city,
            appid: cityKey,
            units: "metric"
        },
        success: function(data) {
            displayWeather(data);
        },
        error: function(err) {
            $("weather-info").html("Something is wrong, please try again");
        }
    })

}

function displayWeather(data) {
    var watherInfo = `<h2>${data.location.name}</h2>
    <h3>${data.location.region}</h3>
    <h3>${data.location.country}</h3>
    <h3>${data.location.localtime}</h3>
    <h3>${data.current.temp_c}°C</h3>
    <h3>${data.current.temp_f}°F</h3>
    
}