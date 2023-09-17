function addClickEvent(id, action) {
    document.getElementById(id).onclick = action
}

function invokeClick(id) {
    if (isVisible(id)) {
        console.log("click")
        document.getElementById(id).click()
    }
}
