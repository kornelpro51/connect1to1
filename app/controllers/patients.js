/**
 * Module dependencies.
 */
var mongoose        = require('mongoose'),
  Patient         = mongoose.model('Patient'),
  User = mongoose.model('User'),
  _               = require('underscore'),
  EmailHelper     = require('../utils/emailer');



exports.create = function(req, res) {
  var idx;
  if (req.body.schedules) {
    if (req.body.schedules.length > 0) {
      for (idx in req.body.schedules) {
        delete req.body.schedules[idx]._id;
      }
    }
  }
  var user = new User({
    provider : 'local',
    name : req.body.name,
    email : req.body.email,
    username : req.body.name,
    password : 'RANDOM_PWD'
  });
  user.save(function(err) {
    if (err) {
      res.send(400, err);
    }
    var patient = new Patient(req.body);
    patient._user = user._id;
    patient.save(function(err) {
      if (err) {
        res.send(400, err);
      } else {
        EmailHelper.sendActivationMail(patient, function(isSent) {
          res.send(200, patient);
        });
      }
    });
  });
};

/**
 * Get all patients
 */
exports.all = function(req, res) {
  Patient.find()
    .exec(function(err, patients) {
      if (err) {
        res.jsonp({err: 1, msg: 'db conection error'});
      } else {
        res.jsonp(patients);
      }
    });
};


/**
 * Find patients by id
 */
exports.patient = function (req, res, next, id) {
  "use strict";

  Patient.findOne({ _id: id }).populate('_user').populate('clinicalId').populate('demographicId').exec(function (err, patient) {
    if (err) {
      return next(err);
    }
    if (!patient) {
      return next(new Error('Failed to load patient ' + id));
    }
    req.patient = patient;
    next();
  });
};

/**
 * Get one patients
 */
exports.show = function (req, res) {
  "use strict";

  res.jsonp(req.patient);
};

/**
 * Get one patients
 */
exports.update = function (req, res) {
  "use strict";

  var patient = _.extend(req.patient, req.body);

  console.log(req.body);

  patient.save(function (err) {
    if (req.body.newpassword) {
      User.findOne({
          _id: req.patient._user._id
        }).exec(function(err, user) {
          if (err) return res.jsonp(patient);
          user.set('password', patient.newpassword);
          user.save(function() {
            res.jsonp(patient);
          });
        });
    } else {
      res.jsonp(patient);
    }
  });
};

/**
 * Get one patients
 */
exports.edit = function (req, res) {
  "use strict";
  res.jsonp(req.patient);
};

/**
 * route to create a user page.
 */
exports.directToActivate = function(req, res) {
  if(!req.patient.activated) {
    res.render('users/activate_patient', {
      patient: req.patient,
      activation_code: req.params.activationKey
    });
  } else {
    res.render('users/reset_password', {
      patient: req.patient,
      activation_code: req.params.activationKey
    });
  }
};


/**
 *
 * @param req
 *        req url  :  /patient/user/5293072acd3157290f000002/ca312e6bad3c2ae8dcfffe3befcc70410f712b0b
 * @param res
 */
exports.activate = function(req, res) {
  if(req.patient.activated) {
    res.render('users/reset_password', {
      patient: req.patient,
      activation_code: req.params.activationKey
    });
  } else {
    if(req.patient.activateKey == req.params.activationKey ) {
      req.patient.activated = true;
      req.patient._user.username = req.body.username;
      req.patient._user.password = req.body.password;
      req.patient.save(function() {
        if (err) {
          return res.render('users/signup', {
            errors: err.errors,
            user: req.body
          });
        }
        req.logIn(req.patient._user, function(err) {
          if (err) return res.render('error', { status: 500 });
          return res.redirect('/');
        });
      });
    } else {
      res.render('error', {
        status: 500
      });
    }
  }
};


/**
 * Send activation mail to user.
 * @param req
 * @param res
 */
exports.newmail = function(req, res) {

};
