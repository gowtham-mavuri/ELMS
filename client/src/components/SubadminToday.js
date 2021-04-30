import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Request from './Request'
import "../styles/oldReq.css"
import "../styles/table.css"
import "../styles/NewRequest.css"

function SubadminToday(props) {
  const [loading,setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [totalEmps,setTotalEmps] = useState(0);
  const [employeesOnLeave,setEmployeesOnLeave] = useState(0);

  const empOnLeave = (data) => {
      var empIds = data.map((req)=>req.emp_id)
      var uniqueEmpIds = [...new Set(empIds)]
      return uniqueEmpIds.length
  }

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/totalEmps',{
      token:localStorage.getItem('token')
    }).then(res=>{     
        setTotalEmps(res.data.result[0].count);
        setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
        // eslint-disable-next-line
  },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/reqsToday',{
      token:localStorage.getItem('token')
    }).then(res=>{     
        var data=res.data.result;
        setReqs(data);
        var empLeave = empOnLeave(data)
        setEmployeesOnLeave(empLeave);
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

      <div class="leaves-profile">
            <div class="leave-profile">
              <label class="leave-head">Total Employees</label>
              <label class="leave-data">{totalEmps}</label>
            </div>
            <div class="leave-profile">
              <label class="leave-head">Employees present</label>
              <label class="leave-data">{totalEmps-employeesOnLeave} </label>
            </div>
            <div class="leave-profile">
              <label class="leave-head">Employees on leave</label>
              <label class="leave-data">{employeesOnLeave}</label>
            </div> 
    </div>

      {!reqs.length&&<div>
        <h1>NO REQUESTS</h1>
        </div>}
        <div class="emp-table table-responsive">
              <table class="table">   
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
      {reqs&&reqs.map((req)=><Request role="admin" id={req.leave_id} req={req} />)}
      </table>
        </div>
    </div>
  );

}
 
 
export default SubadminToday;