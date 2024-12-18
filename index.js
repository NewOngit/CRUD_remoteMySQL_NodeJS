require('dotenv').config()
const sql=require('mysql')
const express=require('express')
const app=express()


const pool =sql.createPool({
    host:process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DBNAME,
    port:3306,
    waitForConnections: true,
    connectionLimit: 5,
    
});

app.get('/schools',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err){
            connection.release();
            return res.json(err)
        }
            
        else {
            connection.query("from schools",(err,data)=>{

        connection.release();
                console.log(data);
        return res.json(data);
            })
        }
    });
    
})


app.listen(5000,console.log('server is running'));

// const connection=sql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Kumar@123',
//     port:3306,
//     database:'school_management'
// })


// const pool=sql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'Kumar@123',
//     port:3306,
//     database:'school_management',
//     connectionLimit:5
// })
// app.get('/',(req,res)=>{
//     pool.getConnection((err,con)=>{
//         if(err) console.log(err);
//         else{
//             con.query("select * from schools",(err,data)=>{
//                 if(err) console.log(err);
//                 else{
//                     console.log(data);
//                     con.release();   
//                     return res.json(data);
//                 }
//             })
//         }
//     })
    
// })



// const pool =sql.createPool({
//     host:process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_DBNAME,
//     waitForConnections: true,
//     connectionLimit: 5,
//     queueLimit: 0

// });
//  pool.getConnection((err,conn)=>{
//     if(err) console.log(err);
//     else console.log('connected successfully');
//  })
