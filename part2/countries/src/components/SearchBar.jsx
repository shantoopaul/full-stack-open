const SearchBar = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="search" className="spacing-right">
        Find Countries
      </label>
      <input value={value} onChange={onChange} type="search" id="search" placeholder="Bangladesh" />
    </div>
  );
};

export default SearchBar;
