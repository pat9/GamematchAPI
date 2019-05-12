require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');



//Settings
app.set('PORT', process.env.PORT || 5000)

//Middlewares
app.use(morgan('dev'));


app.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})