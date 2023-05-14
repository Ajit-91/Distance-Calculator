"use client";
import Map from "@/components/Map";
import { useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Controls from "./Controls";

export default () => {
  const [directions, setDirections] = useState(null);
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
          <>
            <div className="flex flex-col-reverse md:flex-row h-screen">
              <div className="w-full md:w-1/2 px-2">
                <Controls setDirections={setDirections} />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <Map directions={directions} />
              </div>
            </div>
          </>
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
