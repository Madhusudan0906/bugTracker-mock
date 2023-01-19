require("dotenv").config();
const PORT = process.env.PORT||5000;
const connection = require("./config/db")
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.route");


const app = express();

app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send({"message":"hello world."})
})

app.use('/user',userRouter);

app.listen(PORT,async()=>{
    try{
        await connection;
        console.log('db connection established.');
    }catch(e){
        console.log('db connection failed.')
    }
    console.log(`server listening at PORT No. ${PORT}`);
})
