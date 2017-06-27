const twilio = require('twilio');
const twilioAccount = require('./twilio_account.json');

const {accountSid, authToken} = twilioAccount;

module.exports = new twilio.Twilio(accountSid, authToken);
