const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'mishulicious',
  api_key: '519518189172165',
  api_secret: 'DYfH_rjZYeqWYc3q0k9Sr8Hwsyo'
});

var storage = cloudinaryStorage({
  cloudinary,
  folder: 'Profile_pictures', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb)=> {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage })

module.exports = uploadCloud;