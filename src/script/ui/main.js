var round = 1

function flipCard() {
    game.flip()

    writeTextToElement("question", game.message)

    invertVisibility("card-face-down")
    invertVisibility("card-face-up")
    invertVisibility("next-panel")
}

function writeWrongCard(card) {
    writeTableRow("wrong-answers", [ card.question, card.answer ])
}

function correctButtonPressed(id) {
    return id === "correct"
}

function nextQuestion(e) {
    let howYouDo = correctButtonPressed(e.srcElement.id)

    if (howYouDo) game.correct()
    else game.incorrect()

    game.next()
    game.play()

    if (isQuestionState()) {
        writeTextToElement("question", game.message)

        toggleVisibility("next-panel", false)
        toggleVisibility("flip", true, true)
        invertVisibility("card-face-down")
        invertVisibility("card-face-up")
        toggleRadioButtonCheck("correct", true)
    } else if (isRoundOverState()) {
        toggleVisibility("game", false)
        toggleVisibility("round-over", true)

        game.incorrectPile.cards.forEach(writeWrongCard)
    } else endGame()
}

function endGame() {
    toggleVisibility("round-over", false)
    toggleVisibility("game", false)
    toggleVisibility("game-over", true)
}

function nextRound() {
    game.loadIncorrectCards()
    shuffleCards()
    game.play()

    clearTable("wrong-answers")
    toggleVisibility("round-over", false)

    toggleVisibility("game", true)
    writeTextToElement("roundnum", `Round #${round++}`)
    writeTextToElement("question", game.message)

    toggleVisibility("next-panel", false)
    toggleVisibility("flip", true, true)
    invertVisibility("card-face-down")
    invertVisibility("card-face-up")
    toggleRadioButtonCheck("correct", true)
}

function masterKeyBehavior() {
    if (isRoundOverState()) invokeClick("next-round")
    else invokeClick("flip")
}

function addClickEvents() {
    addClickEvent("flip", flipCard)
    addClickEvent("correct", nextQuestion)
    addClickEvent("incorrect", nextQuestion)
    addClickEvent("next-round", nextRound)
    addClickEvent("end-game", endGame)
}

function addHotkeys() {
    addHotkey(' ', masterKeyBehavior)
    addHotkey('R', () => invokeClick("correct"))
    addHotkey('C', () => invokeClick("correct"))
    addHotkey('W', () => invokeClick("incorrect"))
    addHotkey('I', () => invokeClick("incorrect"))
}

async function main() {
    toggleVisibility("load", isGameDeclared() === false)
    toggleVisibility("game", isGameDeclared() === true)
    toggleVisibility("card-face-up", false)
    toggleVisibility("round-over", false)
    toggleVisibility("game-over", false)
    toggleVisibility("next-panel", false)

    if (isGameDeclared()) {
        await loadGame()
        shuffleCards()
        game.play()

        writeTextToElement("title", `Flash Card Game - ${getGameParam()}`)
        writeTextToElement("roundnum", `Round #${round++}`)
        writeTextToElement("question", game.message)

        addClickEvents()
        addHotkeys()
    } else {
        let gameFinder = new GameFinder()
        let games = await gameFinder.find()

        games.forEach(writeGame)
    }
}

window.onload = main;
