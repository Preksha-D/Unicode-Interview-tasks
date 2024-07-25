

const apiKey ="ab08503e705986029505cbb32d8337f3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const photo = document.querySelector(".photo");
const c = document.querySelector(".c");
const f = document.querySelector(".f");
var unit;

c.addEventListener("click", ()=>{
    unit = "metric";
})

f.addEventListener("click", ()=>{
    unit = "imperial";
})

async function checkWeather(city, unit){
    const response = await fetch(apiUrl + city +`&units=` +unit + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) +"°C";
    document.querySelector(".wind h4").innerHTML = Math.round(data.wind.speed) + "kmph";
    document.querySelector(".humid h4").innerHTML = data.main.humidity + "%";
    document.querySelector(".weather").innerHTML = data.weather[0].main;

    if(data.weather[0].main == "Clear"){
        photo.src = "Pictures/Sunny_cat.jpg";
        document.querySelector(".temp").style.color = "#ffffff";
        document.querySelector(".city").style.color = "#ffffff";
    }
    else if(data.weather[0].main == "Wind"){
        photo.src = "Pictures/windy.png";
        document.querySelector(".temp").style.color = "#03045E";
        document.querySelector(".city").style.color = "#03045E";
    }
    else if(data.weather[0].main == "Rain"){
        photo.src = "Pictures/rainy.jpg";
        document.querySelector(".temp").style.color = "#ffffff";
        document.querySelector(".city").style.color = "#ffffff";
    }
    else if(data.weather[0].main == "Clouds"){
        photo.src = "Pictures/cloudy2.jpg";
        document.querySelector(".temp").style.color = "#ffffff";
        document.querySelector(".city").style.color = "#ffffff";
    }
    else if(data.weather[0].main == "Snow"){
        photo.src = "Pictures/snowy.jpg";
        document.querySelector(".temp").style.color = "#ffffff";
        document.querySelector(".city").style.color = "#ffffff";
    }
    else if(data.weather[0].main == "Mist"){
        photo.src = "Pictures/mist.jpg";
        document.querySelector(".temp").style.color = "#03045E";
        document.querySelector(".city").style.color = "#03045E";
    }
    else if(data.weather[0].main == "Drizzle"){
        photo.src = "Pictures/rainy.jpg";
        document.querySelector(".temp").style.color = "#ffffff";
        document.querySelector(".city").style.color = "#ffffff";
    }
    else if(data.weather[0].main == "Haze"){
        photo.src = "Pictures/mist.jpg";
        document.querySelector(".temp").style.color = "#03045E";
        document.querySelector(".city").style.color = "#03045E";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
    searchBox.value="";
})

searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  });