const express = require('express');
const path = require('path');
const app = express();
const IndexRoutes = require('./routes/indexRoutes')
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({path:path.join(__dirname,'.env')})

app.use(cors())
app.use(express.json({limit:"10mb"}))

app.use('/v1',IndexRoutes);


mongoose.connect(process.env.MONGO_URL).then((e) => console.log('Mongo Conneted.!!')).catch((err) => console.log('Conneting Error ==>',err))

app.listen(process.env.PORT || 5000 , () => console.log('Server Start..!!'))