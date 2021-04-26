import React from 'react';
import {Link} from "react-router-dom";


function Employee(props) {
    const emp = props.emp;
    
    return (
                    <tr>
                        <td>{emp.branch_id}</td>
                        <td>{emp.emp_id}</td>
                        <td>{emp.dept_code}</td>
                        <td>{emp.role} </td>
                        <td>{emp.first_name+' '+emp.last_name} </td>
                        <td>{emp.email}</td>
                        <td> {emp.phone_number}</td>
                        <td><div class="table-button"> <button ><Link to={`/AdminDashboard/updateEmp/${emp.emp_id}`}>Update</Link></button></div></td>
                        <td><div class="table-button"><button ><Link to={`/AdminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></button></div></td>
                      </tr>
       
    )
}

export default Employee;