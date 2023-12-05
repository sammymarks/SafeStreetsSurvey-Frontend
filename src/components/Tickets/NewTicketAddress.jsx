import React from "react"
import { useState, useEffect, useContext } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button, Spinner, InputGroup} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import DataContext from "../App/DataContext";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete"

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";


export default function NewTicketAddress ({selectedAddress, setSelectedAddress, isLoaded, newTicket, setNewTicket}) {
    
    
    const {
        ready, value, setValue,
        suggestions: {status, data},
        clearSuggestions
      } = usePlacesAutocomplete()

    const [currentLocationLoading, setCurrentLocationLoading] = useState(false)


    const handleAddressSelect = async(address) => {
        //False = no additional data needed
        setValue(address, false)
        clearSuggestions()
    
        //convert to lat long
        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        setSelectedAddress({lat, lng})
        setNewTicket({...newTicket, addressLat: selectedAddress.lat, addressLong: selectedAddress.lng })
    }

    //GET CURRENT LOCATION
    //https://www.tutorialspoint.com/html5/geolocation_getcurrentposition.htm
    function locationErrorHandler(err) {
        if(err.code == 1) {
           alert("Error: Access is denied!");
        } else if( err.code == 2) {
           alert("Error: Position is unavailable!");
        }
     }

     async function showLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude : " + latitude + " Longitude: " + longitude);
        const revGeocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_PLACE_API_KEY}`;

        const response = await axios.get(revGeocodeURL)
        let currentAddress = response.data.results[0].formatted_address
        console.log(currentAddress)
        handleAddressSelect(currentAddress)
        setCurrentLocationLoading(false)
     }


     function getCurrentLocation () {
        setCurrentLocationLoading(true)
        const locationObj = {lat: "", long: ""}
        console.log("getCurrentLocation")
        if (navigator.geolocation) {
            console.log("location running")
            const options = {timeout:60000};
            navigator.geolocation.getCurrentPosition(showLocation, locationErrorHandler, options);
        } else {
          alert("Geolocation is not supported by this browser.")
        }
        
      }
    
    if (!isLoaded) return  <div> Loading... </div>

    return (
        <div className="NewTicketAddress">
            <InputGroup>
                <Combobox onSelect={handleAddressSelect} className="new-ticket-combobox">
                    <ComboboxInput 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                        disabled={!ready}
                        placeholder='5620 N Western Ave, Chicago, IL 60659'
                        style={{ width: "100%" }}

                    />
                    <ComboboxPopover>
                        <ComboboxList>
                        {status == "OK" && data.map(({place_id, description}) => <ComboboxOption 
                            key={place_id} 
                            value={description}
                        />)}
                        </ComboboxList>
                    </ComboboxPopover>
                </Combobox>
                <Button onClick={() => getCurrentLocation()}>Get Current Location</Button>
                {currentLocationLoading ? <Spinner color="primary"  >Loading...</Spinner> : null}
            </InputGroup>
        </div>
    )
}