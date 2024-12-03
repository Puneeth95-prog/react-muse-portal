import React from 'react'

function ComplaintRegMessage() {
    return (
        <section>
            <div style={{minHeight: 'calc(100vh - (94.8px + 58.8px))', padding: '20px 0px 0px 50px'}} className='container complaint-reg-message'>
                <h5 style={{fontSize: '24px', fontWeight: '600' }}>Your Complaint has been registered Successfully</h5>

                
            </div>
            {/* {(localStorage.getItem('loginValue')) && <Hamburger />} */}
        </section>
    )
}

export default ComplaintRegMessage;
