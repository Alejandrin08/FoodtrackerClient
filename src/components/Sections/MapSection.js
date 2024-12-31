import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import classes from "./MapSection.module.css";

const center = {
  lat: 19.53124,
  lng: -96.91589,
};

const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(center);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

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
    if (mapRef.current) {
      const map = mapRef.current.state.map;

      if (mapRef.current.advancedMarker) {
        mapRef.current.advancedMarker.map = null;
      }

      const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: selectedLocation,
        title: "Ubicación seleccionada",
      });

      mapRef.current.advancedMarker = advancedMarker;
    }
  }, [selectedLocation]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={["places", "marker"]}>
      <div className={classes.containerSection}>
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
      <div className={classes.containerSection}>
      <GoogleMap
        mapContainerClassName={classes.mapContainer}
        center={selectedLocation}
        zoom={17}
        options={{
          mapId: "26719770e22e2761",
        }}
        onLoad={(map) => {
          mapRef.current = { state: { map } };
        }}
      />
    </div>
    </LoadScript >
  );
};

export default MapSection;
