"use client"
import { useMemo } from "react";
import { GoogleMap, DirectionsRenderer, Marker } from "@react-google-maps/api";

const Map = ({ directions, origin, destination, stops }) => {

  const center = useMemo(() => ({ lat: 41.85, lng: -87.65 }), []);
  console.log({ origin, destination, stops })

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={2}
        center={center}
      >
    
        <Marker
          position={origin}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor : "#32CD32",
            fillOpacity: 1,
            strokeColor : "#2E2E2E",
            strokeOpacity: 1,
            strokeWeight: 1,
            scale: 7
          }}
        />

        {stops[0].location && stops.map((stop, index) => (
          <Marker
            key={index}
            position={stop.location}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale : 7
            }}
          />
        ))}

        <Marker
          position={destination}
        />

        {directions && <DirectionsRenderer 
          directions={directions}
          options={{
            suppressMarkers: true,
          }}
          />}
      </GoogleMap>
    </div>
  );
};

export default Map;

