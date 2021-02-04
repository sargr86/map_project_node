const {promisify} = require('util');
const readdir = promisify(require('fs-extra').readdir);


module.exports = async (req, uploadFolder, dbData) => {
    let files;
    if (dbData) {
        dbData = dbData.toJSON();
        const folder = path.resolve(uploadFolder + '/' + toFolderName(dbData['name']));
        const environment = process.env.NODE_ENV || 'development';
        const host = (environment === 'development' ? 'http://' : 'https://') + req.headers.host
        console.log(environment, process.env.NODE_ENV, host)
        const realFolder = host + path.relative('./', folder).replace(/\\/g, '/').replace('public', '');
        console.log(realFolder)
        console.log(folder)
        const folderPath = path.relative('./', folder).replace(/\\/g, '/').replace('public', '');
        if (fse.existsSync(folder)) {
            // Do something
            files = await readdir(folder);
            // img['big'] = img['small'] = img['medium']
            dbData['images'] = [];
            dbData['folder'] = folder;
            dbData['realFolder'] = realFolder;
            files.map(file => {

                dbData['images'].push({
                    big: realFolder + '/' + file,
                    medium: realFolder + '/' + file,
                    small: realFolder + '/' + file
                });
            })
        }
    }
    return dbData;

};
