import React, { useState, useEffect } from 'react';
import styles from './Signup.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig.js'; // Ensure this path matches where you export your initialized app
import { Navigate } from 'react-router-dom';

export const Signup = () => {
    useEffect(() => {
        document.title = 'Signup | Pharma X';
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const auth = getAuth(app); // Use the initialized app instance

    const userSignedUp = null;

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password cannot be empty");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const userSignedUp = true;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                setSuccess("Account created successfully");
                // Additional steps on successful signup (e.g., redirect or update UI)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(errorMessage); // Display Firebase errors to the user
                Navigate('/admin');
            });
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles['card-container']}>
                    <div className={styles['hero-text']}>
                        <h1 className={styles['brand-hero']}>Pharma X</h1>
                        <p className={styles['welcome-msg']}>Please fill in the form</p>
                        <p className={styles['error-msg']}>{error}</p>
                        <p className={styles['success-msg']}>{success}</p>
                    </div>
                    <form className={styles['login-form']} onSubmit={handleSignup}>
                        {/* <div className={styles['input-group']}>
                            <FontAwesomeIcon icon={faIdCard} className={styles['input-icon']} />
                            <input
                                type="text"
                                id="fullname"
                                value={fullName}
                                name="fullname"
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Full Name"
                            />
                        </div> */}
                        <div className={styles['input-group']}>
                            <FontAwesomeIcon icon={faUser} className={styles['input-icon']} />
                            <input
                                type="text"
                                id="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                        <div className={styles['input-group']}>
                            <FontAwesomeIcon icon={faLock} className={styles['input-icon']} />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
