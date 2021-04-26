
import React,{useState,useEffect} from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
 
import '../styles/table.css'

function RequestHistory() {
  const [loading, setLoading] = useState(true);
  const [reqs,setReqs] = useState([]);
  const [error,setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0)
  const [casualLeaves,setCasualLeaves] = useState(0)
  const [sickLeaves,setSickLeaves] = useState(0)
  const [unpaidLeaves,setUnpaidLeaves] = useState(0)

  useEffect(()=>{
    axios.post('http://localhost:5000/emp/reqs',{
     token:localStorage.getItem('token')
    }).then(res=>{
       if(res.data.error)
         setError("Error Occured");
       else{
        var d=res.data.result;
        setReqs(res.data.result);
        const slice = d.slice(offset, offset + perPage)
        setData([...slice])
        setPageCount(Math.ceil(d.length / perPage))   
       }
       setLoading(false);
    }).catch(err=>{
       setError("Error Occured");
       setLoading(false);
    })
    // eslint-disable-next-line
  },[])

  useEffect(()=>{
    axios.post('http://localhost:5000/emp/profile',{
     token:localStorage.getItem('token')
    }).then(res=>{
      const data=res.data.result[0];
      setSickLeaves(data.sick_leaves)
      setCasualLeaves(data.casual_leaves)
      setUnpaidLeaves(data.unpaid_leaves)
      setLoading(false);
    }).catch(err=>{
       console.log(err);
       setLoading(false);
    })
 },[])

  const getData = () => {
    const slice = reqs.slice(offset*perPage, offset*perPage + perPage)
    setData([...slice])
}

useEffect(() => {
  getData()
 // eslint-disable-next-line
}, [offset])

const handlePageClick = (e) => {
  const selectedPage = e.selected;
  setOffset(selectedPage )
};


            



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
    <div class="leaves-profile">
            <div class="leave-profile">
              <label class="leave-head">Casual Leaves Remaining</label>
              <label class="leave-data">{casualLeaves}</label>
            </div>
            <div class="leave-profile">
              <label class="leave-head">Sick Leaves Remaining</label>
              <label class="leave-data">{sickLeaves}</label>
            </div>
            <div class="leave-profile">
              <label class="leave-head">Unpaid Leaves Taken</label>
              <label class="leave-data">{unpaidLeaves} </label>
            </div>
    </div>
    <div class="branch-table">
      <table>
        <tbody>
          <tr>
           <th>Request ID</th> 
            <th>From Date</th>
            <th>To Date</th>
            <th>Days</th>
            <th>Type</th>
            <th>Status</th>
            <th>Description</th>
            <th>Admin Remarks</th>
            <th>Manager Remarks</th>
          </tr>
          {data&&data.map((req)=>  
          <tr>
            <td>{req.leave_id}</td>
            <td>{moment(req.from_date).format('YYYY-MM-DD')}</td>
            <td>{moment(req.to_date).format('YYYY-MM-DD')}</td>
            <td>{req.days}</td>
            <td>{req.type}</td>
            <td>{req.status}</td>
            <td>{req.description}</td>
            <td>{req.admin_remarks}</td>
            <td >{req.branch_manager_remarks}</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  <div id="pagination" ><ReactPaginate
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
    activeClassName={"active"}
  />
    
  </div>
        
  </div>
)
}


export default RequestHistory;