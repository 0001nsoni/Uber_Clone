const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const app=express();
const cors=require('cors');
const connectToDb=require('./db/db');
app.use(cors());
connectToDb();
const cookieParser=require('cookie-parser');
const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('hello world');
});
app.use('/user',userRoutes);
app.use(cookieParser());
app.use('/captain',captainRoutes);

module.exports=app;
