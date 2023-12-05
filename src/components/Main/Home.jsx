import React from "react"
import { useState } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button  } from 'reactstrap'

export default function Home () {

    return(
        <div className="Home">
            <Card body className="text-center" style={{ 
                    width: '100vw', 
                    backgroundColor: 'transparent', 
                    border: 'none' 
            }}>
                <CardBody>
                    <CardTitle tag="h3">
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
                    <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    </CardText>
                    <Button>
                        Button
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}
