const express = require('express');
const { GetUsers } = require('../controllers/UserController');
const router = express.Router();

router.get('/', async (req, res) => {
    const get_list = await GetUsers();
    res.json(get_list).status(200);
});

router.post('/', (req, res) => {
    const user_data = req.body.user;

})

module.exports = router;
