# Twitch Plays X

> (inspired by [TwitchPlaysPokemon])

Connect to Twitch's messaging service, (TMI) via [`tmi.js`](https://github.com/tmijs/tmi.js) (previously using IRC) to send inputs to a program and stream it, TwitchPlaysPokemon style. Should support linux/windows/mac.

### In Action

Pokemon on Windows

![](http://zippy.gfycat.com/ActiveLankyHorsemouse.gif)
<span style = 'color:red'><b>ERROR: Gif not found. Replace w/ suitable image</b></span>

Pokemon Red running in a Ubuntu 13.10 VM

![](pokebuntu.gif)

### Caveats

On Windows, the program has to be *focused* in order to send keyboard inputs so you won't be able to use your computer at the same time (unless you run the program in a virtual machine).

## Installation

- Install [Node.js] (check that you can run node/npm)
- Clone the repo: `git clone https://github.com/hzoo/TwitchPlaysX.git`
- Install `node_modules` in the created folder: `npm install`
- If Linux: install [xdotool](http://www.semicomplete.com/projects/xdotool/): `apt-get install xdotool`
- If Windows: install [python] and [python win32] (with corresponding versions)
- Install Python3 virtual environment in root directory [.venv](https://docs.python.org/3/tutorial/venv.html)
- Run virtual environment by executing `.venv\Scripts\activate.bat`
- Install python dependencies by running `python3 -m pip install -r requirements.txt`

## Setup

- Start the program you are going to be sending keys to: (VisualBoyAdvance, Notepad)
- Append environment variables or modify `config.js` if you need to change the options: `TWITCH_CHANNEL=mychannelhere npm start`
### OPTIONAL:
- [Register and authenticate](https://dev.twitch.tv/docs/authentication) your bot with **Twitch**. This is necessary if you want to be able to interact with the stream in any way, such as sending chat messages
    - Obtain a client secret and OAuth token with the necessary Twitch scopes
- Create file `secrets.js` in the **root** directory, and add your Bot's OAuth secrets in the following form:
    ```
    module.exports = {
        'identity':   {
            'username': <Your_Bots_Name>
            'password': <Your_Bots_OAuth_token>
        },
        'clientidentity' : {
            'clientid': <Your_Bots Client_ID>,
            'clientsecret': <Your_Bots Client_ID>,
        },
    };
    ``` 
- Run the server with `npm run start`

---

### Config

- `CONFIG_PROGRAM_NAME`: Find out the title of the window that you will be sending key inputs to (may need to check Task Manager to find out)
    - Example: `VisualBoyAdvance`, `Desmume`
        - For `notepad.exe` it would be "Notepad" or "Untitled - Notepad".
        - If you want to test that the key's are sending correctly, run `npm test` with Notepad opened to see if it sends a key to it.
- `TWITCH_CHANNEL`: the Twitch channel you want to listen for messages on (ex. `twitchplayspokemon`)
- `PYTHON_EXEC_NAME`: The name of the python executable - can be python or python3
- Depending on the program, you may need to change the controls (in `defaultKeyMap` in `keyHandler.js`, `keymap.py` for Windows)

### Misc

*https://github.com/hzoo/ChatPlays/ used MutationObservers in the browser*

Using IRC lets you get all the messages; you can't always get all messages through the browser (quickly or consistently) so this is a better approach overall as others have done.

### Method

- Connect to IRC
- Use regex to match for certain commands
- Print out username/message
- Hook up to a program/emulator
    - if on windows: probably uses the **win32** api (window has to take focus)
    - otherwise: **xdotool**
- Stream it with [OBS](https://obsproject.com)

### Contributions

Feel free to give suggestions or report bugs!

[node.js]:http://nodejs.org
[python win32]:https://github.com/mhammond/pywin32/releases
[python]:http://www.python.org/
[TwitchPlaysPokemon]:http://twitch.tv/TwitchPlaysPokemon
