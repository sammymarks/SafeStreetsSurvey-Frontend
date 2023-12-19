import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import TestMap from "./TestMap";
// reactstrap modal imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

// using a modal for editing information
const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  // state for opening and closing modal:
  const [modal, setModal] = useState(false);

  // toggle function
  const toggle = () => setModal(!modal);

  if (isLoading) {
    return <div className="UserProfile">Loading ...</div>;
  }

  return (
    <div className="UserProfile">
      {isAuthenticated && (
        <div className="UserProfile" style={{display: 'flex', 'flex-direction': 'column', 'align-items': 'center'}} >
          {/* User Profile Card */}
          <Card style={{ width: '20rem', 'margin-top': '10px', 'border-radius': '20px'}} >
            <CardBody>
              {/* TEMPORARY: added inline styles to make image smaller, can be moved to CSS */}
              <CardTitle tag="h5">
                <img src={user.picture} alt={user.name} style={{width: '50px', 'border-radius': '50%'}}/>
                {user.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6" >
                Card subtitle
              </CardSubtitle>
              <CardText>
                <div>Name: {user.name}</div>
                <div>Nickname: {user.nickname}</div>
                <div>Email: {user.email}</div>
              </CardText>
              <Button onClick={toggle}>
                Edit Profile
              </Button>
            </CardBody>
          </Card>

          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Edit Profile</ModalHeader>
            <ModalBody>
              Information to edit here.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Make Changes
              </Button>{' '}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Buttons to view other parts of user profile */}
          <Button style={{'margin-top': '15px', width: '20rem', height: '3rem', 'border-radius': '15px'}}>My Projects</Button>
          <Button style={{'margin-top': '15px', width: '20rem', height: '3rem', 'border-radius': '15px'}}>My Tickets</Button>
          {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      )}
    </div>
  )
};

export default Profile;