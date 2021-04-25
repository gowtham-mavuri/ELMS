import React from 'react'
import Employee from './Employee';

function EmployeeContainer2(props) {
    
    return (
        <div>
              <div id="e">
            <div class="table">
                  <table> 
                    <tbody>  
                    <tr>
                       <th>Branch Id:&nbsp;&nbsp;</th>
                       <th>Emp ID:&nbsp;&nbsp;</th>
                       <th>Dept Code:&nbsp;&nbsp;</th>
                       <th>Role:&nbsp;&nbsp;</th>
                       <th>Name:&nbsp;&nbsp;</th>
                       <th>Email:&nbsp;&nbsp;</th>
                       <th>Phone Number:&nbsp;&nbsp;</th>
                       <th>Updates</th>
                       <th>Requests</th>
                    </tr> 
            {props.emps&&props.emps.map((emp)=><Employee key={emp.emp_id} emp={emp} />)}
            </tbody>
            </table> 
         </div>             
     </div>
</div>
    )
    
}

export default EmployeeContainer2;