var game
var deckSize
var cardIdx

async function loadGame() {
    let gameName = getGameParam()

    game = new Game()
    await game.load(gameName)
}

function shuffleCards() {
    shuffle(game.deck.cards)
}

function isQuestionState() {
    return game.state.toString() === "question"
}

function isAnswerState() {
    return game.state.toString() === "answer"
}

function isRoundOverState() {
    return game.state.toString() === "roundover"
}

function updateDeckSize() {
    deckSize = game.deck.cards.length + 1
    cardIdx = 1
}
