const fs = require("fs");
const path = require("path");

let filePaths = [];

export async function getFilesInDirRecursively(currentPath, isRecursiveCall = false) {
    filePaths = isRecursiveCall ? filePaths : [];

    const topLevelDirectory = fs.readdirSync(currentPath, { withFileTypes: true });

    await topLevelDirectory.forEach(async (file) => {
        if (file.isDirectory()) {
            await getFilesRecursively(path.join(currentPath, file.name), true);
        } else {
            filePaths.push(file.name)
        }
    });

    return filePaths;
}
