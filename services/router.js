const express = require('express');
const router = new express.Router();
const students = require('../controllers/students.js' );

router.route('/students/:pidm?')
    .get(students.get);

router.route('/getUser') 
    .get(students.getUser);

    module.exports = router;