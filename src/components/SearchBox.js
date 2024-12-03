import React, { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

const SearchBox = ({ setLocation }) => {
    const [searchBox, setSearchBox] = useState(null);

    const handlePlaceChanged = () => {
        if (!searchBox) return;

        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address
        };

        setLocation(location);
    };

    return (
        <div>
            <StandaloneSearchBox
                onLoad={(ref) => setSearchBox(ref)}
                onPlacesChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Ingresa la dirección"
                    style={{ boxSizing: 'border-box', width: '240px', height: '32px', padding: '12px', borderRadius: '3px', border: '1px solid transparent', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)', fontSize: '14px', outline: 'none', textOverflow: 'ellipses' }}
                />
            </StandaloneSearchBox>
        </div>
    );
};

export default SearchBox;




