const express = require('express');
const { GetUserByUserId, CreateUser, UpdateUser } = require('../controllers/UserController');
const { SendLineMessage } = require('../controllers/LineController');
const route = express.Router();

route.post('/lineWebhook', async (req, res) => {
    const events = req.body.events;
    if(events && events.length > 0){
        const { replyToken, message, source } = events[0];
        const userMessage = message.text;
        const userId = source.userId;
        await SendLineMessage(userId, userMessage);
        // const findUser = await GetUserByUserId(userId);
        // if(userMessage == "Register" && findUser == null){
        //     const replyMessage = "โปรดระบุชื่อ";
        //     const user = {
        //         user_id: 0,
        //         fullname: '',
        //         address: '',
        //         mobile: '',
        //         line_id: userId,
        //         shipped_status: 0,
        //         promp_status: 1
        //     }

        //     const res = await CreateUser(user);
        //     await SendLineMessage(userId, replyMessage);
        //     return;
        // }

        // if(userMessage == 'Register' && findUser != null){
        //     const replyMessage = "This line id is already."
        //     await SendLineMessage(userId, replyMessage);
        //     return;
        // }

        // if(findUser != null && findUser.promp_status == 1){
        //     const replyMessage = "โปรดระบุเบอร์โทร";
        //     findUser.fullname = userMessage;
        //     findUser.promp_status = 2;
        //     const updateUser = await UpdateUser(userId, findUser);
        //     await SendLineMessage(userId, replyMessage);
        // }

        // if(findUser != null && findUser.promp_status == 2){
        //     const replyMessage = "โปรดระบุที่อยู่";
        //     findUser.mobile = userMessage;
        //     findUser.promp_status = 3;
        //     const updateUser = await UpdateUser(userId, findUser);
        //     await SendLineMessage(userId, replyMessage);
        // }

        // if(findUser != null && findUser.promp_status == 3){
        //     const replyMessage = "Thank you";
        //     findUser.address = userMessage;
        //     findUser.promp_status = 0;
        //     const updateUser = await UpdateUser(userId, findUser);
        //     await SendLineMessage(userId, replyMessage);
        // }
    }
    res.status(200).send("OK");
})

module.exports = route;