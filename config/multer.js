const path = require("path");
const multer = require("multer");

// module.exports = multer({
//   storage: multerConfig,
//   limits: { fileSize: 3000000 },
// });

const createMulter = (path, fileSize, allowedFormat) => {
  const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const objFile = path.parse(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${objFile.name}_${uniqueSuffix}${objFile.ext}`);
    },
  });
  return multer({
    storage: multerConfig,
    limits: { fileSize: fileSize },
    fileFilter: allowedFormat,
  });
};

module.exports = createMulter;
