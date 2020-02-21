require('dotenv').config();
var fs = require('fs');
var path = require('path');
var folderPath = path.join(__dirname, '../tmp');
var filePath = path.join(folderPath, 'bookmarklet.js');
var file = fs.readFileSync(filePath).toString();

// Properly wrap in a javascript: URL scheme type
file = file.replace(/^"use strict";\(function\(\)\{/, 'javascript:((function(){"use strict";');
file = file.replace(/;$/, ')');

file = file.replace(/process\.env\.GITHUB_REPO_URL/g, '"' + process.env.GITHUB_REPO_URL + '"');

fs.writeFileSync(filePath, file);

var proc = require('child_process').spawn('pbcopy');
proc.stdin.write(file);
proc.stdin.end();

console.log("\x1b[32m\x1b[34m%s\x1b[0m", 'NEW BOOKMARKLET COPIED TO CLIPBOARD');

fs.unlink(filePath, (err) => {
  if (err) {
    throw err;
  }

  fs.rmdirSync(folderPath);
});
