const express = require('express');
const app = express();
const twig = require('twig');
const bodyParser = require('body-parser');
// DB CONNECTION
const connection = require('./config/database');
//REDIS CONNECTION
const client= require('./config/redis');

client.on('connect', function() {
  console.log('Connected!');
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS Usuario ( Name varchar(50) NOT NULL, Email varchar(50) NOT NULL, Password varchar(15) NOT NULL)";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });


// SET VIEW ENGINE
app.set('view engine','html');
app.engine('html', twig.__express);
app.set('views','views');

// USE BODY-PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {


   connection.query('SELECT count(*) as total FROM `Usuario`', (err, results) => {
       if (err) throw err;

            results[0].total;
           console.log("SQL:"+results[0].total);

            client.LLEN("Usuarios",  function(err, reply){
                if (!err) {     
                    console.log("REDIS: "+reply);  
                    res.render('index',{
                        sql:results[0].total,
                        redis:reply
                    });    
                }
              });
    });


});

// INSERTING POST
app.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const usuario = {
        name: name,
        email: email,
        password: password,
    }

    if(req.body.optradio=='SQL')
    {

    connection.query('INSERT INTO `Usuario` SET ?', usuario, (err) => {
        if (err) throw err;
        console.log('Data inserted SQL');
        return res.redirect('/');
    });
    }else
    {
    client.rpush(['Usuarios', JSON.stringify(usuario)], function(err, reply) {  
        if (err) throw err;
        console.log('Data inserted REDIS');      
        return res.redirect('/');
      });
    
    }   
});

// SET 404 PAGE
app.use('/',(req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
// IF DATABASE CONNECTION IS SUCCESSFUL
//connection.connect((err) => {
  //  if (err) throw err;
    app.listen(process.env.NODE_DOCKER_PORT);
//});
