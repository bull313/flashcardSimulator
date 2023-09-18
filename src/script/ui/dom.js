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

function toggleRadioButtonCheck(id, isChecked) {
    document.getElementById(id).checked = isChecked
}

function writeTableData(data) {
    let td = document.createElement("td")
    td.className = "wrong-answers-data"
    td.appendChild(document.createTextNode(data))

    return td
}

function writeTableRow(id, dataRows) {
    let tr = document.createElement("tr")
    let dataItems = dataRows.map(writeTableData)

    tr.className = "wrong-answers-row"
    
    dataItems.forEach(td => { tr.appendChild(td) })

    document.getElementById(id).appendChild(tr)
}

function clearTable(id) {
    let table = document.getElementById(id)

    while (table.childElementCount > 1)
        table.removeChild(table.lastElementChild)
}

function updateProgressBar(value, max) {
    let progressPercent = (value / max) * 100.0
    let progressText = `${progressPercent.toFixed(0)}%`

    document.getElementById("progress-bar-fill").style.width = progressText

    writeTextToElement("progress-bar-fill", `${progressText}`)
}
