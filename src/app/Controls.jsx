"use client"
import SearchInput from '@/components/SearchInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'

const Controls = ({ setDirections, origin, setOrigin, destination, setDestination, stops, setStops, setReload }) => {

    const [distance, setDistance] = useState(null);


    const calculateRoute = async () => {
        if (!origin || !destination) return;

        try {
            const directionsService = new window.google.maps.DirectionsService();

            const request = {
                origin,
                destination,
                optimizeWaypoints: true,
                travelMode: google.maps.TravelMode.DRIVING,
            }
            // if last stop is not empty, add all stops to request because if last stop is not empty then it means no stop is empty
            if(stops[stops.length - 1].location){
                request.waypoints = stops
            }else{
                // if last stop is empty, add all stops except last stop to request
                request.waypoints = stops.slice(0, stops.length-1)
            }
            console.log({request})
            const response = await directionsService.route(request);
            setDirections(response);
            setDistance(response.routes[0].legs[0].distance.text);
        } catch (error) {
            console.error("Error fetching directions", error);
            if(error.code === "ZERO_RESULTS")  window.alert("No route found")
        }
    }

    const addStop = () => {
        if (stops.length >= 10) return window.alert("You can only have 10 stops")
        if (!stops[stops.length - 1].location) return window.alert("You must enter the previous stop first to add another stop")
        setStops((prev) => {
            return [...prev, {
                location: "",
                stopover: true,
            }]
        })
    }

    return (
        <div className='h-full flex flex-col justify-center content-center'>

            <div className='flex flex-col md:flex-row justify-between'>
                <div className=''>
                    <SearchInput setPlace={setOrigin} label={"Origin"} />
                    <br />
                    {stops.map((_, index) => (
                        <div key={index} className='mb-2'>
                            <SearchInput setPlace={setStops} label={"Stop"} id={index} setReload={setReload} />
                        </div>
                    ))}
                    <button onClick={addStop}>
                        <FontAwesomeIcon icon={faCirclePlus} />
                        <span className='ml-2'>Add Stop</span>
                    </button>
                    <SearchInput setPlace={setDestination} label={"Destination"} />
                </div>
                <div className=''>
                    <button className='rounded-full bg-[blue] p-3 text-white' onClick={calculateRoute}>Calculate Route</button>
                </div>
            </div>

            <div>Distance: {distance}</div>
        </div>
    )
}

export default Controls