import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/all`).then((res) => setAllCountries(res.data));
  }, []);

  const query = inputValue.trim().toLowerCase();

  const filteredCountries = query
    ? allCountries.filter((c) => c.name.common.toLowerCase().includes(query))
    : [];

  // Query word matches the country name. ex. sudan === sudan
  const exactMatch = filteredCountries.find((c) => c.name.common.toLowerCase() === query);

  // Only one country matching the query. ex. fin/swi only matchs finland/switzerland
  const onlyMatch = filteredCountries.length === 1 ? filteredCountries[0] : null;
  const displayCountry = selectedCountry || exactMatch || onlyMatch;

  return (
    <>
      <div>
        <label htmlFor="search" style={{ paddingInlineEnd: "6px" }}>
          Find Countries
        </label>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedCountry(null);
          }}
          type="search"
          id="search"
          placeholder="Bangladesh"
        />
      </div>

      {displayCountry ? (
        <CountryDetails displayCountry={displayCountry} />
      ) : filteredCountries.length > 10 ? (
        <span>Too many matches, specify another filter</span>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredCountries.map((c) => (
            <li key={c.cca3}>
              <span style={{ paddingInlineEnd: "6px" }}>{c.name.common}</span>
              <button onClick={() => setSelectedCountry(c)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default App;
