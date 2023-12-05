//Globals
import React from "react"
import axios from "axios"
//Destructures
import { useState, useEffect, useContext } from 'react'
import { Link, Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";
//Assets
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap'
import icon from '../../assets/bars-solid.svg'
//Components
import DataContext from "./DataContext"

export default function Header () {
    //Reactstrap Navbar
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    //Auth0
    const { user, isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();
    //useContext
    const { loggedInUser, setLoggedInUser, dbBaseURL, setDbBaseURL, userProjects, setUserProjects,
      userTickets, setUserTickets  } = useContext(DataContext);

    //Lookup database user based on Auth0 user.sub. If no user, create new user. Pull user data, user projects, and user tickets.
    const lookupDBUserWithAuth0 = async () => {
      //VITE_DB_BASE_URL = "http://localhost:3001/"
      const token = await getAccessTokenSilently()
      const response = await axios.post(`${dbBaseURL}users/auth/check-user`, {
        auth0sub: user.sub,
        displayName: user.name,
        email: user.email,
        isSiteAdmin: true,
        isOrgAdmin: true,
      }, {
        headers: {
          authorization: `Bearer ${token}`,
          auth0sub: user.sub,
        }
      })
      console.log("userInfo:",response.data)
      setLoggedInUser(response.data.user)
      setUserProjects(response.data.projects)
      setUserTickets(response.data.tickets)
    }

    //Logout and reset useState
    const logoutAndReset = () => {
      setLoggedInUser({
        auth0sub: "",
        displayName: "",
        email: "",
        isSiteAdmin: false,
        isOrgAdmin: false
      })
      setUserTickets([])
      setUserProjects([])
      logout({ logoutParams: { returnTo: window.location.origin } })
      console.log("Signed Out", loggedInUser)
    }

    // Upon login, create new user or lookup existing user
    useEffect(() => {
      //If user is authenticated
      if (isAuthenticated && user && !isLoading) {
        lookupDBUserWithAuth0()
      }
    }, [isAuthenticated, isLoading, user])

    return (
        <div className='Header'>
          <Navbar style={{backgroundColor: "#026C71"}}>
            <NavbarBrand style={{backgroundColor: "#026C71", color: "#23E1CE"}} href="/">SafeStreetsSurvey</NavbarBrand>
            {
              isAuthenticated ? 
              <Button 
                style={{backgroundColor: "#CF2C28" } }
                > <Link to="/new-ticket/">New Ticket</Link> </Button> :
              <Button 
                style={{backgroundColor: "#CF2C28" }} 
                onClick={() => loginWithRedirect()}
              > Login </Button>
            }
            <NavbarToggler style={{backgroundColor: "#026C71", color: "#23E1CE"}}onClick={toggle}>
                <img src={icon} /> 
            </NavbarToggler>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="me-auto" navbar>
                {
                  isAuthenticated ?
                  <>
                    <NavbarText>Hello {loggedInUser.displayName} </NavbarText>
                    <NavItem>
                      <NavLink href="/profile/"> My Profile </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink 
                        onClick={() =>logoutAndReset()}
                      > Logout </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/new-ticket/">New Ticket</NavLink>
                    </NavItem> 
                  </> : null
                }
                <NavItem>
                  <NavLink href="/projects/">Browse Projects</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      )

}