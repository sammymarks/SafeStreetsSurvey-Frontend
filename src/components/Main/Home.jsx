import React from "react"
import { useState } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Table  } from 'reactstrap'
import { Link, Route, Routes } from 'react-router-dom'


export default function Home () {

    return(
        <div className="Home">
            <Card body className="text-center" style={{ 
                    width: '100vw', 
                    backgroundColor: 'transparent', 
                    border: 'none',
                    margin: 'none' 
            }}>
                <CardBody>
                    <CardTitle tag="h4">
                        Welcome to Safe Streets Survey!
                    </CardTitle>
                    <CardSubtitle 
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Helping improve neighborhood access one picture at a time
                    </CardSubtitle>

                    <CardTitle tag="h5">
                        How does this work?
                    </CardTitle>
                    <Table borderless responsive style={{textAlign:'left'}} >
                        <tbody>
                            <tr>    
                                <th scope="row">
                                    1
                                </th>
                                <td>
                                    Browse Projects to see all of the impactful projects happening in the community
                                </td>
                            </tr>    
                            <tr>
                                <th scope="row">
                                    2
                                </th>
                                <td>
                                Login with secure authentication
                                </td>
                            </tr>    
                            <tr>
                                <th scope="row">
                                    3
                                </th>
                                <td>
                                Join a Project
                                </td>
                            </tr>    
                            <tr>
                                <th scope="row">
                                    4
                                </th>
                                <td>
                                Submit a Ticket with location, images, and specific feedback
                                </td>
                            </tr>    
                            <tr>
                                <th scope="row">
                                    5
                                </th>
                                <td>
                                Hear back from your local organizer on what is being done to improve the community!
                                </td>
                            </tr>    

                        </tbody>
                    </Table>
                    <Button className="home-button">
                        <Link to="/projects/">Browse Projects</Link>
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
