class Incorrect extends GameState {
    toString() {
        return "incorrect"
    }

    updateScore(game) {
        ++game.score.best
    }

    update(game) {
        this.updateScore(game)
        return new Ready()
    }
}
