class Correct extends GameState {
    toString() {
        return "correct"
    }

    updateScore(game) {
        ++game.score.current
        ++game.score.best
    }

    update(game) {
        this.updateScore(game)
        return new Ready()
    }
}
