import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Branch from './Branch';

import '../styles/branchTable.css'

function Branches() {
  const [loading,setLoading] = useState(true);
  const [branchList,setBranchList] = useState([]);
  const [error,setError] = useState(false);

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/branches',{
        token:localStorage.getItem('token')
    }).then(res=>{
            setBranchList(res.data.result);
            setLoading(false);
        }).catch(err=>{
          console.log(err);
          setError(true);
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
    <div>
      <div>
        {error&&<p>Error Occured</p>}
      </div>
      <div id="b">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Admin</th>
            <th>Admin Email</th>
            <th>Update</th>
            <th>Manage</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {branchList&&branchList.map((branch)=><Branch key={branch.id} branch={branch}/>)}
        </tbody>
        </table>
      </div>
    </div>
  );
  
}
 
export default Branches;