var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const  films = require('./routes/films');
const comments =require('./routes/comments');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');
var app = express();
app.use(cors())
/*  const swaggerOptions = {
  swaggerDefinition:{
    info:{
      title:'Movie API',
      description:'Starwars Movie API/METACARE ASSESSMENT',
      contact:{
        name:'Eniola Oseni',
      },
      servers: ['http://localhost:3000']
    }
  },
  apis: ["routes/*.js"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);  */

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument)
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/films', films);
app.use('/comments', comments);

// catch 404 and forward to error handler
app.get('*',(req, res, next) => {
  res.status(404).send({
    status: 404,
    error: 'Not found'
  })
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
