
const fs = require('fs-extra');

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

  const optionMapper = {
    IndentString:             {type: 'string', name: 'indent'},
    SpacesPerTab:             {type: 'int',    name: 'spacesPerTab'},
    MaxLineWidth:             {type: 'int',    name: 'maxLineWidth'},
    NewStatementLineBreaks:   {type: 'int',    name: 'statementBreaks'},
    NewClauseLineBreaks:      {type: 'int',    name: 'clauseBreaks'},
    ExpandCommaLists:         {type: 'bool',   name: 'expandCommaLists'},
    TrailingCommas:           {type: 'bool',   name: 'trailingCommas'},
    SpaceAfterExpandedComma:  {type: 'bool',   name: 'spaceAfterExpandedComma'},
    ExpandBooleanExpressions: {type: 'bool',   name: 'expandBooleanExpressions'},
    ExpandCaseStatements:     {type: 'bool',   name: 'expandCaseStatements'},
    ExpandBetweenConditions:  {type: 'bool',   name: 'expandBetweenConditions'},
    ExpandInLists:            {type: 'bool',   name: 'expandInLists'},
    BreakJoinOnSections:      {type: 'bool',   name: 'breakJoinOnSections'},
    UppercaseKeywords:        {type: 'bool',   name: 'uppercaseKeywords'},
    HTMLColoring:             {type: 'bool',   name: 'coloring'},
    KeywordStandardization:   {type: 'bool',   name: 'keywordStandardization'}
  };

  function translateConfigStringToJSOptions(configString) {
    //very naive implementation - test file configs never have commas, or ampersands, 
    // URLencoding weirdnesses (equals, plus, percent) or exotic unicode characters.
    var options = {};

    //set defaults that are different in the JS library, to their "original" defaults:
    options.trailingCommas = false;
    options.expandInLists = true;

    //if nothing provided, skip processing (avoid split of empty string)
    if (!configString)
      return options;

    configString.split(",").forEach(option => {
      var kvpair = option.split("=");
      var optionMapInfo = optionMapper[kvpair[0]];
      if (optionMapInfo) {
        switch (optionMapInfo.type) {
          case 'string':
            options[optionMapInfo.name] = kvpair[1];
            break;
          case 'int':
            options[optionMapInfo.name] = parseInt(kvpair[1], 10);
            break;
          case 'bool':
            options[optionMapInfo.name] = kvpair[1].toLowerCase() == "true";
            break;
        }
        
      }
      else
        throw new Error("Invalid configuration parameter in test file.");
    });

    //if test file requests "HTMLColoring", then it expects HTML output. Need to request it in options (here), 
    // and look out for it in separate output property (in test method).
    if (options.coloring) {
      options.includeHtml = true;
      options.includeText = false;
    }

    return options;
  }

  function readTestFile(fileName) {
    //test files are set up with windowsy assumptions: utf-8, sometimes with BOM, and 
    // always with CrLf line endings. This library, running in Node, will produce unixey
    // line endings, so we need to adjust our expectations. Also, apparently unixey 
    // environments think BOMs are data, so every developer needs to strip them 
    // independently...???
    return fs.readFile(fileName, 'utf8')
      .then(function(fileContent) {
        return fileContent.replace(/\r\n/g, "\n").replace(/^\uFEFF/g, "");
      });
  }

module.exports.getFileConfigString = getFileConfigString;
module.exports.stripFileConfigString = stripFileConfigString;
module.exports.translateConfigStringToJSOptions = translateConfigStringToJSOptions;
module.exports.readTestFile = readTestFile;
