import * as actions from './actions/actions';

const initialState = {
  searchLocation: '',
  searchLocationsResult:[],
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
  switch (action.type) {
    case actions.UPDATE_SEARCH_LOCATION:
      return {
        ...state,
        searchLocation: action.value
      }
    case actions.UPDATE_USER_LOCATION:
      return {
        ...state,
        address: {
          ...state.userLocation.address,
        },
        userLocation: {
          ...state.userLocation,
          currentWeather: {
            ...state.userLocation.currentWeather,
          },
          LongTermWeather: [
            ...state.userLocation.LongTermWeather
          ],
          isGetLocationSuccess: action.payload.isGetLocationSuccess,
          lat: action.payload.lat,
          long: action.payload.long
        }
      }
    case actions.UPDATE_USER_LOCATION_CURRENT_WEATHER:
      return {
        ...state,
        userLocation: {
          currentWeather: {
            ...state.userLocation.currentWeather,
            temperature: action.payload.temperature,
            locationName: action.payload.locationName
          }
        }
      }
    case actions.UPDATE_USER_ADDRESS:
      console.log(action.payload);
      return {
        ...state,
        userLocation: {
          address: {
            ...state.userLocation.address,
            street: action.payload.street,
            city: action.payload.city,
            state: action.payload.state,
            country: action.payload.country
          }
        },
        isAddress: true
      }
    case actions.UPDATE_USER_LOCATION_LONG_TERM_WEATHER:
      return {
        ...state,
        userLocation: {
          LongTermWeather: [
            action.payload
          ]
        }
      }
    default:
      return state
  }
};

export default rootReducer;