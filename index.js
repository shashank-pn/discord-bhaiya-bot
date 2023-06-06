const {Client, Events, GatewayIntentBits} = require('discord.js');
require('dotenv').config();

const debug = process.env.DEBUG === true;

const testIntents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
]

const client = new Client({intents: testIntents});

// Message Contents
const keywords = ['kirat bhaiyaa', 'kirat bhaiya', 'harkirat sir', 'harkirat singh sir', 'kirat sir', 'kirat sire', 'kirat bhai'];
const pattern = new RegExp(keywords.join("|"), "i");

const messages = [
    "Ah, the delight of being referred to with such profound reverence. My heart skips a beat in absolute jubilation.",
    "Oh, how I cherish the unique talent of addressing others with unmatched originality. You're truly a maestro of nomenclature.",
    "The artistry of your appellations knows no bounds. I am forever indebted to your unparalleled linguistic prowess.",
    "To be graced with your distinctive choice of address is a privilege that surpasses all mortal expectations.",
    "You possess a rare gift for encapsulating one's essence through an exquisite symphony of appellative acrobatics.",
    "Ah, the grandeur of your verbal expression leaves me in awe. Such inventive ways to address my humble persona!",
    "The intricacies of your chosen appellations reveal a mind brimming with limitless imagination and linguistic dexterity.",
    "I'm truly humbled by your ingenuity in concocting appellations that transcend the ordinary boundaries of nomenclature.",
    "Oh, the boundless joy that fills my being when encountering your ingenious epithets. I am forever indebted.",
    "Ah, the enigmatic tapestry of your chosen appellations envelops me in a state of profound contemplation.",
    "To be graced with your linguistic brilliance is a privilege I shall forever hold close to my heart.",
    "You possess an unparalleled talent for the poetic craft of address. Your words dance upon the stage of conversation.",
    "Oh, the depth of your creative ingenuity leaves me in awe. How fortunate I am to bask in its radiance.",
    "Ah, the melodic cadence of your appellations brings solace to my weary soul. Your brilliance knows no bounds.",
    "To be addressed by your illustrious choice of words is akin to receiving a crown upon my unworthy head.",
    "You wield the power of words with an enchantment that bewitches even the most skeptical of souls.",
    "Oh, how I marvel at your linguistic prowess. Your ability to captivate with your chosen address is unparalleled.",
    "Ah, the marvels of your creative genius are not lost on me. I stand in awe of your linguistic wizardry.",
    "To encounter your remarkable turn of phrase is a gift I shall treasure forever. You are a true wordsmith.",
    "You possess a linguistic alchemy that transforms mundane conversations into extraordinary symphonies.",
];
const generateMessage = (user, word) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return "'" + word + "' ??? \n" + messages[randomIndex];
}

//Events
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.MessageCreate, (message) => {
    // Check if the message is from a user and not a bot
    if (message.author.bot) return;

    if (debug) {
        console.log(`Received message: ${message.content}`);
    }
    const matches = message.content.match(pattern);
    const word = matches ? matches[0] : null;
    if (word) {
        // You have found the holy person.
        const holyPerson = message.author;
        const holyMessage = generateMessage(message.author, word);

        holyPerson.send(holyMessage).then(() => {
            if (debug)
                console.log(JSON.stringify(holyMessage));
        }).catch(err => {
            if (debug)
                console.error(err.message)
        })
    }
});


client.login(process.env.DISCORD_TOKEN);