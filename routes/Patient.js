const { GetPatients, CreatePatient } = require('../controllers/PatientController');
const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    const list_patient = await GetPatients();
    res.json(list_patient).status(200);
})

route.post('/', async(req, res) => {
    const data = {
        patient_id: 0,
        fullname: 'test',
        qr_code: 'test'
    }

    const resp = await CreatePatient(data);
    res.json(resp).status(200);
})

module.exports = route;