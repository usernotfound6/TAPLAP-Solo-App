import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfilePage() {
    const user = useSelector((store) => store.user);
console.log('user info', user)
    return (
          <div>
            <div className="container">
              <h2>{user.username}!</h2>
              <img src="https://i.pinimg.com/originals/bb/3e/40/bb3e4072995649e40e7a405b105c5420.gif" alt="Girl in a jacket" width="500" border-radius="50px">
                </img>
              <p>bio: {user.bio}</p>
              <p>Your contact is: {user.contact}</p>
              <p>Your ID # is: {user.id}</p>
              
            </div>
            </div>
    )
            
}

export default ProfilePage;