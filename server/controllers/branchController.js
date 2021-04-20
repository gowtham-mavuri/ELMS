var db = require('../db');

//returns array of objects of branches
exports.branch_list=(req,res)=>{
    const q="SELECT * FROM branch";
    db.query(q).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

exports.branch_list_pop=(req,res)=>{
   const q = "SELECT branch.branch_id,branch.name,count(*) as emps FROM branch JOIN employee ON branch.branch_id=employee.branch_id group by branch.branch_id ";
    db.query(q).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}


//get branch by id url=/branch/:id returns obj 
exports.branch_id=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }
    const id=req.body.id;
    const q="SELECT * FROM branch WHERE branch_id=?";
    db.query(q,[id]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        res.send({
            error:false,
            result
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

//adding a branch req.body={name,password,email}
exports.post_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }

    var id= req.body.id;
    var name= req.body.name;
    var location = req.body.location;
    var password=req.body.password;
    var q = 'INSERT INTO branch (branch_id,name,location,password) VALUES (?,?,?,?)';
    db.query(q,[id,name,location,password]).then(result=>{
        res.send({
            error:false
        });
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

//update a branch
exports.put_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }

    var id= req.body.id;
    var name= req.body.name;
    var location = req.body.location;
    
    var password=req.body.password;
    
    var q = 'UPDATE branch SET name=?,location=?,password=? WHERE branch_id=?';
    db.query(q,[name,location,password,id]).then(result=>{
        this.branch_id(req,res);
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
}

exports.del_branch=(req,res)=>{
    if(req.user.role!=="admin")
    {
        res.send();
        return ;
    }
    var id=req.body.branchId;
    var q1 ='SELECT * FROM employee WHERE branch_id=?';
    db.query(q1,[id]).then(result=>{
        result=JSON.parse(JSON.stringify(result[0]));
        if(result.length!==0){
            res.send({
                error:true,
                message:"can't delete a branch containing employees"
            });
        }
        else
        {
            var q = 'DELETE FROM branch WHERE branch_id=?';
            db.query(q,[id]).then(result=>{
                res.send({
                    error:false
                });
            }).catch(err=>{
                console.log(err);
                res.send({
                    error:true,
                    message:'Error'
                });
            })
        } 
    }).catch(err=>{
        console.log(err);
        res.send({
            error:true,
            message:'Error'
        });
    })
    
}