"use client"
import getLetLng from '@/utils/getLatLng';
import { Autocomplete } from '@react-google-maps/api'
import React, { useRef, useState } from 'react'
import styles from '@/styles/controls.module.css'

const SearchInput = ({ setPlace, label, id }) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const ref = useRef(null)

    return (
        <div>
            <Autocomplete
                onLoad={(autocomplete) => {
                    setAutocomplete(autocomplete);
                }}
                onPlaceChanged={() => {
                    console.log("place changed");
                    const value = ref.current.value;
                    if (!autocomplete || !value) return;

                    setPlace((prev) => {
                        const place = getLetLng(autocomplete.getPlace());
                        if (Array.isArray(prev)) {
                            prev[id].location = place;
                            return prev;
                        } else {
                            return place;
                        }
                    });
                }}
            >
                <>
                    <p>{label}</p>
                    <input ref={ref} type="text" id='search' className={`${styles.input} px-3 py-2`} />
                </>
            </Autocomplete>
        </div>
    )
}

export default SearchInput