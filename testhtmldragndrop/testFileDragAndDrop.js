const fs = require("fs");
const path = require("path");

/* fs.readFile("/Users/anders/Desktop/testmusicfolder", (error, data) => {
    if (error) {
        console.log(error);
    }
    console.log(data);
}); */

const directoryPath = "/Users/anders/Desktop/testmusicfolder";

let filePaths = [];

async function getFiles(currentPath, isRecursiveCall = false) {
    filePaths = isRecursiveCall ? filePaths : [];

    const topLevelDirectory = fs.readdirSync(currentPath, { withFileTypes: true });

    await topLevelDirectory.forEach(async (file) => {
        if (file.isDirectory()) {
            return await getFiles(path.join(currentPath, file.name), true);
        } else {
            // todo check if audio file and get metadata, guid etc. 
            filePaths.push(file.name)
        }
    });
    return filePaths;
}

getFiles(directoryPath).then(console.log);



// https://github.com/Aveek-Saha/DuskPlayer/blob/master/src/App.svelte#L96





