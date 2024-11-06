require('dotenv').config();

async function sendMessage(replyToken, message){
    try{
        const response = await fetch("https://api.line.me/v2/bot/message/reply", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                replyToken: replyToken,
                messages: [{
                    type: "text",
                    text: message
                }]
            })
        })

        if(!response.ok){
            console.log(`Failed to send message: ${message}`)
        }
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