require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
require('./models/database');

//Settings
app.set('PORT', process.env.PORT || 5000)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/public',  require('./routes/public.route'));
app.use('/users', require('./routes/user.route'));
app.use('/arenas', require('./routes/arenas.routes'));
app.use('/venues', require('./routes/venues.routes'));


app.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})