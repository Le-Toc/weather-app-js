const api = {                                                                   // Create an object to hold the values related to the api call
  key: "7560930f8bde0b0ed8181dff56c0b573",                                      // Is the key needed to make the api calls.  If this is not added to the calls then they will be denied.
  base: "https://api.openweathermap.org/data/2.5/"                              // Is the base usl of the openweathermap api.  We are declaring this so we don't have to write it out each time.
}

const searchBox = document.querySelector('.search-box');// Get the element that has a class of 'search-box' and assign it to searchBox
searchBox.addEventListener('keypress', setQuery);  // Add an eventListener to the search box for a keypress and set it to call the function setQuery when it is activated.

function setQuery(evt) {    // This method will check if the keypress was 'space' and call getResults if it is.
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {    // This method will make a call to the openweatherapi using the api variables and the input from the user passed in as query.  Improvement:  There is no error handling here.  We could add a try catch to this and handle the exception.  We could also add in a method to validate the user inputs.
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
