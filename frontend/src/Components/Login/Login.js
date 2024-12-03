import React, { useState } from 'react';
import './Login.css';
import { useFormik } from "formik";
import axios from 'axios';
import Schema from '../ErrorsSchema/Schema';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [noRecordError, setNoRecordError] = useState('');

    const navigate = useNavigate();

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            itEmail: "",
            itPassword: ""
        },
        validationSchema: Schema,
        onSubmit: (values) => {
            const email = values.itEmail;   // The entered value in the login form
            const password = values.itPassword; // The entered value in the login form
            // e.preventDefault();
            axios.post('http://localhost:8081/login', {email, password})
            .then((res) => {
                console.log(res.data);
                // response.map((item) => {
                //     console.log(item.employee_id);
                // })
                
                if(res.data['message'] === 'User not found') {
                    setNoRecordError('Please check your username');
                } else if(res.data['message'] === 'Invalid credentials') {
                    setNoRecordError('Please check your username or password');
                }
                else {
                    const response = res.data;
                    const email = response['email'];
                    const empId = response['employee_id'];
                    const empName = response['employee_name'];
                    const empDesig = response['employee_designation'];
                    
                    localStorage.setItem('loginValue', 1);
                    localStorage.setItem('email', email);
                    localStorage.setItem('name', empName);
                    localStorage.setItem('designation', empDesig);
                    localStorage.setItem('empid', empId);
                    localStorage.setItem('auth', true);
                    // console.log(localStorage.getItem('loginValue'));
                    // navigate('/itserviceportal/complaint', { state:{ empId: empId, empName: empName, empDesig: empDesig }})
                    navigate('/itserviceportal/complaint');
                    // response.map((item) => {
                    //     const emp_id = item.employee_id;
                    //     navigate('/itservice/service-complaint', { empId: emp_id });
                    // })
                    
                }
                
            })
            .catch(err => console.log(err))
            

        }
    });

  return (
    <section className='service-login'>
        <div className='service-login-container'>
            <h1 className='service-title port-lligat'>MuseComm IT Service Portal</h1>
            <h2 className='service-login-text port-lligat'>Login</h2>
            {noRecordError ? <p className='error'>{noRecordError}</p> : ''}
            <form className='it-service-login' onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label><b className='port-lligat'>Email:</b></label>
                    <input values={values.itEmail} type='email' name='itEmail' placeholder='Enter Email' className='form-control port-lligat' onChange={handleChange} onBlur={handleBlur} />
                    {errors.itEmail && touched.itEmail && <p className="error">{errors.itEmail}</p>}
                </div>
                <div className='input-group'>
                    <label><b className='port-lligat'>Password:</b></label>
                    <input values={values.itPassword} type='password' name='itPassword' placeholder='Enter Password' className='form-control port-lligat' onChange={handleChange} onBlur={handleBlur} />
                    {errors.itPassword && touched.itPassword && <p className="error">{errors.itPassword}</p>}
                </div>

                <button className='btn btn-primary' type='submit' id='login-btn'>Login</button>

            </form>
        </div>
    </section>
  )
}

export default Login
