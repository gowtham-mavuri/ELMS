import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../styles/pagination.css';
import '../styles/oldReq.css'
function OldRequestsBranch(props) {
  const [loading,setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [pageCount, setPageCount] = useState(0)
  const [reqs,setReqs] = useState([]);
  const [searchBranch,setSearchBranch] = useState("");
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

  useEffect(() => {
    axios.post('http://localhost:5000/branch/reqs',{
      token:localStorage.getItem('token'),
      id:searchBranch
    }).then(res=>{     
      var d=res.data.result;
      setReqs(res.data.result);
      const slice = d.slice(offset, offset + perPage)
      setData([...slice])
      setPageCount(Math.ceil(d.length / perPage))     
      setLoading(false);
    }).catch(err=>{
      console.log(err);
      setLoading(false);
    })
   // eslint-disable-next-line
  }, [searchBranch])

const getData = () => {
    const slice = reqs.slice(offset*perPage, offset*perPage + perPage)
    setData([...slice])
}



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage )
};

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

  if(loading)
  {
    return(<div>Loading</div>)
  }
  

  
  
  return (
    <div id="oldRequests">
        <div>
            <select onChange={(e)=>setSearchBranch(e.target.value)} >
              <option selected value="ALL" id="ALL"> Select A Branch </option>
              { branches.map((branch)=><option value={branch.branch_id} id={branch.branch_id}>{branch.name}</option>) }
            </select>
        </div>
      <div >
      {data&&data.map((req)=><div>
      <div class="table">
        <div id="eeee">
             <table> 
                <tbody>  
                    <tr>
                       <th>ReqID:&nbsp;&nbsp;</th>
                       <th>EmpID:&nbsp;&nbsp;</th>
                       <th>Dept Code:&nbsp;&nbsp;</th>
                       <th>Name:&nbsp;&nbsp;</th>
                        <th>From:&nbsp;&nbsp;</th>
                         <th>To:&nbsp;&nbsp;</th>
                           <th>Type:&nbsp;&nbsp;</th>
                           <th>Days:&nbsp;&nbsp;</th>
                           <th>Desc:&nbsp;&nbsp;</th>
                           <th>Status:&nbsp;&nbsp;</th>
                           <th>Admin Remarks:&nbsp;&nbsp;</th>
                          <th> Manager Remarks:&nbsp;&nbsp;</th>


                    </tr> 
                    <tr>
                        <td>{req.leave_id} </td>
                        <td>{req.emp_id} </td>
                        <td> {req.dept_code}</td>
                        <td>{req.first_name+' '+req.last_name} </td>
                        <td>{moment(req.from_date).format('MM Do YYYY')} </td>
                        <td> {moment(req.to_date).format('MM Do YYYY')}</td>
                         <td>{req.type} </td>
                          <td> {req.days}</td>
                            <td>{req.description} </td>
                               <td>{req.status} </td>
                              <td> {req.admin_remarks}</td> 
                              <td>  {req.branch_manager_remarks}</td> 
                      </tr>
                 </tbody>
      </table>

      </div>
      </div>

         
        
    </div>)}
    </div>
      <div>
            <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/>
      </div>
    </div>
    
  );

}
 
 
export default OldRequestsBranch;