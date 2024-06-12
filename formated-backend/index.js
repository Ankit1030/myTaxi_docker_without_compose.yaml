const express = require('express')
const app = express();
const path  = require('path')
const cors = require('cors')
const server = require('http').Server(app);
const {initialize} = require('./utils/socket')
require('dotenv').config();

//-------------------------------------------------------

// app.set(io,'io')
//-------------------------------------------------------
initialize(server);
// const io = require("socket.io",server,{ cors : {origin : "*"}})


const mongoose = require('mongoose');
const {verifyToken} = require('./middleware/verifytoken')
const PORT = 3200;

const vehicles = require('./routes/vehicles')
const login = require('./routes/login')
const Setting = require('./routes/settings')
const country = require('./routes/country')
const city = require('./routes/city')
const users = require('./routes/users')
const drivers = require('./routes/drivers')
const VehiclePricing = require('./routes/vehiclePricing')
const Rides = require('./routes/rides')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mongoURI= 'mongodb://127.0.0.1:27017/Angular_01'
const mongoAtlas = process.env.MONGO_ATLAS
const mongolocal = process.env.MONGO_LOCAL
const atlas = mongoAtlas
console.log('mongoAtlas-------->',mongolocal);
// const atlas = 'mongodb+srv://ankit:localhost@cluster0.qyuq0z3.mongodb.net/new_Task03_admin?retryWrites=true&w=majority'

const mongo = mongoose.connect(atlas)
  .then(() => {
    console.log('MongoDB connected successfullt');
  })
  .catch((err) => {
    console.log('Error MongoDB connection error:', err);
  });

  

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/login',login)
app.use(verifyToken);
app.use('/rides',Rides)
app.use('/vehicles',vehicles)
app.use('/city',city)
app.use('/vehiclepricing',VehiclePricing)
app.use('/country',country)
app.use('/users',users)
app.use('/drivers',drivers)
app.use('/settings',Setting)





server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
  
  