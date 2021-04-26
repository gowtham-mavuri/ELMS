import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Department from './Department';



function DepartmentsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [depts,setDepts] = useState([]);
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
          setError('Error Occurd')
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
      <div>
        {error&&<p>{error}</p>}
      </div>
      <div class= "branch-table">
      <table>
        <tbody>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Short Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
            {depts&&depts.map((dept)=><Department key={dept.code} dept={dept}/>)}
        </tbody>
        </table>
      </div>
    </div>
  );
  
}
 
export default DepartmentsBranch;