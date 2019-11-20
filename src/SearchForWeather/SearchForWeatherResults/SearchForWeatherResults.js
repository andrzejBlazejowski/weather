import React from 'react';
import './SearchForWeatherResults.scss';
import CurrentWeather from '../../CurrentWeather/CurrentWeather';

function SearchForWeatherResults() {
  return (<section className="weatherResults">
      <CurrentWeather/>
      <CurrentWeather/>
      <CurrentWeather/>
  </section>);
}

export default SearchForWeatherResults;
