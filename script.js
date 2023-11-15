const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

async function consultarAPI(ciudad) {
    try {
        const direccion = apiUrl + ciudad + '&appid=' + apiKey;
        const response = await axios.get(direccion);
        return response.data;
    } catch (error) {
        console.error(`Falló la petición a la API con error: ${error.message}`);
        return null; // Devolver null en caso de error para evitar problemas más adelante
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.weather-icon');
    const temp = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');

    searchButton.addEventListener("click", async function () {
        const inputValue = searchInput.value.toLowerCase();
        
        // Esperar a que se resuelva la promesa antes de actualizar la información
        const data = await consultarAPI(inputValue);
        
        if (data) {
            const roundedTemp = Math.round(data.main.temp);
            temp.textContent = `${roundedTemp} °C`;
            city.textContent = data.name;
            const weatherMain = data.weather[0].main;
            updateWeatherIcon(weatherMain);
            humidity.textContent = `${data.main.humidity} %`;
            wind.textContent = `${data.wind.speed} km/h`;

        }
    });

    function updateWeatherIcon(weatherMain) {
        // Mapea el valor de "weatherMain" a la ruta de la imagen
        const imagePaths = {
            "Clouds": "images/clouds.png",
            "Clear": "images/clear.png",
            "Rain": "images/rain.png",
            "Drizzle": "images/drizzle.png",
            "Mist": "images/mist.png"
        };
        //Poner la imagen en la clase weather-icon
        const imagePath = imagePaths[weatherMain];
        weatherIcon.src = imagePath;
    }
});
