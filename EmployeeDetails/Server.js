const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const database=require('mysql');


const add=express();
add.use(cors());
add.use(bodyparser.json());
add.use(express.json());
add.use(express.static('public'));

let connect=database.createConnection({
    host:'localhost',
    user:'root',
    password:'Dev@2001',
    database:'datas'
})
connect.connect(function(error){
    if(error){
        console.log(error)
    }
    else{
        console.log("DB Conected sucessfully")
    }

})



add.get('/studentdet',(request,response)=>{
    let sq='select	 * from employee_details where Status=1;';
    connect.query(sq,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }

    })
})
add.post('/insertdata',(request,response)=>{

    let {name,place,role,salary,dat,phone}= request.body;
    let sq='insert into employee_details(Name,Place,Role,Salary,HireDate,MobileNo,Status) values (?,?,?,?,?,?,? )';
     connect.query(sq,[name,place,role,salary,dat,phone,1],(error,res)=>{
        if(error){
            let a={status:"error"}
            response.send(a);
        }
        else{
            let b={status:"success"}
            
            response.send(b);
        }
    })
})  
add.get('/edit/:Emp_id',(request,response)=>{

    let {Emp_id}=request.params;
    let sql='select * from employee_details where Emp_id=?';
    connect.query(sql,[Emp_id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }

    })

    
})

add.put('/updated/:Emp_id',(request,response)=>{
    
    let Emp_id=request.params.Emp_id;
    let {Name,Place,Role,Salary,MobileNo}=request.body;
    let sql='update employee_details set Name=?,Place=?,Role=?,Salary=?,MobileNo=? where Emp_id=?';
    connect.query(sql,[Name,Place,Role,Salary,MobileNo,Emp_id],(error,result)=>{
        if (error){
           let a= {"status":"error"};
            response.send(a);
        }
        else{
            let a={"status":"success"};
            response.send(a);
        }
    })
})
 
add.post('/Delete',(request,response)=>{
    let Emp_id =request.body.Emp_id;
    let sql = 'update employee_details  set Status=0 where Emp_id=?';
    connect.query(sql,[Emp_id],(error,result)=>{
        if(error){
            let s={"status":"error"};
            response.send(s);
        }
        else{
            let s={"status":"success"};
            response.send(s)
        }
    })
})
  
add.get('/download', (req, res) => {
    
    let query='select * from employee_details;';
    connect.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        return res.status(500).json({ error: 'Error executing query' });
      }
  
      // Convert the database query results to CSV format
      const csvWriter = createCsvWriter({
        path: 'data.csv',
        header: Object.keys(results[0]).map((key) => ({ id: key, title: key })),
      });
  
      csvWriter
        .writeRecords(results)
        .then(() => {
          res.download('data.csv', 'data.csv', (err) => {
            if (err) {
              console.error('Error while sending file:', err);
            } else {
              console.log('File sent successfully');
            }
          });
        })
        .catch((error) => {
          console.error('Error writing records to CSV:', error);
          return res.status(500).json({ error: 'Error writing records to CSV' });
        });
    });
  });


add.listen(3307,()=>{console.log("server connected sucessfully on port no 3307" )});