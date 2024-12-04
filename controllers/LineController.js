require('dotenv').config();
const axios = require('axios');

async function SendLineMessage(UserId, Message){
    try{
        const response = await axios({
            method: 'post',
            url: 'https://api.line.me/v2/bot/message/push',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            data:{
                to: replyToken,
                messages: [{
                    type: "text",
                    text: message
                }]
            }
        })

        if(!response.ok){
            throw new Error(`Failed to send message: ${message}`)
        }
    }catch(error){
        throw new Error('func sendMessage Error: ', error);
    }
}

module.exports = {
    SendLineMessage
}