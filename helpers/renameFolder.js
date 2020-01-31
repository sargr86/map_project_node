const rimrafPromise = require('rimraf-promise');


module.exports = async (oldFolder, newFolder, pathToFolders) => {
    const oldFolderPath = pathToFolders + '\\' + toFolderName(oldFolder);
    const newFolderPath = pathToFolders + '\\' + toFolderName(newFolder);

    if (fse.existsSync(oldFolderPath)) {
        fse.copySync(oldFolderPath, newFolderPath);
        let r = await to(rimrafPromise(oldFolderPath));
    }
};
