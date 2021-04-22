import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Request from './Request';
import '../styles/Request.css'
function RequestsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const id=props.match.params.id;
  useEffect(()=>{
    axios.post('http://localhost:5000/branch/reqs/pending',{
      token:localStorage.getItem('token'),
      id
    }).then(res=>{     
        setReqs(res.data.result);
        setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
        // eslint-disable-next-line
  },[])


  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    
    <div id="bb">
      
      {!reqs.length&&<div>
        <h1>NO NEW REQUESTS</h1>
        </div>}
        <div class="branch-table">
              <table>   
                <tr>
                  <th>ReqID</th>
                  <th>EmpID</th>
                  <th>Dept Code</th>
                  <th>Name</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Type</th>
                  <th>Days</th>
                  <th>Description</th>
                  <th>Admin Remarks</th>
                  <div class="together-head">
                  <th>Status</th>
                  <th>Manger Remarks</th>
                  </div>
                  <th>Requests</th>
                </tr> 
      {reqs&&reqs.map((req)=><Request role="admin" id={req.leave_id} req={req} branchId={id}/>)}
      </table>
        </div>
    </div>
  );

}
 
 
export default RequestsBranch;