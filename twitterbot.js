require('dotenv').config();  // Load environment variables from .env file
const { TwitterApi } = require('twitter-api-v2');

// Create a Twitter client with OAuth 1.0a User Context
const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

async function runBot() {
  try {
    // Post a tweet
await twitterClient.v2.tweet('ඞ Sus detected! This bot is definitely not an Impostor... or is it? (¬‿¬) Stay tuned #AmongUs #KaomojiBot');

    console.log('Tweet sent successfully!');
  } catch (error) {
    console.error('Error in running the bot:', error);
  }
}

runBot();
