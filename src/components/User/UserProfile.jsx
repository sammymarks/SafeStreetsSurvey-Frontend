import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import TestMap from "./TestMap";


const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  

  if (isLoading) {
    return <div className="UserProfile">Loading ...</div>;
  }

  return (
    <div className="UserProfile">
      {isAuthenticated && (
        <div className="UserProfile">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  )
};

export default Profile;