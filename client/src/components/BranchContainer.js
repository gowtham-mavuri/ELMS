import React from 'react'
import Branch from './Branch';

function BranchContainer(props) {

    return (
        
            props.branchList&&props.branchList.map((branch)=><Branch key={branch.id} branch={branch}/>)
        
            
    )
    
}

export default BranchContainer;