import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { AwsS3Config } from 'src/config/aws-s3.config';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Multer } from 'multer';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: AwsS3Config.region,
      credentials: {
        accessKeyId: AwsS3Config.accessKeyId!,
        secretAccessKey: AwsS3Config.secretAccessKey!,
      },
    });
  }
  /**
   * Upload a file to S3 bucket
   */
  async uploadFile(file: Multer.File, folder = ''): Promise<string> {
    const fileKey = `${folder}/${randomUUID()}-${file.originalname}`;

    const uploadParams = {
      Bucket: AwsS3Config.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    // Return the public URL
    return this.getPublicUrl(fileKey);
  }

  /**
   * Get public URL of a file
   */
  getPublicUrl(fileKey: string): string {
    return `https://${AwsS3Config.bucketName}.s3.${AwsS3Config.region}.amazonaws.com/${fileKey}`;
  }

  /**
   * (Optional) Get pre-signed URL for private buckets
   */
  async getSignedUrl(fileKey: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: AwsS3Config.bucketName,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: expiresInSeconds });
    return signedUrl;
  }
}