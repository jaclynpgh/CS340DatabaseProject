/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 9278;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/classrooms.html',function(req,res) { 
    res.sendFile(__dirname + '/classrooms.html');
});

app.get('/studentClasses.html',function(req,res) { 
    res.sendFile(__dirname + '/studentClasses.html');
});

app.get('/students.html',function(req,res) { 
    res.sendFile(__dirname + '/students.html');
});

app.get('/updateStudents.html',function(req,res) { 
    res.sendFile(__dirname + '/updateStudents.html');
});

app.get('/classes.html',function(req,res) { 
    res.sendFile(__dirname + '/classes.html');
});

app.get('/teachers.html',function(req,res) { 
    res.sendFile(__dirname + '/teachers.html');
});

app.get('/index.html',function(req,res) { 
    res.sendFile(__dirname + '/index.html');
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});