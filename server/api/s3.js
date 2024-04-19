import aws from 'aws-sdk';
import crypto from 'crypto';

const randomBytes = crypto.randomBytes;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;

const s3 = new aws.S3({
	region: bucketRegion,
	accessKeyId: accessKeyId,
	secretAccessKey: secretAccessKey,
	signatureVersion: 'v4'
});

const rawBytes = randomBytes(16);
const imageName = rawBytes.toString('hex');

async function generateUploadURL() {
	const params = {
		Bucket: bucketName,
		Key: imageName,
		Expires: 60 * 5
	};

	const uploadURL = await s3.getSignedUrlPromise('putObject', params);
	return uploadURL;
}

export default defineEventHandler(async event => {
	let url = await generateUploadURL();
	return {
		status: 200,
		body: {
			success: true,
			url: url,
			imageName: imageName
		}
	};
});
