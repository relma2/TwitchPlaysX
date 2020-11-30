const tmi = require("tmi.js");
const config = require("./config.js");
const elevatedRoles = [
  "mod",
  "vip",
  "admin",
  "broadcaster",
  "global_mod",
  "moderator",
];
const log = console.log;

usagesender = function (channel, tags, u, mode = 0) {
  // mode 0 for neutral, mode 1 for welcome.
  if (mode == 0) {
    this.say(
      channel,
      `@${tags.username} visit ${u} for instructions`
    ).catch((err) => log(err));
  } else if (mode == 1) {
    this.say(
      channel,
      `Welcome to our world, @${tags.username}. Go to ${u} for command list`
    ).catch((err) => log(err));
  } else {
    this.say(
      channel,
      `@${tags.username} visit ${u} for instructions`
    ).catch((err) => log(err));
  }
};

let notRepeatOrAllowedRepeat = function (allow, channel, tags, msg) {
  if (!new RegExp("[0-9]+", "i").test(msg.split(" ").pop())) return true; // not a repeated message
  let b1 = allow[0];
  let b2 = allow[1];
  if (!b1) return false; // no repeating commands allowed
  if (!b2) return true; // repeats allowed by everybody
  // return if the user represented by the tags is in an elevated position
  return (
    tags.mod ||
    elevatedRoles.some((r) => Boolean(tags[r])) ||
    config.channel === tags.username
  );
};

_init_ = function () {
  Object.defineProperty(tmi.client.prototype, "sendUsage", {
    value: usagesender,
    writable: true,
    configurable: true,
  });
  // More extention methods here
  // Object.defineProperty(tmi.client.prototype, name, ...
};

module.exports = { _init_, notRepeatOrAllowedRepeat };
