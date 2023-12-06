import React from "react"
import { useState, useEffect, useContext, useMemo } from 'react'
import {Form, FormGroup, FormText, Label, Input, Button, Table, Card, CardBody} from 'reactstrap'
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
    //https://www.youtube.com/watch?v=Pf7g32CwX_s
    const renderInfoWindow = () => {
        
        const issues = []
        selectedMarker.issue.dangerousConditions == true ? issues.push("Dangerous Conditions") : null
        selectedMarker.issue.missingInfrastructure == true ? issues.push("Missing Infrastructure") : null
        selectedMarker.issue.repairNeeded == true ? issues.push("Repair Needed") : null
        
        const location = []
        selectedMarker.location.bikePath == true ? location.push("Bike Path") : null
        selectedMarker.location.intersection == true ? location.push("Intersection") : null
        selectedMarker.location.lighting == true ? location.push("Lighting") : null
        selectedMarker.location.sidewalk == true ? location.push("Sidewalk") : null
        selectedMarker.location.street == true ? location.push("Street") : null
        selectedMarker.location.other == true ? location.push("Other") : null

        return (
            <InfoWindowF
                position={{lat: parseFloat(selectedMarker.addressLat), lng: parseFloat(selectedMarker.addressLong)}}
                options= {{maxWidth : 300 }}
                onCloseClick={()=>setSelectedMarker(null)}
            >
                <Card style={{border: "none"}}>
                        <Button size="sm">Ticket Details</Button>
                        <Table>
                        <tbody>
                            <tr>
                                <th scope="row">ID</th>
                                <td>{selectedMarker._id}</td>
                            </tr>
                            <tr>
                                <th scope="row">Issue</th>
                                <td>{issues.join(", ")}</td>
                            </tr>
                            <tr>
                                <th scope="row">Location</th>
                                <td>{location.join(", ")}</td>
                            </tr>
                            <tr>
                                <th scope="row">Comments</th>
                                <td>{selectedMarker.comments}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
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