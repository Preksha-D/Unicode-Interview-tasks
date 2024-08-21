

const apiKey ="ab08503e705986029505cbb32d8337f3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const favBtn = document.querySelector(".heart");
const photo = document.querySelector(".photo");
const saveData = document.querySelector(".favdata");
let heart = document.querySelector(".heart img");
const c = document.querySelector(".c");
const f = document.querySelector(".f");
var help = false;
var unit;
var saveCity;
var ahh = [];

c.addEventListener("click", ()=>{
    unit = "metric";
    checkWeather(city, unit);
    document.querySelector(".c p").style.fontSize = "25px";
    document.querySelector(".c p").style.fontWeight = "500";
    document.querySelector(".f p").style.fontSize = "15px";
    document.querySelector(".f p").style.fontWeight = "200";
})

f.addEventListener("click", ()=>{
    unit = "imperial";
    checkWeather(city, unit);
    document.querySelector(".f p").style.fontSize = "25px";
    document.querySelector(".f p").style.fontWeight = "500";
    document.querySelector(".c p").style.fontSize = "15px";
    document.querySelector(".c p").style.fontWeight = "200";
})

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const d = new Date();
document.getElementById("date").innerHTML = d.getDate()+ " " + months[d.getMonth()];
document.getElementById("day").innerHTML ="    " + days[d.getDay()];

async function checkWeather(city, unit){
    if (!unit) {
        unit = "metric";
        document.querySelector(".c p").style.fontSize = "25px";
        document.querySelector(".c p").style.fontWeight = "500";
        document.querySelector(".f p").style.fontSize = "15px";
        document.querySelector(".f p").style.fontWeight = "200";
    }
    const response = await fetch(apiUrl + city +`&units=${unit}&appid=${apiKey}`);
    var data = await response.json();
    if(!data.name){
        document.querySelector(".extra").style.display = "none";
        document.querySelector(".wlc").style.display = "none";
        document.querySelector(".uhoh").style.display = "flex";
        document.querySelector(".temp").style.display = "none";
        document.querySelector(".city").style.display = "none";
        photo.src = "Pictures/uhoh.jpg";
    }
    
    document.querySelector(".weather").innerHTML = data.weather[0].main;
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humid h4").innerHTML = data.main.humidity + "%";

    if (ahh.includes(data.name)==true){
        heart.src="Pictures/heart.png";
    }
    else {
        heart.src="Pictures/noheart.png";
    }
    
    if (unit == "metric"){
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) +"°C";
        document.querySelector(".wind h4").innerHTML = Math.round(data.wind.speed) + "kmph";
    }
    else if (unit == "imperial"){
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".feels").innerHTML = "Feels like " + Math.round(data.main.feels_like) +"°F";
        document.querySelector(".wind h4").innerHTML = Math.round(data.wind.speed) + "mph";
    }

    document.querySelector(".extra").style.display = "block";
    document.querySelector(".wlc").style.display = "none";
    document.querySelector(".uhoh").style.display = "none";
    document.querySelector(".heart").style.visiblity = "visible";

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
    saveCity = data.name;
    searchBox.value='';   
}
favBtn.addEventListener("click",()=>{
    favCity(saveCity);
    heartIcon(saveCity);
    getFavoriteCities();
    console.log(ahh);
})

searchBtn.addEventListener("click", ()=>{
    city = searchBox.value;
    checkWeather(city, unit);
})

searchBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
})

function setCookie (id){
    document.cookie = id + "=" + id + ";path=/";
}
function getCookie(id) {
    let name = id + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
function deleteCookie (id){
    document.cookie = id + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function favCity(city){
    if (getCookie(city)){
        deleteCookie(city);
        ahh = ahh.filter(c => c !== city);
    }
    else {
        setCookie(city);
        ahh.push(city);
    }
}

 function heartIcon(city){
    if (ahh.includes(city)==true){
        heart.src="Pictures/heart.png";
    }
    else {
        heart.src="Pictures/noheart.png";
    }
 }

function getFavoriteCities() {
    saveData.innerHTML = "";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        let city = c.split("=")[1];
        ahh[i] = c.split("=")[1];
        var li = document.createElement("h2");
        li.textContent = getCookie(city);
        li.addEventListener("click",()=>{
            checkWeather(city,unit);
        })
        saveData.appendChild(li);
    }
}


