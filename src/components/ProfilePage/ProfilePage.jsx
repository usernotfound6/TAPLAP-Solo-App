import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfilePage.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function ProfilePage() {
  const user = useSelector((store) => store.user);

  return (
    <div className="profile-container">
      <Card elevation={24}  sx={{ height: 60, borderRadius: 5, margin: 'auto', display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "beige", maxWidth: 330}} className="profile-card">
        <CardContent>
          <h1>
            {user.username}
        </h1>
        </CardContent>
      </Card>

  
        <CardContent sx={{margin: 'auto', justifyContent: "center",  alignItems: "center", display: "flex"}}>
          <img
            id="profilepic"
            className="profile-pic"
            src="https://i.pinimg.com/originals/bb/3e/40/bb3e4072995649e40e7a405b105c5420.gif"
            alt="Girl in a jacket"
            width="800px"
            style={{ borderRadius: '90px' }}
          />
        </CardContent>
      

      <Card elevation={24}  sx={{ height: 200, marginBottom: 4, marginLeft:23,  marginRight:3, borderRadius: 5, display: "flex", backgroundColor: "beige", maxWidth: 930}} className="profile-card">
        <CardContent>
          <Typography variant="h5">Bio:</Typography>
          <Typography paragraph>{user.bio}</Typography>
          <Button variant="outlined">Edit</Button>
        </CardContent>
      </Card>

      <Card elevation={24}  sx={{ marginBottom: 4, marginLeft:23,  marginRight:3, borderRadius: 5, display: "flex", backgroundColor: "beige", maxWidth: 470}} className="profile-card">
        <CardContent>
          <Typography variant="h6">Contact:</Typography>
          <Typography paragraph>{user.contact}</Typography>
          <Button variant="outlined">Edit</Button>
        </CardContent>
      </Card>

      <Card elevation={24}  sx={{ height: 100, marginBottom: 4, marginLeft:23,  marginRight:3, borderRadius: 5, display: "flex", backgroundColor: "beige", maxWidth: 100}} className="profile-card">
        <CardContent>
          <Typography variant="h6">ID:</Typography>
          <Typography  variant="h5" paragraph>{user.id}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;