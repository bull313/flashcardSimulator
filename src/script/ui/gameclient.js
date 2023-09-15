var game

async function playGame() {
    let gameName = getGameParam()

    game = new Game()
    await game.load(gameName)

    game.play()
}

function isQuestionState() {
    return game.state.toString() === "question"
}

function isAnswerState() {
    return game.state.toString() === "answer"
}
