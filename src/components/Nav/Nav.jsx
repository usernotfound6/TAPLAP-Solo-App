import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/topics">
        <h2 className="nav-title">*</h2>
        <>penny for your thoughts</>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/topics">
              Topics
            </Link>

            <Link className="navLink" to="/createtopic">
              Create Topic
            </Link>

            <Link className="navLink" to="/mytopics">
              My Topics
            </Link>

          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        <Link className="navLink" to="/profile">
          Profile
        </Link>
        {user.id && (
        <LogOutButton className="navLink" to="/login"/>
        )}
      </div>
    </div>
  );
}

export default Nav;
