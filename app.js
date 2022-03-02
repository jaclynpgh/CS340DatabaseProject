// Express
var express = require('express'); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code
PORT = 56889; // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./db-connector')

//SETUP
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" })); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
var helpers = require('handlebars-helpers')();

/*
    ROUTES
*/

app.use('/', express.static('public'));
// Note the call to render() and not send(). Using render() ensures the templating engine
// will process this file, before sending the finished HTML to the client.

app.get('/classrooms', function(req, res) {
    let query1 = "SELECT * FROM Classrooms;";
    db.pool.query(query1, function(error, rows, fields) {
        res.render('classrooms', { Classrooms: rows });
    })
});


app.get('/classes', function(req, res) {
    let query1 = "SELECT * FROM Classes;";
    db.pool.query(query1, function(error, rows, fields) {
        res.render('classes', { Classes: rows });
    })
});

app.use('/updateStudents', function(req, res) {
    res.render('updateStudents');
});




app.get('/studentClasses', function(req, res) {
    let query1 = "SELECT sc.studentID, s.firstName, s.lastName, c.classID, c.className FROM Students s INNER JOIN StudentClasses sc ON sc.studentID = s.studentID INNER JOIN Classes c ON c.classID = sc.classID;"; // Define our query
    db.pool.query(query1, function(error, rows, fields) { // Execute the query
            res.render('studentClasses', { StudentClasses: rows }); // Render the index.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows' we
}); // received back from the query

app.get('/students', function(req, res) {
    let query1 = "SELECT * FROM Students;";
    db.pool.query(query1, function(error, rows, fields) {
        res.render('students', { Students: rows });
    })
});


app.get('/teachers', function(req, res) {
    let query1 = "SELECT * FROM Teachers;";
    db.pool.query(query1, function(error, rows, fields) {
        res.render('teachers', { Teachers: rows });
    })
});


/*
    LISTENER
*/

app.listen(PORT, function() { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});