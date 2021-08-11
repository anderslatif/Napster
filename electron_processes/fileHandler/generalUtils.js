const path = require("path");

function guid() {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    // returns id of formxt 'xxxxxxxx'-'xxxx'-'xxxx'-'xxxx'-'xxxxxxxxxxxx'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getFileName(absolutePath, extension) {
    // the second parameter removes the '.extension' from the returned value
    return path.basename(absolutePath, `.${extension}`) || path.win32.basename(absolutePath, `.${extension}`);
}

module.exports = {
    guid,
    getFileName
};
