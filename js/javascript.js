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
var searchHistoryEl = document.querySelector("#search-history");
var uvIndexEL = document.getElementById('uvHeader')
// kelvin variable to convert temperature
const kelvin = 273;

var searchHistory = []
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
    event.preventDefault();
    console.log("fired")


//this is the city being searched
let searchCity = document.getElementById('search-input').value;
currentWeatherCall(searchCity)
}


function currentWeatherCall(userSearch){

var currentWeatherAPi = "http://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=d7e25feadbb98d58fea6663edfb99b38" +"&units=imperial";


axios.get(currentWeatherAPi)
.then(res=>{ 
    // save cityname to obj
    const obj = new cityData()
    obj.name = res.data.name
    obj.date =  res.data.dt
    obj.temp = res.data.main.temp
    obj.loTemp = res.data.main.temp_min
    obj.hiTemp = res.data.main.temp_max
    obj.wind = res.data.wind.speed
    obj.humidity = res.data.main.humidity

    // uv fetch
    var lat = res.data.coord.lat
    var lon = res.data.coord.lon
    var time  = res.data.dt
    uvFetch(lat,lon,time)
    fivedayFetch(lat,lon,time)
   
    // render citynamee to dom
    renderCurrentCity(obj)
    
    // push the city search name to History array
    searchHistory.push(obj.name)
    console.log(searchHistory)
    renderSearchList

    // local storage 
    var userHistory = JSON.stringify((cityArray).splice(','));
    localStorage.setItem('city', userHistory); 
    var searched = JSON.parse(localStorage.getItem('city'));
    //console.log(searched);
    var storedCities = searched;
    
    // create buttons for city history 
    var cityList = document.createElement("button");
    cityList.classList = "btn btn-outline-success my-2 my-sm-0";
    searchHistoryEl.appendChild(cityList);
    cityList.innerHTML = storedCities 
})
}

function renderSearchList(array){
    // create a container to display 5 day forecast
    var SearchContainer = document.createElement("div");
    SearchContainer.classList = "card text-white bg-info mb-3 col";
    
    
    for (var i=0; i < 10; i++){
        array[i]

        console.log(array[i])
    var searchCity = document.createElement("li");
    searchCity.classList = "flex-row align-center";
   

}




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
      
        renderUV(res.data)
       
        
    })

}
function fivedayFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((data) => {
            console.log(data.data);
            //console.log(data.city.name);

            // clear content
            forecast.textContent = "";

            // loop through data to display 5 day weather forecast
            for (var i=1; i < 6; i++) {
                const listnumber = i
                const info = data.data.daily
                
            console.log(info[i]);
            
            // create a container to display 5 day forecast
            var forecastContainer = document.createElement("div");
            forecastContainer.classList = "card text-white bg-info mb-3 col";

            console.log(dateConverter(info[i].dt))
            forecastContainer.textContent = dateConverter(info[i].dt);
           

            // convert temperature to farenheit
            var forecastTemp = document.createElement("li");
            forecastTemp.classList = "flex-row align-center";
            forecastTemp.textContent = "Temperature: " + Math.floor((info[i].temp.day- kelvin) * 1.80 + 32) + "°F";
            console.log(forecastTemp.textContent)

            //display weather icon
            var icondisplay = document.createElement("img");
            var icon = info[i].weather[0].icon; 
            icondisplay.src = "http://openweathermap.org/img/wn/" + icon + ".png";
            
            // display wind
            var wind = document.createElement("li");
            wind.classList = "flex-row align-center";
            wind.textContent = "Wind: " + info[i].wind_speed + " mph";

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
    uvIndexEL.textContent = object.current.uvi
    console.log(object.current.uvi)
}
function renderCurrentCity(object){
    
    cityEL.textContent = object.name
     tempEL.textContent = object.temp
     dateEL.textContent = dateConverter(object.date)
    loTempEL.textContent = object.loTemp
    hiTempEL.textContent = object.hiTemp
    windEL.textContent = object.wind
    humidityEL.textContent = object.humidity
}
 
function renderSearchList(searchHistory){
searchHistory.map(city => {
   console.log(city)
   let city_elm = 
   return
   
},
console.log(listLinks))

console.log(sweeterArray)
}3






document.getElementById('searchBtn'). addEventListener('click', searchHandler)
// getApi(userSearchEL)

