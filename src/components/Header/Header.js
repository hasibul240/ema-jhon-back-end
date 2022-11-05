import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/Logo.svg';
import { AuthContext } from '../Context/UserContext';
import './header.css';

const Header = () => {

    const { user, log_out } = useContext(AuthContext);
    

    return (
        <nav className='header '>
            <img src={logo} alt="" />
            <div>
                <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to='/shop'>Shop</NavLink>
                <NavLink to='/orders'>Orders</NavLink>
                <NavLink to='/inventory'>Inventory</NavLink>
                <NavLink to='/about'>About</NavLink>
                {
                    user?.uid ? <button onClick={log_out} className='sign_out_btn'>Sign Out</button> :
                        <>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/signup'>SignUp</NavLink>
                        </>

                }
            </div>
        </nav>
    );
};

export default Header;