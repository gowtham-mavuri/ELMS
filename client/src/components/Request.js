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


    return (
        
            <div id="card">
                <ul>
                    <div id="directdiv">
                        <label id="line1"><label>ReqID:&nbsp;&nbsp;</label>{req.leave_id}</label>
                    </div>
                    <div id="directdiv">
                        <label id="line2"><label>EmpID:&nbsp;&nbsp;</label>{req.emp_id}</label>
                        <label id="line2"><label>Dept Code:&nbsp;&nbsp;</label>{req.dept_code}</label>
                    </div>
                    <div id="line3div">
                        <label id="line3"><label>Name:&nbsp;&nbsp;</label>{req.first_name}{req.last_name}</label>
                    </div>
                    <div id="directdiv">
                        <label id="line4"><label>From:&nbsp;&nbsp;</label>{moment(req.from_date).format('MM Do YYYY')}</label>
                        <label id="line4"><label>To:&nbsp;&nbsp;</label>{moment(req.to_date).format('MM Do YYYY')}</label>
                    </div>
                    <div id="directdiv">
                        <label id="line51"><label>Type:&nbsp;&nbsp;</label>{req.type}</label>
                        <label id="line52"><label>Days:&nbsp;&nbsp;</label>{req.days}</label>
                    </div>
                    <div id="line3div">
                        <label id="line3"><label>Desc:&nbsp;&nbsp;</label>{req.description}</label>
                    </div>
                    {(req.status==="pending")&&<div>
                    
                    <div  id="line6">
                        <label>Status</label>
                            <select required id="status" onChange={e=>setStatus(e.target.value)}>
                            <option hidden disabled selected value> --select an option-- </option>
                            <option value="accepted">Accept</option>
                            <option value="rejected">Reject</option>
                        </select>
                    </div>
                    <div id="line6">
                        <label>Remarks</label>
                        <input type="text" id={req.leave_id} onChange={e=>setRemarks(e.target.value)}/>
                    </div>
                    <button id="line7" onClick={handleUpdate} disabled={loading}>Update Status</button>
                    
                    </div>}

                    {(req.status!=="pending")&&
                        <div>
                        <div  id="directdiv">
                        <label id="line2"><label>Status:&nbsp;&nbsp;</label>{req.status}</label>
                                                
                        </div>
                        <div id="line3div">
                        <label id="line2"><label>Remarks:&nbsp;&nbsp;</label>{req.admin_remarks}</label>
                            
                        </div> 
                        </div>
                    }

                    {!!branchId===false&&
                        
                            <button id="line7"><Link to={`/SubadminDashboard/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                      
                    }
                    {!!branchId===true&&
                        
                            <button id="line7"><Link to={`/AdminDashboard/branch/${branchId}/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                    
                    }
                </ul>
        </div>
    )
    return (
        <div>
            <div>
                ReqID:{req.leave_id}
            </div>
            <div>
                EmpID:{req.emp_id}
                Dept Code:{req.dept_code}
            </div>
            <div>
                Name:{req.first_name} {req.last_name}
            </div>
            <div>
                From:{moment(req.from_date).format('MMMM Do YYYY')}
                To:{moment(req.to_date).format('MMMM Do YYYY')}
            </div>
            <div>
                Type:{req.type}
                Desc:{req.description}
            </div>
            <div>
                DAYS:{req.days}
            </div>
            
            {(req.status==="pending")&&<div>
                Status
                <select id="status" onChange={e=>setStatus(e.target.value)} >
                    <option hidden disabled selected value> -- select an option -- </option>
                    <option value="accepted">Accept</option>
                    <option value="rejected">Reject</option>
                </select>
                Admin Remarks
                <input type="text" id={req.leave_id} placeholder="Remarks" onChange={e=>setRemarks(e.target.value)} />
                <div>
                    <button onClick={handleUpdate}  disabled={loading}>Update Status</button>
                </div>
            </div>}

            {(req.status!=="pending")&&
                <div>
                    Status:{req.status}
                    Admin Remarks:{req.admin_remarks}
                </div>
            }

            {!!branchId===false&&
                <div>
                    <button><Link to={`/SubadminDashboard/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                </div>
            }
            {!!branchId===true&&
                <div>
                    <button><Link to={`/AdminDashboard/branch/${branchId}/emp/reqs/${req.emp_id}`}>Requests</Link></button>
                </div>
            
            }
            
        </div>
    )
}

export default Request;