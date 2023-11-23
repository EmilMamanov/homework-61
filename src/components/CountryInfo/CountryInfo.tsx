import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CountryInfoProps {
    countryCode: string | null;
}

interface Country {
    name: string;
    capital: string;
    population: number;
    region: string;
    borders?: string[];
    flags: {
        png: string;
    };
}

const CountryInfo: React.FC<CountryInfoProps> = ({ countryCode }) => {
    const [country, setCountry] = useState<Country | null>(null);
    const [borderingCountries, setBorderingCountries] = useState<string[]>([]);

    useEffect(() => {
        const fetchCountryInfo = async () => {
            if (countryCode) {
                try {
                    const response = await axios.get<Country>(`https://restcountries.com/v2/alpha/${countryCode}`);
                    setCountry(response.data);

                    if (response.data.borders && response.data.borders.length > 0) {
                        const borderingCountriesNames = await Promise.all(
                            response.data.borders.map(async (border) => {
                                try {
                                    const borderResponse = await axios.get(`https://restcountries.com/v2/alpha/${border}`);
                                    return borderResponse.data.name;
                                } catch (borderError) {
                                    console.error(`Error fetching border country info for ${border}:`, borderError);
                                    return `Unknown (${border})`;
                                }
                            })
                        );
                        setBorderingCountries(borderingCountriesNames);
                    } else {
                        setBorderingCountries([]);
                    }
                } catch (error) {
                    console.error('Error fetching country info', error);
                }
            }
        };

        (async () => {
            await fetchCountryInfo();
        })();
    }, [countryCode]);

    return (
        <div className="info-block">
            <h2>Country Information</h2>
            {country ? (
                <div>
                    <h3>{country.name}</h3>
                    <p>Capital: {country.capital}</p>
                    <p>Population: {country.population}</p>
                    <p>Region: {country.region}</p>
                    <p>
                        Bordering Countries: {borderingCountries.length > 0 ? borderingCountries.join(', ') : 'None'}
                    </p>
                    <img src={country.flags.png} alt={`Flag of ${country.name}`} width="300" height="200" />
                </div>
            ) : (
                <p>Select a country to view information</p>
            )}
        </div>
    );
};

export default CountryInfo;
