import React from 'react';
import {Link} from "react-router-dom";

import '../styles/EmpCard.css'

function EmployeeRow(props) {
    const emp = props.emp;
    
    return (
        <div id="table">
                <div id="eee">
                  <table>   
                    <tr>
                       <th>Emp:&nbsp;&nbsp;</th>
                       <th>Dept Code:&nbsp;&nbsp;</th>
                       <th>Role:&nbsp;&nbsp;</th>
                       <th>Name:&nbsp;&nbsp;</th>
                        <th>Email:&nbsp;&nbsp;</th>
                         <th>Phone Number:&nbsp;&nbsp;</th>
                         <th>Update&emsp;&emsp;  Requests</th>
                          


                    </tr> 
                    <tr>
                        <td>{emp.emp_id} </td>
                        <td>{emp.dept_code} </td>
                        <td>{emp.role} </td>
                        <td> {emp.first_name+' '+emp.last_name}</td>
                          <td>{emp.email} </td>
                            <td>{emp.phone_number} </td>
                            {!!props.id===false&&
                        <div>
                           <td> <button id="empl7"><Link to={`/SubadminDashboard/emp/${emp.emp_id}`}>Update</Link></button> </td>
                           <td> <button id="empl7"><Link to={`/SubadminDashboard/emp/reqs/${emp.emp_id}`}>Requests</Link></button></td>
                        </div>
                    }
                    {!!props.id===true&&
                        <div>
                           <td>  <button id="empl7" ><Link to={`/AdminDashboard/branch/${props.id}/emp/${emp.emp_id}`}>Update</Link></button></td>
                           <td> <button id="empl7"><Link to={`/AdminDashboard/branch/${props.id}/emp/reqs/${emp.emp_id}`}>Requests</Link></button></td>
                        </div>
                    
                    }
                              
                      </tr>
      </table>

</div>

                    
                   
                
     
       </div>
    )
}

export default EmployeeRow;