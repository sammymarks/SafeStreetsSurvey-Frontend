import React, { useState, useCallback, useMemo } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
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




const TestMap = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey : import.meta.env.VITE_GOOGLE_MAPS_PLACE_API_KEY,
    libraries: ["places"],
  })
  
  if (!isLoaded) return  <div> Loading... </div>
  return (
    <>
      <Map />
    </>
  )
}

const Map = () => {
  const [selected, setSelected] = useState(null)

  const center = useMemo(() => ({lat: 44, lng: -80}), [])
  console.log(selected)
  return (  
    //Map = Zoom, Center of Map, Container Class Name
    //Marker = position 
    <>
      <Autocomplete setSelected={setSelected}/>
      <GoogleMap zoom={10} center = {selected} mapContainerClassName='map-container'>
      {selected && <Marker position={selected} />}
    </GoogleMap>
    </>

  )
}

const Autocomplete = ({setSelected}) => {
  
  const {
    ready, 
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions
  } = usePlacesAutocomplete()
  
  const handleSelect = async(address) => {
    //False = no additional data needed
    setValue(address, false)
    clearSuggestions()

    //convert to lat long
    const results = await getGeocode({address})
    const {lat, lng} = await getLatLng(results[0])
    setSelected({lat, lng})
  }
  
  return (
    <>
    <div>AUTOCOMPLETE</div>
    <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        disabled={!ready}
        placeholder='Search an Address'
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
    </>
    
  )
}














export default TestMap;