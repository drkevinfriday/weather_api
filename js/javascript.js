//  dom element

// current weather Dom

var cityEL = document.getElementById('city')
var dateEL = document.getElementById('date')
var tempEL = document.getElementById('currTemp')
var hiTempEL = document.getElementById('hiCurrTemp')
var loTempEL = document.getElementById('loCurrTemp')
var windEL = document.getElementById('currWind')
var humidityEL = document.getElementById('currHumidity')
var displayicon1 = document.querySelector(".icon")
var searchHistoryEl = document.querySelector(".search-history");
var uvIndexEL = document.getElementById('uvHeader')
// kelvin variable to convert temperatur.
const kelvin = 273;

var searchHistoryArray = []
// weather class

class cityData {
    constructor(name, hiTemp, loTmep, wind, humidity) {
      this.name = name;
      this.hiTemp = hiTemp;
      this.loTemp = loTmep;
      this.wind = wind;
      this.humidity = humidity;
    }
  }


// create a function that takes in user search input and returns the answer




// Gets the search input from the search bar
function searchHandler(event) {
    event.preventDefault()
//this is the city being searched
let searchCity = document.getElementById('search-input').value;
// calling the current weather function with the searchCity results
currentWeatherCall(searchCity)
}


function currentWeatherCall(userSearch){

var currentWeatherAPi = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=d7e25feadbb98d58fea6663edfb99b38" +"&units=imperial";


axios.get(currentWeatherAPi)
.then(res=>{ 
  console.log(res.data)
    // save cityname to obj
    const obj = new cityData()
    obj.name = res.data.name
    obj.date =  res.data.dt
    obj.temp = res.data.main.temp
    obj.loTemp = res.data.main.temp_min
    obj.hiTemp = res.data.main.temp_max
    obj.wind = res.data.wind.speed
    obj.humidity = res.data.main.humidity
mainIcon = res.data.weather[0].icon
displayicon1.src="https://openweathermap.org/img/wn/" + mainIcon + ".png";

    // uv fetch
    var lat = res.data.coord.lat
    var lon = res.data.coord.lon
    var time  = res.data.dt
    uvFetch(lat,lon,time)
    fivedayFetch(lat,lon,time)
   
    // render citynamee to dom
    renderCurrentCity(obj)
    
    // push the city search name to History array
    searchHistoryArray
    .push(obj.name)
    console.log(searchHistoryArray)

    

    // local storage 
    var userSearchCity = JSON.stringify((searchHistoryArray).splice(','));
    localStorage.setItem('city', userSearchCity); 
    var searched = JSON.parse(localStorage.getItem('city'));
    console.log(searched);
    var cityStored = searched;
    
    // create buttons for city history 
    var cityList = document.createElement("button");
    cityList.classList = "btn btn-primary btn-lg btn-block my-2";
    searchHistoryEl.appendChild(cityList);
    cityList.innerHTML = cityStored 
    
      // function for user to be able to get weather via search history
      cityList.onclick = function(){
        console.log("Clicked!");
        const city = cityStored;
        currentWeatherCall(city);
        };
})
}

function dateConverter(dt){
    var a = new Date(dt * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year + ' ' ;
return time
}

function uvFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((res)=>{ 
      console.log(res.data)
        renderUV(res.data)
       
        
    })

}
function fivedayFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((data) => {
            // console.log(data.data);
            //console.log(data.city.name);

            // clear content
            forecast.textContent = "";

            // loop through data to display 5 day weather forecast
            for (var i=1; i < 6; i++) {
                const listnumber = i
                const info = data.data.daily
                
            // console.log(info[i]);
            
            // create a container to display 5 day forecast
            var forecastContainer = document.createElement("div");
            forecastContainer.classList = "card text-white bg-info  my-2 px-2 col";

            // console.log(dateConverter(info[i].dt))
            forecastContainer.textContent = dateConverter(info[i].dt);
           

            // convert temperature to farenheit
            var forecastTemp = document.createElement("li");
            forecastTemp.classList = "flex-row align-center ";
            forecastTemp.textContent = "Temperature: " + Math.floor((info[i].temp.day- kelvin) * 1.80 + 32) + "°F";
            // console.log(forecastTemp.textContent)

            //display weather icon
            var icondisplay = document.createElement("img");
            var icon = info[i].weather[0].icon; 
            icondisplay.src = "https://openweathermap.org/img/wn/" + icon + ".png";
            
            // display wind
            var wind = document.createElement("li");
            wind.classList = "flex-row align-center";
            wind.textContent = " Weed Speed: " + info[i].wind_speed + " mph";

            // display humidity
            var humidity = document.createElement("li");
            humidity.classList = "flex-row align-center";
            humidity.textContent = "Humidity: " + info[i].humidity;

            // append to container
            forecastContainer.appendChild(icondisplay);
            forecastContainer.appendChild(forecastTemp);
            forecastContainer.appendChild(wind);
            forecastContainer.appendChild(humidity);
            
            // append container to the dom
            forecast.appendChild(forecastContainer);
            } 
         })

}



function renderUV(object){   
  console.log(object.current.uvi)
    uvIndexEL.textContent = "UV Index: " + object.current.uvi
    // add color indicator for uvi
    if ( object.current.uvi < 2.1) {
        uvIndexEL.classList.add("green");
      }
    if (object.current.uvi > 2.1 && object.current.uvi < 5.1) {
        uvIndexEL.classList.add("yellow");
      }
    if ( object.current.uvi > 5.1 && object.current.uvi < 7.1) {
        uvIndexEL.classList.add("orange");
      }
      if (object.current.uvi > 7.1 &&object.current.uvi < 10.1) {
        uvIndexEL.classList.add("red");
      }else {
        uvIndexEL.classList.add("pruple");
      }
 
}
function renderCurrentCity(object){
    
    cityEL.textContent = object.name
     tempEL.textContent = "Current Temp: " + object.temp
     dateEL.textContent =  "Date: " + dateConverter(object.date)
    loTempEL.textContent =  "Low Temp: " + object.loTemp
    hiTempEL.textContent = "High Temp: " + object.hiTemp
    windEL.textContent = "Wind: "+object.wind
    humidityEL.textContent = "Humindity: " + object.humidity
}
 
function renderSearchList(array){
array.map(city => {
   console.log(city) 
     
})
// console.log(listLinks))

// console.log(sweeterArray)
}






document.getElementById('searchBtn'). addEventListener('click', searchHandler)
// getApi(userSearchEL)

