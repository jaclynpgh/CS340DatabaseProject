-- Classes
-- Dislay all classes information from databasse
SELECT * FROM Classes;
-- add a new class
INSERT INTO Classses (className, teacherID, classroomID)
VALUES (:className, :teacherID, :classroomID);


-- Classrooms
-- Dislay all classroom information from databasse
SELECT * FROM Classroom;
-- add new classroom
INSERT INTO Classroom (classroomNum, maxCapacity)
VALUES (:classroomNum, :maxCapacity);


-- For Students
-- Dislay all students information from databasse
SELECT * FROM Students;
-- Obtain all student info filtered by last name
SELECT * FROM Students WHERE lastName = :lastName;
-- Obtain all student info filtered by student id
SELECT * FROM Students WHERE studentID = :studentID;
-- add new student
INSERT INTO Students (firstName, lastName, dateOfBirth, gender, streetAddressLine1, streetAddressLine2, city, state, postalCode, phoneNumber)
VALUES (:firstName, :lastName, :dateOfBirth, :gender, :streetAddressLine1, :streetAddressLine2, :city, :state, :postalCode, :phoneNumber);
-- update student based on studentID
UPDATE Students
SET firstName = :firstName, lastName = :lastName, dateOfBirth = :dateOfBirth, gender = :gender, streetAddressLine1 = :streetAddressLine1, streetAddressLine2 = :streetAddressLine2, 
city = :city, state = :state, postalCode = :postalCode, phoneNumber = :phoneNumber
WHERE studentID = :studentID;
-- delete student based on studentID
DELETE FROM Students WHERE studentID = :studentID;

-- Teachers
-- Dislay all teachers information from databasse
SELECT * FROM Teachers;
-- add new teacher
INSERT INTO Teachers (firstName, lastName, dateOfBirth, gender, streetAddressLine1, streetAddressLine2, city, state, postalCode, phoneNumber)
VALUES (:firstName, :lastName, :dateOfBirth, :gender, :streetAddressLine1, :streetAddressLine2, :city, :state, :postalCode, :phoneNumber);


-- Student Assigned Classes
-- Dislay all Student Assigned Classes information from databasse
SELECT * FROM StudentClasses;
-- aadd new Student Assigned Class
INSERT INTO StudentClasses (classID, studentID)
VALUES (:classID, :studentID);
-- Delete relationship based on studentID
DELETE FROM StudentClasses WHERE studentID = :studentID;

-- get students' classes
SELECT sc.studentID, s.firstName, s.lastName, c.classID, c.className 
FROM Students s
INNER JOIN StudentClasses sc
    ON sc.studentID = s.studentID
    INNER JOIN Classes c ON c.classID = sc.classID;
    