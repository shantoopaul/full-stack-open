const WeatherDetails = ({ weather, spot }) => {
  return (
    <>
      <h2>Weather in {spot}</h2>
      {weather && (
        <>
          <p>Temperature {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={100}
            height={100}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default WeatherDetails;
