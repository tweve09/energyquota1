const axios = require("axios");
const https = require("https");
var btoa = require("btoa");

const api_key = process.env.BEEM_API_KEY;
const secret_key = process.env.BEEM_SECRETE_KEY;
const content_type = "application/json";
const source_addr = process.env.BEEM_SOURCE_ADRESS;

function sendSms(message, tenantPhoneNumber) {
  axios
    .post(
      "https://apisms.beem.africa/v1/send",
      {
        source_addr: source_addr,
        schedule_time: "",
        encoding: 0,
        message: message,
        recipients: [
          {
            recipient_id: 1,
            dest_addr: tenantPhoneNumber,
          },
        ],
      },
      {
        headers: {
          "Content-Type": content_type,
          Authorization: "Basic " + btoa(api_key + ":" + secret_key),
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      }
    )
    .then((response) => console.log(response, api_key + ":" + secret_key))
    .catch((error) => console.error(error.response.data));
}

module.exports = {
  sendSms,
};
