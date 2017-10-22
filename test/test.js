'use strict'

const assert = require('chai').assert;
const fs = require('fs');
const formatterLib = require('../index');

const INPUTSQLFOLDER = './test/data/InputSql';
const STANDARDFORMATSQLFOLDER = './test/data/StandardFormatSql';

describe('PoorMansTSqlFormatterLib', function() {

  it('Basic test - simple select', function(done) {
    var result = formatterLib.SqlFormattingManager.DefaultFormat("SELect 1 from there where that");
    assert.equal(result, 'SELECT 1\nFROM there\nWHERE that\n');
    done();
  });

  // CHECK THIS!!
  function getFileConfigString(fileName) {
    var openParens = fileName.indexOf("(");
    if (openParens >= 0) {
      var closeParens = fileName.indexOf(")", openParens);
      if (closeParens >= 0) {
        return fileName.Substring(openParens + 1, (closeParens - openParens) - 1);
      }
      return "";
    }
    return "";
  }

  // CHECK THIS!!
  function stripFileConfigString(fileName) {
    var openParens = fileName.indexOf("(");
    if (openParens >= 0) {
      var closeParens = fileName.indexOf(")", openParens);
      if (closeParens >= 0) {
        return fileName.Substring(0, openParens) + fileName.Substring(closeParens + 1);
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
        var options = new formatterLib.Formatters.TSqlStandardFormatterOptions(configString);
        outFormatter = new formatterLib.Formatters.TSqlStandardFormatter(options);
        formatters[configString] = outFormatter;
      }
      return outFormatter;
    }

var counter = 0;

    var files = fs.readdirSync(INPUTSQLFOLDER);
    files.forEach(file => {

counter++;

if (counter < 6) {

      it('Standard Formatter - Expected Output - ' + file, function(done) {
        var formatter = getFormatter(getFileConfigString(file));

        fs.readFile(STANDARDFORMATSQLFOLDER + '/' + file, 'utf8', function(err, expectedSql) {
          if (err) throw err;
        
          fs.readFile(INPUTSQLFOLDER + '/' + stripFileConfigString(file), 'utf8', function(err, inputSql) {
            if (err) throw err;
          
            var tokenized = tokenizer.TokenizeSQL(inputSql);
            var parsed = parser.ParseSQL(tokenized);
            var formatted = formatter.FormatSQLTree(parsed);
            
            assert.equal(expectedSql.replace(/\r\n/g, "\n").replace(/\uFEFF/g, ""), formatted);
            done();
          });
        });
        
      });
}

    });

    //SHOULD PORT OTHER TEST METHODS (from TSqlStandardFormatterTest in PoorMansTSqlFormatterTest C# project)

  });

  //SHOULD PORT OTHER TEST CLASSES (from PoorMansTSqlFormatterTest C# project)

});

