const nodemailer = require("nodemailer");
const { response } = require("../app");

var models = require('../models');



exports.contacts = async function (req, res) {
    var response = {
        success: true,
        message: [],
        data: {}
    }



console.log("req.body.farmName",req.body.farmName)
console.log("req.body.recieverName",req.body.recieverName)
console.log("req.body.reciever",req.body.reciever)


        var output = ''
        if (req.body.farmName) {
            output = `
                <p> Hello ${req.body.recieverName}, 
                a user want to reach you. he sent the following message</p>
                <p> from : ${req.body.email} </p>
                <p> farm : ${req.body.farmName} </p>
                <p> message : ${req.body.mssg} </p>
                
                `;
        } else {
            output = `
                <p> Hello ${req.body.recieverName}, 
                a user want to reach you. he sent the following message</p>
                <p> from : ${req.body.email} </p>
                <p> message : ${req.body.mssg} </p>
                
                    `;
        }


        let transporter = nodemailer.createTransport({
            host: "smtp.mail.yahoo.com",
            service: "yahoo",
            port: 587,
            secure: false,
            auth: {
                user: "Green_Hand_1@yahoo.com",
                pass: "wdypgwejutizpuhl",
            },
            debug: false,
            logger: true
        });

        let mailOptions = {
            from: '"GreenHand" <Green_Hand_1@yahoo.com>',
            to: req.body.reciever,
            subject: 'Interested',
            text: "Request From GreenHand",
            html: output,
        }

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                response.success = false
                response.message.push("Email was not sent")
                console.log("Error", err)
                res.send(response)
            } else {
                response.success = true
                response.message.push("Email sent")
                console.log("Email sent")
                res.send(response)
            }
        })

    







}