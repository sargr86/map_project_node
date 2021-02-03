const path = require('path');



module.exports = async (folder, edit, data) => {
    let dir;

    console.log('multer!!!!')
    console.log(data)
    // console.log(file)

    // This is done for ferries info editing!!!
    if (edit) {
        console.log('edit!!!!!')
        if (folder !== 'users') {
            console.log('this folder' + folder)
            if (folder.includes('uploads')) {
                dir = folder
            } else {
                dir = path.join(UPLOADS_FOLDER, 'others/' + folder + '/' + data.name.replace(/ /g, '_')) + '_' + Date.now();
                console.log('this dir!!!')
                console.log(dir)

            }
        } else dir = USERS_UPLOAD_FOLDER;
    } else {
        console.log('not edit!!!')


        dir = USERS_UPLOAD_FOLDER;

        if (folder !== 'users') {
            // if ('tours_type_id' in data) {
            //     dir = TOURS_UPLOAD_FOLDER;
            // } else
            if ('activity_types' in data) {
                dir = ACTIVITIES_UPLOAD_FOLDER;
                // data.name is added for ferries section
            } else {
                dir = path.join(UPLOADS_FOLDER, 'others/' + folder + '/' + data.name.replace(/ /g, '_'));
                // dir = folder;
            }
        }

    }


    console.log('dir!!!!!')
    dir = path.normalize(dir).replace(/^(\.\.(\/|\\|$))+/, '');
    console.log(dir)
    await fse.ensureDir(dir);
    return dir;
}
