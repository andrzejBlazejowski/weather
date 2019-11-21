import React from 'react';
import './SearchForWeather.scss';
import SearchForWeatherResults from './SearchForWeatherResults/SearchForWeatherResults';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import store from '../store/store';

function SearchForWeather(props) {
  return (<>
    <input 
      type="text" 
      onChange={props.onSearchTextChange}
      value={props.searchText}
      className="SearchForWeather__input"
      placeholder="type in city name" />
    <SearchForWeatherResults/>
  </>);
}

const mapStateToProps = state =>{
  return {
    searchText: state.searchLocation
  };
}

const mapDispatchToProps = dispatch => {
  return {onSearchTextChange: (event) => dispatch({
    type: actions.UPDATE_SEARCH_LOCATION,
    value: event.target.value
  })}
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchForWeather);