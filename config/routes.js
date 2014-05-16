/*jslint node: true */
var async = require('async');

module.exports = function (app, passport, auth) {
  "use strict";

    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);
    app.get('/users', users.all);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);
    app.get('/users/makesuperuser/:userid', users.makesuperuser);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Condition Routes
    var conditions = require('../app/controllers/conditions');
    app.get('/conditions', conditions.all);
    app.post('/conditions', auth.requiresLogin, auth.user.isSuperman, conditions.create);
    app.get('/conditions/:conditionId', conditions.show);
    app.put('/conditions/:conditionId', auth.requiresLogin, auth.user.isSuperman, conditions.update);
    app.del('/conditions/:conditionId', auth.requiresLogin, auth.user.isSuperman, conditions.destroy);

    //Finish with setting up the conditionId param
    app.param('conditionId', conditions.condition);

    //Procedure Routes
    var procedures = require('../app/controllers/procedures');
    app.get('/procedures', procedures.all);
    app.post('/procedures', auth.requiresLogin, auth.user.isSuperman, procedures.create);
    app.get('/procedures/:procedureId', procedures.show);
    app.put('/procedures/:procedureId', auth.requiresLogin, auth.user.isSuperman, procedures.update);
    app.del('/procedures/:procedureId', auth.requiresLogin, auth.user.isSuperman, procedures.destroy);

    //Finish with setting up the procedureId param
    app.param('procedureId', procedures.procedure);

    //Attributes Routes
    var attributes = require('../app/controllers/attributes');
    app.get('/attributes', attributes.all);
    app.post('/attributes', auth.requiresLogin, auth.user.isSuperman, attributes.create);
    app.get('/attributes/dcdata', attributes.dcdata);
    app.get('/attributes/:attributeId', attributes.show);
    app.put('/attributes/:attributeId', auth.requiresLogin, auth.user.isSuperman, attributes.update);
    app.del('/attributes/:attributeId', auth.requiresLogin, auth.user.isSuperman, attributes.destroy);

    //Finish with setting up the attributeId param
    app.param('attributeId', attributes.attribute);

    //Attributes Routes
    var organizations = require('../app/controllers/organizations');
    app.get('/organizations', organizations.all);
    app.post('/organizations', auth.requiresLogin, auth.user.isSuperman, organizations.create);
    app.get('/organizations/:organizationId', organizations.show);
    app.put('/organizations/:organizationId', auth.requiresLogin, auth.user.isSuperman, organizations.update);
    app.del('/organizations/:organizationId', auth.requiresLogin, auth.user.isSuperman, organizations.destroy);

    //Finish with setting up the attributeId param
    app.param('organizationId', organizations.organization);

    // Patients Routs
    var patients = require('../app/controllers/patients');
    app.post('/patients', auth.requiresLogin, auth.user.isSuperman, patients.create);
    app.get('/patients', patients.all);
    app.get('/patients/:patientId', patients.show);
    app.put('/patients/:patientId', auth.requiresLogin, auth.user.isSuperman, patients.update);
    app.post('/patients/:patientId/edit', patients.edit);

    app.get('/patients/activate/:patientId/:activationKey', patients.directToActivate);
    app.post('/patients/user/:patientId/:activationKey', patients.activate);
    app.post('/patients/:patientId/newmail', patients.newmail);

    app.param('patientId', patients.patient);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
