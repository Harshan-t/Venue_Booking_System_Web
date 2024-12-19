import '../styles/register.css';
import Header from '../components/header';
import React from 'react';
import { Link } from 'react-router-dom';
function Register() {
    return (
        <div>
            <header className="header shadow-sm">
                            <div className="logo">
                    <Link to="/">
                        <img src="src/assets/logo.svg" alt="Logo" />
                    </Link>
                </div>
    </header>
        <div className="register-container">
            <div className="register-box">
 
                <h2 className="register-title">Register</h2>

                <div className="reg-group">
                    <label htmlFor="username">Name <span className="required">*</span></label>
                    <input type="username" id="username" className="input-field" required />
                </div>

                <div className="reg-group">
                    <label htmlFor="email">Email <span className="required">*</span></label>
                    <input type="email" id="email" className="input-field" required />
                </div>

                <div className="reg-group">
                    <label htmlFor="password">Password <span className="required">*</span></label>
                    <input type="password" id="password" className="input-field" required />
                </div>
                <div>
                <button className="register-btn">Register</button>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Register;

