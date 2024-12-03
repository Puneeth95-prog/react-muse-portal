import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
// import { emailjs } from 'emailjs-com';
import './ComplaintForm.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import ComplaintSchema from '../../ErrorsSchema/ComplaintFormValidation';
import axios from 'axios';

function ComplaintForm() {

    const form = useRef();

    // console.log(localStorage.getItem('loginValue'));
    const [errorReg, setErrorReg] = useState('');

    const navigate = useNavigate();

    const {values, errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            complaintDescription: ""
        },
        validationSchema: ComplaintSchema,
        onSubmit: (values) => {
            const complaintVal = values.complaintDescription;
            const name = localStorage.getItem('name');
            const designation = localStorage.getItem('designation');
            axios.post('http://localhost:8081/register/complaints', {name, complaintVal})
            .then((res) => {
                // console.log(res);
                if(res.data === 'Complaint Registered Successfully') {
                    emailjs.sendForm(
                        'service_g8hr0rn',   // Service ID from emailJS
                        'template_rh4qu2m',  // Template ID from emailJS
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
                    navigate('/itserviceportal/complaintregisteredmessage');
                }else if(res.data === 'Complaint Registration failed') {
                    setErrorReg('Complaint Registration failed, please try again');
                }else {
                    setErrorReg('Complaint Registration error');
                }
            })
        }
    })

    const location = useLocation();

    return (
        <section className='service-complaint-container'>
            <div className='container'>
                <h4 className='complaint-form-title sub-title'>Complaint Form</h4>
                <h5 className='port-lligat'>Employee ID: <span className='emp-details'>{localStorage.getItem('empid')}</span></h5>
                <h5 className='port-lligat'>Employee Name: <span className='emp-details'>{localStorage.getItem('name')}</span></h5>
                <h5 className='port-lligat'>Designation: <span className='emp-details'>{localStorage.getItem('designation')}</span></h5>

                {errorReg && <p className='error'>{errorReg}</p>}
                <div className='complaint-form-container'>
                    <h3 className='pb-3 complaint-form-head'>Please register your complaint here</h3>
                    <form ref={form} className='complaint-form' onSubmit={handleSubmit}>
                        <div className='form-group pb-3'>
                            <label><h6 className='port-lligat'>Name</h6></label>
                            <input name='name' className='form-control port-lligat' id='employee-name-input' type='text' value={localStorage.getItem('name')} readOnly />
                        </div>

                        <div className='form-group pb-3'>
                            <label><h6 className='port-lligat'>Description of the Complaint</h6></label>
                            <textarea values={values.complaintDescription} value={values.complaintDescription} onChange={handleChange} onBlur={handleBlur} name='complaintDescription' className='form-control port-lligat' type='text' rows={6} cols={10} />
                            {errors.complaintDescription && touched.complaintDescription && <p className="error">{errors.complaintDescription}</p>}
                        </div>

                        <button className='btn btn-primary port-lligat' type='submit'>Submit</button>

                        {/* {(localStorage.getItem('loginValue')) && <Hamburger />} */}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ComplaintForm
