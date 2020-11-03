//current weather infos url details
var cityName = "new york";
var url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
var apiKey = "&appid=e6b99f8b23ea4781b6c7e0ac40e7101f";
var iconUrl = "http://openweathermap.org/img/wn/";
var iconExt = "@2x.png";
//pixabay (images) url details
var urlP = "https://pixabay.com/api/?image_type=photo&pretty=true&&q=";
var apikeyP = "&key=13099347-347f019cc9542fc3d10c5ad06";
//Next week weather infos url details
var urlNW = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

//Main function:Text input function
function getCity() {
    let cityName = document.getElementsByTagName("input")[0].value;
    if (!cityName == "") {
        if (!/\d/.test(cityName)) {
            callFetchPic(urlP + cityName + apikeyP);
            callFetchCW(url + cityName.toLowerCase() + apiKey);
            callFetchNW(urlNW + cityName.toLowerCase() + apiKey);
        } else window.alert("Type your city name correctly!!");
    } else window.alert("Type your city name!!");
}
//Delete the old html items before replacing them with new Data
function deletInfo(className) {
    let par = document.getElementsByClassName(className)[0];
    let childsC = par.children;
    let childsArray = [];
    for (let i = 0; i < childsC.length; i++) childsArray.push(childsC.item(i));
    for (let i = 0; i < childsArray.length; i++) childsArray[i].remove();
}
//Building html items of Current weather data
function infoWTday(data) {
    let img = document.createElement("img");
    img.src = iconUrl + data.weather[0].icon + iconExt;
    img.setAttribute("alt", "Weather Icon");
    let par = document.getElementsByClassName("weatherInfo")[0];
    par.appendChild(img);
    let ul = document.createElement("ul");
    /*create & appending List Items elements into ul */
    let liArray = [];
    for (let i = 0; i < 5; i++) liArray.push(document.createElement("li"));
    let textNode = document.createTextNode(data.weather[0].description);
    liArray[0].appendChild(textNode);
    ul.appendChild(liArray[0]);
    textNode = document.createTextNode("T:" + data.main.temp + "f-" + ((data.main.temp - 32) * 0.5556).toFixed(2) + "C");
    liArray[1].appendChild(textNode);
    ul.appendChild(liArray[1]);
    textNode = document.createTextNode("Humidity:" + data.main.humidity + "%");
    liArray[2].appendChild(textNode);
    ul.appendChild(liArray[2]);
    textNode = document.createTextNode("Wind speend:" + data.wind.speed + "m/s");
    liArray[3].appendChild(textNode);
    ul.appendChild(liArray[3]);
    textNode = document.createTextNode("Wind deg:" + data.wind.deg);
    liArray[4].appendChild(textNode);
    ul.appendChild(liArray[4]);
    par.appendChild(ul);
}
//Building html items of The location
function placeInfo(data) {
    let par = document.getElementsByClassName("weatherInfo")[0];
    let ul = document.createElement("ul");
    let liArray = [];
    for (let i = 0; i < 3; i++) liArray[i] = document.createElement("li");
    let textNode = document.createTextNode(data.sys.country);
    liArray[0].appendChild(textNode);
    ul.appendChild(liArray[0]);
    textNode = document.createTextNode(data.name);
    liArray[1].appendChild(textNode);
    ul.appendChild(liArray[1]);
    par.appendChild(ul);

}
//Building html items of next days weather data
function infoWN(data) {
    var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let i = 1;
    let par = document.getElementsByClassName("nextDays")[0];
    do {
        let a = document.createElement("a");
        let img = document.createElement("img");
        img.src = iconUrl + data.list[i * 8].weather[0].icon + iconExt;
        img.setAttribute("alt", "Weather Icon");
        let day = new Date(data.list[i * 8].dt_txt);
        let textNode = document.createTextNode(daysOfWeek[day.getDay()]);
        a.appendChild(textNode);
        let br = document.createElement("br");
        a.appendChild(br);
        a.appendChild(img);
        let b = document.createElement("br");
        a.appendChild(b);
        textNode = document.createTextNode(data.list[i * 8].main.temp + "C");
        a.appendChild(textNode);
        par.appendChild(a);
        i++;
    } while (i <= 4)
}
//fetch api with current data URL
function callFetchCW(url) {
    fetch(url).then((response) => {
            if (!response.ok) throw Error("there is something wrong with fetching the API!!");
            return response.json();
        }).then((data) => {
            //the building html pages should be passed here!!
            deletInfo("weatherInfo");
            infoWTday(data);
            placeInfo(data);
            console.log(data);
        })
        .catch((err) => {
            window.alert("Type your city name correctly!!");
        });
}
//fetch api with pxiabay URL (pictures)
function callFetchPic(url) {
    fetch(url).then((response) => {
            if (!response.ok) throw Error("there is something wrong with fetching the API!!");
            return response.json();
        }).then((data) => {
            let img = document.getElementsByClassName("fullImg")[0];
            img.src = data.hits[0].webformatURL;
        })
        .catch((err) => {
            console.log(err);
        });
}
//fetch api with Next days weather data URL 
function callFetchNW(url) {
    fetch(url).then((response) => {
            if (!response.ok) throw Error("there is something wrong with fetching the API!!");
            return response.json();
        }).then((data) => {
            console.log(data);
            deletInfo("nextDays");
            infoWN(data);
        })
        .catch((err) => {
            window.alert("Type your city name correctly!!");
        });
}