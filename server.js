const { urlencoded } = require('express');
const express = require('express');
const app = express();
const data = require('./modules/collegeData');
const cors = require('cors');
const utils = require('./modules/utils');

// const allowedDomains = [
//     'http://localhost:4200',
// ];
// let corsDomain;

// Implicit Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/favicon.ico', express.static('./favicon.ico'));

// Setup cors header
// app.use((req, res, next) => {
//     let domain = utils.getFullUrl(req);
//     corsDomain = allowedDomains.includes(domain) ? domain : null;
//     console.log(
//         "CorsDomain: " + corsDomain + ", " + "Domain: " + domain
//     );
//     console.log(req.subdomains)
//     next();
// });
app.use(cors({
    origin: '*'
}));

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Your API is running fine");
});

/* Database Endpoints */

/* Student Endpoints */
app.get('/students', (req, res) => {
    data.getAllStudents()
    .then((studentData) => {
        res.json({
            status: "Success",
            data: studentData
        });
    })
    .catch((error) => {
        res.json({
            status: "Fail",
            message: error
        });
    })
});

app.post("/students", (req, res) => {
    // Security Implementation Later
    data.addStudent(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `Student ${req.body.studentNum} successfully added!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to add student => " + error
        });
    });
});

app.put('/students', (req, res) => {
    data.updateStudent(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `Student ${req.body.studentNum} successfully updated!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to update student => " + error
        });
    });
});

app.delete('/students/:id', (req, res) => {
    data.deleteStudentByNum(req.params.id)
    .then(() => {
        res.json({
            status: "Success",
            message: `Student ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to delete student => " + error
        });
    });
});

/* Courses Endpoints */
app.get('/courses', (req, res) => {
    data.getCourses()
    .then((coursesData) => {
        res.json({
            status: "Success",
            data: coursesData
        });
    })
    .catch((error) => {
        res.json({
            status: "Fail",
            message: error
        });
    })
});

app.get('/courses/:id', (req, res) => {
    data.getCourseById(req.params.id)
    .then((courseData) => {
        res.json({
            status: "Success",
            data: courseData
        });
    })
    .catch((error) => {
        res.json({
            status: "Fail",
            message: error
        });
    })
});

app.post("/courses", (req, res) => {
    // Security Implementation Later
    data.addCourse(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `Course ${req.body.courseId} successfully added!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to add course => " + error
        });
    });
});

app.put('/courses', (req, res) => {
    data.updateCourse(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `Course ${req.body.courseId} successfully updated!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to update course => " + error
        });
    });
});

app.delete('/courses/:id', (req, res) => {
    data.deleteCourseById(req.params.id)
    .then(() => {
        res.json({
            status: "Success",
            message: `Course ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to delete course => " + error
        });
    });
});

/* User Endpoints */
app.get('/users', (req, res) => {
    data.getUsers()
    .then((usersData) => {
        res.json({
            status: "Success",
            data: usersData
        });
    })
    .catch((error) => {
        res.json({
            status: "Fail",
            message: error
        });
    })
});

app.put('/users', (req, res) => {
    data.addUser(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `User ${req.body.courseId} successfully created!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to create user => " + error
        });
    });
});

app.post('/users', (req, res) => {
    data.updateUser(req.body)
    .then(() => {
        res.json({
            status: "Success",
            message: `User ${req.body.userId} successfully updated!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to update user => " + error
        });
    });
});

app.delete('/users/:id', (req, res) => {
    data.deleteUserById(req.params.id)
    .then(() => {
        res.json({
            status: "Success",
            message: `User ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            status: "Fail",
            message: "Failed to delete user => " + error
        });
    });
});

data.initialize()
.then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("App listening on: " + HTTP_PORT);
    });
})
.catch((error) => {
    res.send(error);
});
