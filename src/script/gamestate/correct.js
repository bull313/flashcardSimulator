class Correct extends GameState {
    toString() {
        return "correct"
    }

    updateScore(score) {
        let newScore = new Score()

        newScore.current = score.current + 1
        newScore.best = score.best + 1

        return newScore
    }
}
