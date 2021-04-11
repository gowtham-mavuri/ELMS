import React from 'react'
import Employee from './Employee';

function EmployeeContainer2(props) {
    
    return (
        <div>
            {props.emps&&props.emps.map((emp)=><Employee key={emp.emp_id} emp={emp} />)}
        </div>
    )
    
}

export default EmployeeContainer2;