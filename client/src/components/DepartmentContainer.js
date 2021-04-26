import React from 'react'
import Department from './Department';

function DepartmentContainer(props) {

    return (
     
            props.deptList&&props.deptList.map((dept)=><Department key={dept.code} dept={dept}/>)
            
        
    )
    
}

export default DepartmentContainer;