const BLOCK = "block"
const INLINE = "inline"
const HIDE = "none"
const CORRECT_BACKGROUND = "#0f0"
const INCORRECT_BACKGROUND = "#f00"
const QUESTION_BACKGROUND = "#fff"

var gameName
var gameDeclared
var game

function getGameParam() {
    let params = window.location.search
    return (
        (params && params.startsWith("?g=")) ? params.substring(3) : ""
    ).replaceAll('+', ' ')
}

function toggleVisibility(id, display, inline) {
    document.getElementById(id).style.display = display ? 
        ( (inline) ? INLINE : BLOCK ) : HIDE
}

function togglePanelVisibility() {
    toggleVisibility("load", gameDeclared === false)
    toggleVisibility("game", gameDeclared === true)
    toggleVisibility("game-over", false)
    toggleVisibility("next-panel", false)
}

async function playGame() {
    game = new Game()
    await game.load(gameName)

    game.play()
    writeTextToElement("title", `Flash Card Game - ${gameName}`)
    displayCard()
}

function writeTextToElement(id, text) {
    let elem = document.getElementById(id)
    while (elem.firstChild) elem.removeChild(elem.firstChild)

    elem.appendChild(document.createTextNode(text))
}

function updateQuestionBackground(color) {
    document.getElementById("question").style.backgroundColor = color
}

function displayCard() {
    let question = game.message
    updateQuestionBackground(QUESTION_BACKGROUND)
    writeTextToElement("question", question)
}

function enableNext() {
    toggleVisibility("next-panel", true, true)
    toggleVisibility("flip", false)
    document.getElementById("flip").style.backgroundColor = "#333"
    document.getElementById("flip").style.cursor = "not-allowed"
}

function disableNext() {
    toggleVisibility("next-panel", false)
    toggleVisibility("flip", true, true)
    document.getElementById("flip").style.backgroundColor = "rgb(230, 230, 234)"
    document.getElementById("flip").style.cursor = "pointer"
}

function isAnswerState() {
    return game.state.toString() === "play"
}

function isNextState() {
    return game.state.toString() === "correct" || game.state.toString() === "incorrect"
}

function flipCard() {
    if (isAnswerState()) {
        game.flip()

        writeTextToElement("question", game.message)
        writeTextToElement("card-face", "Answer")

        enableNext()
    }
}

function getLetterGrade(percentage) {
    if (percentage >= 97) return "A+"
    if (percentage >= 93) return "A"
    if (percentage >= 90) return "A-"

    if (percentage >= 87) return "B+"
    if (percentage >= 83) return "B"
    if (percentage >= 80) return "B-"

    if (percentage >= 77) return "C+"
    if (percentage >= 73) return "C"
    if (percentage >= 70) return "C-"

    if (percentage >= 67) return "D+"
    if (percentage >= 63) return "D"
    if (percentage >= 60) return "D-"
    
    else return "Big ol' jeFe"
}

function displayFinalScore() {
    let percentage = game.score.current / game.score.best * 100.0

    writeTextToElement("final-score", `${game.score.current} / ${game.score.best}`)
    writeTextToElement("percentage", `${(percentage).toFixed(2)}%`)
    writeTextToElement("letter-grade", `${getLetterGrade(percentage)}`)
}

function next() {
    if (game.state.toString() === "play") {
        let howYouDo = document.getElementById("correct").checked

        if (howYouDo) game.correct()
        else game.incorrect()

        game.next()

        if (game.state.toString() === "play") {
            displayCard()
            disableNext()
            writeTextToElement("card-face", "Question")
        } else {
            toggleVisibility("game", false)
            toggleVisibility("game-over", true)
            displayFinalScore()
        }
    }
}

function addGame(deckName) {
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

async function loadAvailableGames() {
    let gameFinder = new GameFinder()
    let games = await gameFinder.find()

    games.forEach(addGame)
}

function handleKeyboardInput(e) {
    if (e.key === " ") {
        if (isAnswerState()) {
            flipCard()
        } else if (isNextState()) {
            next()
        }
    }
}

function main() {
    gameName = getGameParam()
    gameDeclared = gameName ? true : false
    togglePanelVisibility()

    if (gameDeclared) {
        playGame()
        document.getElementById("flip").onclick = flipCard
        document.getElementById("next").onclick = next
        document.onkeydown = handleKeyboardInput
    } else {
        loadAvailableGames()
    }
}

window.onload = main;
