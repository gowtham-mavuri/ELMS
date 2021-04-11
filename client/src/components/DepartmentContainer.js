import React from 'react'
import Department from './Department';

function DepartmentContainer(props) {

    return (
        <div>
            {props.deptList&&props.deptList.map((dept)=><Department key={dept.code} dept={dept}/>)}
        </div>
    )
    
}

export default DepartmentContainer;