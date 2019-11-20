import React from 'react';
import './SearchForWeather.scss';
import SearchForWeatherResults from './SearchForWeatherResults/SearchForWeatherResults';

function SearchForWeather() {
  return (<>
    <input type="text" placeholder="type in city name"/>
    <SearchForWeatherResults/>
  </>);
}

export default SearchForWeather;
