const express = require('express');
const { GetUsers, GetUserByUserId } = require('../controllers/UserController');
const router = express.Router();

router.get('/', async (req, res) => {
    const get_list = await GetUsers();
    res.json(get_list).status(200);
});

router.post('/', (req, res) => {
    const user_data = req.body.user;

})

router.get('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await GetUserByUserId(userId)
    res.json(userId).status(200);
})

module.exports = router;
