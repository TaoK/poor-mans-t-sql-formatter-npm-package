'use strict'

const assert = require('chai').assert;
const fs = require('fs-extra');

const formatterLib = require('../index');

const utils = require('./utils');
const INPUTSQLFOLDER = './test/data/InputSql';
const STANDARDFORMATSQLFOLDER = './test/data/StandardFormatSql';

describe('PoorMansTSqlFormatterLib', function() {

  it('Basic test - simple select, default formatter', function() {
    var result = formatterLib.SqlFormattingManager.DefaultFormat("SELect 1 from there where that");
    assert.equal(result, 'SELECT 1\nFROM there\nWHERE that\n');
  });

  describe('TSqlStandardFormatter', function() {

    this.timeout(3000);
    var tokenizer = new formatterLib.Tokenizers.TSqlStandardTokenizer();
    var parser = new formatterLib.Parsers.TSqlStandardParser();

    fs.readdirSync(STANDARDFORMATSQLFOLDER).forEach(file => {

      it('Standard Formatter - Expected Output - ' + file, function() {
        var config = utils.getFileConfigString(file);
        var formatter = utils.getFormatterFromConfig(config);
        var simpleFileName = utils.stripFileConfigString(file);
        return Promise.all([utils.readTestFile(STANDARDFORMATSQLFOLDER + '/' + file, 'utf8'), utils.readTestFile(INPUTSQLFOLDER + '/' + simpleFileName, 'utf8')])
          .then(function(results) {
            var tokenized = tokenizer.TokenizeSQL(results[1]);
            var parsed = parser.ParseSQL(tokenized);
            var formatted = formatter.FormatSQLTree(parsed);
            assert.equal(results[0], formatted);
          });
      });

    });

    //SHOULD PORT OTHER TEST METHODS (from TSqlStandardFormatterTest in PoorMansTSqlFormatterTest C# project)

  });

  //SHOULD PORT OTHER TEST CLASSES (from PoorMansTSqlFormatterTest C# project)

});

