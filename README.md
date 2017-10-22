# Poor Man's T-SQL Formatter - NPM Package

An NPM package for the Poor Man's T-SQL Formatter JS Library.

This library is transpiled from the C# original (it's not a port in that 
the JS code is never maintained independently) - so for history of changes, 
issues with the library itself, etc please see https://github.com/TaoK/PoorMansTSqlFormatter.

## Installation

 `npm install poor-mans-t-sql-formatter`

## Usage

```
var formatterLib = require('poor-mans-t-sql-formatter');
var queryToFormat = "select 1 from somewhere WHERE someoneforgot = punctuation and [we want better]";
var queryFormatted = formatterLib.SqlFormattingManager.DefaultFormat(queryToFormat);
console.log(queryFormatted);
```

## Tests

 `npm test`

## License

This library, like the original at https://github.com/TaoK/PoorMansTSqlFormatter, is 
made freely available under the AGPL 3.0 license.

## Contributing

Given that this module is mostly wrapping over the original code at 
https://github.com/TaoK/PoorMansTSqlFormatter, there is little opportunity for 
contributing here - but any input is of course welcome!

This is my first (and probably only) npm module, so any comments on form/standards 
are most welcome!

## STATUS

This is a **work in progress**, and it's **not published to NPM yet!**

When it is, I'll see if I can take care of all those trendy things like:
* CI & test tracking
* coverage tracking
* (anything else?)
