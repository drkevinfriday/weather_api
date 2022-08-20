//  dom element

// current weather Dom

var cityEL = document.getElementById('city')
var tempEL = document.getElementById('currTemp')
var hiTempEL = document.getElementById('hiCurrTemp')
var loTempEL = document.getElementById('loCurrTemp')
var windEL = document.getElementById('currWind')
var humidityEL = document.getElementById('currHumidity')
var UvEL = document.getElementById('city')
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
    // save info to obj
    const obj = new cityData()
    obj.name = res.data.name
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
    fiveDayWeatherCall(userSearch)


  



    // render results to dom
    renderCurrInfo(obj)

    // push the city search name to History array
    searchHistory.push(obj.name)

})

}


function uvFetch(lat,lon){
    var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=d7e25feadbb98d58fea6663edfb99b38";


    axios.get(uvUrl).then((res)=>console.log(res.data))

}

function fiveDayWeatherCall(userSearch){

var ForecastWeatherAPi = "http://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=d7e25feadbb98d58fea6663edfb99b38";

axios.get(ForecastWeatherAPi)
.then(res=>{
   
    console.log(res.data)
})
}
 

function renderCurrInfo (object){
    cityEL.textContent = object.name
    tempEL.textContent = object.temp
    loTempEL.textContent = object.loTemp
    hiTempEL.textContent = object.hiTemp
    windEL.textContent = object.wind
    humidityEL.textContent = object.humidity
}

 






document.getElementById('searchBtn'). addEventListener('click', searchHandler)
// getApi(userSearchEL)

