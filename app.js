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

    // query to add drop down menu for current teachers to Classes
    let query2 = "SELECT * FROM Teachers;";

    let query3 = "SELECT * FROM Classrooms;";

    db.pool.query(query1, function(error, rows, fields) {
            let classes = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            let teachers = rows;

            // Run the third query
        db.pool.query(query3, (error, rows, fields) => {
            let classrooms = rows;

        res.render('classes', { Classes: classes, Teachers: teachers, Classrooms: classrooms });
        })
    })
})
});


app.get('/studentClasses', function(req, res) {
    let query1 = "SELECT sc.studentID, s.firstName, s.lastName, c.classID, c.className FROM Students s INNER JOIN StudentClasses sc ON sc.studentID = s.studentID INNER JOIN Classes c ON c.classID = sc.classID;"; // Define our query
    let query2 = "SELECT * FROM Classes;";
    let query3 = "SELECT * FROM Students;";
    db.pool.query(query1, function(error, rows, fields) {
            let studentClasses = rows;

        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            let classes = rows;

            // Run the third query
        db.pool.query(query3, (error, rows, fields) => {
            let students = rows;

        res.render('studentClasses', { StudentClasses: studentClasses, Classes: classes, Students: students });
        })
    })
})
});

app.use('/updateStudents', function(req, res) {
    res.render('updateStudents');
});

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
    let streetAddressLine2 = data['streetAddressLine2'];
    if (streetAddressLine2 == null)
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
            if (error) {
                    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
            }
            else
                {
                    res.send(rows);
                }
        }
    })
})


app.post('/add_teachers_form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let streetAddressLine2 = data['streetAddressLine2'];
    if (streetAddressLine2 == null)
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

function getStudent(res, context, id, complete){
    var sql = "SELECT * FROM Students WHERE studentID = ?";
    var inserts = [id];
    db.pool.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.student = results[0];
        complete();
    });
}

app.get('/:studentID', function(req, res){
    callbackCount = 0;
        var context = {};
        context.jsscripts = ["update_student.js"];
        getStudent(res, context, req.params.studentID, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('updateStudents', context);
            }

        }
    });

app.put('/update_student/:studentID', function(req, res, next){
    let editStudents= `UPDATE Students SET firstName=?, lastName=?, dateOfBirth=?, gender=?, streetAddressLine1=?, streetAddressLine2=?, city=?, state=?, postalCode=?, phoneNumber=? WHERE studentID = ?`;
    let inserts = [req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.gender, req.body.streetAddressLine1, req.body.streetAddressLine2, req.body.city, req.body.state, req.body.postalCode, req.body.phoneNumber, req.params.studentID]        
                  // Run the second query
                  db.pool.query(editStudents, inserts, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(200);
                          res.end()
                      }
                  })
              

  });

app.delete('/delete-student/:studentID', function(req,res,next){                                                                       // use delete verb since we are deleting from the database
    let deleteStudentClasses = `DELETE FROM StudentClasses WHERE studentID = ?`;
    let deleteStudents= `DELETE FROM Students WHERE studentID = ?`;
  
          // Run the 1st query
          db.pool.query(deleteStudentClasses, [req.params.studentID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we continue our second query.
      
              else
              {
                  // Run the second query
                  db.pool.query(deleteStudents, [req.params.studentID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }

  })});

/*
    LISTENER
*/

app.listen(PORT, function() { // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip3.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});