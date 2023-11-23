import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryListProps {
    onSelectCountry: (countryCode: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onSelectCountry }) => {
    const [countries, setCountries] = useState<{ alpha3Code: string; name: string }[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v2/all?fields=alpha3Code,name');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries', error);
            }
        };

        (async () => {
            await fetchCountries();
        })();
    }, []);

    return (
        <div>
            <h2>Country List</h2>
            <ul className="app-list">
                {countries.map(country => (
                    <li key={country.alpha3Code} onClick={() => onSelectCountry(country.alpha3Code)}>
                        {country.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CountryList;
