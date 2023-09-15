class AwaitGame extends GameState {
    constructor() {
        super()
        this.gameLoaded = false
    }

    toString() {
        return "awaitgame"
    }

    async load(name, loader) {
        this.gameLoaded = true
        return await loader.loadDeck(name)
    }

    async update(game, deckName) {
        game.deck = await this.load(deckName, game.deckLoader)
        return (this.gameLoaded) ? new Ready() : new AwaitGame()
    }
}
