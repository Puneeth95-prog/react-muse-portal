import React, { useState } from 'react';
import './SelfAppraisalForm.css';
import { useFormik } from 'formik';
import AppraisalRatingSchema from '../../ErrorsSchema/AppraisalRatingSchema';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function SelfAppraisalForm() {

    const location = useLocation();
    const { expertise, culture, regularity, client, productivity, skills, overall, average } = location.state || {};
    
    const radioButtons1 = [];
    const radioButtons2 = [];
    const radioButtons3 = [];
    const radioButtons4 = [];
    const radioButtons5 = [];
    const radioButtons6 = [];
    const radioButtons7 = [];
  
    // JavaScript code must be outside of the return statement

    const navigate = useNavigate();

    const {values, errors, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            appraisal_rating_1: "",
            appraisal_rating_2: "",
            appraisal_rating_3: "",
            appraisal_rating_4: "",
            appraisal_rating_5: "",
            appraisal_rating_6: "",
            appraisal_rating_footer: "",
        },
        validationSchema: AppraisalRatingSchema,
        onSubmit: (values) => {
            const email = localStorage.getItem('email');
            const expertise = values.appraisal_rating_1;
            const cultureLoyaltyDed = values.appraisal_rating_2;
            const regularityPunc = values.appraisal_rating_3;
            const clientFocus = values.appraisal_rating_4;
            const productivity = values.appraisal_rating_5;
            const skills = values.appraisal_rating_6;
            const performance = values.appraisal_rating_footer;
            axios.post('http://localhost:8081/rating', {email, expertise, cultureLoyaltyDed, regularityPunc, clientFocus, productivity, skills, performance})
            .then(res => {
                if(res.data === 'Rating Successful') {
                    navigate('/performancereview/rating_success');
                }else if(res.data === 'Rating Registration failed') {
                    alert('Rating Registration failed');
                }else {
                    alert('Appraisal Form Rating failed');
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    })

    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons1.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_1' onChange={handleChange} onBlur={handleBlur} checked={expertise === i ? true : undefined} disabled={expertise} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }
    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons2.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_2' onChange={handleChange} onBlur={handleBlur} checked={culture === i ? true : undefined} disabled={culture} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }
    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons3.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_3' onChange={handleChange} onBlur={handleBlur} checked={regularity === i ? true : undefined} disabled={regularity} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }
    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons4.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_4' onChange={handleChange} onBlur={handleBlur} checked={client === i ? true : undefined} disabled={client} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }
    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons5.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_5' onChange={handleChange} onBlur={handleBlur} checked={productivity === i ? true : undefined} disabled={productivity} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }
    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons6.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_6' onChange={handleChange} onBlur={handleBlur} checked={skills === i ? true : undefined} disabled={skills} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }

    for (let i = 1; i <= 10; i+=0.5) {
        radioButtons7.push(
        <span key={i}>
            <input type='radio' value={i} name='appraisal_rating_footer' onChange={handleChange} onBlur={handleBlur} checked={overall === i ? true : undefined} disabled={overall} />&nbsp;{i}&nbsp;&nbsp;
        </span>
        );
    }

    return (
        <section className='self-appraisal'>
            <div className='container'>
                {average ? <p className='average-rating'>Average Rating : {(parseFloat(average) / 7).toFixed(2)}</p> : <p></p>}
                <h3 style={{ fontWeight: '600', paddingBottom: '20px' }}>Self Appraisal Form</h3>
                <div className='employee-details'>
                    <h5 style={{ marginBottom: '0' }} className='port-lligat'>Employee Name: <span style={{ fontWeight: '500' }}>{localStorage.getItem('name')}</span></h5>
                    <h5 style={{ marginBottom: '0' }} className='port-lligat'>Employee ID: <span style={{ fontWeight: '500' }}>{localStorage.getItem('empid')}</span></h5>
                    <h5 style={{ marginBottom: '0', paddingBottom: '20px' }} className='port-lligat'>Designation: <span style={{ fontWeight: '500' }}>{localStorage.getItem('designation')}</span></h5>
                </div>

                <table border='0' align="center" className='appraisal-table-head'>
                    <tbody>
                        <tr>
                            <td style={{ width: '20%', fontWeight: '500', paddingLeft: '15px' }} className='port-lligat'>Competency</td>
                            <td style={{ width: '50%', fontWeight: '500', paddingLeft: '15px' }} className='port-lligat'>Description</td>
                            <td style={{ width: '30%', fontWeight: '500', paddingLeft: '15px' }} className='port-lligat'>Rating</td>
                        </tr>
                    </tbody>
                </table>

                <form onSubmit={handleSubmit}>
                    <table border='0' align='center' className='appraisal-table-data' style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Functional Expertise</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Successfully manages assignments in taking it to completion, with minimal supervision</li>
                                        <li>Takes ownership, initiative and uses judgment as required to become a subject matter expert</li>
                                        <li>Attention to detail, ensuring accuracy in the end product</li>
                                        <li>Manages competing priorities and ensures project deadlines are met</li>
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons1}
                                    {errors.appraisal_rating_1 && <p className='rating_error'>{errors.appraisal_rating_1}</p>}
                                </td>
                            </tr>
                            <tr><td colSpan={3} style={{ borderBottom: '1px solid #000', padding: '0' }}></td></tr>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Culture, Loyalty and Dedication</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Demonstrates high ethical standards and integrity</li>
                                        <li>Flexibility to work and stretch beyond one's scope in order to meet business needs</li>
                                        <li>Works as a strong team player and contributes as required to others' workload</li>
                                        <li>Is respectful of others' time and deliverables</li>
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons2}
                                    {errors.appraisal_rating_2 && <p className='rating_error'>{errors.appraisal_rating_2}</p>}
                                </td>
                            </tr>
                            <tr><td colSpan={3} style={{ borderBottom: '1px solid #000', padding: '0' }}></td></tr>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Regularity & Punctuality</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Is punctual in reporting to work and spends stipulated hours at work</li>
                                        <li>Utilizes leave entitlements only as per leave policy</li>
                                        
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons3}
                                    {errors.appraisal_rating_3 && <p className='rating_error'>{errors.appraisal_rating_3}</p>}
                                </td>
                            </tr>
                            <tr><td colSpan={3} style={{ borderBottom: '1px solid #000', padding: '0' }}></td></tr>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Client Focus</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Focuses on clients needs and ensures timely delivery of assignments (client facing and non-client facing roles)</li>
                                        <li>Delivers creative solutions based on client's needs</li>
                                        <li>Co-operates with and assists team members in delivering to client needs</li>
                                        
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons4}
                                    {errors.appraisal_rating_4 && <p className='rating_error'>{errors.appraisal_rating_4}</p>}
                                </td>
                            </tr>
                            <tr><td colSpan={3} style={{ borderBottom: '1px solid #000', padding: '0' }}></td></tr>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Productivity</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Demonstrates efficiency and contributes to the firm's advancement</li>
                                        <li>High quality work, responsiveness and time management</li>
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons5}
                                    {errors.appraisal_rating_5 && <p className='rating_error'>{errors.appraisal_rating_5}</p>}
                                </td>
                            </tr>
                            <tr><td colSpan={3} style={{ borderBottom: '1px solid #000', padding: '0' }}></td></tr>
                            <tr>
                                <td className='port-lligat data-first' valign='top'>Soft Skills & Professional Skills</td>
                                <td className='port-lligat data-second'>
                                    <ul style={{ paddingLeft: '20px' }}>
                                        <li>Communicates effectively on email, calls and in person</li>
                                        <li>Leverages the firm's resources to build skill sets resulting in professional growth, and aligning them to business needs</li>
                                    </ul>
                                </td>
                                <td className='port-lligat data-third' valign='top'>
                                    {radioButtons6}
                                    {errors.appraisal_rating_6 && <p className='rating_error'>{errors.appraisal_rating_6}</p>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table border='0' align='center' className='appraisal-table-footer' height='60' style={{ backgroundColor: '#7ebf1b', width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign='middle' className='port-lligat appraisal-table-footer-text'>Overall Performance</td>
                                <td className='port-lligat footer-right-data' valign='middle'>
                                    {radioButtons7}
                                    {errors.appraisal_rating_footer && <p className='rating_error'>{errors.appraisal_rating_footer}</p>}
                                    {expertise && <p className='form-submiited-text'>Form Already submitted</p>}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {!expertise && <button type='submit' className='appraisal-submit-btn'>Submit</button>}

                </form>
            </div>
        </section>
    )
}

export default SelfAppraisalForm;