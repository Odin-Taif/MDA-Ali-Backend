


// here we import the mongose then we conect to our data base.
const mongoose = require('mongoose');

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('our db is up and runing')
})
.catch(err => console.log(err.message));
