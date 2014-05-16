/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('underscore');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    var errors = [],
        flash = req.flash('error');

    if (_.isArray(flash)) {
        errors = _(flash).map(function (message) {
          return { type: message };
        });
    }

    res.render('users/signin', {
        title: 'Signin',
        errors: errors
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            return res.render('users/signup', {
                errors: err.errors,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
exports.makesuperuser = function(req, res) {
	console.log(req.user);
	console.log(req.params.userid);
	User.update({_id: req.params.userid}, {$set: {"role": "superman"}}, function(err, result){
		console.log("------------------");
		console.log(err, result);
		console.log("------------------");
		res.jsonp(result);
	});
};

exports.createPatient = function(req, res) {
  var user = new User(req.body);

  user.provider = 'local';
  user.save(function(err) {
    if (err) {
      res.jsonp({err: 1, msg: 'Could not create a new patient'});
    }
    res.jsonp({err: 1, msg: 'A new patient was created successfully.'});
  });

};

/**
 * Find all users
 */
exports.all = function(req, res, next) {
  User
    .find()
    .exec(function (err, users) {
      if (err) {
        res.render('error', { status: 500 });
      } else {
        res.send(users);
      }
    });
};
