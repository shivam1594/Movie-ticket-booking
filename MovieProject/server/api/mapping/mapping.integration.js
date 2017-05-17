'use strict';

var app = require('../..');
import request from 'supertest';

var newMapping;

describe('Mapping API:', function() {

  describe('GET /api/mapping', function() {
    var mappings;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapping')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mappings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mappings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/mapping', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mapping')
        .send({
          name: 'New Mapping',
          info: 'This is the brand new mapping!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMapping = res.body;
          done();
        });
    });

    it('should respond with the newly created mapping', function() {
      expect(newMapping.name).to.equal('New Mapping');
      expect(newMapping.info).to.equal('This is the brand new mapping!!!');
    });

  });

  describe('GET /api/mapping/:id', function() {
    var mapping;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapping/' + newMapping._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapping = res.body;
          done();
        });
    });

    afterEach(function() {
      mapping = {};
    });

    it('should respond with the requested mapping', function() {
      expect(mapping.name).to.equal('New Mapping');
      expect(mapping.info).to.equal('This is the brand new mapping!!!');
    });

  });

  describe('PUT /api/mapping/:id', function() {
    var updatedMapping;

    beforeEach(function(done) {
      request(app)
        .put('/api/mapping/' + newMapping._id)
        .send({
          name: 'Updated Mapping',
          info: 'This is the updated mapping!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMapping = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMapping = {};
    });

    it('should respond with the updated mapping', function() {
      expect(updatedMapping.name).to.equal('Updated Mapping');
      expect(updatedMapping.info).to.equal('This is the updated mapping!!!');
    });

  });

  describe('DELETE /api/mapping/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mapping/' + newMapping._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mapping does not exist', function(done) {
      request(app)
        .delete('/api/mapping/' + newMapping._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
