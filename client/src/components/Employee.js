import React from 'react';
import {Link} from "react-router-dom";

import '../styles/EmpCard.css'
function Employee(props) {
    const emp = props.emp;
    
    return (
        <div id="card">
                <ul>
                    <div id="directdiv">
                        <label id="empl4"><label>branch_id:&nbsp;&nbsp;</label>{emp.branch_id}</label>
                    </div>
                    <div id="directdiv">
                        <label id="empl2"><label>EmpID:&nbsp;&nbsp;</label>{emp.emp_id}</label>
                        <label id="empl2"><label>Dept Code:&nbsp;&nbsp;</label>{emp.dept_code}</label>
                    </div>
                   
                    <div id="directdiv">
                        <label id="empl3"><label>Role:&nbsp;&nbsp;</label>{emp.role}</label>
                        <label id="empl3"><label>Name:&nbsp;&nbsp;</label>{emp.first_name+' '+emp.last_name}</label>
                    </div>
                    <div id="directdiv">
                        <label id="empl4"><label>Email:&nbsp;&nbsp;</label>{emp.email}</label>
                    </div>
                    <div id="directdiv">
                        <label id="empl5"><label>Phone Number:&nbsp;&nbsp;</label>{emp.phone_number}</label>
                    </div>

                    <div>
                        <button id="empl7" ><Link to={`/AdminDashboard/updateEmp/${emp.emp_id}`}>Update</Link></button>
                        <button id="empl7"><Link to={`/AdminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></button>
                    </div>
                    
                </ul>
        </div>
    )
}

export default Employee;