require('dotenv').config();

async function SendLineMessage(UserId, Message){
    try{
        const response = await fetch("https://api.line.me/v2/bot/message/push", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer 43w0Ib7l6wHZ/RDPJU1pbe8h3qq5Sqr6OS4qbrUlAYcHjvPlFNGaRuf0PIdlzM/2ykWYHKQcdqDApw5xf6/Y/xZqRTWGgtf6Y5T99y7J+2kKnn/BfKTaWWvOFNV1PmIIE0wbiQe88wUkh+9DM4K/ygdB04t89/1O/w1cDnyilFU=`
            },
            body: JSON.stringify({
                to: UserId,
                messages: [{
                    type: "text",
                    text: Message
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

module.exports = {
    SendLineMessage
}