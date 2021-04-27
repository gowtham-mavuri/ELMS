import React,{useState} from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";
import axios from 'axios';

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
                  
             
                {(req.status==="pending")&&
                 <div class="req-div">
                       <div class="req-status-branch">
                            <select required  onChange={e=>setStatus(e.target.value)}>
                            <option hidden disabled selected value>-select-</option>
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                            </select>
                        </div>
                        <div class="req-remarks-branch">
                           <input type="text" id={req.leave_id} onChange={e=>setRemarks(e.target.value)}/>
                      </div>
                        <button class="table-button req-update" onClick={handleUpdate} disabled={loading}>Update Status</button>
                    </div>
                    }
                    {(req.status!=="pending")&&
                        <div class="req-div-after">
                            <div class="req-status-after-branch">
                            <label>{req.status}</label>
                            </div>                
                            {(req.status==="accepted")&&(req.branch_manager_remarks==="------")&&
                                <div class="req-remarks">
                                        <input type="text" id={req.leave_id} onChange={e=>setRemarks(e.target.value)}/>
                                        <button class="table-button req-update-branch" onClick={handleUpdateRemarks} disabled={loading}>Update Remarks</button>
                                </div>}              
                            {(req.branch_manager_remarks!=="------")&&
                                <div class="req-remarks-after">
                                <label>{req.branch_manager_remarks}</label> 
                                </div>   
                            }
                            
                        </div>
                         }
                          <td><div class="table-button"><Link to={`/SubadminDashboard/emp/reqs/${req.emp_id}`}>Requests</Link></div></td>
              </tr>
            
    )
}

export default Request;