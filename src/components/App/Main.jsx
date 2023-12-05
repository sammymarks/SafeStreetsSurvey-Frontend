import React from "react"
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Profile from '../User/UserProfile'
import NewTicket from "../Tickets/NewTicket"
import Home from "../Main/Home"
import BrowseProjects from "../Projects/BrowseProjects"
import ProjectDetails from "../Projects/ProjectDetails"

export default function Main () {

    return(
        <div className="Main">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/new-ticket" element={<NewTicket/>}/>
                <Route path="/profile" element={<Profile />} />
                <Route path="/projects" element={<BrowseProjects/>}/>
                <Route path="/projects/:id" element={<ProjectDetails/>}/>
            </Routes>
        </div>
    )
}
