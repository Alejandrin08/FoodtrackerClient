import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Autocomplete } from "@react-google-maps/api";
import classes from "./MapSection.module.css";

const center = {
  lat: 19.53124,
  lng: -96.91589,
};

const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(location);
    }
  };

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;

      if (window.google && window.google.maps) {
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          map,
          position: selectedLocation,
          title: "Ubicación seleccionada",
        });

        markerRef.current = marker;
      } else {
        console.error("La API de Google Maps no está disponible correctamente");
      }
    }
  }, [selectedLocation, mapLoaded]);

  return (
    <div className={classes.containerSection}>
      <div className={classes.autocompleteWrapper}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Busca una ubicación"
            className={classes.autocompleteInput}
          />
        </Autocomplete>
      </div>
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
