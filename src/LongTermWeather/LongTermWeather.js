import React from 'react';
import './LongTermWeather.scss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function LongTermWeather() {
  const data = [{name: 'Page A', uv: 400, pv: 12400, amt: 12400}, {name: 'Page A', uv: 450, pv: 2500, amt: 2500}, {name: 'Page A', uv: 500, pv: 2600, amt: 2600}];
  return (<>
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  </>);
}

export default LongTermWeather;