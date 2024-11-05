require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 4000;
app.use(express.json());

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken;

    res.sendStatus(200)
})

function replyMessage(replyToken){
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
    }

    let body = JSON.stringify({
        replyToken: replyToken,
        messages: [{
            type: 'text',
            text: 'Hello'
        }]
    })
    
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log(res.statusCode)
    })
}

app.listen(port);