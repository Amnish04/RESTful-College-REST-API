const { urlencoded } = require('express');
const express = require('express');
const app = express();
const data = require('./modules/collegeData');
const cors = require('cors');

// Implicit Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/favicon.ico', express.static('./favicon.ico'));
app.use(cors({
    origin: 'http://localhost:4200'
}));

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Your API is running fine");
});

/* Database Endpoints */

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

data.initialize()
.then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("App listening on: " + HTTP_PORT);
    });
})
.catch((error) => {
    res.send(error);
});
