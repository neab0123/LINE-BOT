const express = require('express');
const { SendLineMessage, SendLineCarousel } = require('../controllers/LineController');
const { GetUserByUserId, CreateUser, UpdateUser, GetAllPatientOfUser } = require('../controllers/UserController');
const { CreatePatient } = require('../controllers/PatientController');
const route = express.Router();

route.post('/lineWebhook', async (req, res) => {
    try{
        const events = req.body.events;
        if(events && events.length > 0){
            const { replyToken, message, source } = events[0];
            const userMessage = message.text;
            const userId = source.userId;
            const upperCaseUserMessage = userMessage.toUpperCase();

            const findUser = await GetUserByUserId(userId);
            if(userMessage == "Register" && findUser == null ){
                const replyMessage = "โปรดระบุชื่อ";
                const userData = {
                    user_id: 0,
                    fullname: '',
                    address: '',
                    mobile: '',
                    line_id: userId,
                    shipped_status: 0,
                    promp_status: 1
                }

                const res = await CreateUser(userData);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 1){
                const replyMessage = "โปรดระบุเบอร์โทร";
                findUser.fullname = userMessage;
                findUser.promp_status = 2;
                const updateUser = await UpdateUser(userId, findUser);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 2){
                const replyMessage = "โปรดระบุที่อยู่";
                findUser.mobile = userMessage;
                findUser.promp_status = 3;
                const updateUser = await UpdateUser(userId, findUser);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 3){
                const replyMessage = "เปิดใช้งานเรียบร้อย";
                findUser.address = userMessage;
                findUser.promp_status = 0;
                const updateUser = await UpdateUser(userId, findUser);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(userMessage == "Your loved ones" && findUser != null){
                const replyCarousel = {
                    type: "template",
                    altText: "This is an image carousel template",
                    template: {
                      type: "image_carousel",
                      columns: [
                        {
                          imageUrl: "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
                          action: {
                            type: "message",
                            label: "Brown",
                            text: "Add Caretaker"
                          }
                        }
                      ]
                    }
                  }
                // const patient = await GetAllPatientOfUser(findUser.user_id);
                // const list_patient = patient?.patient_user;
                
                await SendLineCarousel(userId, replyCarousel);
                return;
            }

            if(userMessage == "Add Caretaker" && findUser != null){
                const replyMessage = "โปรดระบุชื่อ";
                const user_id = await UpdateUser(userId, { promp_status: 5 });
                const patientData = {
                    fullname: 'test',
                    qr_code: 'test'
                }
                const patient_id = await CreatePatient(user_id.user_id, patientData);
                // const user_patient = await CreateUserPatient({ user_id: user_id.user_id, patient_id: patient_id.patient_id });
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 5){
                const replyMessage = ""
                
            }
        }
        res.status(200).send("OK");
    }catch(error){
        res.status(400).send({ message: "Error: " + error.message });
    }
    
})

module.exports = route;