class Game {
    constructor(deckLoader) {
        this.state = "awaitgame"
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
    }

    async load(deckName) {
        this.deck = await this.deckLoader.loadDeck(deckName)
        this.state = "ready"
    }
}
