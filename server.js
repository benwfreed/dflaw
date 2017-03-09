'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const api_key = 'key-c8d591c3b134d507a5fd5eb16d335596';
const domain = 'sandbox2ebc2c93391e484fab269fef664454cf.mailgun.org';

var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

/*

*/

const app = express();

app.use(express.static(__dirname + '/dist'));

/*
app.use(bodyParser.urlencoded({
	extended: 'true'
}));
*/

app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/dist/index.html'));

app.post('/',
  (req, res) => {
    const details = `
      first name is ${req.body.firstName}
      last name is ${req.body.lastName}
      phone number is ${req.body.phone}
      email is ${req.body.email}`;
    const data = {
      from: 'Bib <mailgun@sandbox2ebc2c93391e484fab269fef664454cf>',
      to: 'dfreedlaw@gmail.com',
      subject: 'Potential Bankruptcy Client',
      text: details
    };
    mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        console.log(body);
        res.send("ok");
      }
    });
  }
);

const listener = app.listen(process.env.PORT || 3000,
  () => console.log('running on port ' + listener.address().port));
