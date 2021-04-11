import React from 'react'
import Branch from './Branch';

function BranchContainer(props) {

    return (
        <div>
            {props.branchList&&props.branchList.map((branch)=><Branch key={branch.id} branch={branch}/>)}
        </div>
    )
    
}

export default BranchContainer;