'use strict'

const assert = require('chai').assert;
const fs = require('fs-extra');

const formatterLib = require('../index');

const utils = require('./utils');
const INPUTSQLFOLDER = './test/data/InputSql';
const STANDARDFORMATSQLFOLDER = './test/data/StandardFormatSql';

describe('PoorMansTSqlFormatterLib', function() {

  it('Basic test - simple select, default formatter', function() {
    var formatResult = formatterLib.formatSql("SELect 1 from there where that");
    assert.equal(formatResult.text, 'SELECT 1\nFROM there\nWHERE that\n');
  });

  describe('TSqlStandardFormatter', function() {
    this.timeout(3000);

    fs.readdirSync(STANDARDFORMATSQLFOLDER).forEach(file => {

      it('Standard Formatter - Expected Output - ' + file, function() {
        var configString = utils.getFileConfigString(file);
        var optionSet = utils.translateConfigStringToJSOptions(configString);
        var simpleFileName = utils.stripFileConfigString(file);

        return Promise.all([utils.readTestFile(STANDARDFORMATSQLFOLDER + '/' + file, 'utf8'), utils.readTestFile(INPUTSQLFOLDER + '/' + simpleFileName, 'utf8')])
          .then(function(results) {
            var formatted;

            if (optionSet.coloring)
              formatted = formatterLib.formatSql(results[1], optionSet).html;
            else
              formatted = formatterLib.formatSql(results[1], optionSet).text;

            assert.equal(results[0], formatted);
          });
      });

    });

    //SHOULD PORT OTHER TEST METHODS (from TSqlStandardFormatterTest in PoorMansTSqlFormatterTest C# project)

  });

  //SHOULD PORT OTHER TEST CLASSES (from PoorMansTSqlFormatterTest C# project)

});

