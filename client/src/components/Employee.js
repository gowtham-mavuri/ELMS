import React from 'react';
import {Link} from "react-router-dom";

import '../styles/EmpCard.css'
function Employee(props) {
    const emp = props.emp;
    
    return (
        <div id="e">
            <div class="table">
                  <table> 
                    <tbody>  
                    <tr>
                       <th>branch_id:&nbsp;&nbsp;</th>
                       <th>EmpID:&nbsp;&nbsp;</th>
                       <th>Dept Code:&nbsp;&nbsp;</th>
                       <th>Role:&nbsp;&nbsp;</th>
                       <th>Name:&nbsp;&nbsp;</th>
                       <th>Email:&nbsp;&nbsp;</th>
                       <th>Phone Number:&nbsp;&nbsp;</th>
                       <th>updates</th>
                       <th>Requests</th>



                    </tr> 
                    <tr>
                        <td> {emp.branch_id}</td>
                        <td> {emp.emp_id}</td>
                        <td> {emp.dept_code}</td>
                        <td>{emp.role} </td>
                        <td>{emp.first_name+' '+emp.last_name} </td>
                        <td>{emp.email}</td>
                        <td> {emp.phone_number}</td>
                        <td> <button id="empl7" ><Link to={`/AdminDashboard/updateEmp/${emp.emp_id}`}>Update</Link></button></td>
                        <td><button id="empl7"><Link to={`/AdminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></button></td>
                      </tr>
                      </tbody>
                    </table> 
                </div>     
                
             </div>
       
    )
}

export default Employee;