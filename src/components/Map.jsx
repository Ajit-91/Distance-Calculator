"use client"
import { useMemo } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const Map = ({ directions }) => {

  const center = useMemo(() => ({ lat: 41.85, lng: -87.65 }), []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={2}
        center={center}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default Map;

