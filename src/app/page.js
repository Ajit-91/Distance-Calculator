"use client";
import Map from "@/components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Controls from "./Controls";

export default () => {
  const [directions, setDirections] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [reload, setReload] = useState(false); 
  const [stops, setStops] = useState([{
      location: "",
      stopover: true,
  }]);


  const mapAPi = useMemo(() => {
    return {
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    }
  }, [])
  const { isLoaded } = useJsApiLoader(mapAPi);

  return (
    <>
      {isLoaded ?
        (
          <div className="bg-gray-1 py-5 min-h-screen">
            <p className="text-2xl text-center text-blue mb-2">
              Let's calculate <span className="font-bold">distance</span> from Google maps
            </p>
            <div className="flex flex-col-reverse md:flex-row  md:space-x-5 space-y-5 space-y-reverse">
              <div className="w-full md:w-1/2 px-8 ">
                <Controls 
                  setDirections={setDirections} 
                  origin={origin}
                  setOrigin={setOrigin}
                  destination={destination}
                  setDestination={setDestination}
                  stops={stops}
                  setStops={setStops}
                  setReload={setReload}
                />
              </div>
              <div className="w-full md:w-1/2 px-8" style={{height : 480}}>
                <Map 
                  directions={directions}
                  origin={origin}
                  destination={destination}
                  stops={stops}
                  reload={reload}
                 />
              </div>
            </div>
          </div>
        )
        : (
          <>
            <h1>Map Loading...</h1>
          </>
        )
      }
    </>
  )
}
