import React, { useState } from 'react';


const API = {
  site: "https://api.weatherbit.io/v2.0/forecast/daily",
  key: "ec7a2c3763e5464a8fad38564c573c7f",
  units: "I"
}

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${API.site}?city=${location}&key=${API.key}&days=3&units=${API.units}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setLocation('');
        });
    }
  }

  const getFullDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${month} ${date}, ${year}`
  }
  
  const getDayOfWeek = (d, num=0) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay() + num];
  
    return `${day}`
  }

  return (
    <div className="App">
      <h1>{getFullDate(new Date())} </h1>
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="Enter Location..." onChange={e => setLocation(e.target.value)} onKeyPress={search} value={location} ></input>
        <i className="fa fa-search"></i>
      </div>
      {(typeof weather.data != "undefined") ? (
      <div>
        <h1 className="city">{weather.city_name}</h1>
        <div className="flex">
          <div className="box">
            <div className="day">{getDayOfWeek(new Date())}</div>
            <div className="temp">{Math.round(weather.data[0].temp)}°</div>
            <div className="conditions">{weather.data[0].weather.description}</div>
            <p className="chance-rain">Chance of Rain<br/>{weather.data[0].pop}%</p>
            <p className="humidity">Humidity<br/>{weather.data[0].rh}%</p>
          </div>
          <div className="box">
            <div className="day">{getDayOfWeek(new Date(), 1)}</div>
            <div className="temp">{Math.round(weather.data[1].temp)}°</div>
            <div className="conditions">{weather.data[1].weather.description}</div>
            <p className="chance-rain">Chance of Rain<br/>{weather.data[1].pop}%</p>
            <p className="humidity">Humidity<br/>{weather.data[1].rh}%</p>
          </div>
          <div className="box">
            <div className="day">{getDayOfWeek(new Date(), 2)}</div>
            <div className="temp">{Math.round(weather.data[2].temp)}°</div>
            <div className="conditions">{weather.data[2].weather.description}</div>
            <p className="chance-rain">Chance of Rain<br/>{weather.data[2].pop}%</p>
            <p className="humidity">Humidity<br/>{weather.data[2].rh}%</p>
          </div>
        </div>
      </div>
      ) : ('')}
    </div>
  );
}

export default App;
