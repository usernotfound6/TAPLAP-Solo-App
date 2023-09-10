import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProfilePage() {
    const user = useSelector((store) => store.user);

    return (
          <div>
            <div className="container">
              <h2>{user.username}!</h2>
              <p>Your ID is: {user.id}</p>

            </div>
            </div>
    )
            
}

export default ProfilePage;