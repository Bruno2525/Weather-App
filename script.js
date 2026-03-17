async function getWeather() {
    let city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Digite uma cidade!");
        return;
    }

    document.getElementById("loading").textContent = "⏳ Carregando...";
    document.getElementById("cityName").textContent = "";
    document.getElementById("temperature").textContent = "";
    document.getElementById("wind").textContent = "";
    document.getElementById("humidity").textContent = "";
    document.getElementById("time").textContent = "";
    document.getElementById("weatherType").textContent = "";

    try {
        let geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;

        let geoResponse = await fetch(geoUrl);
        let geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById("loading").textContent = "";
            alert("Cidade não encontrada!");
            return;
        }

        let latitude = geoData.results[0].latitude;
        let longitude = geoData.results[0].longitude;
        let cityName = geoData.results[0].name;

        let weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;

        let weatherResponse = await fetch(weatherUrl);
        let weatherData = await weatherResponse.json();

        let temperature = weatherData.current.temperature_2m;
        let wind = weatherData.current.wind_speed_10m;
        let humidity = weatherData.current.relative_humidity_2m;
        let time = weatherData.current.time;
        let weatherCode = weatherData.current.weather_code;

        let weatherText = "";
let weatherIcon = "";

if (weatherCode === 0) {
    weatherText = "Céu limpo";
    weatherIcon = "☀️";
} else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
    weatherText = "Parcialmente nublado";
    weatherIcon = "⛅";
} else if (weatherCode === 45 || weatherCode === 48) {
    weatherText = "Neblina";
    weatherIcon = "🌫️";
} else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
    weatherText = "Garoa";
    weatherIcon = "🌦️";
} else if (weatherCode === 56 || weatherCode === 57) {
    weatherText = "Garoa congelante";
    weatherIcon = "🧊";
} else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
    weatherText = "Chuva";
    weatherIcon = "🌧️";
} else if (weatherCode === 66 || weatherCode === 67) {
    weatherText = "Chuva congelante";
    weatherIcon = "🧊🌧️";
} else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
    weatherText = "Neve";
    weatherIcon = "❄️";
} else if (weatherCode === 77) {
    weatherText = "Grãos de neve";
    weatherIcon = "🌨️";
} else if (weatherCode === 80 || weatherCode === 81 || weatherCode === 82) {
    weatherText = "Pancadas de chuva";
    weatherIcon = "🌦️";
} else if (weatherCode === 85 || weatherCode === 86) {
    weatherText = "Pancadas de neve";
    weatherIcon = "🌨️";
} else if (weatherCode === 95) {
    weatherText = "Tempestade";
    weatherIcon = "⛈️";
} else if (weatherCode === 96 || weatherCode === 99) {
    weatherText = "Tempestade com granizo";
    weatherIcon = "⛈️🧊";
} else {
    weatherText = "Clima não identificado";
    weatherIcon = "🌍";
}

        document.getElementById("cityName").textContent = cityName;
        document.getElementById("temperature").textContent = "🌡 Temperatura: " + temperature + "°C";
        document.getElementById("wind").textContent = "🌬 Vento: " + wind + " km/h";
        document.getElementById("humidity").textContent = "💧 Umidade: " + humidity + "%";
        document.getElementById("time").textContent = "🕒 Horário da medição: " + time;
        document.getElementById("weatherType").textContent = weatherIcon + " Clima: " + weatherText;
        document.getElementById("loading").textContent = "";

    } catch (error) {
        document.getElementById("loading").textContent = "";
        alert("Erro ao buscar os dados do clima");
        console.error(error);
    }
}

let input = document.getElementById("cityInput");

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});