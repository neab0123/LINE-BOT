require('dotenv').config();

async function sendMessage(replyToken, message){
    try{
        await fetch("https://api.line.me/v2/bot/message/reply", {
            method: "POST"
        },{
            replyToken,
            messages: [{
                type: "text",
                text: message
            }]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            }
        })
    }catch(error){

    }
}

export default async function handler(req, res){
    if(req.method === "POST"){
        const events = req.body.events;
        if(events && events.length > 0){
            const { replyToken, message } = events[0];
            const userMessage = message.text;
            const replyMessage = `You said: ${userMessage}`;
            await sendMessage(replyToken, replyMessage);
        }
        res.status(200).send("OK");
    }else{
        res.status(405).send("Method not allowed")
    }
}