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

export default function AdminDashboard () {

    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects,userTickets, setUserTickets, adminOrgs, setAdminOrgs} = useContext(DataContext);

    if (isLoading) {
        return <div className="UserProfile">Loading ...</div>;
      }

    return (
        <div className="AdminDashboard">
            <h2>Welcome {loggedInUser.displayName}</h2>
            <h3>My Projects</h3>

        </div>
    )
}