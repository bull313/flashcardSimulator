class Question extends GameState {
    toString() {
        return "question"
    }

    update(game) {
        game.message = game.currentCard.answer
        return new Answer();
    }
}
