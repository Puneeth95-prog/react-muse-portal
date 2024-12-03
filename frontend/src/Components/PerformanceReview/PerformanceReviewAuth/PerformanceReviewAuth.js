import React, { useState } from 'react';
import './PerformanceReviewAuth.css';
import { Link, useNavigate } from 'react-router-dom';
import PerformanceReviewSchema from '../../ErrorsSchema/PerformanceReviewValidation';
import { useFormik } from "formik";
import PerformanceReviewRegisterAuth from './PerformanceReviewRegisterAuth';
import axios from 'axios';


function PerformanceReviewAuth() {

    const [noRecordError, setNoRecordError] = useState('');

    const navigate = useNavigate();

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            reviewLoginEmail: "",
            reviewLoginPassword: "",
        },
        validationSchema: PerformanceReviewSchema,
        onSubmit: (values) => {
            const email = values.reviewLoginEmail;   // The entered value in the login form
            const password = values.reviewLoginPassword; // The entered value in the login form
            axios.post('http://localhost:8081/review/login', {email, password})
            .then((res) => {
                // console.log(res.data);
                // const response = res.data;
                // response.map((item) => {
                //     console.log(item.employee_id);
                // })
                
                if(res.data['message'] === 'User not found') {
                    setNoRecordError('Please check your username');
                } else if(res.data['message'] === 'Invalid credentials') {
                    setNoRecordError('Please check your username or password');
                }else {
                    const response = res.data;
                    const email = response['email'];
                    const empId = response['employee_id'];
                    const empName = response['employee_name'];
                    const empDesig = response['employee_designation'];
                    
                    localStorage.removeItem('menuBar');
                    localStorage.setItem('loginValue', 1);
                    localStorage.setItem('reviewActive', 1);
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', empName);
                    localStorage.setItem('designation', empDesig);
                    localStorage.setItem('empid', empId);
                    navigate('/performancereview/user_welcome');
                }
                
            })
            .catch(err => console.log(err))

        }
    })

    return (
        <section className='performance-review'>
            <div className='container'>
                <div className='row'>
                    <div className='col-1'>

                    </div>
                    <div className='col-9'>
                        <h3 className='performance-review-title'>Employee Performance Review</h3>
                        <section className='performance-review-container'>
                            <div className='review-login-container'>
                                <h5 className='review-logintitle color-green'>Login</h5>
                                {noRecordError && <p className='error'>{noRecordError}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group'>
                                        <label className='port-lligat'>Email:</label>
                                        <input type='email' name='reviewLoginEmail' values={values.reviewLoginEmail} onChange={handleChange} onBlur={handleBlur}
                                        placeholder='Enter Email' className='port-lligat form-control' />
                                        {errors.reviewLoginEmail && touched.reviewLoginEmail && <p className="error">{errors.reviewLoginEmail}</p>}
                                    </div>

                                    <div className='form-group'>
                                        <label className='port-lligat'>Password:</label>
                                        <input type='password' name='reviewLoginPassword' values={values.reviewLoginPassword} onChange={handleChange} onBlur={handleBlur}
                                        placeholder='Enter Password' className='port-lligat form-control' />
                                        {errors.reviewLoginPassword && touched.reviewLoginPassword && <p className="error">{errors.reviewLoginPassword}</p>}
                                    </div>

                                    <button className='btn btn-primary' type='submit' id='review-login-btn'>Login</button>

                                    <div className='forgot-password-block'>
                                        <Link to='/performancereview/forgot_password' className='forgot-password-link port-lligat'>Forgot Password</Link>
                                    </div>
                                    
                                </form>
                            </div>

                            <div className='review-register-container'>
                                <PerformanceReviewRegisterAuth />
                            </div>
                        </section>
                    </div>

                    <div className='col-2'>

                    </div>
                    
                </div>
            </div>
            
        </section>
    )
}

export default PerformanceReviewAuth;