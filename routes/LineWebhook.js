const express = require('express');
const { SendLineMessage, SendLineCarousel } = require('../controllers/LineController');
const { GetUserByUserId, CreateUser, UpdateUser, GetAllPatientOfUser } = require('../controllers/UserController');
const { CreatePatient, GetPatientByUserId, UpdatePatient } = require('../controllers/PatientController');
const { PatientTemplate } = require('../library/PatientTemplate');
const route = express.Router();

route.post('/lineWebhook', async (req, res) => {
    // try{
        const events = req.body.events;
        if(events && events.length > 0){
            const { replyToken, message, source } = events[0];
            const userMessage = message.text;
            const userId = source.userId;
            const upperCaseUserMessage = userMessage.toUpperCase();

            const findUser = await GetUserByUserId(userId);
            if(userMessage == "Register" && findUser == null ){
                const replyMessage = "โปรดระบุชื่อที่ต้องการสมัครค่ะ";
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
                const replyMessage = "โปรดระบุเบอร์โทรของคุณเพื่อสมัครค่ะ";
                findUser.fullname = userMessage;
                findUser.promp_status = 2;
                const updateUser = await UpdateUser(userId, findUser);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 2){
                const replyMessage = "โปรดระบุที่อยู่เพื่อสมัครการใช้งานค่ะ";
                findUser.mobile = userMessage;
                findUser.promp_status = 3;
                const updateUser = await UpdateUser(userId, findUser);
                await SendLineMessage(userId, replyMessage);
                return;
            }

            if(findUser != null && findUser.promp_status == 3){
                const replyMessage = "เปิดใช้งานเรียบร้อยค่ะ";
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
                const patient = await GetAllPatientOfUser(findUser.user_id);
                const list_patient = patient?.patient_user;
                list_patient?.map((data) => {
                    replyCarousel.template.columns.unshift({
                        imageUrl: "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png",
                        action: {
                          type: "message",
                          label: data.patient.fullname,
                          text: data.patient.fullname
                        }
                    })
                })

                const replyMessage2 = {
                    type: "carousel",
                    contents: [
                      {
                        type: "bubble",
                        body: {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "text",
                              text: "First bubble"
                            }
                          ]
                        }
                      },
                      {
                        type: "bubble",
                        body: {
                          type: "box",
                          layout: "vertical",
                          contents: [
                            {
                              type: "text",
                              text: "Second bubble"
                            }
                          ]
                        }
                      }
                    ]
                  }
                const replyCarousel2 = PatientTemplate(list_patient);
                // await SendLineCarousel(userId, replyCarousel);
                // await SendLineCarousel(userId, replyMessage2);
                await SendLineCarousel(userId, replyCarousel2);
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
                const replyMessage = "Success update username."
                const lastest_patient = await GetPatientByUserId(findUser.user_id);
                const patientData = {
                    fullname: userMessage
                }
                const response = await UpdatePatient(lastest_patient.patient_id, patientData);
                const update_user = await UpdateUser(userId, { promp_status: 0 });
                return;
            }
        }
    //     res.status(200).send("OK");
    // }catch(error){
    //     res.status(400).send({ message: "Error: " + error.message });
    // }
})

module.exports = route;