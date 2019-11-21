import React, { useEffect } from 'react';
import './LongTermWeather.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import store from '../store/store';
import axios from 'axios';

const getUserLocation = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(function (position) {
      resolve({
        type: actions.UPDATE_USER_LOCATION,
        payload: {
          isGetLocationSuccess: true,
          long: position.coords.longitude,
          lat: position.coords.latitude
        }
      });
    },function () {
      resolve({
        type: actions.UPDATE_USER_LOCATION,
        payload: {
          isGetLocationSuccess: false,
          long: null,
          lat: null
        }
      });
    });
  }); 
};

const dispatchUserAddress = (location) => {
  return function(dispatch) {
    return axios.get(`http://www.mapquestapi.com/geocoding/v1/reverse?key=fGeSGdpmZYvG1MEkDoKNH1ddbTm7R0j2&location=${location.lat},${location.long}`).then(
      (response) => {
        const locations = response.data.results[0].locations;
        if( locations.length > 0 ){
          const location = locations[0];
          let payload = {};
          
          for( let [ key, value ] of Object.entries( location )){
            switch( value ){
              case 'City':
              case 'State':
              case 'Country':
                payload[ value.toLowerCase() ] = location[ key.replace('Type', '') ];
                break;
              default:
                break;
            }
          }
          payload.street = location.street;
          dispatch({
            type: actions.UPDATE_USER_ADDRESS,
            payload: payload
          })}
        },
      () => {
        dispatch({
          type: actions.UPDATE_USER_ADDRESS,
          payload: {street:'',city:'',state:'',country:''}
        })}
    );
  };
}

const dispatchLongTermWeather = (location) => {
  return function(dispatch) {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&APPID=66de69aefde8393ae19045df8f96c215`).then(
      (response) => {
        const list = response.data.list;
        const payload = list.map((currentValue)=>{
          return {
            time: currentValue.dt,
            temperature: Math.round(currentValue.main.temp - 273.15),
            temp_min: Math.round(currentValue.main.temp_min - 273.15),
            temp_max: Math.round(currentValue.main.temp_max - 273.15),
            pressure: currentValue.main.pressure
          }
        });
        dispatch({
          type: actions.UPDATE_USER_LOCATION_LONG_TERM_WEATHER,
          payload: payload
        });
        },
      () => {
        dispatch({
          type: actions.UPDATE_USER_LOCATION_LONG_TERM_WEATHER,
          payload: {street:'',city:'',state:'',country:''}
        })}
    );
  };
}



const dispatchUserLocation = () => {
  return function(dispatch) {
    return getUserLocation().then(
      (message) => {dispatch(message)},
      (message) => {dispatch(message)}
    );
  };
};

function LongTermWeather(props) {
  useEffect(()=>{
    if( props.isGetLocationSuccess === null ){
      store.dispatch(dispatchUserLocation());
    }
    if( props.isGetLocationSuccess && !props.isAddress ){
      store.dispatch(dispatchUserAddress( props.location ));
      store.dispatch(dispatchLongTermWeather( props.location ));
    }
  });

  const width = 500;
  const height = 300;
  const chartColor = "#ffb893";
  const data = [{name: 'Page A', uv: 400, pv: 12400, amt: 12400}, {name: 'Page A', uv: 450, pv: 2500, amt: 2500}, {name: 'Page A', uv: 500, pv: 2600, amt: 2600}];
  return (<>
    <LineChart width={width} height={height} data={data}>
      <Line type="monotone" dataKey="uv" stroke={chartColor} />
      <CartesianGrid stroke={chartColor} />
      <XAxis stroke={chartColor} dataKey="name" />
      <YAxis stroke={chartColor}/>
    </LineChart>
  </>);
}
//navigator.geolocation.getCurrentPosition(success[, error[, [options]])


const mapStateToProps = state =>{
  return {
    weather: [...state.userLocation.LongTermWeather],
    isGetLocationSuccess: state.userLocation.isGetLocationSuccess,
    isAddress: state.userLocation.isAddress,
    location: {
      lat: state.userLocation.lat, 
      long: state.userLocation.long
    }
  };
}
export default connect(mapStateToProps)(LongTermWeather);