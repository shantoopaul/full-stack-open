import { useEffect, useState } from "react";
import weatherService from "./services/weather";
import countriesService from "./services/countries";
import CountryDetails from "./components/CountryDetails";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getCountries().then((countries) => setAllCountries(countries));
  }, []);

  const query = inputValue.trim().toLowerCase();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSelectedCountry(null);
  };

  const filteredCountries = query
    ? allCountries.filter((c) => c.name.common.toLowerCase().includes(query))
    : [];

  // Query word matches the country name. ex. sudan === sudan
  const exactMatch = filteredCountries.find((c) => c.name.common.toLowerCase() === query);

  // Only one country matching the query. ex. fin/swi only matchs finland/switzerland
  const onlyMatch = filteredCountries.length === 1 ? filteredCountries[0] : null;
  const displayCountry = selectedCountry || exactMatch || onlyMatch;

  const spot = displayCountry?.capital ? displayCountry?.capital[0] : displayCountry?.name?.common;

  useEffect(() => {
    if (!spot) {
      return;
    }
    weatherService.getWeather(spot).then((weather) => setWeather(weather));
  }, [spot]);

  return (
    <>
      <SearchBar value={inputValue} onChange={handleInputChange} />
      {displayCountry ? (
        <CountryDetails displayCountry={displayCountry} spot={spot} weather={weather} />
      ) : filteredCountries.length > 10 ? (
        <span>Too many matches, specify another filter</span>
      ) : (
        <ul className="list-style">
          {filteredCountries.map((c) => (
            <li key={c.cca3}>
              <span className="spacing-right">{c.name.common}</span>
              <button onClick={() => setSelectedCountry(c)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
