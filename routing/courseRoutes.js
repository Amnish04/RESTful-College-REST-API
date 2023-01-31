const express = require('express');
const router = express.Router();
const data = require('../modules/collegeData');

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
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

router.post("/", (req, res) => {
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

router.put('/', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;
