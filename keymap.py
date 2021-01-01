# keymap.py
# Stores the list of key presses that the thing can execute 

import keyboard
import time, sys

keyDelay = 0.2
THRESHOLD = 20
ARROWKEYS = ['up', 'down', 'left', 'right']

# Keymap actually is a dictionary of functions that are called by key.py when
# the inputted command's first word matches one of the keys below
keymap = {
    # Handles arrow keys
    'arrow': lambda k, d: press_arrow_key(k, d),
    # Handles a-z and 0-9
    'alphanum': lambda k: presskey(k),

    # Custom commands start here
    'tab':  lambda: keyboard.press_and_release('tab'),
    'inventory':  lambda: keyboard.press_and_release('tab'),
    'space':  lambda: keyboard.press_and_release('space'),
    'enter':  lambda: keyboard.press_and_release('enter'),
    'pass':  lambda: keyboard.press_and_release('enter'),
    'backspace': lambda: keyboard.press_and_release('\b'),
    'back' : lambda: keyboard.press_and_release('\b'),
    'interact': lambda: presskey('e'),
    # skill up, down, left, right
    'skill': lambda d: skill(d),
    'run': lambda d: run(d),
    'battlerun': lambda d: battle_run(d)
}

# default functionality - brief single keypress OR arrow key with duration
def presskey(k):
    keyboard.press(k)
    time.sleep(keyDelay)
    keyboard.release(k)

def press_arrow_key(k, keyDelay = 0.3):
    try:
        if keyDelay == 'long':
            keyDelay = 0.8
        elif keyDelay == 'short':
            keyDelay = 0.2
        else:
            keyDelay = float(keyDelay)
    except:
        keyDelay = 0.3
    if k in ARROWKEYS:
        keyboard.press(k)
        time.sleep(keyDelay)
        keyboard.release(k)

# Custom functions here

def skill(dir):
    keyboard.press('q')
    time.sleep(keyDelay/2)
    keyboard.press(dir)
    time.sleep(keyDelay)
    keyboard.release('q')
    time.sleep(keyDelay/2)
    keyboard.release(dir)
    
def battle_run(dir):
    keyboard.press('e')
    time.sleep(keyDelay/2)
    keyboard.press(dir)
    time.sleep(0.5)
    keyboard.release('e')
    time.sleep(keyDelay/2)
    keyboard.release(dir)

def run(dir):
    keyboard.press('a')
    press_arrow_key(dir, 0.5)
    keyboard.release('a')

