document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '8bbf3610dfc9c83174e9c112b05da58f';

    const cityInput = document.getElementById('cityInput');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherBtn.addEventListener('click', function () {
        const cityName = cityInput.value;

        if (cityName.trim() === '') {
            alert('Bitte gib den Namen einer Stadt ein.');
            return;
        }

        const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('API-Antwort:', data);
                displayWeather(data);
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Wetterdaten:', error);
                alert('Fehler beim Abrufen der Wetterdaten. Überprüfe deine Eingabe und versuche es erneut.');
            });
    });

    function displayWeather(data) {
        if (data && data.location && data.location.name) {
            const cityName = data.location.name;
            const temperature = data.current.temperature;
            const weatherDescription = data.current.weather_descriptions[0];

            const resultHtml = `
                <p><strong>Stadt:</strong> ${cityName}</p>
                <p><strong>Temperatur:</strong> ${temperature} °C</p>
                <p><strong>Beschreibung:</strong> ${weatherDescription}</p>
            `;

            weatherResult.innerHTML = resultHtml;
        } else {
            console.error('Ungültige oder fehlende Daten in der API-Antwort.');
            alert('Fehler beim Abrufen der Wetterdaten. Überprüfe deine Eingabe und versuche es erneut.');
        }
    }
});
