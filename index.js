let apiKey = '01f4f6c6a04c0d195f968f5c8f62b28c';

// Function to get weather data and display it
const sWeather = () => {
    let city = document.getElementById('location').value;
    const weatherInfoDiv = document.getElementById('weatherInfo');
    
    // Display "Loading..." text
    weatherInfoDiv.innerHTML = '<p>Loading...</p>';

    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=${city}`;
    
    // Fetch data from the API
    fetch(url)
        .then(responsive => responsive.json())
        .then(data => {
            // Check if the response is successful
            if (data.cod === 200) {
                console.log(data);

                // Extract relevant data
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const pressure = data.main.pressure;
                const cityName = data.name;
                const country = data.sys.country;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;
                const main = data.weather[0].main;

                // Create HTML content to display the weather data
                const weatherHtml = `
                    <h2>Weather in ${cityName}, ${country}</h2>
                    <div class="weather-details">
                        <p><strong>Temperature:</strong> ${temperature}°C</p>
                        <p><strong>Humidity:</strong> ${humidity}%</p>
                        <p><strong>Pressure:</strong> ${pressure} hPa</p>
                    </div>
                    <div>${description}...${icon}...${main}</div>
                `;

                // Insert the weather data into the weatherInfo div
                weatherInfoDiv.innerHTML = weatherHtml;
            } else {
                // Handle errors (e.g., city not found)
                weatherInfoDiv.innerHTML = `<p>City not found, please try again.</p>`;
            }
        })
        .catch(error => {
            // Handle network errors
            weatherInfoDiv.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        });
}