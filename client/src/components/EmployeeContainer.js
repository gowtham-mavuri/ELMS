import React from 'react'
import EmployeeRow from './EmployeeRow';

function EmployeeContainer(props) {
    
    return (
            props.emps&&props.emps.map((emp)=><EmployeeRow key={emp.emp_id} emp={emp} id={props.branch_id}/>)
    )
    
}

export default EmployeeContainer;