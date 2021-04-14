import React, {  useState } from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
function Branch(props) {
    const b=props.branch;
    const [del,setDel]= useState(false);
    const [loading,setLoading] = useState(false);
  
    const handleDelete=()=>{
        setLoading(true);
        axios.post('http://localhost:5000/admin/branchDel',{
            token:localStorage.getItem('token'),
            branchId:b.branch_id
        }).then(res=>{
            if(res.data.error)
                {
                    if(res.data.message)
                        alert(res.data.message)
                }
            else
                setDel(true);
            setLoading(false)
        }).catch(err=>{
              console.log(err);
              setLoading(false);
        })
    }


    if(del) return <div></div>
    return (
        <tr >
            <td>{b.branch_id}</td>
            <td>{b.name}</td>
            <td>{b.location}</td>
            <td><Link to={`/AdminDashboard/update/${b.branch_id}`}>Update</Link></td>
            
            <td><button onClick={handleDelete} disabled={loading}>delete</button></td>
        </tr>
    )
}

export default Branch;