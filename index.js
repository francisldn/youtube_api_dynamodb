const {google} =  require('googleapis');
const fs = require('fs');
const { addComments } = require('./db');
require('dotenv').config()

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_API_AUTH,
});

youtube.commentThreads.list({
    part: 'snippet',
    videoId: 'oedDOaqjPgo'
}, (err,data) => {
    if(err) throw err;
    data.data.items.forEach(item => {
        addComments({
            id: item.id,
            videoId: item.snippet.videoId,
            comment: item.snippet.topLevelComment.snippet.textOriginal,
            authorDisplayName: item.snippet.topLevelComment.snippet.authorDisplayName,
            publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
            updatedAt: item.snippet.topLevelComment.snippet.updatedAt
        })
    })

    console.log('successfully saved to')
})