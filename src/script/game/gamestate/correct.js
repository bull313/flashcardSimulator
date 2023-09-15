class Correct extends GameState {
    toString() {
        return "correct"
    }

    update(game) {
        return new Ready()
    }
}
