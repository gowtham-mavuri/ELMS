import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';

import '../styles/login.css'

const LoginSchema = yup.object().shape({
  role:  yup.mixed().oneOf(["admin","subadmin","employee"],"Choose a role"),
  email : yup.string().email().required(),
  password :yup.string().required()
});

function Login(props) 
{
  const { register, handleSubmit, errors } = useForm({resolver:yupResolver( LoginSchema )});

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit=(data)=>{
    setLoading(true);
    var { role,email,password } = data;
    axios.post('http://localhost:5000/login',{
            role,
            email,
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
						<select name="role" ref={register} required>
							<option disabled hidden selected value="">--select an option--</option>
							<option id="op1" value="admin">Admin</option>
							<option id="op2" value="subadmin">Subadmin</option>
							<option id="op3" value="employee">Employee</option>
					    </select>
              {errors.role && <p>{errors.role.message}</p>}
					</div>
					<div id="box">
              <label>Email</label>
              <input type="text" name="email" placeholder="Enter Email" ref={register} />
              {errors.email && <p>{errors.email.message}</p>}
				  </div>
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