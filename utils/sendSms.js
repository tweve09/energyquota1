const accountSid = "ACe158e0eec7e6bb4e61a7186885a1718d";
const authToken = "501d108c8b8973732254535611cf7f31";
const client = require("twilio")(accountSid, authToken);

const sendSms = (message, to_number) => {
  client.messages
    .create({
      body: message,
      to: to_number,
      from: "+19386665909"
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
};

module.exports = {
  sendSms,
};
