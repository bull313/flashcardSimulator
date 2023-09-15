var round = 1

function flipCard() {
    game.flip()

    writeTextToElement("question", game.message)
    writeTextToElement("card-face", "Answer")

    toggleVisibility("next-panel", true, true)
    toggleVisibility("flip", false)
}

function writeWrongCard(card) {
    writeTableRow("wrong-answers", [ card.question, card.answer ])
}

function nextQuestion() {
    let howYouDo = document.getElementById("correct").checked

    if (howYouDo) game.correct()
    else game.incorrect()

    game.next()
    game.play()

    if (isQuestionState()) {
        writeTextToElement("question", game.message)

        toggleVisibility("next-panel", false)
        toggleVisibility("flip", true, true)
        writeTextToElement("card-face", "Question")
        toggleRadioButtonCheck("correct", true)
    } else if (isRoundOverState()) {
        toggleVisibility("game", false)
        toggleVisibility("round-over", true)

        game.incorrectPile.cards.forEach(writeWrongCard)
    } else {
        toggleVisibility("game", false)
        toggleVisibility("game-over", true)
    }
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
    writeTextToElement("card-face", "Question")
    toggleRadioButtonCheck("correct", true)
}

async function main() {
    toggleVisibility("load", isGameDeclared() === false)
    toggleVisibility("game", isGameDeclared() === true)
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

        keyAction = () => {
            if (isQuestionState()) {
                flipCard()
            } else if (isAnswerState()) {
                nextQuestion()
            }
        }

        document.getElementById("flip").onclick = flipCard
        document.getElementById("next").onclick = nextQuestion
        document.getElementById("next-round").onclick = nextRound
        document.onkeydown = handleKeyboardInput

    } else {
        let gameFinder = new GameFinder()
        let games = await gameFinder.find()

        games.forEach(writeGame)
    }
}

window.onload = main;
