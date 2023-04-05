import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuid} from 'uuid';

const s3 = new aws.S3({
  accessKeyId: process.env.S3_accessKey,
  secretAccessKey: process.env.S3_secretKey,
  region: process.env.S3_region,
});

export const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3,
    bucket: "blogger-media",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" ,contentType:file.mimetype.split('/')[1]});
    },
    key: function (req, file, cb) {
      cb(null, `${uuid()}.${file.mimetype.split("/")[1]}`);
    },
  }),
});

