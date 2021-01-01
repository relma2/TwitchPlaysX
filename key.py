# For Windows

import time, sys, platform
# Operating System dependent imports
OS = platform.system()
if OS == 'Windows':
    import win32api, win32con, win32gui
elif OS == 'Darwin': # Mac
    raise NotImplementedError("Mac OS not implemented yet")
elif OS == 'Linux':
    raise NotImplementedError("Linux OS not implemented yet")
else:
    raise NotImplementedError("Unrecognized operating system")
import argparse
from keymap import keymap, keyDelay, THRESHOLD, ARROWKEYS

def repeat(k, f, *args):
    for _ in range(k):
        f(*args)

# this way has to keep window in focus
def sendKey(b, k, *args):
    b = b.lower()
    if k <= 0 or k > THRESHOLD:
        return
    # Arrow Key with optional duration
    if b in ARROWKEYS:
        repeat(k, keymap['arrow'], b, 0.3 if len(args) == 0 else args[0])
    # Single alphanumeric key
    elif b.isalnum() and len(b) == 1:
        repeat(k, keymap['alphanum'], b)
    # Custom function - see keymap.py for more
    else:
        if b in keymap.keys():
            repeat(k, keymap[b], *args)


def SimpleWindowCheck(windowname):
    window = None
    try:
        window = win32gui.FindWindow(windowName, None)
    except win32gui.error:
        try: 
            window = win32gui.FindWindow(None, windowName)
        except win32gui.error:
            return False
        else:
            return window
    else:
        return window

print(__name__)

if __name__ == "__main__":
    # Parse args
    parser = argparse.ArgumentParser(description="Send command to game program")
    parser.add_argument("window", help="name of the program you want to run in", type=str)
    parser.add_argument("command", help="functionality you want to execute", type=str)
    parser.add_argument("--repeat", help="nuber of times you wand command to be repeated", default=1, type=int)
    parser.add_argument("--params", nargs='*', default=[])
    args = parser.parse_args()
    windowName = args.window

    winId = SimpleWindowCheck(windowName)
    activeWindow = win32gui.GetActiveWindow()

    if not (winId):
        windowList = []

        def enumHandler(hwnd, list):
            if windowName in win32gui.GetWindowText(hwnd):
                list.append(hwnd)
        
        win32gui.EnumWindows(enumHandler, windowList)
        # only the first id, may need to try the others
        winId = windowList[0]

        # can check with this
        for hwnd in windowList:
            hwndChild = win32gui.GetWindow(hwnd, win32con.GW_CHILD)
            # print("window title/id/child id: ", win32gui.GetWindowText(hwnd), "/", hwnd, "/", hwndChild)

    win32gui.ShowWindow(winId, win32con.SW_SHOWNORMAL)
    win32gui.SetForegroundWindow(winId)
    # TODO - Implement setting foreground window for other operating systems
    
    sendKey(args.command, args.repeat, *(args.params if args.params is not None else []))
    # TODO - figure out a way to restore the window that was originally active