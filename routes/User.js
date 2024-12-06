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

router.get('/{id}', (req, res) => {
    const userId = req.params.id;
    
})

module.exports = router;
