import React, { useEffect, useState } from 'react';
import './ComplaintDashboard.css';
import axios from 'axios';

function ComplaintDashboard() {


    const [userComplaints, setUserComplaints] = useState([]);

    useEffect(() => {
        const name = localStorage.getItem('name');
        axios.post('http://localhost:8081/complaints', { name })
        .then(res => {
            setUserComplaints(res.data);
            // console.log(userComplaints);
            // console.log(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <section className='complaint-dashboard'>
            <div className='container'>
                <div className='user-details'>
                    <h3 className='sub-title'>Complaint Details</h3>
                    <h5 className='port-lligat'>Employee ID: <span className='user-info'>{localStorage.getItem('empid')}</span></h5>
                    <h5 className='port-lligat'>Employee Name: <span className='user-info'>{localStorage.getItem('name')}</span></h5>
                    <h5 className='port-lligat' id='user-designation'>Employee Designation: <span className='user-info'>{localStorage.getItem('designation')}</span></h5>
                </div>

                <table className='table-bordered'>
                    <thead>
                        <tr>
                            <th className='port-lligat'>Complaint ID</th>
                            <th className='port-lligat'>Complaint Raised Data</th>
                            <th className='port-lligat'>Time</th>
                            <th className='port-lligat'>Complaint Description</th>
                            <th className='port-lligat'>Action Taken</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {userComplaints.map(data => (
                            <tr key={data.id}>
                                <td className='port-lligat fw-500'>{data.id}</td>
                                <td className='port-lligat fw-500'>{new Date(data.complaint_raised_date).toLocaleDateString()}</td>
                                <td className='port-lligat fw-500'>{data.time_raised}</td>
                                <td className='port-lligat fw-500'>{data.complaint_description}</td>
                                <td className='port-lligat fw-500'>{data.action_taken}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}

export default ComplaintDashboard