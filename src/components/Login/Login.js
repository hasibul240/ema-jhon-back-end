import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Login.css';

const Login = () => {

    const [error, set_error] = useState(null);
    const { sign_in } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const handle_submit = (event) => {
        event.preventDefault();
        set_error(null);
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        sign_in(email, password)
            .then(result => {
                const user = result.user;
                set_error(null);
                console.log(user);
                form.reset();
                navigate(from, {replace: true});
            })
            .catch(error => {
                set_error('Wrong Email or Password!');
                console.error(error.message);
            });

    }

    return (
        <div className='form_container'>
            <h2 className='form_title'>LogIn</h2>
            <form onSubmit={handle_submit}>
                <div className="form_control">
                    <label htmlFor="">Email</label>
                    <input type="email" name='email' placeholder='Enter Email' required/>
                </div>
                <div className="form_control">
                    <label htmlFor="">Password</label>
                    <input type="password" name='password' placeholder='Enter Password' required/>
                </div>
                <p className='text_error'>{error}</p>
                <input type="submit" className='submit_button'/>
                <p className='togle_text'>New to Ema-john ? <Link to='/signup'>New Account</Link></p>
                <div className='or_area'>
                    <span></span>
                    <span className='def'>or</span>
                    <span></span>
                </div>
                <button className='google_btn'> <img className='google_img' src="/Google.png" alt="" /> Continue with Google</button>
                
            </form>
        </div>
    );
};

export default Login;