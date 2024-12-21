require('dotenv').config()
const sql=require('mysql')
const express=require('express')
const app=express()
const cors =require('cors')
app.use(express.json())
app.use(cors()) 

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

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'/temp')},
    filename:(req,file,cb)=>{
        
cb(null,file.fieldname+""+path.extname(file.originalname))
//cb(null, 'image.png')
}})

const upload=multer({
    storage:storage})

app.post('/upload',upload.single('image'),(req,res)=>{
    console.log(JSON.stringify(req.body));
    try {
        let file=req.file;
        var base64String= fs.readFileSync(file.path, 'base64');
            
        res.send(req.body);   
    } catch (error) {
        
    }
    
    
})
app.listen(5000,console.log('server is running'));
