import React, { Component, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!localStorage.getItem('auth')) {
      navigate('/itservice/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return localStorage.getItem('auth') ? <Component /> : null;
};

export const ReviewAuth = ({ Component }) => {
  const navigate = useNavigate();

  useEffect(() => {
    
    if (!localStorage.getItem('reviewActive')) {
      navigate('/performancereview/index'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return localStorage.getItem('reviewActive') ? <Component /> : null;
}

export default Auth;