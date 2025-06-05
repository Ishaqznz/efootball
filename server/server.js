const express = require('express')
const app = express()
require('dotenv').config();
const router = require('./routers/userRouter')
const cors = require('cors')
const connectDB = require('./Config/connectDB')
const session = require('express-session');
const MongoStore = require('connect-mongo');

// cors policy
app.use(cors({
    origin: process.env.CLIENT_URL || 'https://efootballclient2.vercel.app',
    credentials: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true
  }
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connecting to the database
connectDB();


app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server is started on port ${process.env.PORT}`);  
})