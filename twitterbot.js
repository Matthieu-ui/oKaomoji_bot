const fs = require('fs');
const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
require('dotenv').config();

const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

let kaomojis;
try {
  kaomojis = JSON.parse(fs.readFileSync('data/kaomojis.json', 'utf8'));
  console.log('Kaomojis loaded successfully.');
} catch (error) {
  console.error('Error loading kaomojis:', error);
  process.exit(1);
}

async function postRandomKaomoji() {
  try {
    const categories = Object.keys(kaomojis);
    const numberOfKaomojis = Math.floor(Math.random() * 5) + 1; // Randomly select 1 to 5 kaomojis
    const selectedKaomojis = [];

    for (let i = 0; i < numberOfKaomojis; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const kaomojiList = kaomojis[randomCategory];
      const randomKaomoji = kaomojiList[Math.floor(Math.random() * kaomojiList.length)];
      selectedKaomojis.push(randomKaomoji);
    }

    const tweetContent = selectedKaomojis.join(' ');
    await twitterClient.v2.tweet(tweetContent);
    console.log(`Tweet sent successfully: ${tweetContent}`);
  } catch (error) {
    console.error('Error in running the bot:', error);
  }
}

console.log("I am still here .. ∠( ᐛ 」∠)＿");

schedule.scheduleJob('0 * * * *', () => { // posts every hour 
  console.log('Scheduled job triggered at', new Date().toISOString());
  postRandomKaomoji();
});



