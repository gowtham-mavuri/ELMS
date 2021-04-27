import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import axios from 'axios';
import "../styles/addHolidays.css"

function UpdateHolidays(){
    const [holiday,setHoliday] = useState('');
    const [desc,setDesc] = useState('')
    const [addedHolidays,setAddedHolidays] = useState([]);
    const [holidays,setHolidays] = useState([{}]);


    useEffect(()=>{
        axios.post('http://localhost:5000/admin/holidaysGet',{
            token:localStorage.getItem('token')
        }).then(res=>{
                var data=res.data.result;
                var dates=data.map(ele=>moment(ele.date).format('YYYY-MM-DD'))
                setAddedHolidays(dates);
                setHolidays(res.data.result);
            }).catch(err=>{
              console.log(err);
            })
            // eslint-disable-next-line
      },[])

    const handleAdd=()=>{
        axios.post('http://localhost:5000/admin/holidays',{
            token:localStorage.getItem('token'),
            date:holiday,
            desc
        }).then(res=>{
            if(res.data.error)
                console.log('error occured');
            else
               {
                    var data=res.data.result;
                    var dates=data.map(ele=>moment(ele.date).format('YYYY-MM-DD'))
                    setAddedHolidays(dates);
                    setHolidays(res.data.result);
                    setHoliday('');
                    setDesc('');
               }
        }).catch(err=>{
              console.log(err);
        })
        
    }

    const handleDel=(date)=>{
        axios.post('http://localhost:5000/admin/holidaysDel',{
            token:localStorage.getItem('token'),
            date
        }).then(res=>{
            if(res.data.error)
                console.log('error occured');
            else
               {
                var data=res.data.result;
                var dates=data.map(ele=>moment(ele.date).format('YYYY-MM-DD'))
                setAddedHolidays(dates);
                setHolidays(res.data.result)
               }
        }).catch(err=>{
              console.log(err);
        })
        
    }

    return (
        <div class="full">
             <h3>Add holidays</h3>
             <div id="add">
            Pick a date to be added as a holiday
        </div>
            <div id="wrap">
                <div>
            <div id="calen">
                <div id="calenderpic"> 
                    <Calendar
                        onChange={(value, event) =>{
                            var d=(moment(value).format('YYYY-MM-DD'))
                            setHoliday(d);
                        } }
                        value={new Date()}
                        tileDisabled={({date})=>{
                        var d=(moment(date).format('YYYY-MM-DD'))
                        if( date.getDay() === 0 || date.getDay() === 6)
                            return true;
                        if(holiday===d)
                            return true;
                        if(addedHolidays.indexOf(d)!==-1)
                            return true;
                        return false;
                        }}
                    />
                </div>
            </div>
                </div>
            <div class="right">
               <div id="description">
                    <label id="first">Selected Date</label>
                    <h4>{holiday}</h4>
               </div>
                <div id="description">
                    <label id="second">Description of holiday</label>
                    <input type="text" value={desc} onChange={e=>setDesc(e.target.value)}/>
                </div>
                <button id="sub" onClick={handleAdd}>Add</button>
            </div>
            </div>
            <div id="bb">
            <div class ="branch-table">
                <table>
                    <tbody>
                    <tr>
                        <th>S.No</th>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Delete</th>
                    </tr>
                    </tbody>
                    {holidays&&holidays.map((holiday,i)=>
                        <tr >
                            <td>{i+1}</td>
                            <td>{moment(holiday.date).format('YYYY-MM-DD')}</td>
                            <td>{holiday.event}</td>
                            <td class="td-update"><div class="table-button" onClick={()=>handleDel(moment(holiday.date).format('YYYY-MM-DD'))} >delete</div></td>
                        </tr>
                    )}
                  
                </table>
                </div>
            </div>
            </div>   
        
        
    )
    
}

export default UpdateHolidays;
