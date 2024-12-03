import React, { useState } from 'react';
import './PerformanceReviewRegisterAuth.css';
import ReviewRegFormValidation from '../../ErrorsSchema/ReviewRegFormValidation';
import { useFormik } from "formik";
import axios from 'axios';

function PerformanceReviewRegisterAuth() {

    const [dataEnteredError, setDataEnteredError] = useState('');

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            reviewRegisterEmail: "",
            reviewRegisterPassword: "",
            confirmPassword: "",
        },
        validationSchema: ReviewRegFormValidation,
        onSubmit: (values) => {
            const email = values.reviewRegisterEmail;
            const password = values.reviewRegisterPassword;
            const name = '';
            const empid = '';
            const designation = '';

            axios.post('http://localhost:8081/fetch/login', {email})
            .then((res) => {
                if(res.data === 'No Record found') {
                    axios.post('http://localhost:8081/register/login', {email, password, name, empid, designation})
                    .then((res) => {
                        // const response = res.data;
                        // response.map((item) => {
                        //     console.log(item.employee_id);
                        // })
                        
                        if(res.data === 'User Registration failed') {
                            setDataEnteredError('Details Not Entered');
                        }else if(res.data === 'User Registered Successfully') {
                            if(window.confirm('You have registered successfully. Please login')) {
                                window.location.reload();
                            }
                        }
                        else {
                            // console.log(res.data);
                            alert('User Registration failed');
                        }
                        
                    })
                    .catch(err => console.log(err))
                }else if(res.data === 'You have already registered') {
                    alert('You have already registered. Please Login');
                }else {
                    alert('Error connecting');
                }
            })
            
            

        }
    })

    return (
        <React.Fragment>
            <h5 className='review-regtitle color-green'>Register</h5>
            {dataEnteredError && <p className='error'>{dataEnteredError}</p>}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='port-lligat'>Email:</label>
                    <input type='email' name='reviewRegisterEmail' values={values.reviewRegisterEmail} onChange={handleChange} onBlur={handleBlur}
                    placeholder='Enter Email' className='port-lligat form-control' />
                    {errors.reviewRegisterEmail && touched.reviewRegisterEmail && <p className="error">{errors.reviewRegisterEmail}</p>}
                </div>

                <div className='form-group'>
                    <label className='port-lligat'>Password:</label>
                    <input type='password' name='reviewRegisterPassword' values={values.reviewRegisterPassword} onChange={handleChange} onBlur={handleBlur}
                    placeholder='Enter Password' className='port-lligat form-control' />
                    {errors.reviewRegisterPassword && touched.reviewRegisterPassword && <p className="error">{errors.reviewRegisterPassword}</p>}
                </div>

                <div className='form-group'>
                    <label className='port-lligat'>Confirm Password:</label>
                    <input type='password' name='confirmPassword' values={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                    placeholder='Enter Password' className='port-lligat form-control' />
                    {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <button className='btn btn-primary' type='submit' id='review-register-btn'>Register</button>

                
            </form>
        </React.Fragment>
    )
}

export default PerformanceReviewRegisterAuth;