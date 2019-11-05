const shell = require('shelljs');
var fs = require('fs');
var path = require('path');
var ip = process.argv[2];
//setup db
let dynamodbCmd = 'python dynamodump.py -m restore -r local -s "*" --host '+ ip +' --port 4569';
shell.exec(dynamodbCmd);
//setup s3
var s3cmd = 's3CreateBucketsWACL.bat '+ip;
shell.exec(s3cmd);

//setup arns
shell.exec('aws dynamodb --endpoint-url=http://'+ ip +':4569 update-table --table-name devComments --stream-specification StreamEnabled=true,StreamViewType="NEW_AND_OLD_IMAGES" > devCommentsArn.json');
var content = fs.readFileSync('devCommentsArn.json');
var jsonContent = JSON.parse(content);
var commentsArn = jsonContent.TableDescription.LatestStreamArn;
shell.exec('aws dynamodb --endpoint-url=http://'+ ip +':4569 update-table --table-name devPosts --stream-specification StreamEnabled=true,StreamViewType="NEW_AND_OLD_IMAGES" > devPostsArn.json');
content = fs.readFileSync('devPostsArn.json');
jsonContent = JSON.parse(content);
var postsArn = jsonContent.TableDescription.LatestStreamArn;

//do images lambda
shell.exec('aws --region=eu-west-1 --endpoint-url=http://'+ ip +':4574 lambda create-function --function-name=images --runtime=nodejs10.x --role=r1 --handler=images.handler --zip-file fileb://images.zip');
shell.exec('aws --endpoint-url=http://'+ ip +':4572 s3api put-bucket-notification-configuration --bucket dev-weco-post-images --notification-configuration file://s3_notif.json');
shell.exec('aws --endpoint-url=http://'+ ip +':4572 s3api put-bucket-notification-configuration --bucket dev-weco-user-images --notification-configuration file://s3_notif.json');
shell.exec('aws --endpoint-url=http://'+ ip +':4572 s3api put-bucket-notification-configuration --bucket dev-weco-branch-images --notification-configuration file://s3_notif.json');
//do comments lambda
shell.exec('aws --region=eu-west-1 --endpoint-url=http://'+ ip +':4574 lambda create-function --function-name=CommentVotes --runtime=nodejs10.x --role=r1 --handler=CommentVotes.handler --zip-file fileb://CommentVotes.zip');
shell.exec('aws lambda --endpoint-url=http://'+ ip +':4574 create-event-source-mapping --function-name CommentVotes --batch-size 100 --starting-position LATEST --event-source-arn '+commentsArn);
//do post lambda
shell.exec('aws --region=eu-west-1 --endpoint-url=http://'+ ip +':4574 lambda create-function --function-name=PostVotes --runtime=nodejs10.x --role=r1 --handler=PostVotes.handler --zip-file fileb://PostVote.zip');
shell.exec('aws lambda --endpoint-url=http://'+ ip +':4574 create-event-source-mapping --function-name PostVotes --batch-size 15 --starting-position LATEST --event-source-arn '+postsArn);


//sync images in s3
var dirnameBranches = 'devbranchimages';
var destbucketBranches = 'dev-weco-branch-images';
fs.readdir(dirnameBranches, (err, files) => {
	if(!!files){
	  files.forEach(file => {
		var absolutePathB = path.resolve(dirnameBranches + '\\' + file);
		var commandB = 'aws --endpoint-url http://'+ ip +':4572 s3api put-object --bucket '+ destbucketBranches + ' --key ' + file + ' --body ' + absolutePathB;
		shell.exec(commandB);
	  });
	}
});

var dirnamePosts = 'devpostimages';
var destbucketPosts = 'dev-weco-post-images';
fs.readdir(dirnamePosts, (err, files) => {
	if(!!files){
	  files.forEach(file => {
		var absolutePathP = path.resolve(dirnamePosts + '\\' + file);
		var commandP = 'aws --endpoint-url http://'+ ip +':4572 s3api put-object --bucket '+ destbucketPosts + ' --key ' + file + ' --body ' + absolutePathP;
		shell.exec(commandP);

	  });
	}
});

var dirnameUsers = 'devuserimages';
var destbucketUsers = 'dev-weco-user-images';
fs.readdir(dirnameUsers, (err, files) => {
	if(!!files){
	  files.forEach(file => {
		var absolutePathU = path.resolve(dirnameUsers + '\\' + file);
		var commandU = 'aws --endpoint-url http://'+ ip +':4572 s3api put-object --bucket '+ destbucketUsers + ' --key ' + file + ' --body ' + absolutePathU;
		shell.exec(commandU);
	  });
	}
});