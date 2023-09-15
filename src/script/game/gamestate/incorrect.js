class Incorrect extends GameState {
    toString() {
        return "incorrect"
    }

    addIncorrectCard(game) {
        game.incorrectPile.cards.push(game.currentCard)
    }

    update(game) {
        this.addIncorrectCard(game)
        return new Ready()
    }
}
