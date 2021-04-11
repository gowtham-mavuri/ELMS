import React from 'react'
import Request2 from './Request2';

function RequestContainer(props) {

    return (
        <div>
            {props.reqList&&props.reqList.map((req)=><Request2 key={req.leave_id} req={req}/>)}
        </div>
    )
    
}

export default RequestContainer;