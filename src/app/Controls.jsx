"use client"
import SearchInput from '@/components/SearchInput';
import getLetLng from '@/utils/getLatLng';
import React, { useState } from 'react'

const Controls = ({ setDirections }) => {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [distance, setDistance] = useState(null);
    const stops = [];

    const calculateRoute = async () => {
        if (!origin || !destination) return;

        const directionsService = new window.google.maps.DirectionsService();

        const response = await directionsService.route({
            origin: getLetLng(origin),
            destination: getLetLng(destination),
            // waypoints: stops,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        });
        setDirections(response);
        setDistance(response.routes[0].legs[0].distance.text);
    }

    // const addStop = () => {

    // }

    return (
        <div className='h-full flex flex-col justify-center content-center'>

            <div className='flex flex-col md:flex-row justify-between'>
                <div className=''>
                    <SearchInput setPlace={setOrigin} label={"Origin"} />

                    <SearchInput setPlace={setDestination} label={"Destination"} />
                </div>
                <div className=''>
                    <button className='rounded-full' onClick={calculateRoute}>Calculate Route</button>
                </div>
            </div>

            <div>Distance: {distance}</div>
        </div>
    )
}

export default Controls