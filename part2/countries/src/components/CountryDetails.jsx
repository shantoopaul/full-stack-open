const CountryDetails = ({ displayCountry }) => {
  return (
    <div>
      <h1>{displayCountry.name.common}</h1>
      <p>Capital: {displayCountry?.capital?.join(", ") || "None"}</p>
      <p>Area: {displayCountry.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(displayCountry.languages || { _: "None" }).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={displayCountry.flags.svg}
        style={{ border: "2px dashed gray" }}
        alt={`Flag of ${displayCountry.name.common}`}
        width={250}
      />
    </div>
  );
};

export default CountryDetails;
