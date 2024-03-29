if(process.env.NODE_ENV === 'dev'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const http = require('http').createServer(app)
const socket = require('./sockets/index')
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

//Socket.io
socket.connect(http)

//Routes
app.use('/public',  require('./routes/public.route'));
app.use('/users', require('./routes/user.route'));
app.use('/arenas', require('./routes/arenas.routes'));
app.use('/venues', require('./routes/venues.routes'));
app.use('/tournaments', require('./routes/tournaments.route'));
app.use('/versions',require('./routes/versions.routes'));
app.use('/contacto', require('./routes/contacto.routes'));
app.use('/credits', require('./routes/credits.routes'));
app.use('/ads',require('./routes/ads.routes'))
app.use('/acerca', require('./routes/about.routes'));
app.use('/messages', require('./routes/messages.routes'))



http.listen(app.get('PORT'), ()=>{
    console.log(`sevidor corriendo en el puerto ${app.get('PORT')}`)
})