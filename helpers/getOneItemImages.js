const {promisify} = require('util');
const readdir = promisify(require('fs-extra').readdir);


module.exports = async (req, uploadFolder, dbData, gallery = true) => {
    let files;
    if (dbData) {
        dbData = dbData.toJSON();
        const folder = path.resolve(uploadFolder + '/' + dbData['name'].replace(/ /g, '_'));
        const realFolder = 'http://' + req.headers.host + path.relative('./', folder).replace(/\\/g, '/').replace('public', '');
        const folderPath = path.relative('./', folder).replace(/\\/g, '/').replace('public', '');
        if (fse.existsSync(folder)) {
            // Do something
            files = await readdir(folder);
            // img['big'] = img['small'] = img['medium']
            dbData['images'] = [];
            dbData['folder'] = folder;
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
