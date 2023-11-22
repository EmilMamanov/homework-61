import React, { useState } from 'react';

const App: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    const handleSelectCountry = (countryCode: string) => {
        setSelectedCountry(countryCode);
    };

    return (
        <div>
            <div>left side</div>
            <div>right side</div>
        </div>
    );
};

export default App;