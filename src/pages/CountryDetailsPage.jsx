import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function CountryDetailsPage() {
  const { countryId } = useParams(); // Use `countryId` or the parameter name defined in Route path
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
      const fetchCountryDetails = async () => {
          try {
              const response = await axios.get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`);
              setCountryDetails(response.data);
          } catch (error) {
              console.error("Error fetching country details:", error);
          }
      };

      fetchCountryDetails();
  }, [countryId]); 

  if (!countryDetails) return <div>Loading...</div>;

  return (
      <div>
          <h1>{countryDetails.name.common}</h1>
          <p>Capital: {countryDetails.capital}</p>
          <p>Area: {countryDetails.area} km²</p>
          <p>Population: {countryDetails.population}</p>
          <img src={`https://flagpedia.net/data/flags/icon/72x54/${countryDetails.alpha2Code.toLowerCase()}.png`} alt={`${countryDetails.name.common} Flag`} />
      </div>
  );
}

export default CountryDetailsPage;