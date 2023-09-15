function flipCard() {
    game.flip()

    writeTextToElement("question", game.message)
    writeTextToElement("card-face", "Answer")

    toggleVisibility("next-panel", true, true)
    toggleVisibility("flip", false)
}



function nextQuestion() {
    let howYouDo = document.getElementById("correct").checked

    if (howYouDo) game.correct()
    else game.incorrect()

    game.updateScore()
    game.play()

    if (isQuestionState()) {
        writeTextToElement("question", game.message)

        toggleVisibility("next-panel", false)
        toggleVisibility("flip", true, true)
        writeTextToElement("card-face", "Question")
    } else {
        toggleVisibility("game", false)
        toggleVisibility("game-over", true)

        let finalScore = tabulateFinalScore()
        writeTextToElement("final-score", `${game.score.current} / ${game.score.best}`)
        writeTextToElement("percentage", `${(finalScore).toFixed(2)}%`)
        writeTextToElement("letter-grade", `${getLetterGrade(finalScore)}`)
    }
}

async function main() {
    toggleVisibility("load", isGameDeclared() === false)
    toggleVisibility("game", isGameDeclared() === true)
    toggleVisibility("game-over", false)
    toggleVisibility("next-panel", false)

    if (isGameDeclared()) {
        await playGame()
        writeTextToElement("title", `Flash Card Game - ${gameName}`)
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
        document.onkeydown = handleKeyboardInput

    } else {
        let gameFinder = new GameFinder()
        let games = await gameFinder.find()

        games.forEach(writeGame)
    }
}

window.onload = main;
