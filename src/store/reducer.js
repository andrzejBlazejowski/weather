const initialState = {
    searchLocation: '',
    userLocation:{
        'lat': null,
        'long': null
    }
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'UPDATE_SEARCH_LOCATION':
            return {
                ...state,
                searchLocation: action.value
            }
    }
    return state;
};

export default rootReducer;