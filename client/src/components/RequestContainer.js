import React from 'react'
import Request2 from './Request2';

function RequestContainer(props) {

    return (

            props.reqList&&props.reqList.map((req)=><Request2 key={req.leave_id} req={req}/>)
        
    )
    
}

export default RequestContainer;