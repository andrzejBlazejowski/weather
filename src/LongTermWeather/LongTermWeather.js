import React from 'react';
import './LongTermWeather.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function LongTermWeather() {
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

export default LongTermWeather;