require('./models/db');


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const projectCont = require('./controller/projectCont');
const employeeCont =require('./controller/employeeCont.js');
const postCont =require('./controller/postCont.js');
const firstpa =require('./controller/imgCont.js');
const bodyparser = require('body-parser');



var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname,'/views/'));
//confir express engine
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');


 app.listen(3000, () => {
     console.log("Started at port: 3000");
 });

 app.use(express.static(path.join(__dirname, 'public')));
 //app.use('/uploads', express.static('uploads'));
 app.use('/stylesheets', express.static('stylesheets'));



 app.use('/projects', projectCont);
 app.use('/employee', employeeCont);
 app.use('/post', postCont);
 app.use('/', firstpa);

