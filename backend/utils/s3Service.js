import S3 from "aws-sdk/clients/s3.js";
import { v4 as uuid } from "uuid";

export const s3Upload = async (file) => {
  const s3 = new S3();
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

export const deleteImageFromS3 = async (imageUrl) => {
  const s3 = new S3();
  const imageKey = imageUrl.split("/").pop();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${imageKey}`,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.error("Error deleting image from S3:", err);
        reject(err);
      } else {
        console.log("Image deleted from S3:", data);
        resolve(data);
      }
    });
  });
};
