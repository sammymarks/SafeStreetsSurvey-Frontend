import { useState, createContext, useContext, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios';

import './App.css'
import DataContext from './components/App/DataContext';
import Header from './components/App/Header';
import Body from './components/App/Body';

function App() {
  //useStates for useContext across App
  //db URL
  const [dbBaseURL, setDbBaseURL] = useState(import.meta.env.VITE_DB_BASE_URL)
  //Google Maps Login

  //Authentication
  const [loggedInUser, setLoggedInUser] = useState({
      auth0sub: "",
      displayName: "",
      email: "",
      isSiteAdmin: false,
      isOrgAdmin: false
  });
  const [ userProjects, setUserProjects ] = useState([]) //Projects where the logged in user has signed up
  const [ userTickets, setUserTickets ] = useState([]) //Tickets submitted by the logged in user
  const [ adminOrgs, setAdminOrgs ] = useState([]) //Organizations for which user isOrgAdmin
  const [ allProjects, setAllProjects ] = useState([]) //All projects in DB
  const [ allOrganizations, setAllOrganizations ] = useState([]) //All organizations in the DB
  const [ allTickets, setAllTickets ] = useState([]) //All tickets in the DB



  const getAllProjects = async () => {
    const response = await axios.get(`${dbBaseURL}projects`)
    console.log("allProjects", response.data)
    setAllProjects(response.data)
  }

  const getAllOrganizations = async () => {
    const response = await axios.get(`${dbBaseURL}organizations`)
    console.log("allOrganizations",response.data)
    setAllOrganizations(response.data)
  }

  const getAllTickets = async () => {
    const response = await axios.get(`${dbBaseURL}tickets`)
    console.log("allTickets",response.data)
    setAllTickets(response.data)
  }

  useEffect(() => {
    getAllProjects()
    getAllOrganizations()
    getAllTickets()
  }, [])

  return (
    <div className='App'>
      <DataContext.Provider value={{
        loggedInUser, setLoggedInUser,
        dbBaseURL, setDbBaseURL,
        userProjects, setUserProjects,
        userTickets, setUserTickets,
        adminOrgs, setAdminOrgs,
        allProjects, setAllProjects,
        allOrganizations, setAllOrganizations,
        allTickets, setAllTickets  
      }}>
        <Header />
        <Body />
      </DataContext.Provider>
    </div>
  )
}

export default App
