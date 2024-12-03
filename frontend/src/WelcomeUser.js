import React from 'react';

function WelcomeUser() {
    localStorage.removeItem('menuBar');
    return (
        <div style={{ minHeight: 'calc(100vh - (94.8px + 58.8px))' }} className='container'>
            
            <p style={{ fontSize: '32px', paddingLeft: '52px', paddingTop: '30px' }} className='welcome-text'>Welcome {localStorage.getItem('name')}</p>
                
        </div>
    )
}

export default WelcomeUser;