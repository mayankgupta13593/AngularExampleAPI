const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nikkirocks786@gmail.com',
    pass: '9827588171'
  }
});
module.exports = {

  sendOTPMail: async (mailOptions) => {
    let status = { "type": null, "result": null };
    const  prom = new Promise((res, rej) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          //https://myaccount.google.com/lesssecureapps
          console.log(error);
          status = { "type": "error", "result": error };
          rej('Error');
        }
        else {
          console.log('Email sent: ' + info.response);
          status = { "type": "success", "result": info.response };
          res('Success');
        }
      });
   
    })
   await prom.then((val) => {
      console.log('asynchronously executed: ' + val);
    }).catch((err) => {
      console.log('asynchronously executed: ' + err);
    }).finally(() => {
      console.log('promise done executing');
    });
    return status;
  },

}

