class Incorrect extends GameState {
    toString() {
        return "incorrect"
    }

    updateScore(score) {
        let newScore = new Score()

        newScore.current = score.current
        newScore.best = score.best + 1

        return newScore
    }
}
