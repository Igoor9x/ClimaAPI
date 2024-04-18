// Variaveis e seleção de elementos
const apiKey = "34b8cffc56df805ff2267f3d76abf20d";
const apiCountryURL = "https://flagsapi.com/" // /flat/64.png

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search");
const container = document.querySelector(".container");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temperature span");
const descElement = document.querySelector(".description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector(".umidity span");
const windElement = document.querySelector(".wind span");

const  countryImg = document.querySelector(".weather-data img");
const weatherContainer = document.querySelector(".weather-data");

// Funções

const getWeatherData = async(city) => {
    // essa é a requisição da API pelo URL 
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}; 

    const showWeatherData = async (city) => {
        const data = await getWeatherData(city);

        cityElement.innerHTML = data.name;
        tempElement.innerHTML = parseInt(data.main.temp);
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        umidityElement.innerHTML = (`${data.main.humidity}%`);
        windElement.innerHTML = (`${data.wind.speed} Km/h`);

        weatherContainer.classList.remove("hide");

    }

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityInput.value;
    container.style.backgroundImage(url(`https://source.unsplash.com/random/3000x3000?${cityInput.value}`))

    showWeatherData(city);
});
cityInput.addEventListener("keyup", (e) =>{
    if(e.code==="Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});
