const express=require('express');
const app=express();
require('dotenv').config()

const Port=process.env.port;
app.listen(Port,()=>{
    console.log('listening on port',Port);
})