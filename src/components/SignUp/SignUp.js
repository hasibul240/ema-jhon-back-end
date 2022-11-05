import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './SignUp.css';

const SignUp = () => {

    const [error, set_error] = useState(null);

    const {create_user}= useContext(AuthContext);

    const handle_submit = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm_password.value;

        if (password.length < 6) {
            set_error('Password should be 6 characters or more.');
            return;
        }
        if (password !== confirm) {
            set_error('Passwords did not match!');
            return;
        }

        create_user(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch(error => console.error(error))
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
                <div className="form_control">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" name='confirm_password' placeholder='Enter Confirm Password' required/>
                </div>
                <p className='text_error'>{error}</p>
                <input type="submit" className='submit_button' value='Sign Up'/>
                <p className='togle_text'>Already Have an Account ? <Link to='/login'>Login</Link></p>
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

export default SignUp;