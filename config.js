// change these variables
let channel = process.env.TWITCH_CHANNEL || "relma7031";
let programName = process.env.CONFIG_PROGRAM_NAME || "Roseblight";
let pyexec = process.env.PYTHON_EXEC_NAME || "python3";
// Set the first one to true if you want commands to be repeatable, and
// the second if you want only mods/admins to do repeatable commands
let allowrepeat = [
  process.env.ALLOW_COMMAND_REPEATS || true,
  process.env.REPEAT_MOD_ONLY || true,
];
let usage = "https://pastebin.com/vDNizgHD";

// List of commands to check for
let rstring = "";
if (allowrepeat[0]) {
  rstring = "([ ]+[0-9]*)?";
}
let regexCommands = [
  // Single number or lowercase letter
  new RegExp(`^[0-9]${rstring}$`, "i"),
  new RegExp(`^[a-z]${rstring}$`, "i"),
  // Direction plus optional duration
  new RegExp(`^(left|right|up|down)[ ]+(short|long)${rstring}$`, "i"),
  // Run or skill with direction
  new RegExp(`^(run|skill|battlerun)[ ]+(left|right|up|down)${rstring}$`, "i"),
];
let commands = [
  // Arrow keys
  "left",
  "right",
  "up",
  "down",
  //Other
  "tab",
  "space",
  "enter",
  "pass",
  "backspace",
  "back",
  "interact",
  "inventory",
];

// Commands meant to produce a twitch response
let twitchcommands = ["usage", "help"];

let filteredCommands = [];
let throttledCommands = [];

module.exports = {
  // all commands to print  - commands and regexcommands define controls, twitchcommands
  // define commands that produce a response within twitch itself
  commands,
  regexCommands,
  twitchcommands,
  // whether to allow repeating commmands by adding a number after the command, and whether to
  // restrict that privilege to the mods or not
  allowrepeat,
  // twitch channel to connect to
  channel,
  // Title of the window of the program (ex: 'Desmume' or 'VBA')
  programName,
  // Name of python executer
  pyexec,
  // If you need to filter the commands sent to the program
  // Ex: democracy/anarchy since they don't affect the program itself
  // Ex: ["democracy","anarchy"]
  filteredCommands,

  // If you want to prevent people from using from command too often
  // Ex: ["start"]
  throttledCommands,

  // Throttle time in seconds
  // Ex: you can limit 'start' so it's only used every 10 sec
  timeToWait: 10000,

  // Delay between each possible keypress in milliseconds (can't be too fast)
  // To change on Windows, change `key.py`
  delay: 100,

  // Uri of usage msg
  usage,
};
