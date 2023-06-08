import { useEffect, useState } from "react";
import FilteredCountries from "./components/FilteredCountries";
import axios from "axios";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
        // countries.filter(country => country)
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search)
  );

  const searchCountriesHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <label>find countries</label>
      <input onChange={searchCountriesHandler} />
      <FilteredCountries filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
