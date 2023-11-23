import React, { useState } from 'react';
import CountryList from './components/CountryList/CountryList';
import CountryInfo from './components/CountryInfo/CountryInfo';
import './App.css';

const App: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleSelectCountry = (countryCode: string) => {
        setSelectedCountry(countryCode);
    };

    return (
        <div className="app-block">
            <CountryList onSelectCountry={handleSelectCountry} />
            <CountryInfo countryCode={selectedCountry} />
        </div>
    );
};

export default App;