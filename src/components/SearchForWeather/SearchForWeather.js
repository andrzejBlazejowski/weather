import React from 'react';
import './SearchForWeather.scss';
import SearchForWeatherResults from './SearchForWeatherResults/SearchForWeatherResults';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

/*
// Get the input box
var textInput = document.getElementById('test-input');

// Init a timeout variable to be used below
var timeout = null;

// Listen for keystroke events
textInput.onkeyup = function (e) {

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(timeout);

    // Make a new timeout set to go off in 800ms
    timeout = setTimeout(function () {
        console.log('Input Value:', textInput.value);
    }, 500);
};*/


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