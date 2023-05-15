"use client"
import getLetLng from '@/utils/getLatLng';
import { Autocomplete } from '@react-google-maps/api'
import React, { useRef, useState } from 'react'
import styles from '@/styles/controls.module.css'

const SearchInput = ({ setPlace, label, id, setReload }) => {
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

                    const place = getLetLng(autocomplete.getPlace());
                    console.log({ place, autocomplete })
                    if(!place || !place?.lat || !place?.lng){
                        ref.current.value = "";
                        return window.alert("Please select a valid place")
                    }
                    setPlace((prev) => {
                        if (Array.isArray(prev)) {
                            prev[id].location = place;
                            return prev;
                        } else {
                            return {
                                name : value,
                                latLong : place
                            };
                        }
                    });
                    if (setReload) setReload((prev) => !prev);
                }}
            >
                <>
                    <p>{label}</p>
                    <input ref={ref} type="text" id='search' className={`${styles.input} px-3 py-2 w-full`} />
                </>
            </Autocomplete>
        </div>
    )
}

export default SearchInput