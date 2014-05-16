/**
 * Module dependencies.
 */
var should = require('should'),
  app = require('../../server'),
  mongoose = require('mongoose'),
  Attribute = mongoose.model('Attribute');

//Globals
var user;
var attribute;

//The tests
describe('<Unit Test>', function () {
  describe('Model Attribute:', function () {
    beforeEach(function (done) {
      attribute = new Attribute({
        name: 'Attribute Name',
        section: 'clinical',
        type: 'text',
        values: ''
      });
      done();
    });

    describe('Method Save', function () {
      it('should be able to save without problems', function (done) {
        return attribute.save(function (err) {
          should.not.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without name', function (done) {
        attribute.name = '';
        return attribute.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without section', function (done) {
        attribute.section = '';
        return attribute.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without type', function (done) {
        attribute.type = '';
        return attribute.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    afterEach(function (done) {
      done();
    });
  });
});
