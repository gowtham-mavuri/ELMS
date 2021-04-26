import React from 'react'
import Employee from './Employee';

function EmployeeContainer2(props) {
    
    return (
        props.emps&&props.emps.map((emp)=><Employee key={emp.emp_id} emp={emp} />)
    )
    
}
export default EmployeeContainer2;