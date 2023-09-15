class RoundOver extends GameState {
    toString() {
        return "roundover"
    }

    update(game) {
        game.deck.cards = [ ...game.incorrectPile.cards ]
        game.incorrectPile.cards = []
        return new Ready()
    }
}
