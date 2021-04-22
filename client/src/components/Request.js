import React,{useState} from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";
import axios from 'axios';
import '../styles/Request.css'
function Request (props)
{
    const [req,setReq] = useState(props.req);
    const [status,setStatus] = useState('');
    const [remarks,setRemarks] = useState('');
    const [loading, setLoading] = useState(false);

    const branchId=props.branchId;

    const handleUpdate = () => {
        setLoading(true);
        var from=moment(req.from_date).format('YYYY-MM-DD')
        var to = moment(req.to_date).format('YYYY-MM-DD')
        from = moment(from,'YYYY-MM-DD');
        to = moment(to,'YYYY-MM-DD');
        var days=to.diff(from,'days')+1;
        axios.post('http://localhost:5000/branch/reqUpdate',{
            token:localStorage.getItem('token'),
            reqId:req.leave_id,
            days,
            status,
            remarks
        }).then(res=>{
            if(res.data.error)
            {
                console.log(res.data.error);
            }
            else
            {
                setReq(res.data.result[0]);
            }
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })

    }

    const handleUpdateRemarks = () => {
        setLoading(true);
        axios.post('http://localhost:5000/branch/reqUpdateRemarks',{
            token:localStorage.getItem('token'),
            reqId:req.leave_id,
            remarks
        }).then(res=>{
            if(res.data.error)
            {
                console.log(res.data.error);
            }
            else
            {
                setReq(res.data.result[0]);
            }
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })

    }


    return (
        <div id="bb" class="req">
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
                 <th>Desc</th>
                 <th>Admin Remarks</th>
                 <th>Requests</th>
                </tr>
            
              <tr>
                  
                  <td>{req.leave_id} </td>
                  <td>{req.emp_id} </td>
                  <td>{req.dept_code} </td>
                  <td>{req.first_name}{req.last_name} </td>
                  <td>{moment(req.from_date).format('MM Do YYYY')}</td>
                  <td>{moment(req.to_date).format('MM Do YYYY')}</td>
                  <td>{req.type}</td>
                  <td>{req.days}</td>
                  <td>{req.description}</td>
                  <td>{req.admin_remarks}</td>
                  <td><div class="table-button"><Link to={`/SubadminDashboard/emp/reqs/${req.emp_id}`}>Requests</Link></div></td>
              </tr>
              <tr>
                  
              {(req.status==="pending")&&
                 <div class="request">
            <td>
            <label>Status</label>
                            <select required id="status" onChange={e=>setStatus(e.target.value)}>
                            <option hidden disabled selected value> --select an option-- </option>
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                        </select>
            </td>
            <td>
            <div>
                        <label>Remarks</label>
                        <input type="text" id={req.leave_id} onChange={e=>setRemarks(e.target.value)}/>
                    </div>
            </td>
                        
                    
                    <button onClick={handleUpdate} disabled={loading}>Update Status</button>
                 </div>
                 
                    
                    }

                    {(req.status!=="pending")&&
                        <div class="request">
                            <td>
                                <label id="line2"><label>Status:&nbsp;&nbsp;</label>{req.status}</label>                          
                            {(req.status==="accepted")&&(req.branch_manager_remarks==="------")&&
                                <div>
                                    <div id="line6">
                                        <label>Remarks</label>
                                        <input type="text" id={req.leave_id} onChange={e=>setRemarks(e.target.value)}/>
                                    </div>
                                    <button id="line7" onClick={handleUpdateRemarks} disabled={loading}>Update Remarks</button>
                                </div>
                                
                            }
                            </td>
                            
                            {(req.branch_manager_remarks!=="------")&&
                            <div>
                                <label id="line2"><label>Manager Remarks:&nbsp;&nbsp;</label>{req.branch_manager_remarks}</label>   
                            </div> 
                            }
                            
                        </div>
                         }
                          
              </tr>
               
</table>

                    
                    

                   
               
        </div>
        </div>
            
    )
}

export default Request;