require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const db = require('./models/database');
const auth = require('./middleware/Auth');

//Settings
app.set('PORT', process.env.PORT || 5000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(auth.IsLoggedIn);


app.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})