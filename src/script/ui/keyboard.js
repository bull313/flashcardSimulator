const KEY_SPACE = ' '

var keyTrigger = KEY_SPACE
var keyAction = null

function handleKeyboardInput(e) {
    if (e.key === keyTrigger) {
        keyAction()
    }
}
