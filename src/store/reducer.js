import * as actions from './actions/actions';

const initialState = {
  searchLocation: '',
  userLocation: {
    isGetLocationSuccess: null,
    lat: null,
    long: null,
    isAddress: false,
    address: {
      street:'',
      city:'',
      state:'',
      country:''
    },
    currentWeather:{
      temperature: '',
      locationName: '',
    },
    LongTermWeather:[]
  }
}

const rootReducer = (state = initialState, action) => {
  console.log(action.type,action.payload);
  switch (action.type) {
    case actions.UPDATE_SEARCH_LOCATION:
      return {
        ...state,
        searchLocation: action.value,
        userLocation: {
          ...state.userLocation,
          currentWeather: {
            ...state.userLocation.currentWeather,
          },
          LongTermWeather: [
            ...state.userLocation.LongTermWeather
          ],
          address: {
            ...state.userLocation.address,
          },
        }
      }
    case actions.UPDATE_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          currentWeather: {
            ...state.userLocation.currentWeather,
          },
          LongTermWeather: [
            ...state.userLocation.LongTermWeather
          ],
          address: {
            ...state.userLocation.address,
          },
          isGetLocationSuccess: action.payload.isGetLocationSuccess,
          lat: action.payload.lat,
          long: action.payload.long
        }
      }
    case actions.UPDATE_USER_LOCATION_CURRENT_WEATHER:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          currentWeather: {
            ...state.userLocation.currentWeather,
            temperature: action.payload.temperature,
            locationName: action.payload.locationName
          },
          LongTermWeather: [
            ...state.userLocation.LongTermWeather
          ],
          address: {
            ...state.userLocation.address,
          }
        }
      }
    case actions.UPDATE_USER_ADDRESS:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          address: {
            ...state.userLocation.address,
            street: action.payload.street,
            city: action.payload.city,
            state: action.payload.state,
            country: action.payload.country
          },
          currentWeather: {
            ...state.userLocation.currentWeather,
            temperature: action.payload.temperature,
            locationName: action.payload.locationName
          },
          LongTermWeather: [
            ...state.userLocation.LongTermWeather
          ],
          isAddress: true
        },
        isAddress: true
      }
    case actions.UPDATE_USER_LOCATION_LONG_TERM_WEATHER:
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          currentWeather: {
            ...state.userLocation.currentWeather,
          },
          address: {
            ...state.userLocation.address,
          },
          LongTermWeather: [
            ...action.payload
          ]
        }
      }
    default:
      return state
  }
};

export default rootReducer;