const express = require('express');
const router = express.Router();
const data = require('../modules/collegeData');
const { checkForProfanity } = require('../middlewares/text-filters');

router.get('/', (req, res) => {
    data.getCourses()
    .then((coursesData) => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            data: coursesData
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

router.get('/:id', (req, res) => {
    data.getCourseById(req.params.id)
    .then((courseData) => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            data: courseData
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
    data.addCourse(req.body)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Course successfully added!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to add course => " + error
        });
    });
});

router.put('/', checkForProfanity, (req, res) => {
    data.updateCourse(req.body)
    .then(() => {
        res.status(200).json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Course ${req.body.courseId} successfully updated!`
        });
    }).catch((error) => {
        res.status(500).json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to update course => " + error
        });
    });
});

router.delete('/:id', (req, res) => {
    data.deleteCourseById(req.params.id)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `Course ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to delete course => " + error
        });
    });
});

module.exports = router;
