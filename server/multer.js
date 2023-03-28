import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  credentials: {
    accessKeyId: "AKIA52WFCBJXIZ34I3CG",
    secretAccessKey: "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",
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
