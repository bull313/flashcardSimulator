class Play extends GameState {
    toString() {
        return "play"
    }

    next(game) {
        game.state = new Play()
        game.currentCard = game.deck.cards.shift()
        game.message = game.currentCard.question
    }
}
