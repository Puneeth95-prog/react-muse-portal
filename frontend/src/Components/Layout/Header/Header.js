import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header({ menuBarActive, onValueChange }) {

    const navigate = useNavigate();

    const [loginActive, setLoginActive] = useState(true);

    const handleHamburgerToggle = () => {
        setLoginActive(!loginActive);
    }

    const handleLogout = () => {
        onValueChange(false);
        setLoginActive(!loginActive);
        localStorage.setItem('loginValue', '0');
        localStorage.removeItem('reviewActive');
    }

    
    const handleComplaintForm = () => {
        setLoginActive(!loginActive);
        // alert(localStorage.getItem('email'));
    }

    const redirectToReview = () => {
        window.location.href = 'http://localhost:3000/performancereview/index';
    }

    const handleSurveyForm = () => {
        setLoginActive(!loginActive);
        const email = localStorage.getItem('email');
        axios.post('http://localhost:8081/check/survey', {email})
        .then(res => {
            if(res) {
                // console.log('reached1');
                const response = res.data;
                const email = response[0]['email'];
                const responsibilities = response[0]['major_responsibilities'];
                
                const improvements = response[0]['improvements'];
                const feedback = response[0]['feedback'];
                const contributed_people = response[0]['contributed_people'];
                const commendations = response[0]['commendations'];
                const actionToImprove = response[0]['actions_to_improve'];
                const goals = response[0]['goals_for_next_year'];
                
                navigate('/performancereview/climate_survey', { 
                    state : { email, responsibilities, improvements, feedback, contributed_people, commendations,
                        actionToImprove, goals }
                });
            }else {
                navigate('/performancereview/climate_survey');
            }
            
        })
        .catch(err => console.log(err));
    }

    const handleAppraisalForm = () => {
        setLoginActive(!loginActive);
        const email = localStorage.getItem('email');
        axios.post('http://localhost:8081/check/rating', {email})
        .then(res => {
            if(res) {
                // console.log('reached1');
                const response = res.data;
                const expertise = response[0]['expertise'];
                
                const culture = response[0]['culture_loy_ded'];
                const regularity = response[0]['regularity_punctuality'];
                const client = response[0]['client_focus'];
                const productivity = response[0]['productivity'];
                const skills = response[0]['soft_skills'];
                const overall = response[0]['overall'];
                var average = (parseFloat(expertise)) + (parseFloat(culture)) + (parseFloat(regularity)) +
                (parseFloat(client)) + (parseFloat(productivity)) + (parseFloat(skills)) + (parseFloat(overall));
                
                navigate('/performancereview/user_main', { 
                    state : { expertise, culture, regularity, client, productivity, skills,
                    overall, average }
                });
            }else {
                navigate('/performancereview/user_main');
            }
            
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='header'>
            <div className='container'>
                <div className='header-container'>
                    <div className='header-logo'>
                          <a href='https://www.musecomm.in/' target='_blank'><img src='https://intranet.musecomm.in/performancereview/images/logo.png' alt='Img' /></a>
                    </div>

                    {menuBarActive && 
                        <div className='header-right-menu'>
                            <div className='menu-bars'>
                                <img src='https://intranet.musecomm.in/leave-management/images/performance.png' alt='Img' title='Performance Review' onClick={redirectToReview} />
                            </div>

                            <div className='menu-bars'>
                                <img src='https://intranet.musecomm.in/leave-management/images/leavemanagement.png' alt='Img' title='LeaveManagement' />
                            </div>

                            <div className='menu-bars'>
                                <img src='https://intranet.musecomm.in/leave-management/images/conference.png' alt='Img' title='ConferenceBooking' />
                            </div>

                            <div className='right-sidebar'>
                                {loginActive && (localStorage.getItem('loginValue') === '1') && <i className="fa fa-bars sidebar-toggle" aria-hidden="true" onClick={handleHamburgerToggle}></i> }
                                {!loginActive && (localStorage.getItem('loginValue') === '1') && <i className="fa fa-times sidebar-toggle" aria-hidden="true" onClick={handleHamburgerToggle}></i> }
                            </div>

                        </div>
                    }
                    {localStorage.getItem('reviewActive') === '1' &&
                        <div className='right-sidebar'>
                            {loginActive && (localStorage.getItem('loginValue') === '1') && <i className="fa fa-bars sidebar-toggle" aria-hidden="true" onClick={handleHamburgerToggle}></i> }
                            {!loginActive && (localStorage.getItem('loginValue') === '1') && <i className="fa fa-times sidebar-toggle" aria-hidden="true" onClick={handleHamburgerToggle}></i> }
                        </div>
                    }
                    
                </div>
                
                {!loginActive &&
                    <div className={localStorage.getItem('reviewActive') === '1' ? 'overlay-none': 'overlay'}>
                        <Link to='itserviceportal/complaint' className='overlay-text' onClick={handleComplaintForm}>Complaint Form</Link>
                        <Link to='itserviceportal/user_dashboard' className='overlay-text' onClick={handleComplaintForm}>Complaint Dashboard</Link>
                        <Link to='itservice/login' className='overlay-text' onClick={handleLogout}>Logout</Link>
                        
                    </div>
                }
                {
                    !loginActive && localStorage.getItem('reviewActive') === '1' && 
                    <div className='overlay'>
                        <Link to='performancereview/climate_survey' className='overlay-text' onClick={handleSurveyForm}>Climate Survey</Link>
                        <Link className='overlay-text' onClick={handleAppraisalForm}>Self Appraisal</Link>
                        <Link to='performancereview/index' className='overlay-text' onClick={handleLogout}>Logout</Link>
                        
                    </div>
                }

            </div>

        </div>
    )
}

export default Header
