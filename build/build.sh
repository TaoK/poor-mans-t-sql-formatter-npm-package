#!/bin/sh
# This script creates the npm package file (index.js) from the current output in the main Poor Man's T-SQL Formatter project on github (master branch)

#from https://stackoverflow.com/questions/59895/getting-the-source-directory-of-a-bash-script-from-within?rq=1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#First wget call is just to check we have access to the site; otherwise we'd wipe out index.js and leave it half-constructed.
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/Release/PoorMansTSqlFormatterJS.js > /dev/null &&
cat "$DIR/prelude.txt" > "$DIR/../index.js" &&
echo >> "$DIR/../index.js" &&
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/Release/PoorMansTSqlFormatterJS.js >> "$DIR/../index.js" &&
echo >> "$DIR/../index.js" &&
cat "$DIR/suffix.txt" >> "$DIR/../index.js"