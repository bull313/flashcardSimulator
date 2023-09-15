class Ready extends GameState {
    constructor() {
        super()
        this.newState = null
    }

    toString() {
        return "ready"
    }

    evaluateNewState(game) {
        this.newState = (game.isGameOver()) ? new GameOver() : new Question()
    }

    update(game) {
        this.evaluateNewState(game)

        game.currentCard = game.deck.cards.shift()
        game.message = game.currentCard?.question || null
        
        return this.newState
    }
}
