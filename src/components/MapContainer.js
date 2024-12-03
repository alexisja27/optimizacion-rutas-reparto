import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import SearchBox from './SearchBox';

const containerStyle = {
    width: '100%',
    height: '100%' // Ajustado para ocupar toda la pantalla disponible
};

const fuelPrices = {
    "93": 1218,
    "95": 1249,
    "97": 1318,
    "diesel": 972
};

const fuelConsumptionPerKm = 0.1; // Consumo promedio de gasolina (litros por km)

function MapContainer() {
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState({ lat: -33.4372, lng: -70.6506 });
    const [estimatedTime, setEstimatedTime] = useState('');
    const [fuelCost, setFuelCost] = useState(0);
    const [selectedFuelType, setSelectedFuelType] = useState("93"); // Valor predeterminado

    useEffect(() => {
        if (startLocation) {
            setMapCenter(startLocation);
        }
    }, [startLocation]);

    const calculateFuelCost = (distance) => {
        const distanceInKm = distance / 1000; // Convertir metros a kilómetros
        const fuelPricePerLiter = fuelPrices[selectedFuelType];
        return distanceInKm * fuelConsumptionPerKm * fuelPricePerLiter;
    };

    const directionsServiceOptions = startLocation && endLocation ? {
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING'
    } : null;

    const directionsCallback = useCallback((result, status) => {
        if (status === 'OK' && result) {
            setDirectionsResponse(result);
            const leg = result.routes[0].legs[0];
            setEstimatedTime(leg.duration.text);
            setFuelCost(calculateFuelCost(leg.distance.value));
        } else {
            console.error('Error fetching directions', result);
        }
    }, [selectedFuelType]);

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAc6JFmswFpRR1DuF7JSD5UYGtL_MEunms"
            libraries={['places']}
        >
            <div className="map-container">
                <div>
                    <SearchBox setLocation={setStartLocation} />
                    <SearchBox setLocation={setEndLocation} />
                </div>
                <div>
                    <label htmlFor="fuel-type">Selecciona el tipo de combustible: </label>
                    <select
                        id="fuel-type"
                        value={selectedFuelType}
                        onChange={(e) => setSelectedFuelType(e.target.value)}
                    >
                        <option value="93">93</option>
                        <option value="95">95</option>
                        <option value="97">97</option>
                        <option value="diesel">Diesel</option>
                    </select>
                </div>
                {estimatedTime && (
                    <div className="info-box">
                        <p>Tiempo estimado de llegada: {estimatedTime}</p>
                        <p>Costo estimado de gasolina: ${fuelCost.toFixed(0)} CLP</p>
                    </div>
                )}
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={13}
                >
                    {directionsServiceOptions && (
                        <DirectionsService
                            options={directionsServiceOptions}
                            callback={directionsCallback}
                        />
                    )}
                    {directionsResponse && (
                        <DirectionsRenderer
                            options={{
                                directions: directionsResponse
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
}

export default MapContainer;









