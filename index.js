if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
require('./models/database');



//Settings
app.set('PORT', process.env.PORT || 5000)
cloudinary.config(process.env.CLOUDINARY_URL)

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors())

//Routes
app.use('/public',  require('./routes/public.route'));
app.use('/users', require('./routes/user.route'));
app.use('/arenas', require('./routes/arenas.routes'));
app.use('/venues', require('./routes/venues.routes'));
app.use('/tournaments', require('./routes/tournaments.route'));
app.use('/versions',require('./routes/versions.routes'));
app.use('/credits', require('./routes/credits.routes'));


app.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})