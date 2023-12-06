import React from "react"
import { useState, useEffect, useContext, useMemo } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button} from 'reactstrap'
import { useAuth0 } from "@auth0/auth0-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import DataContext from "../App/DataContext";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
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


export default function ProjectDetailsMap ({displayProject, displayProjectTickets}) {
    const [centerAddress, setCenterAddress] = useState({lat: 41.983720, lng: -87.689710})
    const [projectMarkers, setProjectMarkers] = useState(null)
    const [selectedMarker, setSelectedMarker] = useState(null)
    // const [selectedMarkerPosition, setSelectedMarkerPosition] = useState(null)

    //GOOGLE MAPS API
    const [ GMapsLibraries ] = useState(['places']);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey : import.meta.env.VITE_GOOGLE_MAPS_PLACE_API_KEY,
        libraries: GMapsLibraries
      })

    //Map Markers
    const mapProjectMarkers = () => {
        const markers = displayProjectTickets.map((ticket, index)=>{

            return (
                <MarkerF 
                    key={index}
                    position={{lat: parseFloat(ticket.addressLat), lng: parseFloat(ticket.addressLong)}} 
                    onClick={() => {
                        setSelectedMarker(ticket)
                    }}
                />
            )
        })
        setProjectMarkers(markers)
    }

    //Render InfoWindow
    const renderInfoWindow = () => {

        return (
            <InfoWindowF
                position={{lat: parseFloat(selectedMarker.addressLat), lng: parseFloat(selectedMarker.addressLong)}}
                onCloseClick={()=>setSelectedMarker(null)}
            >
                <div>{selectedMarker.comments}</div>
            </InfoWindowF>
        )
    }


    useEffect(() => {
        console.log("displayProjectTickets", displayProjectTickets)
        if (displayProjectTickets.length>0) {mapProjectMarkers()}
      }, [displayProjectTickets])
    
    if (!isLoaded) return  <div> Loading... </div>
    return (
        <div className="ProjectDetailsMap">
            <GoogleMap zoom={14} center = {centerAddress} mapContainerClassName='project-details-map-container'>
                {/* <MarkerF position={centerAddress} /> */}
                {projectMarkers}
                {selectedMarker && renderInfoWindow()}
            </GoogleMap>
        </div>
    )
}