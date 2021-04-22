import React from 'react';
import {Link} from "react-router-dom";

import '../styles/EmpCard.css'

function EmployeeRow(props) {
    const emp = props.emp;
    
    return (
                    <tr>
                        <td>{emp.emp_id} </td>
                        <td>{emp.dept_code} </td>
                        <td>{emp.role} </td>
                        <td> {emp.first_name+' '+emp.last_name}</td>
                        <td>{emp.email} </td>
                        <td>{emp.phone_number} </td>
                        {!!props.id===false&&
                        <div>
                           <td> <div class="table-button"><Link to={`/SubadminDashboard/emp/${emp.emp_id}`}>Update</Link></div> </td>
                           <td> <div class="table-button"><Link to={`/SubadminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></div></td>
                        </div>
                    }
                    {!!props.id===true&&
                        <div>
                           <td><div class="table-button"><Link to={`/AdminDashboard/branch/${props.id}/emp/${emp.emp_id}`}>Update</Link></div></td>
                           <td><div class="table-button"><Link to={`/AdminDashboard/branch/${props.id}/emp/reqs/${emp.emp_id}`}>Requests</Link></div></td>
                        </div>
                    }   
                      </tr>
    )
}

export default EmployeeRow;