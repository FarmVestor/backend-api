const nodemailer = require("nodemailer");


exports.contacts = async function (req, res) {
    // let testAccount = await nodemailer.createTestAccount();

    const contactEmail = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        secure:false,
        auth: {
            user: 'sara.asralan@ymail.com',
            pass: 'tdhlknqtgeesarcy'
        }
    });
    
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });


  const title = req.body.title;
  const email = req.body.email;
  const message = req.body.mssg; 
//   const mail = {
//     from: email,
//     to: "amaralkhooly1@gmail.com",
//     subject: "Contact Form Submission",
//     html: `<p>title: ${title}</p>
//            <p>Email: ${email}</p>
//            <p>Message: ${message}</p>`,
//   };
//   await contactEmail.sendMail(mail, (error) => {
//     if (error) {
//         console.error(error)
//       res.json({ status: "ERROR" });
//     } else {
//         console.error(error)
//         res.json({ status: "Message Sent" });
//     }
//   });
  // send mail with defined transport object
   await contactEmail.sendMail({
    from: email, // sender address
    to: "ammaralkhooly1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }).then((response) => {
  console.log("Message sent: %s", response.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
  res.send(response)
  }).catch((e) => {
      console.error(e)
      res.send(e.message)
  })

}