const express = require('express');
const dotenv = require('dotenv');
const connectDB  = require('./config/db');
const morgan = require('morgan');
const session =require('express-session')
const exphbs = require('express-handlebars');
const path = require('path')
const passport = require('passport');
//load config
dotenv.config({path: './config/config.env'});
//passport
require('./config/passport')(passport)
connectDB();

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs',exphbs({defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', '.hbs');
//sessions
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static

app.use(express.static(path.join(__dirname, 'public')))
//routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));

const PORT = process.env.PORT || 5000
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))