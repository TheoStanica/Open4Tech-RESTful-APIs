require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


//config
app.set('view engine','ejs');

//middlewares
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))

//connect to db
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// routes
const indexRouter = require('./routes/index');
const reviewsRouter = require('./routes/reviews');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const weatherRouter = require('./routes/weather');

app.use('/', indexRouter);
app.use('/reviews', reviewsRouter);
app.use('/questions', questionsRouter);
app.use('/questions/:id/answer', answersRouter);
app.use('/weather', weatherRouter);


const port = process.env.PORT || 3000;
app.listen(port, (req,res) => {
    console.log(`App is listening on port ${port}`); 
})

