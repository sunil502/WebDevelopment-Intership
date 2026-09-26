
const API_KEY = "YOUR_API_KEY";

const API_URL =
    "https://api.openweathermap.org/data/2.5/weather";



const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const message =
    document.getElementById("message");

const weatherResult =
    document.getElementById("weatherResult");

const cityName =
    document.getElementById("cityName");

const countryName =
    document.getElementById("countryName");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const condition =
    document.getElementById("condition");

const humidity =
    document.getElementById("humidity");

const feelsLike =
    document.getElementById("feelsLike");

const windSpeed =
    document.getElementById("windSpeed");

const updatedTime =
    document.getElementById("updatedTime");



async function getWeather() {

    const city = cityInput.value.trim();

    
    if (city === "") {

        showMessage(
            "Please enter a city name."
        );

        weatherResult.classList.remove("show");

        return;
    }


    
    if (
        API_KEY === "YOUR_API_KEY" ||
        API_KEY === ""
    ) {

        showMessage(
            "Please add your OpenWeather API key in script.js."
        );

        weatherResult.classList.remove("show");

        return;
    }


    try {

        showMessage("Loading weather...");


        
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );


        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "City not found. Please check the city name."
                );

            }

            if (response.status === 401) {

                throw new Error(
                    "Invalid API key. Please check your OpenWeather API key."
                );

            }

            throw new Error(
                "Unable to fetch weather data."
            );
        }


        

        const data = await response.json();


        

        displayWeather(data);


        showMessage("");

        weatherResult.classList.add("show");

    }

    catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        showMessage(
            error.message
        );

        weatherResult.classList.remove("show");
    }
}




function displayWeather(data) {

    // City
    cityName.textContent =
        data.name;


    // Country
    countryName.textContent =
        data.sys.country;


    // Temperature
    temperature.textContent =
        Math.round(data.main.temp);


    // Weather condition
    condition.textContent =
        data.weather[0].description;


    // Humidity
    humidity.textContent =
        `${data.main.humidity}%`;


    // Feels like
    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;


    // Wind speed
    windSpeed.textContent =
        `${data.wind.speed} m/s`;


    // Weather icon
    const iconCode =
        data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;


    // Current update time
    const currentTime =
        new Date();

    updatedTime.textContent =
        `Last searched: ${currentTime.toLocaleString("en-IN")}`;
}




function showMessage(text) {

    message.textContent = text;
}




searchBtn.addEventListener(
    "click",
    getWeather
);




cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            getWeather();
        }
    }
);

