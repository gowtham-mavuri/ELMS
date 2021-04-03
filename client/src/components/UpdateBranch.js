import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import '../styles/form.css'
const BranchSchema = yup.object().shape({
    name : yup.string().required(),
    location : yup.string().required(),
    adminName : yup.string().required(),
    adminPassword :yup.string().min(5).required(),
    adminEmail : yup.string().email().required()
  });

function UpdateBranch(props) {
    const { register, handleSubmit,reset, errors } = useForm({resolver:yupResolver( BranchSchema )});
    const id = props.match.params.id
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);


    useEffect(()=>{
        axios.post('http://localhost:5000/admin/branch',{
          token:localStorage.getItem('token'),
          id
        }).then(res=>{
            var data=res.data.result[0];
            if(data){
                reset({
                    name : data.name,
                    location : data.location,
                    adminEmail : data.admin_email,
                    adminPassword : data.admin_password,
                    adminName : data.admin_name
                })
            }
            setLoading(false);
            }).catch(err=>{
              console.log(err);
              setError(true);
              setLoading(false);
            })
            // eslint-disable-next-line
      },[])

      const onSubmit=data=>{
        setLoading(true);
        var { name,location,adminName,adminEmail,adminPassword } = data;
        axios.post('http://localhost:5000/admin/branchUpdate',{
            token:localStorage.getItem('token'),
            name,location,adminName,adminEmail,adminPassword,id
        }).then(res=>{
            var data=res.data.result[0];
            if(data)
            {
                reset({
                    name : data.name,
                    location : data.location,
                    adminEmail : data.admin_email,
                    adminPassword : data.admin_password,
                    adminName : data.admin_name
                })
            }
            if(res.data.error)
                setError(true);
            setLoading(false);
        }).catch(err=>{
            console.log(err);
            setError(true);
            setLoading(false);
        })
    }

    if(loading)
        return <div>Loading</div>


    return (
        <div id="formbox">  
                
                <div>
                    {error && <h3>error occured</h3>}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <h2> Update BRANCH {id}</h2>
                    <div id="row">
                        <div id="forminp">
                            <label>Name</label>
                            <input type="text" name="name" ref={register} />
                            {errors.name && <p>{errors.name.message}</p>}     
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Location</label>
                             <input type="text" name="location" ref={register} /> 
                             {errors.location && <p>{errors.location.message}</p>}
                        </div>
                        <div id="forminp">
                            <label>Admin Name</label>
                            <input type="text" name="adminName" ref={register} />
                            {errors.adminName && <p>{errors.adminName.message}</p>}    
                        </div>
                    </div>
                    <div id="row">
                        <div id="forminp">
                            <label>Admin Email</label>
                            <input type="email" name="adminEmail" ref={register} />
                            {errors.adminEmail && <p>{errors.adminEmail.message}</p>} 
                        </div>
                        <div id="forminp">
                            <label>Admin Password</label>
                            <input type="text" name="adminPassword" ref={register} />
                            {errors.adminPassword && <p>{errors.adminPassword.message}</p>}   
                        </div>
                    </div>
                    <input type="submit" />
                </form>
        </div>
    )

}

export default UpdateBranch;