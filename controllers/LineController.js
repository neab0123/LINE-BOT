require('dotenv').config();

async function SendLineMessage(UserId, Message){
    try{
        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                to: UserId,
                messages: [{
                    type: "text",
                    text: Message
                }]
            })
        })

        return response.status;
    }catch(error){
        return error;
    }
}

module.exports = {
    SendLineMessage
}