//Globals
import React from "react"
import axios from "axios"
//Destructures
import { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
//Assets
import {Form, FormGroup, FormText, Label, Input, Button, Spinner, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardText, CardSubtitle, Container, Col, Row, ButtonGroup, Table} from 'reactstrap'
import Select from 'react-select'
import dayjs from 'dayjs'

//Components
import DataContext from "../App/DataContext";
import ProjectDetailsMap from "./ProjectDetailsMap";

export default function ProjectDetails () {
    const navigate = useNavigate()
    //Auth
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
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

    //Join Project
    const joinProject = async (projID) => {
        console.log(loggedInUser)
        const token = await getAccessTokenSilently()
        const response = await axios.put(`${dbBaseURL}projects/add-user`, {
            projectID : projID,
            userID : loggedInUser._id
        },
        {
            headers: {
            authorization: `Bearer ${token}`,
            auth0sub: user.sub,
            }
        }
        )
        console.log("response", response)
    }

    //Leave Project
    const leaveProject = async (projID) => {
        console.log(loggedInUser)
        const token = await getAccessTokenSilently()
        const response = await axios.put(`${dbBaseURL}projects/remove-user`, {
            projectID : projID,
            userID : loggedInUser._id
        },
        {
            headers: {
            authorization: `Bearer ${token}`,
            auth0sub: user.sub,
            }
        }
        )
        console.log("response", response)
    }

    //Project Data UseEffect
    useEffect(() => {
        const linkedProject = allProjects.find((project) => project._id === id)
        setDisplayProject(linkedProject)
        getProjectTickets()
      }, [id])


    
    console.log("displayProject", displayProject)
    console.log("displayProjectTickets", displayProjectTickets)
    
    if (!displayProject) {return <div>Loading...</div>}
    return (
        <div className="ProjectDetails">
            <Card  style={{backgroundColor: 'transparent', border: 'none'}}>
                <ButtonGroup>
                    <Button style={{margin: '5px' }}>
                        Browse Projects
                    </Button>
                    {
                        (user && loggedInUser && isAuthenticated) && 
                            displayProject.userParticipants.includes(loggedInUser._id) ?
                                <Button 
                                    style={{backgroundColor: "#CF2C28", margin: '5px' } }
                                    onClick={()=>leaveProject(displayProject._id)}
                                    >
                                    Leave Project
                                </Button>
                            :
                                <Button 
                                    style={{backgroundColor: "#CF2C28", margin: '5px' } }
                                    onClick={()=>joinProject(displayProject._id)}
                                    >
                                    Join Project
                                </Button>
                    }
                    
                
                </ButtonGroup>
                <CardBody>
                    <CardTitle tag="h6">{displayProject.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {displayProject.organization.orgName} </CardSubtitle>
                    <CardText> {dayjs(displayProject.startDate).format('MMM D, YYYY')} - {dayjs(displayProject.endDate).format('MMM D, YYYY')}</CardText>
                    <CardText> {displayProject.description} </CardText>

                </CardBody>
                <ProjectDetailsMap 
                    displayProject={displayProject} 
                    displayProjectTickets={displayProjectTickets} 
                />
                <CardBody>
                    <Table>
                        <tbody>
                            <tr>
                                <th scope="row">Contributors</th>
                                <td>{displayProject.userParticipants.length}</td>
                            </tr>
                            <tr>
                                <th scope="row">Total Tickets</th>
                                <td>{displayProjectTickets.length}</td>
                            </tr>
                            <tr>
                                <th scope="row"> Reviewed Tickets </th>
                                <td>#</td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
            </Card>       
        </div>
    )
}