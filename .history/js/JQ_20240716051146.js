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