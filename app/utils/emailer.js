/**
 * Created by Valeriy Romanov.
 * Date: 12/2/13
 * Time: 11:41 AM
 * To change this template use File | Settings | File Templates.
 */
var path            = require('path'),
    nodemailer      = require('nodemailer'),
    emailTemplates  = require('email-templates'),
    templateDir     = path.resolve( __dirname, '..', 'templates');

var hostname = 'http://localhost:3000/';
var transport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "xxx@mail.com",
    pass: "xxxxxx"
  }
});

/**
 * Create patient
 */
exports.sendActivationMail = function(patient, cb) {
  if (patient.email === '') {
    cb(false);
    return;
  }
  emailTemplates(templateDir, function (err, template) {
    if (err) {
      console.log(err);
      cb(false);
    } else {
      var info = {
        name : patient.name,
        hostname : hostname,
        activateURL: 'patients/activate/',
        patientId: patient._id,
        activatekey : patient.activateKey
      };
      template('patientactivate', info, function(err, html, text) {
        if (err) {
          console.log(err);
          cb(false);
        } else {
          transport.sendMail({
            from    : 'Connect 1 to 1 (Web master)',
            to      : patient.email,
            subject : 'Welcome',
            html    : html,
            text    : text
          }, function(err, responseStatus) {
            if (err) {
              console.log(err);
              cb(false);
            } else {
              cb(true);
            }
          });
        }
      });
    }
  });
};