import React from 'react'
import {Link} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth'
import {Fragment} from 'react';

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const selectorRedux = useSelector(state => state)
    // console.log(selectorRedux.auth.user.name)

    const authLinks = (
        <ul>
            <li>
                <Link to="/profile">My Profile</Link>
                <Link to="/newparty">Добавить вечеринку</Link>
                <a onClick={logout} href="#!">

                    <span className="hide-sm">Log Out</span></a>

            </li>
        </ul>
    );


    const guestLinks = (
        <ul>
            <li><a href="#!">Developers</a></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><ida className="fas fa-code"></ida> asDevConnector</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
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
