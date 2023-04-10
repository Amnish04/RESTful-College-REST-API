const express = require('express');
const router = express.Router();
const data = require('../modules/collegeData');
const { checkForProfanity } = require('../middlewares/text-filters');

/* Student Endpoints */
router.get('/', (req, res) => {
    data.getAllStudents()
    .then((studentData) => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            data: studentData
        });
    })
    .catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: error
        });
    })
});

router.post("/", checkForProfanity, (req, res) => {
    // Security Implementation Later
    data.addStudent(req.body)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Student successfully added!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to add student => " + error
        });
    });
});

router.put('/', checkForProfanity, (req, res) => {
    data.updateStudent(req.body)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Student ${req.body.studentNum} successfully updated!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to update student => " + error
        });
    });
});

router.delete('/:id', (req, res) => {
    data.deleteStudentByNum(req.params.id)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Student ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to delete student => " + error
        });
    });
});

module.exports = router;
