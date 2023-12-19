// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 920e35b39de0a20b89ef32fa14367099
let $ = document;

const BackGround = $.getElementById("bg-image");
const SearchCity = $.getElementById("input");
const Btn = $.getElementById("btn");
const CityDes = $.getElementById("h1");
const Tempeture = $.getElementById("h2");
const Humidity = $.getElementById("p");
const Wind = $.getElementById("p1");
const TypeofWeather = $.getElementById("p2");
// const Container = $.getElementById("container");
const ContainerStyle = $.querySelector(".container");
// apikey
let ApiKey = "920e35b39de0a20b89ef32fa14367099";

// Random Image

let RandomImage = [
  "img/1.avif",
  "img/1dg.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg",
  "img/6.jpg",
];

let Random;

function ShowImage() {
  Random = Math.floor(Math.random() * RandomImage.length);
  $.body.style.backgroundImage = `url(${RandomImage[Random]})`;
  $.body.style.backgroundRepeat = "no-repeat";
  $.body.style.backgroundSize = `cover`;
  $.body.style.width = `100%`;
  $.body.style.height = `740px`;
}

ShowImage();

// weather api func

let Icons = [
  "icon/rain.png",
  "icon/cloudy.png",
  "icon/snow.png",
  "icon/storm.png",
  "icon/wind.png",
  "icon/sunrise.png",
  "icon/sunsets.png",
  "icon/cloud.png",
];

let Loading = document.createElement("div");
Loading.className = "Loading";

async function Search() {
  let weatherApi = await (
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${SearchCity.value}&appid=${ApiKey}`
    )
  ).json();
  ContainerStyle.appendChild(Loading);
  setTimeout(() => {
    Setinfo(weatherApi);
  }, 3000);
}

// set information weather
function Setinfo(info) {
  // none of loading
  Loading.style.display = "none";
  // name city
  let cityName = info["name"];
  CityDes.innerHTML = `Weather in ${cityName}`;
  // temperture in city
  let tempId = info["main"]["temp"];
  let CurrentTempid = tempId - 273;
  Tempeture.innerHTML = `${CurrentTempid.toFixed(1)}C`;
  // type of weather
  let Type = info["weather"][0]["main"];
  console.log(Type);
  if (Type === "Rain") {
    let seticon = Icons[0];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Clouds") {
    let seticon = Icons[1];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Sunrise") {
    let seticon = Icons[5];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Sunset") {
    let seticon = Icons[6];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Snow") {
    let seticon = Icons[2];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Storm") {
    let seticon = Icons[3];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else if (Type === "Wind") {
    let seticon = Icons[4];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  } else {
    let seticon = Icons[7];
    TypeofWeather.innerHTML = `<img src="${seticon}" class="img-fluid" style="width: 60px; height: 60px; position: relative; right: 10px;"/>${Type}`;
  }
  //   humidity in city
  let humidity = info["main"]["humidity"];
  Humidity.innerHTML = `Humidity : ${humidity}`;
  //wind speed of city
  let WindSpeed = info["wind"]["speed"];
  Wind.innerHTML = `Wind Weather : ${WindSpeed}km`;
}

Btn.addEventListener("click", Search);
