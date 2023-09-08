class GameOver extends GameState {
    toString() {
        return "gameover"
    }

    next(game) {
        game.currentCard = null
    }
}