import React, {  useEffect, useState } from 'react';
import axios from 'axios';


function Department(props) {
    const [dept,setDept] = useState(props.dept);
    const [del,setDel]= useState(false);
    const [update,setUpdate] = useState(false);
    const [deptName,setDeptName] = useState(dept.name);
    const [deptShortName,setDeptShortName]= useState(dept.short_name);
    const [loading,setLoading] = useState(false);

    const handleUpdateDept = (props) => {
        setLoading(true);
        axios.post('http://localhost:5000/branch/dept',{
            token:localStorage.getItem('token'),
            code:dept.code,
            name:deptName,
            shortName:deptShortName
        }).then(res=>{
            if(res.data.error)
                {}
            else
                setDept(res.data.result[0]);
            setLoading(false);setUpdate(false);
        }).catch(err=>{
              console.log(err);
              setLoading(false);setUpdate(false);
        })
    }

    const handleDeleteDept = () => {
        setLoading(true);
        axios.post('http://localhost:5000/branch/deldept',{
            token:localStorage.getItem('token'),
            code:dept.code
        }).then(res=>{
            if(res.data.error)
                {
                    alert("Department can't be deleted when employees are assigned")
                }
            else
                setDel(true);
            setLoading(false);
        }).catch(err=>{
              console.log(err);
              setLoading(false);
        })
    }
    if(del) return <div></div>
    if(loading)
      return <div>Loading</div>
    else
    if(update)
        return (
            <tr>
                <td>{dept.code}</td>
                <td><input type="text" value={deptName} onChange={e=>setDeptName(e.target.value)} /></td>
                <td><input type="text" value={deptShortName} onChange={e=>setDeptShortName(e.target.value)} /> </td>
                <td><input class="table-button" value="Update" onClick={handleUpdateDept} /></td>
                <td><div class="table-button" disabled={true} onClick={handleDeleteDept}>delete</div></td>
                <td><div class="table-button" disabled={true} >delete</div></td>
            </tr>
        )
    else
        return (
            <tr>
                <td>{dept.code}</td>
                <td>{dept.name}</td>
                <td>{dept.short_name} </td>
                <td><div class="table-button" onClick={()=>setUpdate(true)}>update</div></td>
                <td><div class="table-button" onClick={handleDeleteDept}>delete</div></td>
            </tr>
        )
}

export default Department;