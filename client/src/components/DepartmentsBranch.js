import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Department from './Department';

import '../styles/addDeptForm.css'
import '../styles/deptTable.css'

function DepartmentsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [depts,setDepts] = useState([]);
  const [adding,setAdding] = useState(false);
  const [deptCode,setDeptCode] = useState('');
  const [deptName,setDeptName] = useState('');
  const [deptShortName,setDeptShortName]= useState('');
  const [error,setError]= useState('');

  useEffect(()=>{
    axios.post('http://localhost:5000/branch/depts',{
        token:localStorage.getItem('token'),
        id:props.match.params.id
    }).then(res=>{
            setDepts(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const handleAddDept = () => {
    setAdding(true);
    axios.post('http://localhost:5000/branch/addDept',{
        token:localStorage.getItem('token'),
        id:props.match.params.id,
        code:deptCode,
        name:deptName,
        shortName:deptShortName
    }).then(res=>{
        setAdding(false);
        if(res.data.error)
            setError(res.data.message);
        else{
          setDepts([...depts,...res.data.result]);
          setDeptCode('');
          setDeptName('');
          setDeptShortName('');
        }
    }).catch(err=>{
          console.log(err);
          setAdding(false);
    })
  }

  if(loading)
  {
    return(<div>Loading</div>)
  }
  else
  return (
    <div>
      <div>
        {error&&<p>{error}</p>}
      </div>
      <div className="formboxD">  
                <h4>Add Department</h4>
                <form >
                    <div className="rowD">
                        <div className="forminpD">
                            <label>Code</label>
                            <input type="text" required value={deptCode} onChange={e=>setDeptCode(e.target.value)}/>
                        </div>
                        <div className="forminpD">
                            <label>Name</label>
                            <input type="text" required value={deptName} onChange={e=>setDeptName(e.target.value)}/>  
                        </div>
                        <div className="forminpD">
                            <label>Short name</label>
                            <input type="text" required value={deptShortName} onChange={e=>setDeptShortName(e.target.value)}/>
                        </div>
                        <div className="forminpD">
                            <input type="button" value={adding ? 'Adding' : 'Add'} onClick={handleAddDept} disabled={adding}/>
                        </div>
                    </div>
                </form>
      </div>
      <div id="d">
      <table>
        <thead>
          <tr>
            <th>CODE</th>
            <th>NAME</th>
            <th>SHORT NAME</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
            {depts&&depts.map((dept)=><Department key={dept.code} dept={dept}/>)}
        </tbody>
        </table>
      </div>
      
    </div>
  );
  
}
 
export default DepartmentsBranch;