const express = require('express');
const request = require('request');
const mysql = require('mysql');
const Users = require('../Users');
const Rooms = require('../Rooms');
const Utility = require('../Utility');

describe('Just open Google front page', function(){
  it('works', function(done) {
    request.get('http://google.com', function(err, response) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('GET /users/:handle', function(){
  it('returns with status code 200 for valid handle', function(done) {
    request.get('http://localhost:18000/users/pete', function(err, response) {
      console.log(response);
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
