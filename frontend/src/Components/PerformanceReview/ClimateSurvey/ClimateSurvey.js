import React, { useState } from 'react';
import './ClimateSurvey.css';
import ClimateSurveyValidation from '../../ErrorsSchema/ClimateSurveyValidation';
import { useFormik } from 'formik';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ClimateSurvey() {

    const location = useLocation();
    const { email, responsibilities, improvements, feedback, contributed_people, commendations, actionToImprove, goals } = location.state || {}
    
    const navigate = useNavigate();

    const {values, errors, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            major_responsibilities: "",
            improvements: "",
            feedback: "",
            contributed_people: "",
            commendations: "",
            actions_to_improve: "",
            next_year_goals: "",
        },
        validationSchema: ClimateSurveyValidation,
        onSubmit: (values) => {
            const email = localStorage.getItem('email');
            const responsibilities = values.major_responsibilities;
            const improvements = values.improvements;
            const feedback = values.feedback;
            const contributed_people = values.contributed_people;
            const commendations = values.commendations;
            const actions_to_improve = values.actions_to_improve;
            const goals = values.next_year_goals;
            axios.post('http://localhost:8081/survey', {email, responsibilities, improvements, feedback, contributed_people, commendations, actions_to_improve, goals})
            .then(res => {
                if(res.data === 'Survey Registered Successful') {
                    alert('Climate Survey Form submitted');
                    window.location.reload();
                }else if(res.data === 'Survey Registration failed') {
                    alert('Climate Survey Registration failed');
                }else {
                    alert('Could not submit Climate Survey');
                }
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
        }
    })


  return (
    <div className='climate-survey'>
        <div className='container'>
            <h3 style={{ fontWeight: '600', paddingBottom: '20px' }}>Climate Survey Form</h3>
            <div className='survey-emp-details'>
                <h5 style={{ marginBottom: '0' }} className='port-lligat'>Employee Name: <span style={{ fontWeight: '500' }}>{localStorage.getItem('name')}</span></h5>
                <h5 style={{ marginBottom: '0' }} className='port-lligat'>Employee ID: <span style={{ fontWeight: '500' }}>{localStorage.getItem('empid')}</span></h5>
                <h5 style={{ marginBottom: '0', paddingBottom: '20px' }} className='port-lligat'>Designation: <span style={{ fontWeight: '500' }}>{localStorage.getItem('designation')}</span></h5>
            </div>
            <form className='climate-survey-form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>For each of the major responsibilities this year, what were the expectations from the company and how has been your performance?</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='major_responsibilities' value={responsibilities} disabled={responsibilities}></textarea>
                    {errors.major_responsibilities && <p className='survey-error port-lligat'>{errors.major_responsibilities}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>After last year's appraisal, how have you worked towards performing better in areas you were found below par? Please mention specific improvements.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='improvements' value={improvements} disabled={improvements}></textarea>
                    {errors.improvements && <p className='survey-error port-lligat'>{errors.improvements}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>During the year, were you given a feedback on a specific matter. If yes, please explain the problem you were given feedback on and how you have addressed it.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='feedback' value={feedback} disabled={feedback}></textarea>
                    {errors.feedback && <p className='survey-error port-lligat'>{errors.feedback}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>Based on 'your perspective' of your performance this year, what specific circumstances or events or people do you think contributed to your performance or lack of it.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='contributed_people' value={contributed_people} disabled={contributed_people}></textarea>
                    {errors.contributed_people && <p className='survey-error port-lligat'>{errors.contributed_people}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>Mention any specific instances or projects where you have exceeded expectations and received commendations from your seniors or clients.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='commendations' value={commendations} disabled={commendations}></textarea>
                    {errors.commendations && <p className='survey-error port-lligat'>{errors.commendations}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>Mention any two areas you think you need drastic improvement on, and what measures have you taken or planning to take to improve in those areas.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='actions_to_improve' value={actionToImprove} disabled={actionToImprove}></textarea>
                    {errors.actions_to_improve && <p className='survey-error port-lligat'>{errors.actions_to_improve}</p>}
                </div>
                <div className='form-group'>
                    <label className='port-lligat fw-normal' style={{ fontSize: '19px' }}>What specific goals can you set for the coming year to further enhance your contributions to the Organization? This should be written in detail to ascertain your goals for the year and how you will go about achieving them.</label>
                    <textarea onChange={handleChange} onBlur={handleBlur} className='form-control port-lligat' rows='10' name='next_year_goals' value={goals} disabled={goals}></textarea>
                    {errors.next_year_goals && <p className='survey-error port-lligat'>{errors.next_year_goals}</p>}
                </div>

                {email === undefined ? <button type='submit' className='survey-submit-btn'>Submit</button> : 
                <p style={{ 'fontSize': '24px', 'fontWeight': '500' }}>Climate Survey Form already submitted</p> }
            </form>
        </div>
    </div>
  )
}

export default ClimateSurvey;