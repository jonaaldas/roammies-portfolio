import aws from 'aws-sdk';
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKeyId = process.env.BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.BUCKET_SECRET_KEY;

const s3 = new aws.S3({
	bucketRegion,
	accessKeyId,
	secretAccessKey,
	signatureVersion: 'v4'
});

export default defineEventHandler(async event => {
	const {imageName} = await readBody(event);
	const params = {
		Bucket: bucketName,
		Key: imageName
	};

	return new Promise((resolve, reject) => {
		s3.headObject(params, function (err, data) {
			if (err) {
				console.log(err, err.stack); // an error occurred
				resolve({
					status: 404,
					body: {
						success: false,
						message: 'Object not found'
					}
				});
			} else {
				resolve({
					status: 200,
					body: {
						success: true,
						message: 'Object exists'
					}
				});
			}
		});
	});
});
