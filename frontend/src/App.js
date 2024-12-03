import './App.css';
import Footer from './Components/Layout/Footer/Footer';
import HomePage from './Components/HomePage/HomePage';
import Header from './Components/Layout/Header/Header';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from './Components/Login/Login';
import ComplaintRegMessage from './ComplaintRegMessage';
import { React, useEffect, useState } from 'react';
import AdminView from './Components/AdminView/AdminView';
import ComplaintForm from './Components/ITPortal/ComplaintForm/ComplaintForm';
import ComplaintDashboard from './Components/ITPortal/ComplaintDashboard/ComplaintDashboard';
import PerformanceReviewAuth from './Components/PerformanceReview/PerformanceReviewAuth/PerformanceReviewAuth';
import SelfAppraisalForm from './Components/PerformanceReview/SelfAppraisalForm/SelfAppraisalForm';
import WelcomeUser from './WelcomeUser';
import RatingSuccessMessage from './RatingSuccessMessage';
import ClimateSurvey from './Components/PerformanceReview/ClimateSurvey/ClimateSurvey';
import Auth, { ReviewAuth } from './Components/Auth';
import ForgotPassword from './Components/PerformanceReview/ForgotPassword';


function App() {

    const location = useLocation();
    const navigate = useNavigate();

    const [menuBarActive, setMenuBarActive] = useState(() => {
        return localStorage.getItem('menuBar') || '';
    });

    const handleMenuChange = (newState) => {
        setMenuBarActive(newState);
    }

    useEffect(() => {
        if (location.pathname === '/') {
            setMenuBarActive('');
        } 
    }, [location, menuBarActive]);

    const [overlayActive, setOverlayActive] = useState(true);

    const handleHamburgerMenu = (newValue) => {
        setOverlayActive(newValue);
    }

    useEffect(() => {
        // alert(location.pathname);
        if (location.pathname === '/') {
            localStorage.clear();
        }
        if(location.pathname === '/performancereview/index') {
            localStorage.clear();
        }
    }, [location]);

    useEffect(() => {
        if (location.pathname === '/itservice/login') {
            localStorage.clear();
            setMenuBarActive(true);
        }
    }, [location, overlayActive]);

    // console.log(menuBarActive);

    return (
        <div className="App">
            
            <Header menuBarActive={menuBarActive} onValueChange={handleHamburgerMenu} />
            <Routes>
                <Route path="/" element={<HomePage onStateChange={handleMenuChange} />} />
                <Route path="itservice/login" element={<Login />} />
                <Route path="itserviceportal/complaint" element={<Auth Component={ComplaintForm} />} />
                <Route path="itserviceportal/complaintregisteredmessage" element={<Auth Component={ComplaintRegMessage} />} />
                <Route path="itserviceportal/user_dashboard" element={<Auth Component={ComplaintDashboard} />} />
                <Route path='performancereview/index' element={<PerformanceReviewAuth />} />
                <Route path='performancereview/user_main' element={<ReviewAuth Component={SelfAppraisalForm} />} />
                <Route path='performancereview/user_welcome' element={<ReviewAuth Component={WelcomeUser} />} />
                <Route path='performancereview/climate_survey' element={<ReviewAuth Component={ClimateSurvey} />} />
                <Route path='performancereview/rating_success' element={<ReviewAuth Component={RatingSuccessMessage} />} />
                <Route path='performancereview/forgot_password' element={<ForgotPassword />} />
            </Routes>
            <Footer />

                
        </div>
    );
}

export default App;
