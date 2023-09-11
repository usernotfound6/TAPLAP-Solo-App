import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfilePage.css'

function ProfilePage() {
    const user = useSelector((store) => store.user);
console.log('user info', user)
    return (
          <div>
            <div className="container">
              <h1>{user.username}!</h1>
              <img id= "profilepic" className="pic" src="https://i.pinimg.com/originals/bb/3e/40/bb3e4072995649e40e7a405b105c5420.gif" alt="Girl in a jacket" width="500" border-radius="50px">
                </img>
              <h3>Bio:</h3>
              <p>{user.bio}</p>
              <button>edit</button>
              <h3>Contact:</h3>
              <p>{user.contact}</p>
              <button>edit</button>
              <h3>ID:</h3>
              <p>{user.id}</p>
              
            </div>
            </div>
    )
            
}

export default ProfilePage;