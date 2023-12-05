//Globals
import React from "react"
import axios from "axios"
//Destructures
import { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
//Assets
import {Form, FormGroup, FormText, Label, Input, Button, Spinner, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardText, CardSubtitle, Container, Col, Row} from 'reactstrap'
import Select from 'react-select'
import dayjs from 'dayjs'

//Components
import DataContext from "../App/DataContext";

export default function ProjectDetails () {
    const navigate = useNavigate()
    //UseContext
    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects, userTickets, setUserTickets, allProjects, setAllProjects, allOrganizations, setAllOrganization, allTickets, setAllTickets } = useContext(DataContext);
    //URL Params
    let { id } = useParams()
    //UseStates
    const [displayProject, setDisplayProject] = useState(null)
    const [displayProjectTickets, setDisplayProjectTickets] = useState([])

    //Project Tickets
    const getProjectTickets = () => {
        setDisplayProjectTickets(allTickets.filter((ticket)=> ticket.project == id))
    }

    //Project Data
    console.log(id)
    useEffect(() => {
        const linkedProject = allProjects.find(
          (project) => project._id === id
        )
        setDisplayProject(linkedProject)
        getProjectTickets()
      }, [id])
    
    console.log(displayProject)
    console.log(displayProjectTickets)
    
    if (displayProjectTickets.length == 0) {return <div>Loading...</div>}
    return (
        <div className="ProjectDetails">
            {displayProject.name}
        </div>
    )
}