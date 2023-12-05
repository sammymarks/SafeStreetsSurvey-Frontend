//Globals
import React from "react"
import axios from "axios"
//Destructures
import { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
//Assets
import {Form, FormGroup, FormText, Label, Input, Button, Spinner, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, CardTitle, CardText, CardSubtitle, Container, Col, Row} from 'reactstrap'
import Select from 'react-select'
import dayjs from 'dayjs'

//Components
import DataContext from "../App/DataContext";

export default function BrowseProjects () {
    const navigate = useNavigate()
    //UseContext
    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects, userTickets, setUserTickets, allProjects, setAllProjects, allOrganizations, setAllOrganization, allTickets, setAllTickets } = useContext(DataContext);

    //UseStates
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)
    const [organizationDropdownOptions, setOrganizationDropdownOptions] = useState([])
    const [displayProjects, setDisplayProjects] = useState([])

    //Dropdown
    const statusToggle = () => setStatusDropdownOpen((prevState) => !prevState);
    // const organizationToggle = () => setOrganizationDropdownOpen((prevState) => !prevState);
    // const orgDropdownOption
    
    const mapOrgDropdown = () => {
        const mappedOptions = allOrganizations.map((org)=>{
            return   { value: org._id, label: org.orgName }
        })
        setOrganizationDropdownOptions(mappedOptions)
        console.log("mappedOptions", mappedOptions)
    }

    //Format Date
    const formatDate = (ISODate) => {
        console.log("formatting date: ", ISODate)
        const formattedDate = dayjs(ISODate).format('MMM D, YYYY')
        console.log(formattedDate)
        return formatDate
    }

    const displayAllProjects = () => {
        const mappedProjects = allProjects.map((project, index)=>{
            return(
                <Card key={project._id} >
                <CardBody>
                    <CardTitle tag="h6">{project.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6"> {project.organization.orgName} </CardSubtitle>
                    <CardText> {project.description} </CardText>
                    <Container fluid>
                        <Row >
                            <Col className="bg-light border" xs="5"> Start </Col>
                            <Col > {dayjs(project.startDate).format('MMM D, YYYY')} </Col>
                        </Row>
                        <Row xs="2">
                            <Col className="bg-light border" xs="5"> End </Col>
                            <Col > {dayjs(project.endDate).format('MMM D, YYYY')} </Col>
                        </Row>
                        <Row >
                            <Col className="bg-light border" xs="5"> Contributors </Col>
                            <Col > {project.userParticipants.length} </Col>
                        </Row>
                        <Row >
                            <Col className="bg-light border" xs="5"> Tickets </Col>
                            <Col > {allTickets.filter((ticket)=> ticket.project == project._id).length} </Col>
                        </Row>
                    </Container>
                    <Button>
                    Join Project
                    </Button>
                    <Button onClick={()=>navigate(`/projects/${project._id}`)}>
                    Project Details
                    </Button>
                </CardBody>
                </Card>            
            )
        })
        setDisplayProjects(mappedProjects)
    }


    useEffect(() => {
        mapOrgDropdown()
        displayAllProjects()
    }, [allProjects])
        
    return (
        <div className="BrowseProjects">
            { (allProjects.length>0 && allOrganizations.length>0) ? 
                (<>
                    <InputGroup>
                        <Input id="projectSearch" placeholder="Search Projects" />
                        <Button>Go</Button>
                    </InputGroup>
                    <Dropdown isOpen={statusDropdownOpen} toggle={statusToggle} >
                        <DropdownToggle caret>Filter Status</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>Active</DropdownItem>
                            <DropdownItem>Inactive</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Select placeholder={<div>Filter Organizations</div>} options={organizationDropdownOptions}/>
                    {displayProjects}
                </>)
                : <div>Loading...</div>
            }
        </div>
    )
}