const express = require('express')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()


var bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 5000 || process.env.PORT

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/sendemail', async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: req.body.email,
        from: "eventally.in@gmail.com",
        subject: req.body.subject,
        text: req.body.message,
        html: req.body.message,
    };
    try {
        await sgMail.send(msg);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})