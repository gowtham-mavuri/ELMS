import React from 'react'
import Department from './Department';

function DepartmentContainer(props) {

    return (
        <tbody>
            {props.deptList&&props.deptList.map((dept)=>
            <Department key={dept.code} dept={dept}/>)
            }
        </tbody>
        
    )
    
}

export default DepartmentContainer;