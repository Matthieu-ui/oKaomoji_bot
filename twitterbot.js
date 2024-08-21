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

const hashtags = [
"ʕ•ᴥ•ʔ", "₍ᐢ•ﻌ•ᐢ₎", "(❁´◡❁)", "૮( ˶ᵔ ᵕ ᵔ˶)ა", "꒰˶• ༝ •˶꒱", "(´｡• ᵕ •｡)", "(•̀ᴗ•́*)و", "꒰ᐢ• ‧̫ •ᐢ꒱",
"( •᷄⌓•᷅ )", "(≧▽≦)", "૮₍˶• . •˶₎ა", "(づ｡◕‿‿◕｡)づ", "(≧ω≦)", "(๑˃ᴗ˂)ﻭ", "(◜◒◝)", "✧(｡•̀ᴗ-)✧",
"ෆ⃛(੭ु´͈ ᐜ ͈)੭ु⁾⁾", "( •́ ◡ •̀ )", "꒰⌗´͈ ᵕ ॣ͈⌗꒱", "°˖✧◝(⁰▿⁰)◜✧˖°", "◟( ˘ ³˘)◞", "૮₍｡• – •｡₎ა", "꒰´ ˘ `꒱",
"(◠‿◠✿)", "٩(｡•́‿•̀｡)۶", "(╯✧∇✧)╯", "٩(｡•ㅅ•｡)و", "(≧∀≦)", "( •̀ᴗ•́ )و ̑̑", "ヽ(⌒‿⌒)", "(｡♥‿♥｡)",
"∩(︶▽︶)∩", "(♡°▽°♡)", "(⋆‿⋆)", "✩°｡⋆⸜(ू˃̣̣̣̣̣̣︿˂̣̣̣̣̣̣ ू)⸝", "(ฅ⁍̴̀◊⁍̴́)و ̑̑", "( ˘▽˘)っ♨", "(˘⌣˘)♡(˘⌣˘)",
"૮₍⁄⁄˶• ᴥ •˶⁄⁄₎ა", "(๑´ლ`๑)", "(ᵔᴥᵔ)", "(⸝⸝⸝╹◡╹)╭", "(灬º‿º灬)♡", "(≧∇≦)", "(っ- ‸ – ς)", "ヽ(o＾▽＾o)ノ",
"(〃＾▽＾〃)", "⸜( *´ᗜ )⸝", "(´∀)", "(˶‾᷄ ⁻̫ ‾᷅˵)", "(｡♥‿♥｡)", "(๑>ᴗ<๑)", "☆～（ゝ。∂）", "ʕ♡˙ᴥ˙♡ʔ", "✧ #oKaomoji ✧", 
];

async function postRandomKaomoji() {
  try {
    const categories = Object.keys(kaomojis);
    const randomCategory1 = categories[Math.floor(Math.random() * categories.length)];
    const kaomojiList1 = kaomojis[randomCategory1];
    const randomKaomoji1 = kaomojiList1[Math.floor(Math.random() * kaomojiList1.length)];

    const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];
    const kaomojisInSecondCategory = kaomojis[randomCategory2];
    const randomKaomoji2 = kaomojisInSecondCategory[Math.floor(Math.random() * kaomojisInSecondCategory.length)];

    const selectedHashtags = [];
    for (let i = 0; i < 1; i++) {
      const randomHashtag = hashtags[Math.floor(Math.random() * hashtags.length)];
      if (!selectedHashtags.includes(randomHashtag)) {
        selectedHashtags.push(randomHashtag);
      }
    }

    const tweetContent = `${randomKaomoji1} ${randomKaomoji2} ${selectedHashtags.join(' ')}`;
    await twitterClient.v2.tweet(tweetContent);
    console.log(`Tweet sent successfully: ${tweetContent}`);
  } catch (error) {
    console.error('Error in running the bot:', error);
  }
}

console.log("I am still here .. ∠( ᐛ 」∠)＿");

schedule.scheduleJob('10 /2 * * *', () => {
  console.log('Scheduled job triggered at', new Date().toISOString());
  postRandomKaomoji();
});
