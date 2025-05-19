import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, options } from "./api";

function SearchBar({ onSearchChange }) {
  const [searchIn, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${url}/cities?countryIds=LK&minPopulation=10&namePrefix=${inputValue}`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        return {
          options: res.data.map((city) => {
            return {
              latitude: `${city.latitude}  `,
              longitude: `${city.longitude}`,
              label: `${city.name}`,
            };
          }),
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChange = (e) => {
    // e.preventDefault();
    setSearch(e);
    onSearchChange(e);
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for the city"
        debounceTimeout={800}
        value={searchIn}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}

export default SearchBar;
