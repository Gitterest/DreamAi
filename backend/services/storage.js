const AWS=require('aws-sdk'),crypto=require('crypto');
const s3=new AWS.S3();
const BUCKET=process.env.VOICE_BUCKET;
const KEY=Buffer.from(process.env.ENCRYPTION_KEY_BASE64,'base64');

async function saveEncrypted(buffer,uid){
  const iv=crypto.randomBytes(16);
  const cipher=crypto.createCipheriv('aes-256-gcm',KEY,iv);
  const enc=Buffer.concat([cipher.update(buffer),cipher.final()]);
  const tag=cipher.getAuthTag();
  const payload=Buffer.concat([iv,tag,enc]);
  const key=`voices/${uid}/${Date.now()}.enc`;
  await s3.putObject({Bucket:BUCKET,Key:key,Body:payload,ServerSideEncryption:'AES256'}).promise();
  return `s3://${BUCKET}/${key}`;
}
module.exports={ saveEncrypted };
