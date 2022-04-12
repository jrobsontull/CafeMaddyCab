import S3Client from 'aws-sdk/clients/s3.js';
import stream from 'stream';

let AWSClient;

export default class AwsDAO {
  static async establishClient() {
    try {
      const region = process.env.AWS_BUCKET_REGION;
      const accessKeyId = process.env.AWS_ACCESS_KEY;
      const secretAccessKey = process.env.AWS_SECRET_KEY;

      AWSClient = new S3Client({
        region,
        accessKeyId,
        secretAccessKey,
      });

      console.log('Backend connected to AWS bucket.');
      return { status: 'Backend connected to AWS bucket.' };
    } catch (e) {
      console.log('Failed to connect to AWS bucket: ' + e);
      return { status: e.message };
    }
  }

  static async uploadFile(fileName, file, parentFolder = null) {
    try {
      let key = fileName;
      if (parentFolder === 'selfie') {
        key = 'selfie/' + fileName;
      } else if (parentFolder === 'photoId') {
        key = 'photoId/' + fileName;
      }

      const bucketName = process.env.AWS_BUCKET_NAME;

      // Convert file buffer to stream
      let bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      const uploadParams = {
        Bucket: bucketName,
        Body: bufferStream,
        Key: key,
        ContentType: file.mimetype,
      };

      return AWSClient.upload(uploadParams).promise();
    } catch (e) {
      console.log('Failed to upload file: ' + e.message);
      return { error: e };
    }
  }
}
