require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const PORT=3000;
require('./db/conn');

const clientid="220885124105-n55avtdvtf0mbs13d84do9fnqpr429bm.apps.googleusercontent.com"
const clientsecret="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"

app.use(cors({
    origin:'http://localhost:3000/',
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
})); 

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json("Hello World");
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

