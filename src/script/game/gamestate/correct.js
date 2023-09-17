class Correct extends GameState {
    toString() {
        return "correct"
    }

    update() {
        return new Ready()
    }
}
