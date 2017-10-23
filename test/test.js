'use strict'

const assert = require('chai').assert;
const fs = require('fs');
const formatterLib = require('../index');

const INPUTSQLFOLDER = './test/data/InputSql';
const STANDARDFORMATSQLFOLDER = './test/data/StandardFormatSql';

describe('PoorMansTSqlFormatterLib', function() {

  it('Basic test - simple select, default formatter', function() {
    var result = formatterLib.SqlFormattingManager.DefaultFormat("SELect 1 from there where that");
    assert.equal(result, 'SELECT 1\nFROM there\nWHERE that\n');
  });

  // CSharp Port warning!! substring in JS works differently - the second argument is the end position, NOT the requested string length!
  function getFileConfigString(fileName) {
    var openParens = fileName.indexOf("(");
    if (openParens >= 0) {
      var closeParens = fileName.indexOf(")", openParens);
      if (closeParens >= 0) {
        return fileName.substring(openParens + 1, closeParens);
      }
      return "";
    }
    return "";
  }

  function stripFileConfigString(fileName) {
    var openParens = fileName.indexOf("(");
    if (openParens >= 0) {
      var closeParens = fileName.indexOf(")", openParens);
      if (closeParens >= 0) {
        return fileName.substring(0, openParens) + fileName.substring(closeParens + 1);
      }
      return fileName;
    }
    return fileName;
  }


  describe('TSqlStandardFormatter', function() {

    var tokenizer = new formatterLib.Tokenizers.TSqlStandardTokenizer();
    var parser = new formatterLib.Parsers.TSqlStandardParser();
    var formatters = {};

    function getFormatter(configString) {
      var outFormatter = formatters[configString];
      if (!outFormatter)
      {
        var options = new formatterLib.Formatters.TSqlStandardFormatterOptions.$ctor1(configString);
        outFormatter = new formatterLib.Formatters.TSqlStandardFormatter.$ctor1(options);
        formatters[configString] = outFormatter;
      }
      return outFormatter;
    }

    var files = fs.readdirSync(STANDARDFORMATSQLFOLDER);
    files.forEach(file => {

      it('Standard Formatter - Expected Output - ' + file, function(done) {

        var config = getFileConfigString(file);
        var formatter = getFormatter(config);

        fs.readFile(STANDARDFORMATSQLFOLDER + '/' + file, 'utf8', function(err, expectedSql) {
          if (err) throw err;
        
          expectedSql = expectedSql.replace(/\r\n/g, "\n").replace(/^\uFEFF/g, "");

          var simplefilename = stripFileConfigString(file);

          fs.readFile(INPUTSQLFOLDER + '/' + simplefilename, 'utf8', function(err, inputSql) {
            if (err) throw err;
          
            inputSql = inputSql.replace(/\r\n/g, "\n").replace(/^\uFEFF/g, "");

            var tokenized = tokenizer.TokenizeSQL(inputSql);
            var parsed = parser.ParseSQL(tokenized);
            var formatted = formatter.FormatSQLTree(parsed);
            
            assert.equal(expectedSql, formatted);
            done();
          });
        });
        
      });

    });

    //SHOULD PORT OTHER TEST METHODS (from TSqlStandardFormatterTest in PoorMansTSqlFormatterTest C# project)

  });

  //SHOULD PORT OTHER TEST CLASSES (from PoorMansTSqlFormatterTest C# project)

});

