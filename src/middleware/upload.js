const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      if (file.fieldname === 'coverImage') {
         cb(null, 'public/uploads/coverImage/');
      } else if (file.fieldname === 'projectFile') {
         cb(null, 'public/uploads/projectFile/');
      }
   },
   filename: (req, file, cb) => {
      if (file.fieldname === 'coverImage') {
         cb(null, 'CoverImage' + Date.now() + path.extname(file.originalname));
      } else if (file.fieldname === 'projectFile') {
         cb(null, 'ProjectFile' + Date.now() + path.extname(file.originalname));
      }
   },
});

function checkFileType(req, file, cb) {
   const allowdCoverImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
   const allowdProjectFileTypes = [
      'application/x-zip-compressed',
      'application/x-rar-compressed',
      'application/vnd.rar',
      'application/x-rar',
      'application/x-zip',
      'application/zip',
      'application/rar',
   ];

   if (file.fieldname === 'coverImage') {
      if (!allowdCoverImageTypes.includes(file.mimetype)) {
         const error = new Error('Worng File Type');
         error.code = 'LIMIT_COVER_IMAGE_FILE_TYPES';
         return cb(error, false);
      } else {
         cb(null, true);
      }
   } else if (file.fieldname === 'projectFile') {
      if (!allowdProjectFileTypes.includes(file.mimetype)) {
         const error = new Error('Worng File Type');
         error.code = 'LIMIT_PROJECT_FILE_FILE_TYPES';
         return cb(error, false);
      } else {
         cb(null, true);
      }
   }
}

const upload = multer({
   storage: storage,

   fileFilter: checkFileType,
});

module.exports = upload.fields([
   { name: 'coverImage', maxCount: 1 },
   { name: 'projectFile', maxCount: 1 },
]);
