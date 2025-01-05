const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const app=express();
const cors=require('cors');
const connectToDb=require('./db/db');
app.use(cors());
connectToDb();
const userRoutes=require('./routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('hello world');
});
app.use('/user',userRoutes);

module.exports=app;
