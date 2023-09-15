class Answer extends GameState {
    toString() {
        return "answer"
    }

    update(game) {
        return (game.questionCorrect === true) ? new Correct() : new Incorrect()
    }
}
