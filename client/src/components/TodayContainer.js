import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Request2 from './Request2';

function TodayContainer(props) {
    
    var reqs=props.reqList
    const [totalEmps,setTotalEmps] = useState(0);
    const [employeesOnLeave,setEmployeesOnLeave] = useState(0);
    const [loading,setLoading] = useState(false)


    useEffect(()=>{
        setLoading(true)
        var empIds = props.reqList.map((req)=>req.emp_id)
        var uniqueEmpIds = [...new Set(empIds)]
        setEmployeesOnLeave(uniqueEmpIds.length)
     
            axios.post('http://localhost:5000/branch/totalEmps',{
              token:localStorage.getItem('token'),
              id:props.branchId
            }).then(res=>{     
                setTotalEmps(res.data.result[0].count);
                setLoading(false);
            }).catch(err=>{
              console.log(err);
              setLoading(false);
            })
                // eslint-disable-next-line
    },[props.branchId])

    if(loading)
        return <center>Loading...</center>

    return (
        <div>
            {props.branchId!=="ALL"&&<div class="leaves-profile">
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
                    <div class="together-head">
                    <th>Status</th>
                    <th>Admin Remarks</th>
                    </div>
                    <th>Requests</th>
                    </tr> 
                    {reqs&&reqs.map((req)=><Request2 key={req.leave_id} req={req}/>)}
                </table>
            </div>
        </div>
    )

    
    
}

export default TodayContainer;