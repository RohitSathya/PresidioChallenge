const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const useroute = require('./routes/userroute');
const propertyroute=require('./routes/propertyroute')


const app = express();

// Configure multer for file uploads


app.use(express.json());
app.use(cors());
app.use('/api', useroute);
app.use('/property',propertyroute)


mongoose.connect('mongodb+srv://admin:sunsetwest1234RRR@royoapi.3qmdrjq.mongodb.net/presidio?retryWrites=true&w=majority&appName=RoyoApi').then(() => {
  console.log('db connected');
  app.listen(8080, () => console.log('server running successfully'));
});

