import React, { useRef, useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';

function ForgotPassword() {

    const [noDetailsError, setNoDetailsError] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const emailRef = useRef();
    const form = useRef();

    const handleCredentialsSubmit = (e) => {
        const email = e.target.value;
        if(emailRef.current.value.trim() === "") {
            alert('Please enter the email!');
            emailRef.current.focus();
        }else {
            if(emailRef.current.value.trim() !== "") {
                // alert(emailRef.current.value);
                const forgetPasswordEmail = emailRef.current.value;
                axios.post('http://localhost:8081/forgotpassword/details', {forgetPasswordEmail})
                .then((res) => {
                    if(res.data['message'] === 'User not found') {
                        setNoDetailsError("Email ID doesn't exist");
                    }else {
                        const response = res.data;
                        const userPassword = response['plain_password'];
                        const userEmail = response['email'];
                        emailjs.sendForm(
                            'service_g8hr0rn',   // Service ID from emailJS
                            'template_c32g2m5',  // Template ID from emailJS
                            form.current,        // 3rd parameter to be referenced to the form, form has the input text that we pass to the emailJS
                            {
                                publicKey: 'NOkmbP2YKgQvQd-Fb'   // Public Key from emailJS
                            }
                        )
                        .then(
                            () => {
                              console.log('SUCCESS!');
                            },
                            (error) => {
                              console.log('FAILED...', error);
                            },
                        );
                    }
                })
                .catch(err => console.log(err))
            }
        }
    }

    const handleCredentialsChange = (e) => {
        setUserEmail(e.target.value);
    }

    return (
        <section className='forgot-password'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-4'>
                        <h4 className='forgot-pw-title'>Employee Performance Review</h4>
                        <form ref={form} className='forgot-pw-form' onSubmit={handleCredentialsSubmit}>
                            {noDetailsError && <p className='error'>{noDetailsError}</p>}
                            <div className='form-group'>
                                <label className='port-lligat pb-1'>Email:</label>
                                <input ref={emailRef} onChange={handleCredentialsChange} value={userEmail} type='email' placeholder='Enter email' className='form-control port-lligat' />
                            </div>
                            <button onClick={handleCredentialsSubmit} className='send-credentials-btn port-lligat' type='button'>Send Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword