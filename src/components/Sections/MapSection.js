import React, { useRef, useState, useEffect } from "react";
import { GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";
import useRestaurant from "../../hooks/useRestaurant";
import classes from "./MapSection.module.css";

const center = {
  lat: 19.53124,
  lng: -96.91589,
};

const MapSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(center);
  const [locations, setLocations] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const { loading, getAllLocation } = useRestaurant();
  const geocoder = new window.google.maps.Geocoder();

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

  const getCoordinatesFromAddress = async (address) => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          reject("Geocoding failed: " + status);
        }
      });
    });
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await getAllLocation();
      if (result.success) {
        const locationsWithCoordinates = await Promise.all(
          result.locations.map(async (loc) => {
            if (loc.location.includes(",")) {
              const [lat, lng] = loc.location.split(",");
              return { lat: parseFloat(lat), lng: parseFloat(lng) };
            } else {
              try {
                const coordinates = await getCoordinatesFromAddress(loc.location);
                return coordinates;
              } catch (error) {
                console.error("Error al geocodificar la dirección:", error);
                return null;
              }
            }
          })
        );
        setLocations(locationsWithCoordinates.filter(Boolean));
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      if (window.google && window.google.maps) {
        locations.forEach((loc) => {
          new window.google.maps.Marker({
            map,
            position: loc,
            title: "Ubicación del restaurante",
          });
        });
      } else {
        console.error("La API de Google Maps no está disponible correctamente");
      }
    }
  }, [locations, mapLoaded]);

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
      >
        <Marker position={selectedLocation} title="Ubicación seleccionada" />
      </GoogleMap>
    </div>
  );
};

export default MapSection;