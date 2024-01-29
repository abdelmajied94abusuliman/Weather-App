function fetchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const pressure = document.getElementById('pressure');
    const wind = document.getElementById('wind');
    const humidity = document.getElementById('humidity');
    const country = document.getElementById('country');
    const weatherIcon = document.getElementById('weatherIcon');
    const error = document.getElementById('error');
    const loadingIndicator = document.getElementById('loadingIndicator');

    weatherInfo.style.display = 'none';
    error.textContent = '';

    if (cityInput.trim() === '') {
        error.textContent = 'Please enter a city.';
        return;
    }

    loadingIndicator.style.display = 'block';

    fetch(`./backend/data.php?city=${encodeURIComponent(cityInput)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            if (data.error) {
                error.textContent = data.error;
            } else {
                console.log('no data error')
                weatherInfo.style.display = 'block';
                temperature.textContent = `Temperature: ${data.temperature} °C`;
                description.textContent = `Weather: ${data.description}`;
                pressure.textContent = `Pressure: ${data.pressure} hPa`;
                wind.textContent = `Wind: ${data.wind} m/s`;
                humidity.textContent = `Humidity: ${data.humidity}%`;
                country.textContent = `Country: ${data.country}`;
                weatherIcon.src = `http://openweathermap.org/img/wn/${data.icon}.png`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            error.textContent = 'Failed to fetch weather data. Please try again.';
        })
        .finally(() => {
            loadingIndicator.style.display = 'none';
        });
}
