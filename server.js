const tmi = require("tmi.js");
const keyHandler = require("./keyHandler.js");
const config = require("./config.js");
const utils = require("./utils.js");
const log = console.log;

// secrets.js["identity"] contains your Bot username and access
// token. This is a secret OAuth token
// Learn more about Twitch OAuth and how to generate a token at
// https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/
const { identity } = require("./secrets.js");
const usage = config.usage || "usage.txt";

// Add client extentions
utils._init_();

// https://github.com/tmijs/tmi.js#tmijs
// for more options
const client = new tmi.client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: identity,
  channels: [config.channel],
});

// Allows for a mix of regex commands and normal commands
// Creates a list of regexes that must be matched by one of them
// Also accounts for if you want commands to repeatable or not
let rstring = "";
if (config.allowrepeat[0]) {
  rstring = "([ ]+[0-9]*)?";
}
const commandRegex = (config.regexCommands || []).concat([
  new RegExp("^(" + config.commands.join(rstring + "|") + rstring + ")$", "i"),
]);

// Listener to execute the python script that does the Twitch Plays command
// if the message *is* one of the allowed commands specified in the config file
client.on("message", function (channel, tags, message, self) {
  if (self) return; //not us
  let isCorrectChannel = `#${config.channel}` === channel;
  let messageMatches = commandRegex.some((cr) => message.match(cr));
  // disallow repeating commands (ex. left 10) if the user is non-mod if the setings allow that
  let repeatChecker = utils.notRepeatOrAllowedRepeat(
    config.allowrepeat,
    channel,
    tags,
    message
  );
  if (isCorrectChannel && messageMatches && repeatChecker) {
    // log username and message to console
    log(`@${tags.username}: ${message}`);
    // send the message to the emulator
    keyHandler.sendKey(message.toLowerCase());
  }
});

// Listener to send usage message
client.on("message", function (channel, tags, message, self) {
  if (self) return;
  let isCorrectChannel = `#${config.channel}` === channel;
  let messageMatches = config.twitchcommands.some((m) => message === m);
  if (isCorrectChannel && messageMatches) {
    // log username and message to console
    log(`@${tags.username}: ${message}`);
    // send usage
    client.sendUsage(channel, tags, usage, 0);
  }
});

// Fires when new user joins the chat
client.addListener("newchatter", function (channel, tags, self) {
  let isCorrectChannel = `#${config.channel}` === channel;
  if (self || !isCorrectChannel) return;
  // Welcome new chatter
  log(`Welcome, @${tags.username}!`);
  // send usage message
  client.sendUsage(channel, tags, usage, 1);
});

client.addListener("connected", function (address, port) {
  log("Connected! Waiting for messages..");
});
client.addListener("disconnected", function (reason) {
  log("Disconnected from the server! Reason: " + reason);
});

client.connect();
log(`Connecting to /${config.channel}..`);
