var isListening = false
var hotkeys = {}

function handleHotkeys(e) {
    if (Object.keys(hotkeys).includes(e.key)) hotkeys[e.key]()
}

function registerKeyEvent() {
    document.onkeydown = handleHotkeys
}

function addHotkey(key, action, caseSensitive) {
    hotkeys[key] = action

    if (!caseSensitive) {
        hotkeys[key.toUpperCase()] = action
        hotkeys[key.toLowerCase()] = action
    }

    registerKeyEvent()
}
