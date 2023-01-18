import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, userInfo } from '../utils/auth';

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = (location, path) => {
        if (location.pathname === path) {
            return {color: 'white'};
        } else {
            return {color: 'black'};
        }
    }
    return (
        <nav className="navbar navbar-expand-lg bg-secondary mb-5">
            <div className="container">
                <NavLink className="navbar-brand" to='/'><img src={require('../images/logo/logo.png')} alt="LOGO" width="100" /></NavLink>
                <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" style={isActive(location, '/')}>Home</NavLink>
                    </li>
                    {!isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" style={isActive(location, '/login')}>Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register" style={isActive(location, '/register')}>Register</NavLink>
                            </li>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`/${userInfo().role}/dashboard`} style={isActive(location, `/${userInfo().role}/dashboard`)}>Dashboard</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => {
                                    logout(() => {
                                        navigate('/login');
                                    });
                                }}>Logout</span>
                            </li>
                        </>
                    )}
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    );
};

export default Menu;