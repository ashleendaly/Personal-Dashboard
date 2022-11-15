import React, { Component } from "react";

export class WeatherCard extends Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    temperateC: undefined,
    icon: undefined,
  };

  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  getWeather = async (latitude, longitude) => {
    const api_call = await fetch(
      `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d0a10211ea3d36b0a6423a104782130e&units=metric`
    );
    const data = await api_call.json();
    this.setState({
      lat: latitude,
      lon: longitude,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      icon: data.weather[0].icon,
    });
  };

  componentDidMount() {
    this.getPosition()
      .then((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { city, temperatureC, icon } = this.state;
    if (city) {
      return (
        <div className="w-72 border-4 border-yellow-200 rounded text-lg">
          <h1 className="flex justify-center h-12 items-center font-semibold text-black  bg-yellow-200">
            Weather
          </h1>
          <div className="flex flex-col h-28 justify-center items-center pt-3 px-5 bg-white/50">
            <div className="flex gap-4  -mt-6">
              <img
                className=""
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt="weather icon"
                width="70px"
              />
              <h4 className="flex items-center">{temperatureC} degrees</h4>
            </div>
            <div className=" -mt-2 text-2xl">{city}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-72 border-2 border-yellow-200 rounded text-lg">
          <h1 className="flex justify-center h-12 items-center font-semibold text-black  bg-yellow-200">
            Weather
          </h1>
          <h3 className="flex text-center h-28 items-center pt-3 px-5 bg-white/50">
            Loading...
          </h3>
        </div>
      );
    }
  }
}

export default WeatherCard;
