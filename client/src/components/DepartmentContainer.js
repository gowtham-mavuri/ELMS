import React from 'react'
import Department from './Department';

function DepartmentContainer(props) {

    return (
        <td>
            {props.deptList&&props.deptList.map((dept)=>
            <Department key={dept.code} dept={dept}/>)
            }
        </td>
        
    )
    
}

export default DepartmentContainer;