import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import './App.scss';
import SearchForWeather from './components/SearchForWeather/SearchForWeather';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import LongTermWeather from './components/LongTermWeather/LongTermWeather';

function App() {
  return (
      <Router>
        <div className="App">
          <header className="pageHeader">
            <nav>
              <Link className="pageHeader__item" to="/"></Link>
              <Link className="pageHeader__item" to="/searchForWeather">Search for weather</Link>
              <Link className="pageHeader__item" to="/currentWeather">Current Weather</Link>
              <Link className="pageHeader__item" to="/LongTermWeather">Long Term Weather</Link>
            </nav>
          </header>
          <main>
            <Switch>
              <Route path="/searchForWeather">
                <SearchForWeather/>
              </Route>
              <Route path="/currentWeather">
                <CurrentWeather/>
              </Route>
              <Route path="/LongTermWeather">
                <LongTermWeather/>
              </Route>
              <Route path="/">
                <Redirect to="/searchForWeather" />
              </Route>
            </Switch>
          </main>
          </div>
      </Router>
   );
}

export default App;
