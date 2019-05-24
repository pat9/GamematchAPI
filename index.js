require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./models/database');



//Settings
app.set('PORT', process.env.PORT || 5000)

//Middlewares
app.use(morgan('dev'));


app.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})