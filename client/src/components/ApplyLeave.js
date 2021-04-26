import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange} from 'react-date-range';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';

import '../styles/applyLeave.css'

function ApplyLeave(props) {
  const LeaveSchema = yup.object().shape({
    desc: yup.string(),
    type:yup.mixed().oneOf(["sick","casual"],'Invalid').required()
  });
  const { register, handleSubmit, errors } = useForm({ resolver:yupResolver( LeaveSchema ) });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  // eslint-disable-next-line
  const [holidays,setHolidays] = useState([]);
  const [submitted,setSubmitted] = useState(false);
  const [loading,setLoading] = useState(false);

  const [close,setClose] = useState(true);

  const handleClick = () => {
    setClose(!close);
  }

  const fundisplay = () => {
    if(close)
      return { display:"none" }
    return {}
  }

  useEffect(()=>{
    axios.post('http://localhost:5000/admin/holidaysGet',{
        token:localStorage.getItem('token')
    }).then(res=>{
            var data=res.data.result;
            var dates=data.map(ele=>moment(ele.date).format('YYYY-MM-DD'))
            setHolidays(dates);
            
        }).catch(err=>{
          console.log(err);
        })
        // eslint-disable-next-line
  },[])

  const diff=(startDate,endDate)=>{
    endDate=moment(endDate,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
    var cur = startDate;
    var days=0;
    while(cur!==endDate)
    {
      var day=moment(cur).day();
      if(day===0||day===6||holidays.indexOf(cur)!==-1)
      {

      }
      else
      {
          days++;
      }
      cur=moment(cur,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
    }
    return days;
  }

  const onSubmit = data => {
    var from = moment(state[0].startDate).format('YYYY-MM-DD');
    var to = moment(state[0].endDate).format('YYYY-MM-DD');
    var days=diff(from,to);
    setLoading(true);
    axios.post('http://localhost:5000/emp/req',{
            token:localStorage.getItem('token'),
            type:data.type,
            desc:data.desc,
            from,
            to,days
        }).then(res=>{
            if(res.data.error){
  
            }   
            else{
               setSubmitted('yes');
            }
            setLoading(false);
        }).catch(err=>{
            console.log(err);
        })
  };



  if(loading)
  return <div>Processing</div>


  if(submitted)
  return <div>SUBMITTED YOUR REQUEST SUCCESSFULLY  :~)

  </div>
  return (
    <div class="leave">  
      <div class="top">
          <h3>Apply Leave</h3>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#leavecalender-apply" aria-controls="leavecalender-apply" aria-expanded="false" aria-label="Toggle navigation" onClick={handleClick}>
            <span >Holidays calender</span>
          </button>
      </div>
      <div id="wrap-apply">
        <div>
        <form  class="apply" onSubmit={handleSubmit(onSubmit)}>
            <div class="first-part">
            <div id="forminp-calen">
                <label>Select start and end date</label>
                <div class="calen">
                <div id="from-to">
                  <span>From</span>
                  <span>To</span>
                  </div>
                <div id="fromtocalen">
                <DateRange
                    editableDateInputs={true}
                    onChange={item => {
                    setState([item.selection])
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </div>
                </div>
              </div>   
            </div>
            <div class="second-part">
              <div id="forminp-apply">
                  <label>Type</label>
                      <select required name="type" ref={register}>
                        <option  hidden disabled selected value="">--select leave type--</option>
                        <option value="sick" id="sick">Sick Leave</option>
                        <option value="casual" id="casual">Casual Leave</option>
                      </select>    
              </div>
              <div id="forminp-apply">
                  <label>Description</label>
                  <textarea  name="desc" ref={register}></textarea>
              </div>  
              <div id="forminp-apply">
                  <input type="submit" />
              </div> 
            </div>       
        </form>
        </div>
      </div>
      <div id="leavecalender-apply" style={fundisplay()}>
          <Calendar />
      </div>       
    </div>
  )
  
}

 
export default ApplyLeave;