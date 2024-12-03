import React, { useEffect, useState } from 'react';
import './AdminView.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';


function AdminView() {

    let date = new Date();

    const [complaints, setComplaints] = useState([]);

    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8081/admin_view_complaints')
        .then((res) => {
            setComplaints(res.data);
        })
        .catch((err) => {
            console.log('Error fetching data', err);
        })
    }, []);

    return (
        <section className='admin-dashboard'>
            <div className='container' id='admin-dashboard'>
                <h4 className='complaints-title'>Active Complaints</h4>
                <div className='admin-details'>
                    <h5>Employee Name: <span className='admin-info'>{location.state.empName}</span></h5>
                    <h5>Employee ID: <span className='admin-info'>{location.state.empId}</span></h5>
                    <h5>Designation: <span className='admin-info'>{location.state.empDesig}</span></h5>
                </div>

                <table className='table-bordered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Complaint Raised Data</th>
                            <th>Time</th>
                            <th>Complaint Description</th>
                            <th>System Description</th>
                            <th>Priority</th>
                            <th>Action Taken</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    {complaints.map(emp => (
                    <tbody key={emp.id}>
                        <tr>
                            <td>{emp.employee_name}</td>
                            <td>{new Date(emp.date_raised).getDate() + '-' + (new Date(emp.date_raised).getMonth() + 1).toString().padStart(2, "0") + '-' + new Date(emp.date_raised).getFullYear()}</td>
                            <td>{emp.time_raised}</td>
                            <td>{emp.complaint_description}</td>
                            <td>{emp.system_description}</td>
                            <td>{emp.priority}</td>
                            <td>{emp.action_taken}</td>
                            <td><Link className='edit-complaint-status'>Edit</Link></td>
                        </tr>
                     </tbody>
                    ))}
                </table>
            </div>
        </section>
    )
}

export default AdminView