// Import necessary modules
const fs = require('fs');
const { TwitterApi } = require('twitter-api-v2');
const schedule = require('node-schedule');
require('dotenv').config();

// Create a Twitter client with OAuth 1.0a User Context
const twitterClient = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

// Load kaomojis from JSON file
const kaomojis = JSON.parse(fs.readFileSync('data/kaomojis.json', 'utf8'));

// Define a set of random elements to add to the tweet
// const randomElements = [
//   "✨", "🌟", "🌈", "💫", "🌺", "🌻", "🔥", "💖", "🎉", "🌸",
//   "🪐", "🎆", "🔮", "🎵", "🦄", "💥", "🎨", "🌼", "🎀", "💎"
// ];

// Define a set of hashtags to include in the tweet
const hashtags = [
  "..∠( ᐛ 」∠)＿", "","ඞ .. ඞ ...... ඞ", " (ㅅ´ ˘ `)", "(..◜ᴗ◝..)", "??? (ᵕ—ᴗ—)", 
  " ^._.^ฅ", "( •̯́ ₃ •̯̀) (｡•́︿•̀｡)(╥﹏╥)", "˙ᵕ˙", "... ∠( ᐛ 」∠)＿", "!( •̀ - •́ )!",
  "(⸝⸝ᴗ﹏ᴗ⸝⸝) ᶻ 𝗓 𐰁 ᕙ( •̀ ᗜ •́ )ᕗ", "(｡- .•)","ඞ", "(*ᴗ͈ˬᴗ͈)ꕤ*.ﾟ", "ᕕ( ᐕ )ᕗ","☆⸜(｡˃ ᵕ ˂ )⸝☆",
  " ദ്ദി ˉ͈̀꒳ˉ͈́ )✧", "#love ⸜(｡˃ ᵕ ˂ )⸝♡", "#positivity ˊᵕˋ", "", "♡ ","♡ .. ඞ", '(∩˃o˂∩) ♡ ',
  '','','','','','','','','','','', '(❁˃́ᴗ˂̀)(≧ᴗ≦✿)', "#cutebot >ᴗ<", ">ᴗ<", "(ㅅ´ ˘ `)"
];

// Function to post two random kaomojis with random elements and hashtags
async function postRandomKaomoji() {
  try {
    // Get all categories
    const categories = Object.keys(kaomojis);

    // Select a random category and kaomoji from the first category
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)];
    const kaomojiList1 = kaomojis[randomCategory1];
    const randomKaomoji1 = kaomojiList1[Math.floor(Math.random() * kaomojiList1.length)];

    // Select a random category and kaomoji from the second category
    const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];
    const kaomojisInSecondCategory = kaomojis[randomCategory2];
    const randomKaomoji2 = kaomojisInSecondCategory[Math.floor(Math.random() * kaomojisInSecondCategory.length)];

    // // Select a random element
    // const randomElement = randomElements[Math.floor(Math.random() * randomElements.length)];

    // Select a few random hashtags
    const selectedHashtags = [];
    for (let i = 0; i < 1; i++) {
      const randomHashtag = hashtags[Math.floor(Math.random() * hashtags.length)];
      if (!selectedHashtags.includes(randomHashtag)) {
        selectedHashtags.push(randomHashtag);
      }
    }

    // Combine the two kaomojis with the random element and hashtags
    const tweetContent = `${randomKaomoji1} ${randomKaomoji2} ${selectedHashtags.join(' ')}`;

    // Post the tweet
    await twitterClient.v2.tweet(tweetContent);
    console.log(`Tweet sent successfully: ${tweetContent}`);
  } catch (error) {
    console.error('Error in running the bot:', error);
  }
}

// // Post a tweet immediately
// postRandomKaomoji();

// Schedule future tweets
schedule.scheduleJob('0 */3 * * *', postRandomKaomoji);
