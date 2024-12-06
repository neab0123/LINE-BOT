require('dotenv').config();
const axios = require('axios');

async function SendLineMessage(UserId, Message){
    // try{
        const response = await axios({
            method: 'post',
            url: 'https://api.line.me/v2/bot/message/push',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            data:{
                to: UserId,
                messages: [{
                    type: "text",
                    text: Message
                }]
            }
        })

    //     if(!response.ok){
    //         throw new Error(`Failed to send message: ${message}`)
    //     }
    // }catch(error){
    //     throw new Error('func sendMessage Error: ', error);
    // }
}

async function SendLineCoral(UserId, CoralMsg) {
    
}

module.exports = {
    SendLineMessage
}