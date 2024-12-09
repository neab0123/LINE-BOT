const { GetPatients } = require('../controllers/PatientController');
const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    const list_patient = await GetPatients();
    res.json(list_patient).status(200);
})

module.exports = route;