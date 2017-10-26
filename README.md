# Poor Man's T-SQL Formatter - NPM Package

An NPM package for the Poor Man's T-SQL Formatter JS Library.

This library is transpiled from the C# original (it's not a port in that 
the JS code is never maintained independently) - so for history of changes, 
issues with the library itself, etc please see https://github.com/TaoK/PoorMansTSqlFormatter.

This library exists to make it easy to include the formatter library in websites,
in random node projects or in command-line usage in node-friendly environments 
(which may not be as C#-friendly / mono-friendly).

This library also has a much better (in my opionion) API than the original C# library,
hopefully I'll get around to changing the source at some point.

There is one serious consideration that might drive you to the C#/mono library or
command-line utility, however: **This JS library is about 8x slower than the C# 
original**. I haven't investigated exactly why yet, but I don't hold high hopes of 
this changing anytime soon. If you need to deal with large sets of files and 
performance matters, you will likely want to look at the C#/mono library/project.

## Installation

 `npm install poor-mans-t-sql-formatter`

## Usage

This JS library exposes a very simple API to the formatter: one method, with options, returning one datastructure (with optional bits).

Example:

```
var formatterLib = require('poor-mans-t-sql-formatter');
var queryToFormat = "select 1 from somewhere WHERE someoneforgot = punctuation and [we want better] = 1";
var result = formatterLib.formatSql(queryToFormat);
console.log(result.text);
```

Options are provided in a second argument.

Example:

```
var formatterLib = require('poor-mans-t-sql-formatter');
var result = formatterLib.formatSql("select 1, 2, 3, 4 from counter", { trailingCommas: false, spaceAfterExpandedComma: true });
console.log(result.text);
```

General options: 

| Option                   | Description                                                                              | Type   | Default    |
| ---                      | ---                                                                                      | ---    | ---        |
| formattingType           | ```standard```, ```identity``` or ```obfuscation``` - what you'd like to do              | enum   | standard   |
| errorOutputPrefix        | Text to be included (in a comment at the top) if parsing failed and result is therefore suspect | string | (something like "--WARNING: errors during parsing") |
| includeText              | Specify that the formatted SQL should be included in the result as a Text value/property | bool   | true       |
| includeHtml              | Specify that the formatted SQL should be included in the result as HTML                  | bool   | false      |
| includeHtmlPage          | Specify that the formatted SQL should be included in the result as a full HTML document  | bool   | false      |
| includeTokenList         | Specify that the Token List produced from the Tokenization phase should be included      | bool   | false      |
| includeParseTree         | Specify that the Parse Tree produced from the Parsing phase should be included           | bool   | false      |

Standard formatter options:

| Option                   | Description                                                                              | Type   | Default    |
| ---                      | ---                                                                                      | ---    | ---        |
| indent                   | The unit of indentation - typically a tab (\t) or a number of spaces                     | string | \t         |
| spacesPerTab             | This is used to measure line length, and only applies if you use tabs                    | int    | 4          |
| maxLineWidth             | Request that the formatter wrap long lines to avoid exceeding this line length           | int    | 999        |
| statementBreaks          | How many linebreaks should be added when starting a new statement?                       | int    | 2          |
| maxLineWidth             | How many linebreaks should be added when starting a new clause within a statement?       | int    | 1          |
| expandCommaLists         | Should comma-delimited lists (columns, group by args, etc) be broken out onto new lines? | bool   | true       |
| trailingCommas           | When starting a new line because of a comma-delimited entry, should the comma be at the end of the first line or the start of the next? | bool   | true       |
| spaceAfterExpandedComma  | Should a space be added after the comma? (typically not if they are "trailing")          | bool   | false      |
| expandBooleanExpressions | Should boolean operators (AND, OR) cause a linebreak?                                    | bool   | true       |
| expandCaseStatements     | Should CASE expressions have their WHEN and THEN expressions be broken out on new lines? | bool   | true       |
| expandBetweenConditions  | Should BETWEEN expressions have the max argument broken out on a new line?               | bool   | true       |
| expandInLists            | Should IN() lists have each argument on a new line?                                      | bool   | false      |
| breakJoinOnSections      | Should the ON section of a JOIN clause be broken out onto its own line?                  | bool   | false      |
| uppercaseKeywords        | Should T-SQL keywords (like SELECT, FROM) be automatically uppercased?                   | bool   | true       |
| coloring                 | (If HTML output is enabled) should keywords, comments etc have distinct color classes?   | bool   | true       |
| keywordStandardization   | Should the ON section of a JOIN clause be broken out onto its own line?                  | bool   | false      |

Obfuscating formatter options:

| Option                    | Description                                                                              | Type   | Default    |
| ---                       | ---                                                                                      | ---    | ---        |
| randomizeKeywordCase      | Should the case of keywords be randomized, to minimize legibility?                       | bool   | false      |
| randomizeColor            | (If HTML output is enabled) should the color of the SQL text be randomized, to minimize legibility? | bool   | false      |
| randomizeLineLengths      | Should the SQL be wrapped at arbitrary intervals, to minimize legibility?                | bool   | false      |
| preserveComments          | Should comments in the code be retained, or stripped out?                                | bool   | true       |
| enableKeywordSubstitution | Should keywords in the code be replaced with less-recognizable but equivalent alternatives? (NOTE: only safe for T-SQL, not other flavors!) | bool   | true       |

## Tests

 `npm test`

## License

This library, like the original at https://github.com/TaoK/PoorMansTSqlFormatter, is 
made freely available under the AGPL 3.0 license.

## Contributing

Given that this module is mostly wrapping over the original code at 
https://github.com/TaoK/PoorMansTSqlFormatter, there is little opportunity for 
contributing here - but any input is of course welcome!

To produce/refresh the npm library file (index.js) just run the build.sh script.
When executed from the root of the project, it will simply collect the files from 
the parent project in github and add the wrapper code defined in prefix and suffix 
files.

## STATUS

When it is published, I'll see if I can take care of all those trendy things like:

* CI & test tracking
* coverage tracking
* a suitable "try it out" link
* a detailed NPM description/page (from the readme.md if possible)
* a (node-based) command-line formatting utility (separate NPM package, to avoid burdening this one with dependencies)
** Checking / understanding the handling of piped input and output encoding in node
** Establishing an argument-handling strategy, using args, command-line-args, commander, or something similar
* Think about restructuring the library into a "legacylib" file (using prefix/suffix build process) and a new stuff file.
* (anything else?)

Eventually, probably once the library has been published and shows some sign of interest/activity, I'll go for the bigger stuff

* look for perf opportunities. 8s is a LONG time for some simple tests!! (C# equivalent is 1s) - otherwise DOCUMENT the terrible performance...

