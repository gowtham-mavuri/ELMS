import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodayContainer from './TodayContainer';
import "../styles/oldReq.css"
import "../styles/table.css"
import "../styles/NewRequest.css"

function Requests() {
  const [loading,setLoading] = useState(true);
  const [reqList,setReqList] = useState([]);
  const [error,setError] = useState(false);
  const [searchBranch,setSearchBranch] = useState("ALL");

  const [branches,setBranches] = useState([]);
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5000/admin/fetchBranches').then(res=>{
        setBranches(res.data.result);
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
      })
      // eslint-disable-next-line
    },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/reqsToday',{
        token:localStorage.getItem('token')
    }).then(res=>{
            setReqList(res.data.result);
            setLoading(false);
        }).catch(err=>{
          setError(true);
          setLoading(false);
        })
        // eslint-disable-next-line
  },[])

  const dynamicSearch = () => {
    if(searchBranch==="ALL")
      return reqList;
    return reqList.filter(req =>req.branch_id==searchBranch)
  }


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
      <div id="bb">
        <div class="dropdown-table searchbar">
              <select onChange={(e)=>setSearchBranch(e.target.value)} >
                <option selected value="ALL" id="ALL">All branches</option>
                { branches.map((branch)=><option value={branch.branch_id} id={branch.branch_id}>{branch.name}</option>) }
              </select>
        </div>

        <TodayContainer reqList={dynamicSearch()} branchId={searchBranch} />
      </div>
    </div>
  );
  
}
 
export default Requests;