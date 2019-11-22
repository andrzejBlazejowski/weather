import * as actions from '../../store/actions/actions';
// import store from '../store/store';
import axios from 'axios';

export const getUserLocation = () => {
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

export const dispatchUserAddress = (location) => {
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

export const dispatchLongTermWeather = (location) => {
  return function(dispatch) {
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.long}&APPID=66de69aefde8393ae19045df8f96c215`).then(
      (response) => {
        const list = response.data.list;
        const payload = list.map((currentValue)=>{
          return {
            time: String(currentValue.dt),
            temperature: Math.round(currentValue.main.temp - 273.15),
            temp_min: Math.round(currentValue.main.temp_min - 273.15),
            temp_max: Math.round(currentValue.main.temp_max - 273.15),
            pressure: currentValue.main.pressure,
            wind: currentValue.wind.speed,
            clouds: currentValue.clouds.all
          }
        });
        console.log( 'transfered data:', payload )
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



export const dispatchUserLocation = () => {
  return function(dispatch) {
    return getUserLocation().then(
      (message) => {dispatch(message)},
      (message) => {dispatch(message)}
    );
  };
};