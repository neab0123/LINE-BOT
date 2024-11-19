import { createUser } from '../db/member_repository';

require('dotenv').config();

async function sendMessage(replyToken, message){
    try{
        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
            },
            body: JSON.stringify({
                to: replyToken,
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
            // replytoken for use reply api, userId for use push api
            const { replyToken, message, source } = events[0];
            const userMessage = message.text;
            const replyMessage = `You said: ${userMessage}`;
            const sendUserId = "Send your userId:" + source.userId
            // if(source.type == 'user'){
            //     await sendMessage(source.userId, sendUserId);
            // }
            if(userMessage == 'สมัคร'){
                const message = "กรุณากรอกข้อมูลตามรูปแบบดังนี้\nN1 {ชื่อ นามสกุล}\nT1 {เบอร์โทรติดต่อ}"
                const res = await createUser({ line_id: source.userId });
                await sendMessage(source.userId, message);
                console.log(res)
            }

            if(userMessage.split(" ")[0] == "N1"){
                const spltText = userMessage.split(" ");
                console.log(spltText)
            }
            // await sendMessage(replyToken, replyMessage);
        }
        res.status(200).send("OK");
    }else{
        res.status(405).send("Method not allowed")
    }
}