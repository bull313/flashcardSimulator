const BLOCK = "block"
const INLINE = "inline"
const HIDE = "none"

function toggleVisibility(id, display, inline) {
    document.getElementById(id).style.display = display ? 
        ( (inline) ? INLINE : BLOCK ) : HIDE
}
