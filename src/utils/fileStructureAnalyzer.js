const fs = require('fs');
const path = require('path');

const getForbiddenFolders = () => {
    return ['venv'];
}

const getForbiddenExtensions = () => {
    return [".png", ".svg", ".jpg", ".scss", ".css", ".eot", ".ttf", ".woff", ".woff2"]
}

const getMainFolderPath = () => {
    return path.resolve(__dirname, '..');
}

const getFileStructure = (folderPath) => {
    const forbiddenFolders = getForbiddenFolders();
    const forbiddenExtensions = getForbiddenExtensions();
    let folderName = path.basename(folderPath);
    let dirStructure = {};
    let fileStructure = {};

    fs.readdirSync(folderPath).sort().forEach((item) => {
        if (forbiddenFolders.includes(item)) {
            return;
        }
        if (item.startsWith('.') || item.startsWith('__')) {
            return;
        }
        let itemPath = path.join(folderPath, item);
        if (fs.lstatSync(itemPath).isFile()) {
            let ext = path.extname(itemPath);
            if (!forbiddenExtensions.includes(ext)) {
                fileStructure[item] = 'file';
            }
        } else if (fs.lstatSync(itemPath).isDirectory()) {
            let nestedStructure = getFileStructure(itemPath);
            if (Object.keys(nestedStructure).length !== 0) {
                dirStructure[item] = nestedStructure;
            }
        }
    });

    return {...dirStructure, ...fileStructure};
}

const main = () => {
    const rootFolder = getMainFolderPath(); // Please provide this function or the path
    const fileStructure = getFileStructure(rootFolder);
    const outputJson = JSON.stringify(fileStructure, null, 4);
    console.log(outputJson);
}

main();
