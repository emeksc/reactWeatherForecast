import { useEffect, useState } from "react";
import Axios from "axios";
import { usePosition } from "use-position";
import WeatherForecast from "./WeatherForecast";

const App = () => {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const lang = navigator.language.split("-")[0];
    try {
      const { data } = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=metric`
      );
      setWeather(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <div>
      <h1>Hava Durumu</h1>
      <WeatherForecast weather={weather} />
    </div>
  );
};

export default App;
