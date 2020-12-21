import React from 'react'
import {Link} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
import {Fragment} from 'react';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const user = useSelector(state => state.auth.user)

  const authLinks = (
    <ul>
        <li>
          <Link to="/profile">{user && user.name}</Link>
          <Link to="/newparty">Add party</Link>
          <Link to="/myparties">My parties</Link>
          <Link to="/chat">Chat</Link>
          <a onClick ={logout} href="/">
            <span className="hide-sm">Log Out</span></a>
        </li> 
    </ul>
  );


    const guestLinks = (
      <ul>
        <li>
          <Link to="/register">Sign Up</Link>
          </li>
        <li>
          <Link to="/login">Login</Link>
          </li>
      </ul>
    ); 

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"> App-Plan-Party</Link>
      </h1>
  { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
    </nav>
  )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);
