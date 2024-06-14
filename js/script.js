
/*

**********      WELCOME TO THE JAVASCRIPT SECTION FOR MAUSAM2.0      **********

all console.log()'s have been commented out for a cleaner and faster reponse,execution of the website

if you wish to see the working of the javascript functions and declarations you can uncomment and see

the respective console.log()

*/

const APIKey = "dbe7b212bbd9a2a575d75e6ed7c02a46";
const APIurl =
"https://api.openweathermap.org/data/2.5/weather?appid=dbe7b212bbd9a2a575d75e6ed7c02a46&units=metric";

var latt;
var long;
var count = 0;

function details(alldata){
  var sunrisetime=alldata.sys.sunrise;
    var sunsetime=alldata.sys.sunset;
    var srtime=convertUnixTimestampToHumanTime(sunrisetime);
    var sstime=convertUnixTimestampToHumanTime(sunsetime);
    //console.log(srtime);
    //console.log(sstime);
  let words = alldata.weather[0].main;
  //console.log(words);
  var symbl = alldata.weather[0].icon;
  //console.log(symbl);
  var iconUrl = `../assets/wicons/${symbl}.svg`;
  //console.log(iconUrl);
  // City and country
  document.getElementById("cityname").innerHTML = alldata.name;
  document.getElementById("country").innerText = alldata.sys.country;
  //bottomintel
  document.getElementById("symbl").style.backgroundImage = `url("${iconUrl}")`;
  //   use of back tick was essential to get the iconUrl reccognized as string variable other it doesn't work
  //   with the common single-quote double-quote method
  document.getElementById("tempr").innerHTML =
    Math.round(alldata.main.temp) + "&deg;C";
  document.getElementById("wording").innerHTML = words;
  //sidecard
  document.getElementById("humidityval").innerHTML =
    alldata.main.humidity + "%";
  document.getElementById("windspeedval").innerHTML =
    alldata.wind.speed + " km/hr";
  document.getElementById("sunrisetime").innerHTML= srtime +" AM";
  document.getElementById("sunsettime").innerHTML= sstime +" PM";
}

//Geolocation API
async function getLatLng() {
  //  to check if the web browser support geolocation api
  if (navigator.geolocation) {
    // Request the current position
    navigator.geolocation.getCurrentPosition(function (position) {
      //This part fetches the latitude and longitude from the position object
      const lat = position.coords.latitude.toFixed(7);
      const lon = position.coords.longitude;
      //console.log("Your coordinates are: " + lat + ", " + lon);
      latt = lat;
      long = lon;
      checkWeather('delhi');
    });
  } else {
    // If the browser does not support the geolocation api, display a message
    count=1;
    console.log("Geolocation is not supported by your browser");
    checkWeather("delhi");
  }
}
date();
getLatLng();

async function checkWeather(city) {
  var alldata;
  if (count == 0) {
    const response = await fetch(
      APIurl + `&lat=${latt}&lon=${long}&appid=${APIKey}`
    );
    var alldata = await response.json();
    count = 1;
    console.log(alldata);
    if(alldata.cod==404)
    alert("Invalid City Name!! Kindly enter proper city name");
    else if(alldata.cod==200){
      console.log("Working all fine ;-)");
      details(alldata);
    }
    else
    alert("Something is wrong!! Kindly reload...");
  }
  else if (count == 1) {
    const response = await fetch(APIurl + `&q=` + city + `&appid=${APIKey}`);
    var alldata = await response.json();
    console.log(alldata);
    if(alldata.cod==404)
    alert("Invalid City Name!! Kindly enter proper city name");
    else if(alldata.cod==200){
      console.log("Working all fine ;-)");
      details(alldata);
    }
    else
    alert("Something is wrong!! Kindly reload...");
  }
}

//Search button action

const searchBtn = document.getElementById("srchbtn");
const searchvalue = document.getElementById("srchval");

function Search(){
  if(!searchvalue.value){
    alert("Enter a valid city name");
    //Audio('');
  }
  else{
    checkWeather(searchvalue.value);
  }
  searchvalue.value = "";
}

//search BAr event listeners

searchBtn.addEventListener("click", () => {
  console.log('Request sent');
  Search();
});

searchvalue.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
      console.log('Request sent');
      Search();
  }
});


//all function declarations used to end here and ....

function convertUnixTimestampToHumanTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}


//testcode time stamp belwo
//const unixTimestamp = 1617183600;
//const time = convertUnixTimestampToHumanTime(unixTimestamp);
//console.log(time);


//date and time and day
async function date() {
  // Function to update date and day

  const now = new Date();
  //console.log(now);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  document.querySelector(".day").innerHTML = day;
  document.querySelector(".date").innerHTML = `${date} ${month} ${year}`;
}


//sidebar
function toggleClassName(){
  var sidebar = document.querySelector('.sidepanel');
  var toggle =document.querySelector('.toggle')
  toggle.classList.toggle('active')
  sidebar.classList.toggle('active')
}


const coll = document.getElementById("expander_section");
const content = document.getElementById('content');
const links = document.getElementById('links');

    coll.addEventListener("mouseover", ()=> {
      content.style.display = "flex";
      links.style.display = "none";
    });
    coll.addEventListener("mouseleave",()=>{
      content.style.display = "none";
      links.style.display = "flex";
    });

function addClassName(){
  var body= document.querySelector('.body');
  var box= document.querySelector('.box');
  var sidecard = document.querySelector('.details')
  var cardsleev = document.querySelector('.cardsleev');
  var card = document.querySelector('.card')
  body.classList.toggle('dark')
  cardsleev.classList.toggle('dark')
  card.classList.toggle('dark')
  box.classList.toggle('dark')
  sidecard.classList.toggle('dark')
}

var counter=0;
const LD_button=document.getElementById('LD_button');
const LD_image=document.getElementById('modIcon');
LD_button.addEventListener("click",()=>{
  if(counter==0)
      {
      //LD_button.innerText=" Dark ";
      LD_image.style.backgroundImage="url('../assets/moon.svg')";
      counter=1;
      }
  else if(counter==1){
      //LD_button.innerText=" Light ";
      LD_image.style.backgroundImage="url('../assets/sun.svg')";
      counter=0;
  }
})
