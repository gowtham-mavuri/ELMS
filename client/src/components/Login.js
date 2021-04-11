import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import '../styles/login.css'

const LoginSchema = yup.object().shape({
  role:  yup.mixed().oneOf(["admin","subadmin","employee"],"Choose a role"),
  branch : yup.string(),
  username : yup.string(),
  password :yup.string().required()
});

function Login(props) 
{
  const { register, handleSubmit, errors } = useForm({resolver:yupResolver( LoginSchema )});
  const [role,setRole] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [branches,setBranches] = useState([]);
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5000/admin/fetchBranches').then(res=>{
      console.log(res.data.result)
        setBranches(res.data.result);
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
      })
      // eslint-disable-next-line
},[])

  const onSubmit=(data)=>{
    setLoading(true);
    var { role,username,password,branch } = data;
    axios.post('http://localhost:5000/login',{
            role,
            username,
            branch,
            password
        }).then(res=>{
            if(res.data.error)
            {
                setError("wrong username password");
                setLoading(false);
            }
            else
            {
                localStorage.setItem('token',res.data.token);
                if(role === 'admin')
                  props.history.push('/AdminDashboard');
                else if(role === 'subadmin')
                  props.history.push('/SubadminDashboard');
                else if( role === 'employee')
                  props.history.push('/EmployeeDashboard');

            }
        }).catch(err=>{
          console.log(err);
          setError("wrong username&&password");
          setLoading(false);
        })
  }

  return (
    <div id="loginbody">
    <div className="wrapper1">
		<div id="loginbox"class="container-fluid ">
			<h4>Login</h4>
				<form className="loginform" onSubmit={handleSubmit(onSubmit)}>
          
					<div id="box">
						<label>Role</label>
						<br></br>
						<select name="role" onChange={e=>setRole(e.target.value)} ref={register} required>
							<option disabled hidden selected value="">--select an option--</option>
							<option id="op1" value="admin">Admin@HR</option>
							<option id="op2" value="subadmin">Branch Manager</option>
							<option id="op3" value="employee">Employee</option>
					    </select>
              {errors.role && <p>{errors.role.message}</p>}
					</div>
        { role=="subadmin"&& 
          <div id="box">
						<label>Select Branch</label>
						<br></br>
						<select  name="branch" ref={register} >
              <option hidden disabled selected value> -- select an option -- </option>
              { branches.map((branch)=><option value={branch.branch_id} id={branch.branch_id}>{branch.name}</option>) }
            </select>
            {errors.branch && <p>{errors.branch.message}</p>}
					</div>
        }
        
				{ role=="employee" &&	<div id="box">
              <label>Username</label>
              <input type="text" name="username" placeholder="Enter Username" ref={register} />
              {errors.username && <p>{errors.username.message}</p>}
				  </div>
        }
		      <div id="box">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter password"  ref={register}/>
              {errors.password && <p>{errors.password.message}</p>}
          </div>
          {error&&<p>{error}</p>}
					<br></br>
          <input id="loginbutton" type="submit" value={loading ? 'Loading...' : 'Login'} disabled={loading}/>
				</form>
        
			</div>
		</div>
    </div>
  )

  
}

 
export default Login;