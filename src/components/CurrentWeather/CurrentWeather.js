import React from 'react';
import './CurrentWeather.scss';

function CurrentWeather() {
  return (<section className="currentWeather">
    <p  className="currentWeather__temperature">+28 °C</p>
    <p className="currentWeather__location">location, state, country</p>
  </section>);
}

export default CurrentWeather;