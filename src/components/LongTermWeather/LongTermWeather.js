import React, { useEffect } from 'react';
import './LongTermWeather.scss';
import { Area, Tooltip, AreaChart,LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {connect} from 'react-redux';
import { dispatchUserAddress, dispatchLongTermWeather, dispatchUserLocation} from '../../containers/LongTermWeather/LongTermWeather'; 

const getDayTime = (timestamp) => {
  let source = new Date (Number(timestamp*1000));
  return source.getDate() + ' '+source.getHours()+':'+source.getMinutes();
}
const CustomTooltip = ({ active, payload}) => {
  let tooltip;
  if(active){
    payload = payload[0].payload;
    tooltip = <section className="tooltip">
      <p className="label">date&time: {getDayTime(payload.time)}</p>
      <p className="label">temperature: {payload.temperature}</p>
      <p className="label">minimal temperature: {payload.temp_min}</p>
      <p className="label">maximal temperature: {payload.temp_max}</p>
      <p className="label">preasure: {payload.preasure}</p>
    </section>
  }
  return tooltip
}

function LongTermWeather(props) {
  useEffect(()=>{
    if( props.isGetLocationSuccess === null ){
      props.dispatchUserLocation();
    }
    if( props.isGetLocationSuccess && !props.isAddress ){
      props.dispatchUserAddress( props.location );
      props.dispatchLongTermWeather( props.location );
    }
  });

  const width = 500;
  const height = 300;
  const chartColor = "#ffb893";
  const data = props.weather;
  let chart;
  if( props.weather.length > 0 ){
    /*chart =*/
    chart = <AreaChart width={width} height={height} data={data}>
      <defs>
        <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.5}/>
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="5 5" />
      <Tooltip content={CustomTooltip}/>
      <Area type="monotone" dataKey="temp_min" stroke="#8884d8" fillOpacity={1} fill="url(#colorMin)" />
      <Area type="monotone" dataKey="temp_max" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMax)" />
    </AreaChart>;
  }else{
    chart = <p>Loading....</p>
  }
  return chart;
}

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

const mapDispatchToProps = dispatch => {
  return {
    dispatchUserLocation: () => dispatch(dispatchUserLocation()),
    dispatchUserAddress: (location) => dispatch(dispatchUserAddress(location)),
    dispatchLongTermWeather: (location) => dispatch(dispatchLongTermWeather(location))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LongTermWeather);