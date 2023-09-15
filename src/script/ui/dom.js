function writeTextToElement(id, text) {
    let elem = document.getElementById(id)
    while (elem.firstChild) elem.removeChild(elem.firstChild)

    elem.appendChild(document.createTextNode(text))
}

function writeGame(deckName) {
    let gameButton = document.createElement("div")
    gameButton.className = "game-button"

    let gameText = document.createElement("p")
    gameText.className = "game-button-name"
    gameText.style.display = "inline-block"
    gameText.appendChild(document.createTextNode(deckName))

    let space = document.createElement("p")
    space.className = "game-button-space"
    space.style.display = "inline-block"

    let selectButton = document.createElement("button")
    selectButton.className = "game-button-select"
    selectButton.name = "g"
    selectButton.value = deckName
    selectButton.appendChild(document.createTextNode("Select"))
    selectButton.onclick = () => document.getElementById("game-form").submit()

    gameButton.appendChild(gameText)
    gameButton.appendChild(space)
    gameButton.appendChild(selectButton)

    document.getElementById("game-list").appendChild(gameButton)
}
