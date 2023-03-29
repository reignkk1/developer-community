import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
  region: "ap-northeast-2",
});

const imageUploader = multerS3({
  s3: s3,
  bucket: "developer-community",
  acl: "public-read",
});

const upload = multer({
  dest: "/uploads",
  storage: imageUploader,
});

export default upload;
