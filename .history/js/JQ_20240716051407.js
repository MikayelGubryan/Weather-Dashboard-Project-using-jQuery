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
            console.log(err);
        }
    })

}