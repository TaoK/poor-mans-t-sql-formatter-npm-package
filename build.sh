#!/bin/sh
# This script creates the npm package file (index.js) from the current output in the main Poor Man's T-SQL Formatter project on github (master branch)
cat bits/prelude.txt > index.js &&
echo >> index.js &&
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/bridge.js >> index.js &&
echo >> index.js &&
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/bridge.meta.js >> index.js &&
echo >> index.js &&
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/PoorMansTSqlFormatterJS.js >> index.js &&
echo >> index.js &&
wget -qO- https://raw.githubusercontent.com/TaoK/PoorMansTSqlFormatter/master/PoorMansTSqlFormatterWebDemo/JSLibReference/PoorMansTSqlFormatterJS.meta.js >> index.js &&
echo >> index.js &&
cat bits/suffix.txt >> index.js
