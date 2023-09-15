class GameOver extends GameState {
    toString() {
        return "gameover"
    }

    update(game) {
        return new GameOver()
    }
}
