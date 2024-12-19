import '../styles/login.css';
import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '../../UserContext.jsx';

import mylogo from '../assets/logo.png';

function Login() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    const { setUserData } = useContext(UserContext);

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            const base64Url = credentialResponse.credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedPayload = JSON.parse(atob(base64));

            const result = await axios.get('http://localhost:8000/users')
            const userexists = result.data.users.map(user => user.email);
            if (userexists.includes(decodedPayload.email)) {
                setUserData({
                    name: decodedPayload.name,
                    email: decodedPayload.email,
                    picture: decodedPayload.picture || '',
                });
                if (result.data.users.filter(user => user.email === decodedPayload.email)[0].roles === 'user') {
                    console.log('User logged in');
                    
                    navigate('/home');
                }
                else {
                    console.log('Admin logged in');
                    
                    navigate('/dashboardhome');
                }
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Traditional login submitted');
    };

    return (
        <GoogleOAuthProvider clientId="760040132925-sgh1nao08acmim6i1pjc0d7tpvghdje3.apps.googleusercontent.com">
            <div>
                <img src={mylogo} alt="App Logo" className='m-5' />
                <div className="login-container">
                    <div className="login-box">
                        <h2 className="login-title">Sign in</h2>

                        <GoogleLogin
                            onSuccess={handleGoogleLoginSuccess}
                            onError={(error) => console.error('Google Login Failed:', error)}
                            useOneTap
                        />

                        {userInfo && (
                            <div className="user-info">
                                <p>Welcome, {userInfo.name}!</p>
                                <p>Email: {userInfo.email}</p>
                                {userInfo.picture && (
                                    <img
                                        src={userInfo.picture}
                                        alt={`${userInfo.name}'s profile`}
                                        className="user-profile-pic"
                                    />
                                )}
                            </div>
                        )}

                        <p className="or-separator">or</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Username <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="input-field"
                                    required
                                    aria-label="Enter your email address"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password <span className="required">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="input-field"
                                    required
                                    aria-label="Enter your password"
                                />
                            </div>

                            <button type="submit" className="sign-in-btn">
                                Sign in
                            </button>
                        </form>

                        <div className="options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember-me" />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">
                                Forgot password?
                            </a>
                        </div>

                        <div className="extra-options">
                            <Link className="create-account" to="/register">
                                Create account
                            </Link>
                        </div>

                        <p className="legal">
                            This site is protected by reCAPTCHA.{' '}
                            <a href="#">Privacy Policy</a> and{' '}
                            <a href="#">Terms of Service</a> apply.
                        </p>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Login;