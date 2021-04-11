var db = require('../db');
var utils =require('../utils');

exports.login1=(req, res)=>{
    const role = req.body.role;
    const email = req.body.email;
    const pwd = req.body.password;
    var user ;
    if (!email || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Email or Password is required."
      });
    }

    var q;
    if( role === 'admin')
      q="SELECT * FROM admin WHERE email=?";
    else if( role === 'subadmin' )
      q="SELECT * FROM branch WHERE admin_email=?";
    else if( role === 'employee')
      q="SELECT * FROM employee WHERE email=?"
    else
      res.send({ error: true, message: "Invalid" });
    db.query(q,[email]).then((result)=>{
      result=JSON.parse(JSON.stringify(result[0]))[0];
      if(!result)
      {
        return res.send({
          error: true,
          message: "Username or Password is wrong."
        })
      }
      var password,id ;
      if(role === 'subadmin')
      {
        id=result.branch_id
        password = result.admin_password;
      }
      else if(role === 'admin')
      {
        id=result.id;
        password = result.password;
      }
      else if(role === 'employee')
      {
        id=result.emp_id;
        password=result.password;
      }
      if (pwd !== password)
      {
        return res.status(401).json({
            error: true,
            message: "Username or Password is wrong."
          })
      }
      user={id,email,role}
      // generate token
      const token = utils.generateToken(user);
      
      // return the token along with user details
      return res.json({  error: false,id,role, token });
    }).catch((err)=>{
      console.log(err);
      res.send({ error: true, message: "DB Error" });
    });
}

exports.login=(req,res)=>{
  const role = req.body.role;
  if(role == "admin")
    this.adminLogin(req,res);
  else if(role == "subadmin")
    this.subadminLogin(req,res);
  else if(role == "employee")
    this.employeeLogin(req,res);
}

exports.adminLogin=(req,res) => {
  const role = req.body.role;
  const pwd = req.body.password;
  const q = "SELECT * FROM admin where password=?";
  db.query(q,[pwd]).then((result)=>{
    result=JSON.parse(JSON.stringify(result[0]))[0];
    if(!result)
    {
      return res.send({
        error: true,
        message: "Wrong Password"
      })
    }
    const id = result.id;
    var user ={ role , id }
    const token = utils.generateToken(user);
    return res.json({  error: false,role, token });
  }).catch((err)=>{
    console.log(err);
    res.send({ error: true, message: "DB Error" });
  });
}

exports.subadminLogin=(req,res) => {
  const role = req.body.role;
  const id = req.body.branch;
  const pwd = req.body.password;
  const q = "SELECT * FROM branch where branch_id=?";
  db.query(q,[id]).then((result)=>{
    result=JSON.parse(JSON.stringify(result[0]))[0];
    if(!result||result.password!=pwd)
    {
      return res.send({
        error: true,
        message: "Wrong Password"
      })
    }
    var user ={ role , id }
    const token = utils.generateToken(user);
    return res.json({  error: false,role, token });
  }).catch((err)=>{
    console.log(err);
    res.send({ error: true, message: "DB Error" });
  });
}

exports.employeeLogin=(req,res) => {
  const role = req.body.role;
  const id = req.body.username;
  const pwd = req.body.password;
  const q = "SELECT * FROM employee where emp_id=?";
  db.query(q,[id]).then((result)=>{
    result=JSON.parse(JSON.stringify(result[0]))[0];
    if(!result||result.password!=pwd)
    {
      return res.send({
        error: true,
        message: "Wrong Password"
      })
    }
    var user ={ role , id }
    const token = utils.generateToken(user);
    return res.json({  error: false,role, token });
  }).catch((err)=>{
    console.log(err);
    res.send({ error: true, message: "DB Error" });
  });
}