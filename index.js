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
            connection.query("select * from schools",(err,data)=>{

        connection.release();
                console.log(data);
        return res.json(data);
            })
        }
    });
    
})

app.listen(5000,console.log('server is running'));
