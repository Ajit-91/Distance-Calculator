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
        <div className='h-full'>

            <div className='flex flex-col md:flex-row md:space-x-3 space-y-4 justify-center md:justify-between'>
                <div className='w-full md:w-1/2'>
                    <SearchInput setPlace={setOrigin} label={"Origin"} />
        
                    {stops.map((_, index) => (
                        <div key={index} className='mt-5'>
                            <SearchInput setPlace={setStops} label={"Stop"} id={index} setReload={setReload} />
                        </div>
                    ))}

                    <button onClick={addStop} className='block ml-auto mt-1'>
                        <FontAwesomeIcon icon={faCirclePlus} />
                        <span className='ml-2'>Add Stop</span>
                    </button>
                    <SearchInput setPlace={setDestination} label={"Destination"} />
                </div>
                <div className='w-full md:w-1/2 flex md:justify-end justify-center items-center'>
                    <button className='rounded-full bg-blue px-7 py-4 text-white' onClick={calculateRoute}>Calculate</button>
                </div>
            </div>

            <div className='rounded-full mt-10 w-full'>
                <div className='flex justify-between bg-white px-7 py-5'>
                    <h3 className='text-2xl font-bold'>Distance</h3>
                    <h3 className='text-2xl font-bold text-sky'>{distance || 1147}</h3>
                </div>

                <div className='bg-gray-3 px-7 py-5'>
                        <p>The distance between Mumbai and Delhi via the seleted route is {distance}.</p>
                </div>
            </div>
        </div>
    )
}

export default Controls