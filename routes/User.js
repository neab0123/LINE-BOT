const express = require('express');
const { GetUsers, GetUserByUserId, CreateUser } = require('../controllers/UserController');
const router = express.Router();

router.get('/', async (req, res) => {
    const get_list = await GetUsers();
    res.json(get_list).status(200);
});

router.post('/', async(req, res) => {
    const user_data = req.body.user;
    const userData = {
        user_id: 0,
        fullname: '',
        address: '',
        mobile: '',
        line_id: '',
        shipped_status: 0,
        promp_status: 1
    }

    const resp = await CreateUser(userData);

    res.json(resp).status(200);
})

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await GetUserByUserId(userId)
    res.json([userId, user]).status(200);
})

module.exports = router;
