require('./db/db');
const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const session        = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,                // This allows the session cookie to be sent back and forth
  optionsSuccessStatus: 200         // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// const movieController = require('./controllers/movieController');
const authController  = require('./controllers/authController');
const billsController  = require('./controllers/billsController');
const trendingController  = require('./controllers/trendingController');

// app.use('/api/v1/movies', movieController);
app.use('/auth', authController);
app.use('/bills', billsController);
app.use('/trending', trendingController);

app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
