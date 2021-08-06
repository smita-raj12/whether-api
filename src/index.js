import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js';

function clearFields() {
  $('#location').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
}

function getElements(response) {
  if(response.sys){
    $('.country').text(`The Country ${response.sys.country}`);
  }
  if (response.main) {
    
    $('.showHumidity').text(`The humidity in ${response.name} is ${response.main.humidity}%`);
    $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    let F = ((9/5*((response.main.temp)-273))) + 32;
    $('.showTempF').text(`The temperature in Fahrenheit ${F}`);
    $('.feels-like').text(`The temperature feels like ${response.main.feels_like}`);
  } else {
    $('.showErrors').text(`There was an error: ${response.message}`);
  }
}
//F = 9/5(K - 273) + 32
async function makeApiCall(city) {
  const response = await WeatherService.getWeather(city);
  getElements(response);
}

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let city = $('#location').val();
    clearFields();
    makeApiCall(city);
    
  });
});