
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

/*
            require followin statements
</div>
<div id="leaves">
    <div><label id="p2">Casual Leaves Remaining</label><label id="numl">{emp.casual_leaves}</label></div>
</div>
<div id="leaves">
    <div><label id="p2">Sick Leaves Remaining</label><label id="numl">{emp.sick_leaves}</label></div>
</div>
<div id="leaves">
    <div><label id="p2">Unpaid Leaves Taken</label><label id="numl">{emp.unpaid_leaves} </label></div>
</div>*/


if(loading)
{
  return(<div>Loading</div>)
}
else
return (
  <div id="history">
<<<<<<< HEAD
  <div class="table">
=======
  <div class="table ">
>>>>>>> 35ae903b82588ba16f4000819f4a3938636ccf70
    <div>
      {error&&<p>{error}</p>}
    </div>
    <div id="e">
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
  /></div>
    
  </div>
  </div>
)
}


export default RequestHistory;