
const fs = require('fs-extra');
const formatterLib = require('../index');

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


  var formatters = {};

  function getFormatterFromConfig(configString) {
    var outFormatter = formatters[configString];
    if (!outFormatter)
    {
      var options = new formatterLib.Formatters.TSqlStandardFormatterOptions.$ctor1(configString);
      outFormatter = new formatterLib.Formatters.TSqlStandardFormatter.$ctor1(options);
      formatters[configString] = outFormatter;
    }
    return outFormatter;
  }

  function readTestFile(fileName) {
    //test files are set up with windowsy assumptions: utf-8, sometimes with BOM, and 
    // always with CrLf line endings. This library, running in Node, will produce unixey
    // line endings, so we need to adjust our expectations.
    return fs.readFile(fileName, 'utf8')
      .then(function(fileContent) {
        return fileContent.replace(/\r\n/g, "\n").replace(/^\uFEFF/g, "");
      });
  }

module.exports.getFileConfigString = getFileConfigString;
module.exports.stripFileConfigString = stripFileConfigString;
module.exports.getFormatterFromConfig = getFormatterFromConfig;
module.exports.readTestFile = readTestFile;
