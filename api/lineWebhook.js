import { createUser, getUser, updateUser } from '../db/member_repository';
import { prefix_name } from "../json/prefix-name.json";

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
        console.log("req:", req.body)
        console.log("message:", req.body.events[0].message)
        console.log("sources:", req.body.events[0].source)
        if(events && events.length > 0){
            // replytoken for use reply api, userId for use push api
            const { replyToken, message, source } = events[0];
            const userMessage = message.text;
            const replyMessage = `You said: ${userMessage}`;
            const sendUserId = "Send your userId:" + source.userId
            // if(source.type == 'user'){
            //     await sendMessage(source.userId, sendUserId);
            // }
            const findUser = await getUser(source.userId);
            if(userMessage == 'Register' && findUser.length == 0 ){
                const message = "โปรดระบุชื่อ";
                const res = await createUser({ line_id: source.userId, state: "0" });
                console.log('Response CreateUser: ', res)
                await sendMessage(source.userId, message);
                return;
            }
            // else{
            //     const message = "คุณได้ลงทะเบียนแล้ว";
            //     await sendMessage(source.userId, message)
            // }

            // if(userMessage.split(" ")[0] == "N1"){
            //     const spltText = userMessage.split(" ");
            //     console.log(spltText)
            //     const res = await createUser({ line_id: source.userId, first_name: "", last_name: "" })
            // }
            console.log("FindUser: ", findUser[0])
            if(findUser[0].state == "0"){
                const message = "โปรดระบุเบอร์โทร";
                const res = await updateUser(source.userId, { name: userMessage, state: "1" })
                await sendMessage(source.userId, message);
                return;
            }

            if(findUser[0].state == "1"){
                const message = "โปรดระบุที่อยู่";
                const res = await updateUser(source.userId, { phone: userMessage, state: "2" })
                await sendMessage(source.userId, message);
                return;
            }

            if(findUser[0].state == "2"){
                const message = "Thank you";
                const res = await updateUser(source.userId, { address: userMessage, state: "" })
                await sendMessage(source.userId, message);
                return;
            }
            // await sendMessage(replyToken, replyMessage);
        }
        res.status(200).send("OK");
    }else{
        res.status(405).send("Method not allowed")
    }
}