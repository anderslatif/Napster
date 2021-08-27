const fs = require('fs');
const { convert } = require("subtitle-converter");

const path = '/Users/anders/Desktop/test.srt'
const subtitleText = fs.readFileSync(path, 'utf-8');
const outputExtension = '.vtt';
const options = {
    removeTextFormatting: true,
};

const { subtitle, status } = convert(subtitleText, outputExtension, options);

if (status.success) {
    console.log(subtitle);
} else {
    console.log(status);
}