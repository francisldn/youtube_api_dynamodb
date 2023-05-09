const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
require('dotenv').config()

const REGION = "eu-west-2";
const dynamoDBClient = new DynamoDBClient({ 
    region: REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEYID,
        secretAccessKey:process.env.AWS_SECRETACCESSKEYID,
      },
});


const addComments = ({id, videoId, comment, authorDisplayName, publishedAt, updatedAt})=> {
    const params = {
        TableName: 'comments',
        Item: {
          'id': {S: id},
          'videoId': {S:videoId},
          'comment': {S: comment},
          'authorDisplayName':{S: authorDisplayName},
          'publishedAt': {S: publishedAt},
          'updatedAt': {S:updatedAt}
        }
      };
      
      // Call the putItem method of the DynamoDB service object
    const putItemCommand = new PutItemCommand(params);
    dynamoDBClient.send(putItemCommand)
        .then((data) => {
          console.log("PutItem succeeded:", data);
        })
        .catch((error) => {
          console.error("PutItem failed:", error);
    });
}

module.exports = {addComments}