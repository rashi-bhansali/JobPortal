const express = require("express");
const router = express.Router();
const Vonage = require('@vonage/server-sdk')


const vonage = new Vonage({
	apiKey: "2175c80d",
  	apiSecret: "atgVAhAqy9Wz9V1I"
});

function sendsms(req, res){
  const from = "Vonage APIs"
  const toNumber = "91"+req.params.number;
  const text = req.body.subject+"\n"+req.body.msg+"\n- "+req.body.name+"\n"+req.body.contact+"\n"+req.body.email;
  vonage.message.sendSms(from, toNumber, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
            res.redirect("http://localhost:3000/resume");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            res.redirect("http://localhost:3000/resume");
        }
    }
});

}

router.post('/:number', sendsms);
module.exports = router;