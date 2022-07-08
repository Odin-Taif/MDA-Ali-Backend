


//importing express, this a node js framWork. 
const express = require('express');

//assigning app to express
const app = express()

//importing dotenv file where we store our uri that connects our local server to the data base, where we store our data. 
require('dotenv').config();

//importing the user schema , is just JS class prototype for our user. 
const User = require('./models/user');

//importing models/db file 
require('./models/db');

//importing the possiable routes of our user, there we have post method to send a spcefic data for each route. 
const userRouter = require('./routes/user');

// our app will recive json data.  for parsing our incoming data to json. instead of having so many middleware function, we can have one like this..
app.use(express.json());

// we bind our app to the userRouter which basically binding our app to the the possible routes.
app.use(userRouter);
// const test = async (email, password) => {
//     const user = await User.findOne({email:email})
//     const result = await user.comparePassword(password);
//     console.log(result)
// }
// test('mjd@email.com', 'mj123123')




app.get('/test',(req, res)=>{
    res.send('hello world')
})


// Listen to the port 3000...
app.listen( 3000, ()=>{
    console.log('port is runing now')
})
// Listen to the route and send the data... 
app.get('/', (req, res)=>{
    res.json({ success:true , message: 'hellos the MJ for  the backend server'});
})