import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function HomePage() {
    // Create state to store countries data
    const [countries, setCountries] = useState([]);

    // Use useEffect to fetch countries data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ih-countries-api.herokuapp.com/countries');
                setCountries(response.data);
            } catch (error) {
                console.error("Error fetching countries data:", error);
            }
        };

        fetchData();
    }, []); 

    return (
      <div className="container" style={{maxHeight: "90vh", overflow: "scroll"}}>
        <h1 style={{fontSize: "24px"}}>WikiCountries: Your Guide to the World</h1>

        <div className="list-group">
          {countries.map((country) => (
            <Link 
              key={country.alpha3Code} 
              to={`/${country.alpha3Code}`}
              className="list-group-item list-group-item-action"
            >
              <img 
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} 
                alt={`${country.name.common} flag`} 
                style={{width: "32px", marginRight: "10px"}}
              />
              {country.name.common}
            </Link>
          ))}
        </div>
      </div>
    );
}

export default HomePage;