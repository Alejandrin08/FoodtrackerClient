import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Autocomplete } from "@react-google-maps/api";
import classes from "./EditRestaurant.module.css";

const center = {
    lat: 19.53124,
    lng: -96.91589,
};

const MapSection = ({ location, onLocationChange }) => {
    const [selectedLocation, setSelectedLocation] = useState(center);
    const [mapLoaded, setMapLoaded] = useState(false);
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const geocoderRef = useRef(null);

    useEffect(() => {
        if (window.google && window.google.maps && location) {
            if (!geocoderRef.current) {
                geocoderRef.current = new window.google.maps.Geocoder();
            }

            geocoderRef.current.geocode({ address: location }, (results, status) => {
                if (status === "OK" && results[0]) {
                    const { lat, lng } = results[0].geometry.location;
                    const newPosition = { lat: lat(), lng: lng() };
                    setSelectedLocation(newPosition);
                    updateMarker(newPosition); 
                } else {
                    console.error("No se pudo geocodificar la dirección:", status);
                }
            });
        }
    }, [location]);

    const updateMarker = (position) => {
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }

        if (mapRef.current) {
            const marker = new window.google.maps.Marker({
                map: mapRef.current,
                position,
                title: "Ubicación seleccionada",
            });

            markerRef.current = marker;
        }
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const address = place.formatted_address;
            const { lat, lng } = place.geometry.location;
            const newPosition = { lat: lat(), lng: lng() };

            setSelectedLocation(newPosition);
            onLocationChange(address); 
            updateMarker(newPosition); 
        }
    };

    return (
        <div className={classes.containerSection}>
            <p className="mb-0">Ubicación</p>
            <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Busca una ubicación"
                    className={classes.autocompleteInput}
                    value={location}
                    onChange={(e) => onLocationChange(e.target.value)}
                />
            </Autocomplete>
            <GoogleMap
                mapContainerClassName={classes.mapContainer}
                center={selectedLocation}
                zoom={17}
                options={{
                    mapId: "26719770e22e2761",
                }}
                onLoad={(map) => {
                    mapRef.current = map;
                    setMapLoaded(true);
                }}
            />
        </div>
    );
};

export default MapSection;