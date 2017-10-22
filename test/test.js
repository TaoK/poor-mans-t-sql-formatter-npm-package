'use strict'

var expect = require('chai').expect;
var formatterLib = require('../index');

describe('#formatterLib', function() {
  it('should return "test"', function() {
    var result = formatterLib.myTest();
    expect(result).to.equal('Test');
  });
  it('should return something', function() {
    var result = formatterLib.SqlFormattingManager.DefaultFormat("SELect 1 from there where that");
    expect(result).to.equal('SELECT 1\nFROM there\nWHERE that\n');
  });
});

