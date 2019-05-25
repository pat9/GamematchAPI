const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser:true }).then(db => {
    console.log('Database is connected');
}).catch(err=>{
    console.log(err);
})

module.exports = mongoose;