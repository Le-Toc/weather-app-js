const api = {                                                                                                     // Create an object to hold the values related to the api call
  key: "7560930f8bde0b0ed8181dff56c0b573",                                                                        // Is the key needed to make the api calls.  If this is not added to the calls then they will be denied.
  base: "https://api.openweathermap.org/data/2.5/"                                                                // Is the base usl of the openweathermap api.  We are declaring this so we don't have to write it out each time.
}

const searchBox = document.querySelector('.search-box');                                                          // Get the element that has a class of 'search-box' and assign it to searchBox
searchBox.addEventListener('keypress', setQuery);                                                                 // Add an eventListener to the search box for a keypress and set it to call the function setQuery when it is activated.

function setQuery(evt) {                                                                                          // This method will check if the keypress was 'space' and call getResults if it is.
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {                                                                                      // This method will make a call to the openweatherapi using the api variables and the input from the user passed in as the query.  Improvement:  There is no error handling here.  We could add a try catch to this and handle the exception.  We could also add in a method to validate the user inputs.
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)                                            // This is the call itself.  api.base and key are defined above.  query is passed in from the user.
  .then(weather => {                                                                                              // The then keyword is like saying "After the fetch completes then do the following with the result".  In this case weather is the response from the fetch request and we imediatly have to convert this to json.
    return weather.json();
  }).then(displayResults)                                                                                         // This is another then.  So this is saying after the weather variable is converted to json then call the displayResults with it as a parameter.
 }

/*
  The fetch request is set up using a 'fetch' command and then followed by several 'then' commands.  The fetch part makes the request to the api and
  then the 'then' commands will say, "with the results of the previous command do the following".  So the 'then' command will take the result of the
  previous command wheather this is a fetch or another 'then' and preform some action on it.
*/


function displayResults(weather) {
  let city = document.querySelector('.location .city');                                                           // This will get an element based on the class of the element.  In this case there is an element with a class 'location'.  There are several other elements within this one with different classes.  We are getting the one with the class 'city'.
  city.innerText = `${weather.name}, ${weather.sys.country}`;                                                     // Pick out parts of the json and assign these to the innerText of the element

  let now = new Date();                                                                                           // Create a new Date object.
  let date = document.querySelector('.location .date');                                                           // Get the date part of the page
  date.innerText = dateBuilder(now);                                                                              // Call the dateBuilder method with the current date and set the result to the innerText of the date object.

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;                                             // Set the innterHTML this time

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

/*
This method will take elements from a Date object and convert it into a single string.
*/
function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];                                                                                     // getDay returns a number which is why we need to create and use the days array.
  let date = d.getDate();
  let month = months[d.getMonth()];                                                                               // getMonth returns an int just like getDay.
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;                                                                       // Combine all the variables into a single string
}
