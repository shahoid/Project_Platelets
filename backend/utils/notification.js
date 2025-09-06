const twilio = require('twilio');
const sendGrid = require('@sendgrid/mail');

sendGrid.setApiKey('YOUR_SENDGRID_API_KEY');
const client = twilio('YOUR_TWILIO_SID', 'YOUR_TWILIO_AUTH_TOKEN');

exports.sendSMS = (to, message) => {
  client.messages.create({
    body: message,
    from: 'YOUR_TWILIO_PHONE_NUMBER',
    to,
  }).then(message => console.log('SMS sent: ', message.sid));
};

exports.sendEmail = (to, subject, content) => {
  const msg = {
    to,
    from: 'YOUR_EMAIL',
    subject,
    text: content,
  };

  sendGrid.send(msg).then(response => {
    console.log('Email sent:', response);
  }).catch(error => console.error('Error sending email:', error));
};
