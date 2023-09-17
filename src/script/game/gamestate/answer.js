class Answer extends GameState {
    toString() {
        return "answer"
    }

    questionAnswered(game) {
        return game.questionCorrect !== null
    }

    answeredCorrectly(game)  {
        return game.questionCorrect === true
    }

    update(game) {
        game.message = game.currentCard.question

        return this.questionAnswered(game) ? (
            this.answeredCorrectly(game) ? new Correct() : new Incorrect()
        ) : new Question()
    }
}
