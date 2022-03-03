// Express
var express = require('express'); // We are using the express library for the web server
var app = express(); // We need to instantiate an express object to interact with the server in our code

// app.js - SETUP section

app.use(express.json())
app.use(express.urlencoded({extended: true}))      

PORT = 9278; // Set a port number at the top so it's easy to change in the future
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
            res.render('studentClasses', { StudentClasses: rows }); // Render the studentClasses.hbs file, and also send the renderer
        }) // an object where 'data' is equal to the 'rows' we
}); // received back from the query



app.get('/students', function(req, res) {
    // Declare Query 1
    let query1;
    // If there is no query string, we just perform a basic SELECT
    if (req.query.lastName != undefined) {
        query1 = `SELECT * FROM Students WHERE lastName LIKE "${req.query.lastName}%"`
    } else if (req.query.gender != undefined) {
        query1 = `SELECT * FROM Students WHERE gender LIKE "${req.query.gender}%"`
    } else {
        query1 = "SELECT * FROM Students;";
    }
    db.pool.query(query1, function(error, rows, fields) {
        let students = rows;
        return res.render('students', { Students: students });
    })
});



app.get('/teachers', function(req, res) {
    let query1 = "SELECT * FROM Teachers;";
    db.pool.query(query1, function(error, rows, fields) {
        res.render('teachers', { Teachers: rows });
    })
});


app.post('/add_classes_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let classroomID = parseInt(data['classroomID']);
    if (isNaN(classroomID))
    {
        classroomID = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Classes (className, teacherID, classroomID) VALUES ('${data['className']}', '${data['teacherID']}', ${classroomID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/classes');
        }
    })
})


app.post('/add_classrooms_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Classrooms (classroomNum, maxCapacity) VALUES ('${data['classroomNum']}', '${data['maxCapacity']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/classrooms');
        }
    })
})


app.post('/add_studentClasses_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO StudentClasses (classID, studentID) VALUES ('${data['classID']}', '${data['studentID']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/studentClasses');
        }
    })
})


app.post('/add_students_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let streetAddressLine2 = parseInt(data['streetAddressLine2']);
    if (isNaN(streetAddressLine2))
    {
        streetAddressLine2 = ''
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Students (firstName, lastName, dateOfBirth, gender, streetAddressLine1, streetAddressLine2, city, state, postalCode, phoneNumber) VALUES (
        '${data['firstName']}', '${data['lastName']}', '${data['dateOfBirth']}', '${data['gender']}', '${data['streetAddressLine1']}', '${streetAddressLine2}', 
        '${data['city']}', '${data['state']}', '${data['postalCode']}', '${data['phoneNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/students');
        }
    })
})


app.post('/add_teachers_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let streetAddressLine2 = parseInt(data['streetAddressLine2']);
    if (isNaN(streetAddressLine2))
    {
        streetAddressLine2 = ''
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Teachers (firstName, lastName, dateOfBirth, gender, streetAddressLine1, streetAddressLine2, city, state, postalCode, phoneNumber) VALUES (
        '${data['firstName']}', '${data['lastName']}', '${data['dateOfBirth']}', '${data['gender']}', '${data['streetAddressLine1']}', '${streetAddressLine2}', 
        '${data['city']}', '${data['state']}', '${data['postalCode']}', '${data['phoneNumber']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/teachers');
        }
    })
})

/*
    LISTENER
*/

app.listen(PORT, function() { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});