'use strict';

var app = require('../..');
import request from 'supertest';

var newSeat;

describe('Seat API:', function() {

  describe('GET /api/seat', function() {
    var seats;

    beforeEach(function(done) {
      request(app)
        .get('/api/seat')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(seats).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/seat', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/seat')
        .send({
          name: 'New Seat',
          info: 'This is the brand new seat!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSeat = res.body;
          done();
        });
    });

    it('should respond with the newly created seat', function() {
      expect(newSeat.name).to.equal('New Seat');
      expect(newSeat.info).to.equal('This is the brand new seat!!!');
    });

  });

  describe('GET /api/seat/:id', function() {
    var seat;

    beforeEach(function(done) {
      request(app)
        .get('/api/seat/' + newSeat._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          seat = res.body;
          done();
        });
    });

    afterEach(function() {
      seat = {};
    });

    it('should respond with the requested seat', function() {
      expect(seat.name).to.equal('New Seat');
      expect(seat.info).to.equal('This is the brand new seat!!!');
    });

  });

  describe('PUT /api/seat/:id', function() {
    var updatedSeat;

    beforeEach(function(done) {
      request(app)
        .put('/api/seat/' + newSeat._id)
        .send({
          name: 'Updated Seat',
          info: 'This is the updated seat!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSeat = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSeat = {};
    });

    it('should respond with the updated seat', function() {
      expect(updatedSeat.name).to.equal('Updated Seat');
      expect(updatedSeat.info).to.equal('This is the updated seat!!!');
    });

  });

  describe('DELETE /api/seat/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/seat/' + newSeat._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when seat does not exist', function(done) {
      request(app)
        .delete('/api/seat/' + newSeat._id)
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
