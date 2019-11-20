import React from 'react';
import './SearchForWeather.scss';
import SearchForWeatherResults from './SearchForWeatherResults/SearchForWeatherResults';

function SearchForWeather() {
  return (<>
    <input 
      type="text" 
      className="SearchForWeather__input"
      placeholder="type in city name" />
    <SearchForWeatherResults/>
  </>);
}

export default SearchForWeather;
