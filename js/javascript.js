//  dom element

// current weather Dom

var cityEL = document.getElementById('city')
var dateEL = document.getElementById('date')
var tempEL = document.getElementById('currTemp')
var hiTempEL = document.getElementById('hiCurrTemp')
var loTempEL = document.getElementById('loCurrTemp')
var windEL = document.getElementById('currWind')
var humidityEL = document.getElementById('currHumidity')

var uvIndexEL = document.getElementById('currUvInex')


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
 var currWeatherInfo = currentWeatherCall(searchCity)
 console.log(searchHistory)

}

function currentWeatherCall(userSearch){

var currentWeatherAPi = "http://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=d7e25feadbb98d58fea6663edfb99b38" +"&units=imperial";


axios.get(currentWeatherAPi)
.then(res=>{ 
    console.log(res.data)
    // save cityname to obj
    const obj = new cityData()
    obj.name = res.data.name
    obj.date = res.data.dt
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

})

}


function uvFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((res)=>{ 
        // save info to obj
      
        renderUV(res.data)
        
    })

}
function fivedayFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((data) => {
            // console.log(data);
            //console.log(data.city.name);

            // clear content
            // forecast.textContent = "";

            // loop through data to display 5 day weather forecast
            for (var i=0; i < 5; i++) {
                const listnumber = i
                const info = data.data.daily

            console.log(info);
            
            // // create a container to display 5 day forecast
            // var forecastContainer = document.createElement("div");
            // forecastContainer.classList = "card text-white bg-info mb-3 col";
            // var date = new Date(data.list[i].dt_txt).toLocaleDateString();
            // forecastContainer.textContent = date;
            // //console.log(date);

            // // convert temperature to farenheit
            // var forecastTemp = document.createElement("li");
            // forecastTemp.classList = "flex-row align-center";
            // forecastTemp.textContent = "Temperature: " + Math.floor((data.list[i].main.temp - kelvin) * 1.80 + 32) + "°F";

            // //display weather icon
            // var icondisplay = document.createElement("img");
            // var icon = data.list[i].weather[0].icon; 
            // icondisplay.src = "http://openweathermap.org/img/wn/" + icon + ".png";
            
            // // display wind
            // var wind = document.createElement("li");
            // wind.classList = "flex-row align-center";
            // wind.textContent = "Wind: " + data.list[i].wind.speed + " mph";

            // // display humidity
            // var humidity = document.createElement("li");
            // humidity.classList = "flex-row align-center";
            // humidity.textContent = "Humidity: " + data.list[i].main.humidity;

            // // append to container
            // forecastContainer.appendChild(icondisplay);
            // forecastContainer.appendChild(forecastTemp);
            // forecastContainer.appendChild(wind);
            // forecastContainer.appendChild(humidity);
            
            // // append container to the dom
            // forecast.appendChild(forecastContainer);
            } 
         })

}

// function fiveDayWeatherCall(userSearch){

// var ForecastWeatherAPi = "http://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d7e25feadbb98d58fea6663edfb99b38";

// axios.get(ForecastWeatherAPi)
// .then(res=>{
   
//     console.log(res.data)
// })
// }
 

function renderUV(object){
    
   
    uvIndexEL.textContent = object.current.uvi

}
function renderCurrentCity(object){
    
    cityEL.textContent = object.name
     tempEL.textContent = object.temp
     dateEL.textContent = object.date
    loTempEL.textContent = object.loTemp
    hiTempEL.textContent = object.hiTemp
    windEL.textContent = object.wind
    humidityEL.textContent = object.humidity
}
 






document.getElementById('searchBtn'). addEventListener('click', searchHandler)
// getApi(userSearchEL)

