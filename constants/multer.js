// Multer stuff
global.multer = require('multer');
global.UPLOAD_MAX_FILE_SIZE = 1024 * 1024;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const data = req.body;

        let dir = USERS_UPLOAD_FOLDER;

        if ('tours_type_id' in data) {
            dir = TOURS_UPLOAD_FOLDER;
        } else if ('activity_type_id' in data) {
            dir = ACTIVITIES_UPLOAD_FOLDER;
        } else {
            dir = path.join(UPLOADS_FOLDER, 'others/' + data.folder);
        }
// console.log('dir!!!!!')
        console.log(dir)

        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // already have got Date implemented in the name
    }
});


let upload = multer({
    storage: storage,
    limits: {fileSize: UPLOAD_MAX_FILE_SIZE},
    fileFilter: function (req, file, cb) {
        let filetypes = /jpeg|jpg/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (!mimetype && !extname) {
            req.fileTypeError = {message: "The file has an invalid type"};
            return cb(null, false, req.fileTypeError)
        }
        cb(null, true);
    }
});
global.uploadProfileImg = upload.single('profile_img_file');
global.uploadTourImg = upload.single('upload_image');

