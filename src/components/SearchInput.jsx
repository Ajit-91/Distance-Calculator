"use client"
import { Autocomplete } from '@react-google-maps/api'
import React, { useState } from 'react'

const SearchInput = ({ setPlace, label }) => {
    const [autocomplete, setAutocomplete] = useState(null);

    return (
        <div>
            <Autocomplete
                onLoad={(autocomplete) => {
                    console.log("autocomplete: ", autocomplete);
                    setAutocomplete(autocomplete);
                }}
                onPlaceChanged={() => {
                    console.log("place changed");
                    if (autocomplete !== null) {
                        console.log(autocomplete.getPlace());
                        setPlace(autocomplete.getPlace());
                    }
                }}
            >
                <>
                    <p>{label}</p>
                    <input type="text" id='search' />
                </>
            </Autocomplete>
        </div>
    )
}

export default SearchInput