const rimrafPromise = require('rimraf-promise');

module.exports = async (req, res) => {
    let filePath = path.resolve(__dirname + '\\..\\public/' + req.filename.replace(/^.*\/\/[^\/]+/, ''));
    if (fse.existsSync(filePath)) {
        await rimrafPromise(filePath);
        res.json('OK')
    } else {
        res.status(500).json({msg: 'File does not exist'})
    }
};
