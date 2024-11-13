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

        console.log(response)

        if(!response.ok){
            console.log(`Failed to send message: ${message}`)
        }
    }catch(error){
        throw new Error('func sendMessage Error: ', error);
    }
}

export default async function handler(req, res){
    if(req.method === "POST"){
        const events = req.body.events;
        if(events && events.length > 0){
            const { replyToken, message, source } = events[0];
            const userMessage = message.text;
            const replyMessage = `You said: ${userMessage}`;
            if(source.type == 'user'){
                await sendMessage(source.userId, `Send your userId: ${source.userId}`);
            }
            await sendMessage(replyToken, replyMessage);
        }
        res.status(200).send("OK");
    }else{
        res.status(405).send("Method not allowed")
    }
}