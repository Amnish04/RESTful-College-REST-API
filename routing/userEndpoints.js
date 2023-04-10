const express = require('express');
const router = express.Router();
const data = require('../modules/collegeData');

router.get('/', (req, res) => {
    data.getUsers()
    .then((usersData) => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            data: usersData
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

router.put('/', (req, res) => {
    data.addUser(req.body)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `User successfully created!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to create user => " + error
        });
    });
});

router.post('/', (req, res) => {
    data.updateUser(req.body)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `User ${req.body.userId} successfully updated!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to update user => " + error
        });
    });
});

router.delete('/:id', (req, res) => {
    data.deleteUserById(req.params.id)
    .then(() => {
        res.json({
            statusCode: res.statusCode,
            status: "Success",
            message: `User ${req.params.id} successfully deleted!`
        });
    }).catch((error) => {
        res.json({
            statusCode: res.statusCode,
            status: "Fail",
            message: "Failed to delete user => " + error
        });
    });
});

module.exports = router;
